require('dotenv').config();
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');

const server = http.Server(app);
const io = socketIO(server);

const inspector = (req, res, next) => {
  // console.log('hit this line');
  next();
};

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const db = require('../db/index.js');


const corsOptions = {
  origin: 'ngrok-host-url',
  optionsSuccessStatus: 200,
};


const {
  signUpUser,
  saveLocation,
  getRatings,
  getLocID,
  bulkLocations,
  getComments,
  postRating,
  downRating,
  updateLocationRatingAvg,
  addGuardian,
} = require('../db/dbHelpers/helpers.js');

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(inspector);

const PORT = process.env.PORT || 8080;


// create new entry in db for new user
app.post('/signup', (req, res) => {
  const { name, email } = req.body;
  signUpUser(name, email)
    .then(() => {
      res.status(200).send({ success: 'Okay' });
    })
    .catch(e => console.log(e));
});

// create new entry for comments at a location

// save location
app.post('/location', (req, res) => {
  const { loc } = req.body;
  saveLocation(loc)
    .then(() => {
      res.sendStatus(201);
    }).catch((err) => {
      console.log(err);
    });
});

// update location ratings
app.put('/ratings', (req, res) => {
  const { location, rate } = req.body;
  getLocID(location).then((id) => {
    console.log(id);
    return getRatings(id);
  }).catch((err) => {
    console.error(err);
  });


  getRatings();
});


// get request for /locations that sends back  locations
// for recomendation
app.get('/locations', (req, res) => {
  // query database and send back all locations
  db.Location.findAll({})
    .then((data) => {
      res.send(data);
    });
});

app.post('/locations', (req, res) => {
  // saveLocation(req.body)
  bulkLocations(req.body)
    .then(() => {
      res.status(200)
        .send({ name: 'test' });
    });
});


// create entry for guardians

// create entry for reviews

app.get('/comments', (req, res) => {
  getComments()
    .then((data) => {
      res.send(data);
    });
});

app.post('/comments', (req, res) => {
  const { locationId, text, userId } = req.body;
  postComment(locationId, text, userId)
    .then((data) => {
      res.status(200).send({
        success: 'OK',
      });
    });
});

/* * TWILIO CLIENT * */
app.post('/sms', (req, res) => {
  const numberArray = [
    process.env.OMAR_PHONE,
    process.env.MY_PHONE_NUMBER,
  ];
  return numberArray.map((person) => {
    return client.messages.create({
      to: [person],
      from: `+15046086414
      `,
      body: 'Omar, tell me if this comes through',
    })
      .then((message) => {
        res.status(200)
          .send({ message });
      });
  });
  // return client.messages.create({
  //   to: [process.env.OMAR_PHONE],
  //   from: `+15046086414
  //   `,
  //   body: 'Omar, tell me if this comes through',
  // })
  //   .then((message) => {
  //     res.status(200)
  //       .send({ message });
  //   });
});

// post rating
app.post('/ratings', (req, res) => {
  postRating(req.body.locationId)
    .then(() => {
      res.status(200).send({ post: 'ok' });
      updateLocationRatingAvg(req.body.locationId);
    })
    .catch((error) => {
      console.log(error);
    });
});

// reduce rating

app.post('/ratingsDown', (req, res) => {
  downRating(req.body.locationId)
    .then(() => {
      res.status(200).send({ post: 'ok' });
      updateLocationRatingAvg(req.body.locationId);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post('/addGuardian', (req, res) => {
  console.log(req, res);
  addGuardian(req.body)
    .then(() => {
      res.status(200).send({ post: 'ok' });
    })
    .catch(e => console.log(e));
});

// io.on('connection', (socket) => {
//   console.log('user connected');
// });

const nspChat = io.of('/chat');
const nspDefault = io.nsps['/'];

const messageList = [];
const userList = [];

io.on('connection', function (socket) {
	console.log('User Connected');
	socket.emit('connected', 'Welcome');
	let addedUser = false;

	// console.log('connection query params', socket.handshake.query);
	// console.log('connection headers', socket.request.headers);
	// console.log('connection cookies', socket.request.headers.cookie);
	socket.on('add user', function (data, cb) {
		if (addedUser) return;
		addedUser = true;
		socket.username = data.username;
		console.log('Username: ', data.username);
		userList.push({ username: data.username });
		socket.emit('login', { userList: userList });
		socket.broadcast.emit('user joined', {
			username: data.username
		});
		cb(true);
		console.log('add user ack');
	})

	socket.on('new message', function (data, cb) {
		cb(true)
		console.log(data)
		messageList.push(data)
		socket.broadcast.emit('new message', data)
	})

	socket.on('getUsers', function () {
		socket.emit('getUsers', userList)
	})
	socket.on('user count', function () {
		socket.emit('user count', userList.length)
	})
	socket.on('getMessages', function () {
		socket.emit('getMessages', messageList)
	})

	socket.on('disconnect', function () {
		console.log('User Disconnected')
		if (addedUser) {
			for (let i = 0; i < userList.length; i++) {
				if (socket.username === userList[ i ].username) {
					userList.splice(i, 1)
				}
			}
			socket.broadcast.emit('user left', {
				username: socket.username
			})
		}
	})
})

nspDefault.on('connect', (socket) => {
	console.log('Joined Namespace: /')

	socket.on('disconnect', () => {
		console.log('Left Namespace: /')
	})
})

nspChat.on('connect', (socket) => {
	console.log('Joined Namespace: /chat')

	socket.on('disconnect', () => {
		console.log('Left Namespace: /chat')
	})
})


server.listen(PORT, () => { console.log(`listening on port ${PORT}`); });

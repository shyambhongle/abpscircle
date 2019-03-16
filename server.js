const http=require('http');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const socketIo=require('socket.io');

const app = express();
var server = require('http').Server(app);
const io=socketIo(server);

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoDB;

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

app.use(function(req,res,next){
    req.io = io;
    next();
});

//routes
const auth=require('./routes/auth/auth');
const home=require('./routes/home/home');
const post=require('./routes/post/post');
const profile=require('./routes/profile/profile');
const search=require('./routes/search/search');
const util=require('./routes/friendsystem/friendsystem');



// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));




//route middleware
app.use('/auth',auth);
app.use('/',home);
app.use('/profile',profile);
app.use('/post',post);
app.use('/search',search);
app.use('/util',util);






// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Server running on port ${port}`));



let onlineClients={};


io.sockets.on('connection', function (socket) {

  socket.on('adduser',(data)=>{
    onlineClients[data.id] = {
      "socket": socket.id
    };
})

  //Removing the socket on disconnect
  socket.on('disconnect', function() {
  	for(var name in onlineClients) {
  		if(onlineClients[name].socket === socket.id) {
  			delete onlineClients[name];
        break;
  		}
      io.emit('checkOnline');
  	}
  })

  io.myclients=onlineClients;
  io.emit('checkOnline');

console.log("new client");
})

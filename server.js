const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');



const app = express();


// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoDB;

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);



//routes
const auth=require('./routes/auth/auth');
const home=require('./routes/home/home');
const post=require('./routes/post/post');
const profile=require('./routes/profile/profile');



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







// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

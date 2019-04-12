const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const SocketSchema = new Schema({
    onlineClients:Object
})

module.exports = Socket = mongoose.model('socket', SocketSchema);

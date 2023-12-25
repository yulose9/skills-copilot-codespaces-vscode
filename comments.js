// Create web server
var express = require('express')
var app = express()
var bodyParser = require('body-parser')

// Create web server
var server = require('http').Server(app)
var port = process.env.PORT || 3000
server.listen(port, function () {
  console.log('Server is running on port ' + port)
})

// Create socket io
var io = require('socket.io')(server)

// Create mongoose
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/realtime_comment', { useNewUrlParser: true })

// Create schema
var commentSchema = new mongoose.Schema({
  username: String,
  content: String
})

// Create model
var Comment = mongoose.model('Comment', commentSchema)

// Create static folder
app.use(express.static('public'))

// Create body parser
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// Create route
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

// Create socket io
io.on('connection', function (socket) {
  console.log('User connected')
  socket.on('disconnect', function () {
    console.log('User disconnected')
  })

  socket.on('client-send-data', function (data) {
    // console.log(data)
    io.sockets.emit('server-send-data', data)
  })
})

// Create route
app.post('/comment', urlencodedParser, function (req, res) {
  // console.log(req.body)
  var newComment = Comment(req.body).save(function (err, data) {
    if (err) throw err
    io.sockets.emit('server-send-data', req.body)
    res.json(data)
  })
})

app.get('/comment', function (req, res) {
  Comment.find({}, function (err, data) {
    if (err) throw err
    res.json(data)
  })
})
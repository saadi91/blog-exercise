const express = require('express') 
const app = express() 
const bodyParser = require('body-parser') 
const MongoClient = require('mongodb').MongoClient

var db

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  db.collection('blogs').find().toArray(function(err, results) {
    console.log(results)
    res.render('index.ejs', {posts: results})
  })
})

app.post('/posts',(req, res) => {db.collection('blogs').save(req.body, (err, result) => {
  if (err) return console.log(err)
  console.log('saved to database')
  res.redirect('/')
})
})

const port = 3001
MongoClient.connect('mongodb://saleh:saleh321@ds163769.mlab.com:63769/blog',(err, database) => {
  if (err) return console.log(err)
  db = database.db('blog')
  app.listen(port, () => {console.log('server listen on port ' + port)})
})
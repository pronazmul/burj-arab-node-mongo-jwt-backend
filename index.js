const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 5000

app.use(cors())
app.use(bodyParser.json())

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://burj-arab:ghjjNsVguJ5UmRu0@cluster0.mx72a.mongodb.net/burjarab?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect(err => {
  const collection = client.db("burjarab").collection("booking");
    app.post("/book",(req,res)=>{
        
        collection.insertOne(req.body)
        .then(result=>console.log(result))

    })
});


app.get('/',(req,res)=>{
    res.send('Welcome Software Enginner Nazmul Huda')
})

app.listen(port)
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const port = 5000
require('dotenv').config()

app.use(cors())
app.use(bodyParser.json())

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.mx72a.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  const collection = client.db(process.env.DB_NAME).collection(process.env.COLLECTION);

    app.post("/book",(req,res)=>{
        collection.insertOne(req.body)
        .then(result=>res.send(result.insertedCount>0))
    })

    app.get("/getBooked",(req,res)=>{
        console.log(req.headers.authorization)
        collection.find({email:req.query.email})
        .toArray((err, document)=>res.send(document))
    })

});


app.get('/',(req,res)=>{
    res.send('Welcome Software Enginner Nazmul Huda')
})

app.listen(port)
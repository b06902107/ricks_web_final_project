import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose'
require('dotenv').config()
const app = express();
const port = process.env.PORT || 4000


app.use(cors())
app.use(express.json())
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
})

mongoose.connect(process.env.MONGO_URL,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

app.use('/login', require('./routes/login'));
app.use('/class', require('./routes/class'));
app.use('/group', require('./routes/group'));
app.use('/score', require('./routes/score'));

app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`),
);

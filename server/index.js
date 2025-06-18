const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const snippetRoutes = require('./route/snippet');
const userRoutes = require('./route/user.js');
const cookieParser = require("cookie-parser")

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.use('/api/snippets', snippetRoutes);
app.use('/api/auth',userRoutes)

mongoose.connect('mongodb://localhost:27017/snippetDB', {
}).then(() => {
  console.log('MongoDB connected');
  app.listen(5000, () => console.log('Server started on port 5000'));
}).catch(err => console.log(err));

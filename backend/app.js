const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const storeRoutes = require("./routes/storeRoutes");

const app = express();

app.use(express.json())

mongoose.set({strictQuery: true});

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT)
})
.catch((error) => {
console.log(error);
})

app.use('/store', storeRoutes);

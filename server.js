const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require("path");
const routes = require('./routes');

mongoose.connect("mongodb://127.0.0.1:27017/DrBakrey-project")
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => console.log("can not connected:", err))


const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "uploads")));

// Initialize Multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Set the destination folder for file uploads
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Create a unique filename
    }
});
const upload = multer({ storage: storage });

app.use('/api', routes);


const port = 8080;
app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
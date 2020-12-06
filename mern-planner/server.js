// citation: https://www.youtube.com/watch?v=5yTazHkDR4o&list=PLillGF-RfqbbiTGgA77tGO426V3hRF9iE&index=2
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const items = require('./routes/api/items');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

mongoose.connect(db)
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

// Use Routes
app.use('/api/items', items);

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

// end of citation
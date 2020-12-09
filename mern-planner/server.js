// citation: https://www.youtube.com/watch?v=5yTazHkDR4o&list=PLillGF-RfqbbiTGgA77tGO426V3hRF9iE&index=2
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const itemsRouter = require('./routes/api/items');
const authRouter = require('./routes/api/auth');

const app = express();

// cors
var cors = require('cors');

// use it before all route definitions
app.use(cors({origin: '*'}));
// cors

// Bodyparser Middleware
app.use(bodyParser.json()); // app.use() adds a middleware layer

const db = require('./config/keys').mongoURI; // mongodb://localhost:27017/planner_db

mongoose.connect(db)
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

// Use Routes
app.use('/api/items', itemsRouter); // function executed for any type of http request on /api/items
// end of citation

// authentication
app.use('/api/auth', authRouter);

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));




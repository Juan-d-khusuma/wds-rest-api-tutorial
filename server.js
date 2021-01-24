const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();

mongoose.connect(
    process.env.DATABASE_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
);

const db = mongoose.connection;
db.on('error', () => console.error(error));
db.once('open', () => console.log('Database Connected'));

app.use(express.json());

const subsribersRouter = require('./routes/subscribers');
app.use('/subscribers', subsribersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on PORT:${PORT}`))

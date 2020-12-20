const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();



const app = express();
const PORT = process.env.PORT || 8080;

//Middleware
app.use(logger('dev'));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://monoxica2004:Medhiney06@cluster0.8dqms.mongodb.net/zbestdb?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, () => {
    console.log('db connected ...')
})

//routes
const useers = require('./routes/users');

app.use('/users', useers)


// catch 404 err and forward then to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//error handler function 
app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {};
    const status = err.status || 5000;
    //response to the client
    res.status(status).json({
        err: {
            message: error.message
        }
    });
    //response to ourselves
    console.error(err)
})


app.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`);
});

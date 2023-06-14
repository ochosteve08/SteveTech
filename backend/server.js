const express = require('express');
const app= express();
const PORT= process.env.PORT ||3500;
const path = require('path');

//thirdparty middleware
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');

// custom middleware
const errorHandler = require('./middleware/errorHandler')
const {logger} = require('./middleware/logger')


app.use(logger);


//in-built middleware
app.use(express.json());

app.use(cookieParser())
app.use(cors(corsOptions))

// app.use(
//   cors({
//     origin: "http://localhost:3500",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );


app.use('/', express.static(path.join(__dirname,'public') ));
// app.use(express.static('public'))
app.use('/',require('./routes/root'));
app.all('*', (req,res)=>{
    res.status(404)
    if (req.accepts('html')){
        res.sendFile(path.join(__dirname,'views','404.html'))
    }
    else if (req.accepts('json')){
        res.json({message: '404 Not Found'})
    }
    else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT} `)
});
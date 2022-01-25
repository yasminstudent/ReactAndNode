const express = require('express');
const app = express();
const cors = require('cors')
const authMidd = require ('./middlewares/auth')

app.use(express.json());

app.use(cors())

// let alowCrossDomain = (req, res, next) =>{
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Methods', '*')
//     res.header('Access-Control-Allow-Headers', '*')
//     next()
// }

// app.use(alowCrossDomain)

const auth = require('./routes/authRoutes');
const series = require('./routes/seriesRoutes');

app.use('/auth', auth);
app.use(authMidd)
app.use('/series', series);


module.exports = app;
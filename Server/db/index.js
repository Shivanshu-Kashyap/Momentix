const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://shivanshukashyap996:shivanshu1234@cluster0.hegcm5v.mongodb.net/')
.then(() => console.log('connected mongodb'))
.catch(e => console.log(e));
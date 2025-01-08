const mongoose = require('mongoose');


mongoose.set('strictQuery', true);// This sets a Mongoose option for strict query checking.
const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,// Add this option to handle connection pooling.
    }).then((data) => {
        console.log(`Mongodb connected with server: ${data.connection.host}`)
    })
    .catch((err)=>{
        console. log(err)
    })
}

module.exports = connectDatabase
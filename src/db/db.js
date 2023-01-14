// const mongoose = require("mongoose");
// mongoose.connect("mongodb://0.0.0.0:27017/thapatechnical", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true})
// .then(()=>{
//     console.log("connect........");
// })
// .catch((error)=>{
//     console.log(error);
// })


const mongoose = require("mongoose");
const  uri = "mongodb+srv://jay:Shubham123@shubham.irwe3vo.mongodb.net/shubham?retryWrites=true&w=majority";





const connectionParams={
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true 
}
const connectDB = mongoose.connect(uri,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })
module.exports = connectDB;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const empSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,

    },
    number: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        require: true,

    },
    cpassword: {
        type: String,
        require: true,
    },
    tokens: [{
        token : {
             type: String,
            required : true,
        }
    }]
});




empSchema.methods.createToken = async function () {
    // console.log(this._id );
   try {

    const token = await jwt.sign({ _id: this._id }, "iuhhjuhhjiughjihughbjnihughbjnhugyvhbjhugddsfsdy");
    this.tokens = this.tokens.concat({token : token});
    await this.save();
    return token;

   } catch (error) {
    console.log(error)
   }
}






empSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    console.log(this.password);
    next();
    this.cpassword = undefined;
})



const empCollection = mongoose.model('data', empSchema);
module.exports = empCollection;
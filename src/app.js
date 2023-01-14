const express = require("express");
const app = express();
const bcrypt = require('bcrypt');
const bodyparser = require("body-parser");
let port = process.env.PORT || 4000;
const path = require('path');
const empCollection = require('./model/model');





const template_path = path.join(__dirname, '../template/views');


app.set("view engine", 'hbs');
app.set("views", template_path);



require('./db/db');

app.use(bodyparser.urlencoded({ extended: false }))
// //parse application/json
app.use(bodyparser.json())

// app.use(express.json());
// app.use(express.urlencoded({extented:false}));





app.post('/empdata', async (req, res) => {
    // //console.log(req.body.name);
    //     res.send(req.body.name);    // (req.body.name)ye value ko dega name
    // 
    try {

        const password = req.body.password;
        const cpassword = req.body.cpassword;
        if (password === cpassword) {

            const empData = new empCollection({
                name: req.body.name,
                email: req.body.email,
                number: req.body.number,
                password: req.body.password,
                cpassword: req.body.cpassword

            });

// ******************************************************************
const token =await empData.createToken();
console.log("token is " + token)

res.coookie('userToken',token,{
    expires : new Data(Date.now() + 5000 ),
    httpOnly : true
});

// ********************************************************************************
            const postData = await empData.save();
            res.sendStatus(200);
            res.send("data is saved");
        }


    } catch (error) {
        res.send(error);
        console.log(error);
    }



});





app.post('/loginpage', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.loginpassword;


        const getEmail = await empCollection.findOne({ email: email });
        // console.log(getEmail);
        // res.send(getEmail);
        const passReal = await bcrypt.compare(password, getEmail.password);

        const token =await getEmail.createToken();




        if (passReal) {
            res.sendStatus(200);
           res.send('Success ')
        }
        else {
            res.sendStatus(500);

            res.send('password are not matching ......')
        }
    } catch (error) {
        res.sendStatus(500);

        res.send(error)
        // console.log('error')
    }
});


// const bcrypt =  require('bcrypt');

// const passwordData = async(pass) =>{
//     const passData = await bcrypt.hash(pass, 10);
//     console.log(passData);
//     const Decodepass = await bcrypt.compare(pass,passData);
//     console.log(Decodepass);
// };

// passwordData('jay shnakar');

// *****************************************************************************************
// const jwt = require('jsonwebtoken');
// const createToken = async() => {
//     const token = jwt.sign({ _id: "634884489525888" }, "asdfghjklqwertyuiopzxcvbnmdfghjkertyuivbn");
//     console.log(token);

//     const tokenverify = jwt.verify(token,"asdfghjklqwertyuiopzxcvbnmdfghjkertyuivbn");
//     console.log(tokenverify)
// }
// createToken();

app.listen(port, () => {
    console.log(`lsiting to the port ${port}`)
});





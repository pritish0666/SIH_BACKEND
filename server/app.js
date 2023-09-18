import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import { hashSync, compareSync } from 'bcrypt';
import { UserModel, ngoModel, govtschemeModel, courseModel } from './config/database.js';
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt"
import twilio from "twilio"
import bodyParser from "body-parser";
import sendMail from "./helpers/sendMail.js";
import './helpers/passport.js';
import userOTP from "./helpers/sendMail.js"

dotenv.config();
const app = express();





app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(passport.initialize());
app.use(bodyParser.json())
// app.set('view engine', 'ejs')





app.use(express.json());




app.get('/', function (req, res) {
    res.send('hiii'); // This will serve your request to '/'.
  })


app.post('/forgetpass', async (req, res) => {
    sendMail(req,res)
    
});

// const generateOTP = () => {
//     return Math.floor(100000 + Math.random() * 900000).toString();
// };



const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

app.post("/otp-sms", (req, res) => {
  const phoneNumber = phoneNum; // Assuming phoneNumber is sent in the request body

  client.verify.services('VAfff8b99c6fc1016c88a4f4e76ec66cc7')
    .verifications
    .create({ to:phoneNumber , channel: 'sms' })
    .then(verification => {
      res.json({
        success: true,
        message: "Verification code sent successfully",
        verificationSid: verification.sid
      });
    })
    .catch(error => {
      res.status(500).json({
        success: false,
        message: "Error sending verification code",
        error: error.message
      });
    });
});


app.post("/verify-code", (req, res) => {
  const phoneNumber = phoneNum; // Assuming phoneNumber is sent in the request body
  const verificationCode = req.body.verificationCode; // Assuming verificationCode is sent in the request body

  client.verify.services('VAfff8b99c6fc1016c88a4f4e76ec66cc7')
    .verificationChecks
    .create({ to: phoneNumber, code: verificationCode })
    .then(verification_check => {
      if (verification_check.status === 'approved') {
        res.json({
          success: true,
          message: "Verification successful"
        });
      } else {
        res.json({
          success: false,
          message: "Invalid verification code"
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        success: false,
        message: "Error verifying code",
        error: error.message
      });
    });
});









let user
let phoneNum

app.post("/register", (req, res) => {

    // const receivedValue = req.body.value;
    // console.log('Received value:', receivedValue);
    // res.json({ message: 'Value received successfully' });
    // const myPlaintextPassword = 'req.body.password';
    // const saltRounds = 10;

    // bcrypt.hashSync(myPlaintextPassword, saltRounds);

    // const hashedPassword = bcrypt.hashSync(myPlaintextPassword, saltRounds)



   user = new UserModel({
    username: req.body.username,
    
    password:hashSync(req.body.password,5),
    name:req.body.name,
    email:req.body.email,
    phone:req.body.phone,
    gender:req.body.gender,
    // DOB:req.body.DOB,
    // lookingFor:req.body.lookingFor,
    // enrolledCourses:req.body.enrolledCourses,
    // NGOsApplied: req.body.NGOsApplied,
    // NGOsApproved: req.body.NGOsApproved,
    // language:req.body.language,
    // badges:req.body.badges,
    // location:req.body.location,
    // quizes:{
    //   quizName:req.body.quizName,
    //   completed:req.body.completed,
    //   score:req.body.score,
    // },
    // mentorsSubscribed: req.body.mentorsSubscribed,

  });

//   phoneNum=phone

user
    .save()
    .then((user) => {
      return res.send({
        success: true,
        message: "User registered successfully",
        user: {
          id: user._id,
          username: user.username,
        },
      });
    })
    .catch((err) => {
      return res.send({
        success: false,
        message: "Something went wrong",
        error: err,
      });
    });

  
});


app.post("/course", (req, res) => {
  const crs = new courseModel({
    code:req.body.code,
    name:req.body.name,
    author:req.body.author,
    description:req.body.description,
    level:req.body.level,
    createdon:req.body.createdon,
    skills:req.body.skills


  });

  crs
    .save()
    .then((crs) => {
      res.send({
        code:req.body.code,
        name:req.body.name,
        author:req.body.author,
        description:req.body.description,
        level:req.body.level,
        createdon:req.body.createdon,
        skills:req.body.skills

      });
    })
    .catch((err) => {
      res.send({
        success: false,
        message: "Something went wrong",
        error: err,
      });
    });
});


//ngoregister
app.post("/ngoregister", (req, res) => {
  const ngo = new ngoModel({
    code:req.body.code,
    name:req.body.name,
    location:req.body.location,
    description:req.body.description,
    eligibilitydata:req.body.eligibilitydata,
    documents:req.body.documents,


  });

  ngo
    .save()
    .then((ngo) => {
      res.send({
        success: true,
        message: "ngo registered successfully",

      });
    })
    .catch((err) => {
      res.send({
        success: false,
        message: "Something went wrong",
        error: err,
      });
    });
});

// Assuming ngoModel is already defined

app.get("/govs", async (req, res) => {
  try {
    const ngos = await govtschemeModel.find({});
    res.send({
      success: true,
      ngos: ngos,
    });
  } catch (err) {
    res.send({
      success: false,
      message: "Something went wrong",
      error: err,
    });
  }
});

app.get("/ngos", async (req, res) => {
  try {
    const ngos = await ngoModel.find({});
    res.send({
      success: true,
      ngos: ngos,
    });
  } catch (err) {
    res.send({
      success: false,
      message: "Something went wrong",
      error: err,
    });
  }
});


app.get("/userd", async (req, res) => {
  try {
    const ngos = await UserModel.find({});
    res.send({
      success: true,
      ngos: ngos,
    });
  } catch (err) {
    res.send({
      success: false,
      message: "Something went wrong",
      error: err,
    });
  }
});



//govtschemes
app.post("/govtregister", (req, res) => {
  const govt = new govtschemeModel({
    code:req.body.code,
    name:req.body.name,
    location:req.body.location,
    url:req.body.url,
    description:req.body.description,
    eligibilitydata:req.body.eligibilitydata,
    documents:req.body.documents,


  });

  govt
    .save()
    .then((govt) => {
      res.send({
        success: true,
        message: "govt registered successfully",

      });
    })
    .catch((err) => {
      res.send({
        success: false,
        message: "Something went wrong",
        error: err,
      });
    });
});








// User login
app.post("/login", (req, res) => {

    // const receivedValue = req.body.value;
    // console.log('Received value:', receivedValue);
    // res.json({ message: 'Value received successfully' });


  UserModel.findOne({ username: req.body.username }).then(user => {
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "Not registered"
      });
    }

    if (!compareSync(req.body.password, user.password)) {
      return res.status(401).send({
        success: false,
        message: "Incorrect password"
      });
    }
    const payload = {
      username: user.username,
      id: user._id
    };

    const token = jwt.sign(payload, "narcodes", { expiresIn: '180d' });
    return res.status(200).send({
      success: true,
      message: "Logged in successfully",
      token: "Bearer " + token
    });
  });
});

// Protected route
app.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  return res.status(200).send({
    success: true,
    user: {
      id: req.user._id,
      username: req.user.username
    }
  });
});




const PORT = process.env.PORT || 8080

// Start the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});




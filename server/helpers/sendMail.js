import nodemailer from 'nodemailer'

let userOTP

const sendMail =(req, res) => {

    //const email_user = "pritishpatra06@gmail.com"
    
    const generateOTP = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
      };


    let otp = generateOTP();
    userOTP=otp

    let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'pritishpatra29@gmail.com',
        pass: 'bctplklpfpwzduhf'
    }
    })

    let info = {
        from: 'pritishpatra29@gmail.com', // sender address
        to: "pritishpatra06@gmail.com", // list of receivers
        subject: "OTP verification", // Subject line
        text: `Your OTP is ${otp}`, // plain text body
        
        
    }

    transporter.sendMail(info,(err)=>{
        if(err){
            console.log(err);
            res.status(500).json({ success: false, message: "Error sending OTP" });
        } else {
            console.log("email sent !!!!");
            res.json(info);
            
        }
    });
    

   

    console.log(info.messageId)
    res.json(info)
}





export default {sendMail,userOTP}





















/*
import nodemailer from 'nodemailer';

const sendMail = (req,res,otp) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'pritishpatra29@gmail.com',
            pass: 'bctplklpfpwzduhf'
        }
    });

    const info = {
        from: 'pritishpatra29@gmail.com',
        to: "pritishpatra06@gmail.com",
        subject: "OTP verification",
        text: `Your OTP is ${otp}`
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(info, (err, info) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                console.log("Email sent !!!!");
                resolve(info);
            }
        });
    });
};

export default sendMail;
*/
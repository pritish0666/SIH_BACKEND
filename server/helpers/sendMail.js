import nodemailer from 'nodemailer'

const sendMail =(req, res) => {
    
    const generateOTP = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
      };


    const otp = generateOTP();

    let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'pritishpatra29@gmail.com',
        pass: 'bctplklpfpwzduhf'
    }
    })

    let info = {
        from: 'pritishpatra29@gmail.com', // sender address
        to: "abhijitbiswal1902@gmail.com,  pritishpatra06@gmail.com", // list of receivers
        subject: "OTP verification", // Subject line
        text: `Your OTP is ${otp}`, // plain text body
        
        
    }

    transporter.sendMail(info,(err)=>{
        if(err){
            console.log(err)
        }else{
            console.log("email sent !!!!")
        }
    })

    console.log(info.messageId)
    res.json(info)
}





export default sendMail
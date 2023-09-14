import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()

const user=process.env.MONGO_USER
const pass= process.env.MONGO_PASSWORD



const url = `mongodb://${user}:${pass}@ac-jimqhf4-shard-00-00.gdo7zux.mongodb.net:27017,ac-jimqhf4-shard-00-01.gdo7zux.mongodb.net:27017,ac-jimqhf4-shard-00-02.gdo7zux.mongodb.net:27017/?ssl=true&replicaSet=atlas-7ifcaw-shard-0&authSource=admin&retryWrites=true&w=majority`;



mongoose.connect(url)
  .then(() => {
    console.log("Connected successfully to MongoDB");
  })
  .catch((err) => console.error(err));


//user database
const userSchema = mongoose.Schema({
  username: String,
  password: String,
  name:String,
  email:String,
  phone:String,
  gender:String,
  DOB:String,
  lookingFor:String,
  enrolledCourses:String,
  NGOsApplied:[String],
  NGOsApproved:[String],
  language:String,
  badges:String,
  location:String,
  quizes:{
    quizName:String,
    completed:String,
    score:String,
  },
  mentorsSubscribed:[String],
  

});

const UserModel = mongoose.model("User", userSchema);


//govt_scheme database
const govtschemeSchema=mongoose.Schema({
  code:String,
  name:String,
  location:String,
  url:String,
  description:String,
  eligibilitydata:String,
  documents:String,
  
})

const govtschemeModel=mongoose.model("Govtscheme",govtschemeSchema)



//course
const coursesSchema=mongoose.Schema({
  code:String,
  name:String,
  author:String,
  description:String,
  level:String,
  createdon:String,
  
})

const courseModel=mongoose.model("coursescheme",coursesSchema)


//NGO_scheme database
const ngoSchema=mongoose.Schema({
  code:String,
  name:String,
  location:String,
  description:String,
  eligibilitydata:String,
  documents:String,
  skills:[String],
})

const ngoModel=mongoose.model("NGOscheme",ngoSchema)

export { courseModel, UserModel, govtschemeModel, ngoModel };

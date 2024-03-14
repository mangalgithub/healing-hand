import asyncHandler from "express-async-handler";
import User from "../models/userModels.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Patient from "../models/patientModels.js";
import Appointment from "../models/appointmentModels.js";
const generatetoken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d"
  });
};

export const registerUser = asyncHandler(async (req, res, next) => {
  try {
    const { name, email, password, role, pic } = req.body;
    console.log(req.body)
    if (!name || !email || !password || !role || !pic) {
      console.log("Provide info")
      return res.status(400).json({
        
        message: "Not all information provided"
      });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedpassword = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, password: hashedpassword, role, pic });
   // console.log(user)
    if (user) {
      const token = generatetoken(user._id);
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        pic: user.pic,
        token: token,
        message: "User created"
      });
    } else {
      return res.status(400).json({
       
        message: "Failed to create user"
      });
    }
  } catch (error) {
    next(error);
  }
});

export const loginUser = asyncHandler(async (req, res, next) => {
  try {
    console.log("hi")
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
     
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const token = generatetoken(user._id);
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      pic: user.pic,
      token: token,
      message: "Login successful"
    });
  } catch (error) {
    next(error);
  }
});



// Middleware to verify JWT token


// Protected route example
// app.get('/api/user/profile', verifyToken, (req, res) => {
//   // req.user will contain user information
//   res.json({
//     user: req.user,
//   });
// }
// );
export const getUser=(req,res,next)=>{
 
  const authHeader = req.headers["authorization"];
  

  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }

    try {
      // Extract user ID from the decoded token
      const userId = decodedToken.id;

      // Find user in the database by ID
      const user = await User.findById(userId);

      if (!user) {
        return res.sendStatus(404); // User not found
      }

      // Attach the user object to the request for further use
      req.user = user;
      console.log(user)
      res.json({
        id:req.user.id,
        name:req.user.name,
        pic:req.user.pic,
        role:req.user.role
      })
      // Continue to the next middleware
      next();
    } catch (error) {
      console.error('Error verifying token and fetching user:', error);
      return res.sendStatus(500); // Internal Server Error
    }
  });
 
}

export const getPreviousAppointments=asyncHandler(async(req,res)=>{
    try {
      const googleId = req.body.googleId;
      const appointments = await Appointment.find({ patientId: googleId });

      // Get current dateTime
      const date = new Date();
      let currDateTime = date.getFullYear().toString();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();

      currDateTime +=
        month < 10 ? "-0" + month.toString() : "-" + month.toString();
      currDateTime += day < 10 ? "-0" + day.toString() : "-" + day.toString();
      currDateTime +=
        hour < 10 ? "T0" + hour.toString() : "T" + hour.toString();
      currDateTime +=
        minutes < 10 ? ":0" + minutes.toString() : ":" + minutes.toString();
      currDateTime +=
        seconds < 10 ? ":0" + seconds.toString() : ":" + seconds.toString();

      const filteredAppointments = appointments.filter((appointment) => {
        return (
          Date.parse(currDateTime) >=
          Date.parse(appointment.date + "T" + appointment.slotTime)
        );
      });

      const sortedAppointments = filteredAppointments.sort((a, b) => {
        return (
          Date.parse(b.date + "T" + b.slotTime) -
          Date.parse(a.date + "T" + a.slotTime)
        );
      });

      res.status(200).json(sortedAppointments);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
});

export const upcomingAppointment=asyncHandler(async(req,res)=>{
   try {
     const googleId = req.body.googleId;
     const appointments = await Appointment.find({ patientId: googleId });

     // Get current dateTime
     const date = new Date();
     let currDateTime = date.getFullYear().toString();
     const month = date.getMonth() + 1;
     const day = date.getDate();
     const hour = date.getHours();
     const minutes = date.getMinutes();
     const seconds = date.getSeconds();

     currDateTime +=
       month < 10 ? "-0" + month.toString() : "-" + month.toString();
     currDateTime += day < 10 ? "-0" + day.toString() : "-" + day.toString();
     currDateTime += hour < 10 ? "T0" + hour.toString() : "T" + hour.toString();
     currDateTime +=
       minutes < 10 ? ":0" + minutes.toString() : ":" + minutes.toString();
     currDateTime +=
       seconds < 10 ? ":0" + seconds.toString() : ":" + seconds.toString();

     const filteredAppointments = appointments.filter((appointment) => {
       return (
         Date.parse(currDateTime) <=
         Date.parse(appointment.date + "T" + appointment.slotTime)
       );
     });

     const sortedAppointments = filteredAppointments.sort((a, b) => {
       return (
         Date.parse(a.date + "T" + a.slotTime) -
         Date.parse(b.date + "T" + b.slotTime)
       );
     });

     res.status(200).json(sortedAppointments);
   } catch (err) {
     console.log(err);
     res.status(400).json(err);
   }
});
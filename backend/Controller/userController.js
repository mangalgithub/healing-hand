import asyncHandler from "express-async-handler";
import User from "../models/userModels.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
    console.log(user)
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
export const verifyToken = (req, res, next) => {
  
};

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

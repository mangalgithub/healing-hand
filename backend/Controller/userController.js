
import asyncHandler from "express-async-handler";
import User from "../models/userModels.js";
import bcrypt from 'bcrypt';
import validator from "validator";
import jwt from 'jsonwebtoken';
import doctorModels from "../models/doctorModels.js";
const {Doctor} = doctorModels;
import Appointment from "../models/appointmentModels.js";

const generatetoken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d"
  });
};

const checkPasswordStrength = (password) => {
  // Add your password strength criteria here, for example:
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const registerUser = asyncHandler(async (req, res, next) => {
  try {
    const { name, email, password, role, pic } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "Not all information provided",
      });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    // Check password strength
    if (!checkPasswordStrength(password)) {
      return res.status(400).json({
        message:
          "Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    let newUser;

    if (role === "doctor") {
      newUser = await Doctor.create({
        name,
        email,
        password: hashedPassword,
        role,
      });
    } else {
      newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        pic,
        role,
      });
    }

    if (newUser) {
      const token = generatetoken(newUser._id);
      return res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        // pic: newUser.pic,
        token,
        message: "User created",
      });
    } else {
      return res.status(400).json({
        message: "Failed to create user",
      });
    }
  } catch (error) {
    next(error);
  }
});

export const loginUser = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const doctor = await Doctor.findOne({ email });

    if (!user && !doctor) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if(!passwordMatch){
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
    } else if (doctor) {
      const doctorPasswordMatch = await bcrypt.compare(password, doctor.password);
      if(!doctorPasswordMatch){
        return res.status(400).json({
          message: "Invalid email or password"
        });
      }
      const token = generatetoken(doctor._id);
      return res.status(200).json({
        _id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        role: doctor.role,
        token: token,
        message: "Login successful"
      });
    }
  } catch (error) {
    next(error);
  }
});

export const getUser = asyncHandler(async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }

      const userId = decodedToken.id;
      const user = await User.findById(userId);

      if (!user) {
        return res.sendStatus(404); // User not found
      }

      req.user = user;
      res.json({
        id: req.user.id,
        name: req.user.name,
        pic: req.user.pic,
        role: req.user.role
      });
    });
  } catch (error) {
    next(error);
  }
});
export const getDoctor = asyncHandler(async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }

      const doctorId = decodedToken.id;
      const doctor = await Doctor.findById(doctorId);

      if (!doctor) {
        return res.sendStatus(404); // Doctor not found
      }

      req.doctor = doctor;
      res.json({
        id: req.doctor.id,
        name: req.doctor.name,
        pic: req.doctor.pic,
        role: req.doctor.role
      });
    });
  } catch (error) {
    next(error);
  }
});
export const getPreviousAppointments = asyncHandler(async (req, res) => {
  try {
    const googleId = req.body.googleId;
    const appointments = await Appointment.find({ patientId: googleId });

    const date = new Date();
    let currDateTime = date.toISOString().split('T')[0] + 'T' + date.toTimeString().split(' ')[0];

    const filteredAppointments = appointments.filter((appointment) => {
      return Date.parse(currDateTime) >= Date.parse(appointment.date + "T" + appointment.slotTime);
    });

    const sortedAppointments = filteredAppointments.sort((a, b) => {
      return Date.parse(b.date + "T" + b.slotTime) - Date.parse(a.date + "T" + a.slotTime);
    });

    res.status(200).json(sortedAppointments);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

export const upcomingAppointment = asyncHandler(async (req, res) => {
  try {
    const googleId = req.body.googleId;
    const appointments = await Appointment.find({ patientId: googleId });

    const date = new Date();
    let currDateTime = date.toISOString().split('T')[0] + 'T' + date.toTimeString().split(' ')[0];

    const filteredAppointments = appointments.filter((appointment) => {
      return Date.parse(currDateTime) <= Date.parse(appointment.date + "T" + appointment.slotTime);
    });

    const sortedAppointments = filteredAppointments.sort((a, b) => {
      return Date.parse(a.date + "T" + a.slotTime) - Date.parse(b.date + "T" + b.slotTime);
    });

    res.status(200).json(sortedAppointments);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

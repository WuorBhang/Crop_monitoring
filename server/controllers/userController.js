import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Farmer from '../models/Farmer.js';

export const registerFarmer = async (req, res) => {
  try {
    const { email, password, name, farmName } = req.body;
    const existingUser = await Farmer.findOne({ email });
    
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const farmer = new Farmer({
      email,
      password: hashedPassword,
      name,
      farmName
    });

    const savedFarmer = await farmer.save();
    const token = jwt.sign({ id: savedFarmer._id }, process.env.JWT_SECRET);
    
    res.json({ 
      message: 'User created successfully',
      token,
      user: {
        id: savedFarmer._id,
        email: savedFarmer.email,
        name: savedFarmer.name,
        farmName: savedFarmer.farmName
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
};

export const loginFarmer = async (req, res) => {
  try {
    const { email, password } = req.body;
    const farmer = await Farmer.findOne({ email });
    
    if (!farmer) {
      return res.status(400).json({ error: 'Email not found' });
    }

    const validPassword = await bcrypt.compare(password, farmer.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ id: farmer._id }, process.env.JWT_SECRET);
    res.json({ 
      token,
      user: {
        id: farmer._id,
        email: farmer.email,
        name: farmer.name,
        farmName: farmer.farmName
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
};

export const getFarmerProfile = async (req, res) => {
  try {
    const farmer = await Farmer.findById(req.user.id).select('-password');
    if (!farmer) {
      return res.status(404).json({ error: 'Farmer not found' });
    }
    res.json(farmer);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching profile' });
  }
};

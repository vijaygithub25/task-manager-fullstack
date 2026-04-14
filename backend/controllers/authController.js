const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

    const hashedPassword = await bcrypt.hash(password, 10);
    // Passing name if we decide to add it later, but User schema currently only has email, password, role.
    const user = await User.create({ email, password: hashedPassword, role });
    
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
    res.status(201).json({ 
      token, 
      user: { id: user._id, email: user.email, role: user.role, name: req.body.name || 'User' } 
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(400).json({ message: error.message || 'User registration failed, email might be in use' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
    res.json({ 
      token, 
      user: { id: user._id, email: user.email, role: user.role } 
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: error.message });
  }
};

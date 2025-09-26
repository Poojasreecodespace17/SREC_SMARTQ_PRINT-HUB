const express = require('express');
const { loginUser, registerUser, verifyToken } = require('../controllers/authController');

// Create Express router
const router = express.Router();

// POST /login - User login route
router.post('/login', loginUser);

// POST /register - User registration route (bonus)
router.post('/register', registerUser);

// GET /verify - Token verification route (bonus)
router.get('/verify', verifyToken, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Token is valid',
    user: {
      id: req.user.id,
      email: req.user.email,
      role: req.user.role
    }
  });
});

// GET /profile - Get user profile (protected route example)
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const { supabase } = require('../supabaseClient');
    
    // Get user details from database
    const { data: user, error } = await supabase
      .from('users')
      .select('id, name, email, role, created_at')
      .eq('id', req.user.id)
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch user profile'
      });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Profile retrieved successfully',
      user
    });

  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching profile'
    });
  }
});

module.exports = router;
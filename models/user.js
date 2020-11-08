const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    full_name: {
      type: String,
      required: true,
      trim: true
    },
    display_name: {
        type: String,
        required: true,
        trim: true
    },
    gender : {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
      type: Number,
      minlength: 10,
      maxlength: 10
    },
    email: {
      required: true,
      type: String,
      unique: true,
      trim: true,
      validate(value){
        if (!validator.isEmail(value)) {
            throw new Error('Email is invalid')
        }
    }
    },
    password: {
      required: true,
      type: String,
      trim: true,
      minlength: 7
    },
    otp: {
      code: {
        type: String,
        required: true,
        trim: true
      },
      validity: {
        type: Date,
        default: new Date(Date.now() + 15 * 60 * 1000)
      }
    },
    verified: {
      type: Boolean,
      default: false
    }
  }); 

  // Match otp entered by the user with otp stored in the database
userSchema.methods.matchOtp = function (enteredOtp) {
  if (enteredOtp !== this.otp.code) {
    return false;
  }
  return true;
};

// Encrypt password using bcrypt
userSchema.pre('save', async function(next) {
  // Check if the password is modified or not, if it is not then move along, don't perform the hashing stuff
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

  // Sign JWT and return
userSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWTTOKEN);
};

  const User = mongoose.model('users', userSchema);
  module.exports = User; 
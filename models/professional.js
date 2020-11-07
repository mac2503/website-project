const mongoose = require('mongoose');
const validator = require('validator')

const professionalSchema = new mongoose.Schema({
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
    gender: {
        type: String,
        required: true,
        trim: true
    },
    education: {
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

  const Professional = mongoose.model('professionals', professionalSchema);
  module.exports = Professional;
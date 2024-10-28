const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
        unique: true,
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v); // Ensure phone number is exactly 10 digits
            },
            message: props => `${props.value} is not a valid 10-digit phone number!`
        }
    },
    password: {
        type: String,
        required: true,
    },
    type: {
        type: Number,
        enum: [0, 1, 2], // 0 = Admin, 1 = Property Owner, 2 = Customer
        required: true,
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt timestamps
});

module.exports = mongoose.model('User', userSchema);

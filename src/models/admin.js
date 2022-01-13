const mongoose = require('mongoose');
require("dotenv").config();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
    email: String,
    password: String,
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }] 
})

adminSchema.methods.generateAuthToken = async function (req, res) {
    const admin = this;
    const token = jwt.sign({ _id: admin._id.toString()}, process.env.JWT_KEY)
    admin.tokens = admin.tokens.concat({ token});

    await admin.save();

    return token
}

adminSchema.statics.findByCredentials = async function (email , password)  {
    const admin = await adminModel.findOne({ email })

    if(!admin) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, admin.password)

    if(!isMatch) {
        throw new Error('Unable to login')

    }

    return admin
}

adminSchema.pre('save', async function (next)  {
    const admin = this;

    if(admin.isModified('password')) {
        admin.password = await bcrypt.hash(admin.password, 8)
    }

    next()
})


const adminModel = mongoose.model('admin', adminSchema);



module.exports = adminModel;
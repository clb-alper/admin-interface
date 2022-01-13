const Admin = require('../models/admin');
const db = require('../db/mongoose')
const createAdmin = async () => {
    const admin = new Admin({
        email: process.env.adminMail,
        password: process.env.adminPassword
    });


    await admin.save((res) => {
        console.log(res)
    });

}

module.exports = createAdmin;
const jwt = require('jsonwebtoken')
const Admin = require('../models/admin')


const auth = async (req, res, next) => {
    try {
        const token = req.cookies["auth_token"];
        const decoded = jwt.verify(token, process.env.JWT_KEY)
            const admin = await Admin.findOne({ _id: decoded._id, 'tokens.token': token })
    
            if (!admin) {
                throw new Error()
            }
    
            req.token = token
            req.admin = admin
            next()
       
    }catch(e) {
        res.send('Please authenticate');
    }
        
}

module.exports = auth
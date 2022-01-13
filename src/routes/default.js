let router = require('express').Router();
const Admin = require('../models/admin');
const Entry = require('../models/entry');

const db = require('../db/mongoose')
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
    console.log('here')
    res.render('a');


})

router.post('/', async (req,res) => {
        console.log('heress', req.body)
    
        const admin = await Admin.findByCredentials(req.body.email, req.body.password);
        const token = await admin.generateAuthToken()
        res.cookie('auth_token', token)
        console.log('admin found', admin)
        res.redirect('/entries')
   
});

router.get('/entries', auth, async(req,res) => {
    const entries = await Entry.find({}).exec();

    res.render('datatable', {entries: entries.reverse()})
})

router.post('/logout', auth, async(req,res) => {
    try {
        req.admin.tokens = []
        await req.admin.save()
        res.render('a')
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router;
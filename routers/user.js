const express = require('express')
const models = require('../models')
const router = express.Router()

router.post('/user',async(req,res)=>{
try {
    const user = await models.User.create({...req.body})
   return res.status(201).send(user)
} catch (e) {
    res.status(401).send()
}
})


module.exports = router
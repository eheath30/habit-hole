// const express = require('express');
// const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Habit = require('../models/habit');

/*router.post('/register', async (req, res) => {
        try {
            const hashed = await bcrypt.hash(req.body.password, 10);
            await User.create({...req.body, password: hashed})
            await Habit.create(req.body.username)
            res.status(201).json({msg: 'User created'})
        } catch (err) {
            res.status(500).json({err});
        }
    })*/

async function registerUser (req, res) {
    try {
        const hashed = await bcrypt.hash(req.body.password, 10);
        await User.create({...req.body, password: hashed})
        await Habit.create(req.body.username)
        res.status(201).json({msg: 'User created'})
    } catch (err) {
        res.status(500).json({err});
    }
}

/*router.post('/login', async (req, res) => {
    try {
        const user = await User.findByUsername(req.body.username)
        if(!user){ throw new Error('No user with this username') }
        const authed = await bcrypt.compare(req.body.password, user.passwordDigest)
        if (!!authed){
            // console.log(user);
            const payload = {username: user.username}
            const sendToken = ( err, token ) => {
                if (err) { throw new Error('Error in token generation')}
                res.status(200).json({
                    success: true,
                    token: token
                })
            }
            jwt.sign(payload, process.env.SECRET, {expiresIn:60 * 60}, sendToken)
        } else {
            throw new Error('User could not be authenticated')
        }
    } catch (err) {
        res.status(401).json({ err: err.message });
    }
})*/

async function loginUser (req, res) {
    try {
        const user = await User.findByUsername(req.body.username)
        if(!user){ throw new Error('No user with this username') }
        const authed = await bcrypt.compare(req.body.password, user.passwordDigest)
        if (!!authed){
            // console.log(user);
            const payload = {username: user.username}
            const sendToken = ( err, token ) => {
                if (err) { throw new Error('Error in token generation')}
                res.status(200).json({
                    success: true,
                    token: token
                })
            }
            jwt.sign(payload, process.env.SECRET, {expiresIn:60 * 60}, sendToken)
        } else {
            throw new Error('User could not be authenticated')
        }
    } catch (err) {
        res.status(401).json({ err: err.message });
    }
}

module.exports = {
    registerUser,
    loginUser
}

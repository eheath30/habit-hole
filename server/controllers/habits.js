const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken")

const Habit = require('../models/habit');

function verifyToken(req, res, next) {
    const token = req.headers["authorization"];
    if (token) {
        jwt.verify(token, process.env.SECRET, async (err, data) => {
            if (err) {
                res.status(403).json({err: "invalid token"})
            } else {
                next()
            }
        })
    } else {
        res.status(403).json({err: "missing token"})
    }
}

router.get('/', async (req, res) => {
    try {
        const posts = await Habit.all
        res.json(posts)
    } catch (err) {
        res.status(500).send({ err })
    }
})

// router.get('/', verifyToken, async (req, res) => {
//     try {
//         const posts = await Post.all
//         res.json(posts)
//     } catch (err) {
//         res.status(500).send({ err })
//     }
// })

module.exports = router

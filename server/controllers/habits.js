// const express = require('express');
// const router = express.Router();
const jwt = require("jsonwebtoken")

const Habit = require('../models/habit');

/*function verifyToken(req, res, next) {
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
}*/

// router.get('/', async (req, res) => {
//     try {
//         const posts = await Habit.all
//         res.json(posts)
//     } catch (err) {
//         res.status(500).send({ err })
//     }
// })

async function index (req, res) {
    try {
        const posts = await Habit.all
        res.status(200).json(posts)
    } catch (err) {
        res.status(500).send({ err })
    }
}

// router.post('/fetchUsername', async (req, res) => {
//     try {
//         const user = await Habit.findByUsername(req.body.username)
//         res.json(user);
//     } catch (err) {
//         res.status(401).json({ err: err.message });
//     }
// })

async function fetchUsername (req, res) {
    try {
        const user = await Habit.findByUsername(req.body.username)
        res.status(200).json(user);
    } catch (err) {
        res.status(401).json({ err: err.message });
    }
}

// router.post('/updateSleepTarget', async (req, res) => {
//     try {
//         const user = await Habit.updateSleepTarget(req.body.username, req.body.sleeptarget)
//         res.json(user);
//     } catch (err) {
//         res.status(401).json({ err: err.message });
//     }
// })

async function sleepTarget (req, res) {
    try {
        const user = await Habit.updateSleepTarget(req.body.username, req.body.sleeptarget)
        res.status(200).json(user);
    } catch (err) {
        res.status(401).json({ err: err.message });
    }
}



/*router.post('/updateSleepTime', async (req, res) => {
    try {
        console.log(req.body)
        const user = await Habit.updateSleepTime(req.body.username, req.body.sleephour, req.body.sleepday)
        res.json(user);
    } catch (err) {
        res.status(401).json({ err: err.message });
    }
})*/

async function sleepTime (req, res) {
    try {
        console.log(req.body)
        const user = await Habit.updateSleepTime(req.body.username, req.body.sleephour, req.body.sleepday)
        res.status(200).json(user);
    } catch (err) {
        res.status(401).json({ err: err.message });
    }
}

// router.get('/', verifyToken, async (req, res) => {
//     try {
//         const posts = await Post.all
//         res.json(posts)
//     } catch (err) {
//         res.status(500).send({ err })
//     }
// })

module.exports = {
    index,
    fetchUsername,
    sleepTime,
    sleepTarget
}

const db = require('../dbConfig');

const User = require('./user');

class Habit {
    constructor(data) {
        this.username = data.username
        this.sleeptarget = data.sleeptarget
        this.sleepdate = data.sleepdate
        this.sleephours = data.sleephours
    }

    static get all() {
        return new Promise(async (res, rej) => {
            try {
                let result = await db.query(`SELECT habits.*, users.username as username
                                                    FROM habits
                                                    JOIN users ON habits.userid = users.id;`);
                let habits = result.rows.map(r => new Habit(r))
                res(habits)
            } catch (err) {
                rej(`Error retrieving posts: ${err}`)
            }
        })
    }

    static findByUsername(username) {
        return new Promise(async (res, rej) => {
            try {
                //const username = await res.body;
                console.log(username);
                let result = await db.query(`SELECT habits.*, users.username as     username
                                                FROM habits
                                                JOIN users ON habits.userid = users.id
                                                WHERE username = $1;`, [username]);
                let user = new User(result.rows[0])
                res(user)
            } catch (err) {
                rej(`Error retrieving user: ${err.message}`)
            }
        })
    }

    /*static create(username, sleeptarget, sleepdate, sleephours){
        return new Promise (async (resolve, reject) => {
            try {
                let user = await User.findByUsername(username);
                let habitData = await db.query(`INSERT INTO habits (username, sleeptarget, sleepdate, sleephours) VALUES ($1, $2, $3, $4) RETURNING *;`, [ user.id, sleeptarget, sleepdate, sleephours ]);
                let newHabit = new Habit(habitData.rows[0]);
                resolve (newHabit);
            } catch (err) {
                reject('Error creating habit');
            }
        });
    }*/

    /*update() {
        return new Promise (async (resolve, reject) => {
            try {
                let updatedHabitData = await db.query(`UPDATE habits SET age = age + 1 WHERE userid = $1 RETURNING *;`, [ this.id ]);
                let updatedDog = new Dog(updatedDogData.rows[0]);
                resolve (updatedDog);
            } catch (err) {
                reject('Error updating dog');
            }
        });
    }*/
}

module.exports = Habit

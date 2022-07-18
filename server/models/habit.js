const db = require('../dbConfig');

class Habit {
    constructor(data) {
        this.username = data.username
        this.sleeptarget = data.sleeptarget
        this.sleepdate = data.sleepdate
        this.sleephours = data.sleephours
    }

    static get all(){
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
}

module.exports = Habit

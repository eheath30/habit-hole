const Habit = require('../../../models/habit');
const User = require('../../../models/user');

jest.mock('../../../models/user');

const pg = require('pg');
jest.mock('pg');

const db = require('../../../dbConfig/init');

describe('Habit', () => {
    beforeEach(() => jest.clearAllMocks())
    
    afterAll(() => jest.resetAllMocks())

    describe('all', () => {
        test('it resolves with habits on successful db query', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [{}, {}, {}]});
            const all = await Habit.all;
            expect(all).toHaveLength(3)
        })
    });

    
    describe('findByUsername', () => {
        test('it resolves with habit on successful db query', async () => {
            let userData = { id: 1, passwordDigest: "password", username: 'New User' }
            let habitData = { userid: userData.id, sleeptarget: 8, sleepdate: ["2022-07-12","2022-07-13,2022-07-14"], sleephours: [8,3]}
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ habitData] });
            const result = await Habit.findByUsername('New User')
            expect(result).toBeInstanceOf(Habit)
        })
    });

    /*describe('create', () => {
        test('it resolves with habit on successful db query', async () => {
            let habitData = { userid: userData.id, sleeptarget: 8, sleepdate: ["2022-07-12","2022-07-13,2022-07-14"], sleephours: [8,3] }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ { ...habitData, id: 1 }] });
            jest.spyOn(User, 'findByUsername')
                .mockResolvedValueOnce(new User({id: 1, name: 'Test Author'}));
            const result = await Book.create(habitData);
            expect(result).toHaveProperty('id')
        })
    });*/

    describe('create', () => {
        test('it resolves with habit on successful db query', async () => {
            let userData = { id: 1, passwordDigest: 'password', username: "username" }
            let habitData = { userid: userData.id, sleeptarget: 8, sleepdate: ["2022-07-12","2022-07-13,2022-07-14"], sleephours: [8,3] }
            jest.spyOn(db, 'query')
            .mockResolvedValueOnce({rows: [ { ...habitData}] });
            jest.spyOn(User, 'findByUsername')
            .mockResolvedValueOnce(new User(userData));
            const result = await Habit.create(habitData);
            expect(result).toBeInstanceOf(Habit)
        })
    });

    /*describe('updateSleepTarget', () => {
        test('it resolves with habit on successful db query', async () => {
            let userData = { id: 1, passwordDigest: 'password', username: "username" }
            let habitData = { userid: 1, sleeptarget: null, sleepdate: [], sleephours: [] }
            jest.spyOn(db, 'query')
            .mockResolvedValueOnce({rows: [ {...habitData}] });
            jest.spyOn(User, 'findByUsername')
            .mockResolvedValueOnce(new User(userData));
            const result = await Habit.updateSleepTarget('username', 8);
            expect(result).toBeInstanceOf(Habit)
        })
    });*/
})

const habitsController = require('../../../controllers/habits')
const Habit = require('../../../models/habit');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn() }))
const mockRes = { status: mockStatus }

describe('habit controller', () => {
    beforeEach(() =>  jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe('index', () => {
        test('it returns habits with a 200 status code', async () => {
            jest.spyOn(Habit, 'all', 'get')
                 .mockResolvedValue(['habit1', 'habit2']);
            await habitsController.index(null, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(['habit1', 'habit2']);
        })
    });

    describe('fetchUsername', () => {
        let userData = { id: 1, passwordDigest: 'password', username: "username" }
        test('it returns a habit with a 200 status code', async () => {
            let testHabit = 
                { userid: userData.id, sleeptarget: 8, sleepdate: ["2022-07-12","2022-07-13,2022-07-14"], sleephours: [8,3] }
            jest.spyOn(Habit, 'findByUsername')
                .mockResolvedValue(new Habit(testHabit));
                
            const mockReq = { body: { username: userData.username } }
            await habitsController.fetchUsername(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(new Habit(testHabit));
        })
    });

    describe('sleepTarget', () => {
        let userData = { id: 1, passwordDigest: 'password', username: "username" }
        test('it returns a habit with a 200 status code', async () => {
            let testHabit = 
                { userid: userData.id, sleeptarget: null, sleepdate: [], sleephours: [] }
            jest.spyOn(Habit, 'updateSleepTarget')
                .mockResolvedValue(new Habit(testHabit));
                
            const mockReq = { body: { username: userData.username, sleeptarget: 8 } }
            await habitsController.sleepTarget(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(new Habit(testHabit));
        })
    });
    describe('sleepTime', () => {
        let userData = { id: 1, passwordDigest: 'password', username: "username" }
        test('it returns a habit with a 200 status code', async () => {
            let testHabit = 
                { userid: userData.id, sleeptarget: 8, sleepdate: [], sleephours: [] }
            jest.spyOn(Habit, 'updateSleepTime')
                .mockResolvedValue(new Habit(testHabit));
                
            const mockReq = { body: { username: userData.username, sleephour: 8, sleepday: "2022-07-12" } }
            await habitsController.sleepTime(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(new Habit(testHabit));
        })
    });
})



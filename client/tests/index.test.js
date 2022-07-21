const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

global.fetch = require('jest-fetch-mock')

const index = require('../static/js/index')

describe('auth test', () => {
    const event = { preventDefault: () => {} };
    describe('mode helpers', () => {
        beforeEach(() => { 
            fetch.resetMocks() 
            jest.spyOn(event, 'preventDefault');
        })
        
        describe('Page loads', () => {
            test('it makes a fetch call to api', async () => {
                await index.getAllHabits()
                expect(fetch).toHaveBeenCalled()
                // expect(fetch).toHaveBeenCalledWith("http://localhost:3000/habits")
            })
        })
    })
})

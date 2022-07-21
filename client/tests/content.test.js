const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

global.fetch = require('jest-fetch-mock')

const content = require('../static/js/content')

describe('auth test', () => {
    describe('mode helpers', () => {
        beforeEach(() => {
            document.documentElement.innerHTML = html.toString()
        })
        
        describe('Page loads', () => {
            test('renderHomepage', () => {
                content.renderHomepage()
                const h3 = document.querySelector('h3')
                expect(h3.textContent).toBe("Benefits of tracking your sleep")
            })
            test('renderLoginForm', () => {
                content.renderLoginForm()
                const h3 = document.querySelector('h3')
                expect(h3.textContent).toBe('Login')
            })
            test('renderRegisterForm', () => {
                content.renderRegisterForm()
                const h3= document.querySelector('h3')
                expect(h3.textContent).toBe('Register for a free account')
            })
            test('renderFeed', async () => {
                await content.renderFeed()
                expect(fetch).toHaveBeenCalled()
                let options = {"body": "{\"username\":null}", "headers": {"Content-Type": "application/json"}, "method": "POST"}
                expect(fetch).toHaveBeenCalledWith("http://localhost:3000/habits/fetchUsername", options)
            })
            test('renderProfile', async () => {
                await content.renderProfile()
                expect(fetch).toHaveBeenCalled()
                let options = {"body": "{\"username\":null}", "headers": {"Content-Type": "application/json"}, "method": "POST"}
                expect(fetch).toHaveBeenCalledWith("http://localhost:3000/habits/fetchUsername", options)
            })
            test('updateSleepTime', async () => {
                await content.updateSleepTime()
                expect(fetch).toHaveBeenCalled()
            })
            test('updateSleepTarget', async () => {
                await content.updateSleepTarget()
                expect(fetch).toHaveBeenCalled()
            })
            test('Dashboard', () => {
                let postData = {
                    "userid": 3,
                    "sleeptarget": null,
                    "sleepdate": [],
                    "sleephours": []
                    }
                let username = "username"
                content.Dashboard(postData, username)
                canvas = document.querySelector('#myChart')
                expect(canvas).toBeTruthy()
            })
            test('render404', () => {
                content.render404()
                let h2 = document.querySelector('h2')
                expect(h2.textContent).toBe("Oops, we can't find that page sorry!")
            })
        })
        describe('Testing renderProfile branches', () => {
            test('after', () => {
                content.after()
                h3 = document.querySelector('h3')
                expect(h3.textContent).toBe("How often do you want to track your sleep?")
            })
            test('split', () => {
                content.split()
                h3 = document.querySelector('h3')
                expect(h3.textContent).toBe("How many hours did you sleep last night?")
            })
            test('tryHarder', () => {
                content.tryHarder()
                h3 = document.querySelector('h3')
                expect(h3.textContent).toBe("You should be more mindful of your sleep time.")
            })
            test('wellDone', () => {
                content.wellDone()
                h3 = document.querySelector('h3')
                expect(h3.textContent).toBe("Well done, you are on a 5 day streak!")
            })
        })
    })
})

describe('auth test', () => {
    describe('mode helpers', () => {
        beforeEach(() => {
            document.documentElement.innerHTML = html.toString()
        })
        
        describe('Page loads', () => {
            test('Correct page loads', () => {
                body = document.querySelector('body')
                expect(body.className).toBe("bg-light")
            })
        })
    })
})

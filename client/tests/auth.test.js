const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

global.fetch = require('jest-fetch-mock')

const auth = require('../static/js/auth')

describe('auth test', () => {
    const event = { preventDefault: () => {} };
    describe('mode helpers', () => {
        beforeEach(() => { 
            fetch.resetMocks() 
            jest.spyOn(event, 'preventDefault');
        })
        
        describe('Page loads', () => {
            test('it makes a fetch call to api', async () => {
                await auth.requestLogin(event)
                expect(fetch).toHaveBeenCalled()
                let options = {"body": "\"test\"", "headers": {"Content-Type": "application/json"}, "method": "POST"}
                expect(fetch).toHaveBeenCalledWith("http://localhost:3000/auth/login", options)
            })
            test('it makes a fetch call to api', async () => {
                await auth.requestRegistration(event)
                expect(fetch).toHaveBeenCalled()
                let options = {"body": "{}", "headers": {"Content-Type": "application/json"}, "method": "POST"}
                expect(fetch).toHaveBeenCalledWith("http://localhost:3000/auth/register", options)
            })
            test('login',() => {
                data = {
                    "success": true,
                    "token": "{username: 'username'}"
                }
                auth.login(data)
                expect(window.location.hash).toBe('#profile')
            })
            test('logout',() => {
                auth.logout()
                expect(window.location.hash).toBe('#login')
            })
            test('logout',() => {
                username = auth.currentUser()
                expect(username).toBe(null)
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

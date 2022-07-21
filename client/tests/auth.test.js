const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

global.fetch = require('jest-fetch-mock')

const auth = require('../static/js/auth')



// describe('auth test', () => {
//     const event = { preventDefault: () => {} };
//     describe('mode helpers', () => {
//         // beforeEach(() => {
//         //     document.documentElement.innerHTML = html.toString()
//         // })
//         beforeEach(() => { 
//             fetch.resetMocks() 
//             jest.spyOn(event, 'preventDefault');
//         })
        
//         describe('Page loads', () => {
//             test('it makes a fetch call to api', async () => {
//                 await auth.requestLogin()
//                 expect(fetch).toHaveBeenCalledWith("http://localhost:3000/auth/login")
//             })
//         })
//     })
// })

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

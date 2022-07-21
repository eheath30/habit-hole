const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

global.fetch = require('jest-fetch-mock')

// const layout = require('../static/js/layout')

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

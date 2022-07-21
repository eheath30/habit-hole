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
            test('Correct page loads', () => {
                content.renderHomepage()
                const main = document.querySelector('main')
                console.log(main.childNodes)
                expect(main.child).toContain("div")
            })
        })
    })
})

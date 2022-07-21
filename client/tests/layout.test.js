const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

global.fetch = require('jest-fetch-mock')

const layout = require('../static/js/layout')
const content = require('../static/js/content')

describe('auth test', () => {
    describe('mode helpers', () => {
        beforeEach(() => {
            document.documentElement.innerHTML = html.toString()
        })
        
        describe('Page loads', () => {
            test('Correct page loads', () => {
                layout.updateNav()
                // logoutBtn = document.querySelector('#logoutBtn')
                expect(layout.updateNav()).toBeTruthy()
            })
            test('Correct page loads', () => {
                let route = '#dashboard'
                let result = layout.createNavLink(route)
                // logoutBtn = document.querySelector('#logoutBtn')
                expect(result.textContent).toBe('Dashboard')
            })
            test('Correct page loads', () => {
                layout.updateContent()
                // logoutBtn = document.querySelector('#logoutBtn')
                expect(window.location.hash).toBe('')
            })
        })
    })
})

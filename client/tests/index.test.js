
const renderDom = require('./helpers')

let dom
let document

describe('index.html', () => {
    beforeEach( async () => {
        dom - await renderDom('index.html');
        document = await dom.window.document;
    })

    test('it has a header title', () => {
    let header = document.querySelector('header');
    expect(header.textContent).toContain('Javascript in the Browser');
    })

    })

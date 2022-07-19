function renderHomepage(){
    const homepage = document.createElement('div');
    homepage.setAttribute('class', 'px-3');
    const h1 = document.createElement('h1');
    h1.textContent = 'Habit Hole';
    const description = document.createElement('p');
    description.setAttribute('class', 'lead');
    description.textContent = 'A smart sleep tracker';
    const P = document.createElement('P');
    P.innerHTML = `<i class="fa-solid fa-bed"></i>`
    description.appendChild(P);
    const loginarea = document.createElement('p');
    loginarea.setAttribute('class', 'lead');
    const registerBtn = document.createElement('a');
    registerBtn.setAttribute('href', 'register')
    registerBtn.setAttribute('class', 'lead');
    loginarea.appendChild(registerBtn);
    homepage.appendChild(h1);
    homepage.appendChild(description);
    homepage.appendChild(loginarea);
main.appendChild(homepage);
}

function renderLoginForm() {
    const fields = [
        { tag: 'input', attributes: { type: 'text', name: 'username', placeholder: 'Username' } },
        { tag: 'input', attributes: { type: 'password', name: 'password', placeholder: 'Password' } },
        { tag: 'input', attributes: { type: 'submit', value: 'Login' } }
    ]
    const form = document.createElement('form');
    fields.forEach(f => {
        let field = document.createElement(f.tag);
        Object.entries(f.attributes).forEach(([a, v]) => {
            field.setAttribute(a, v);
            form.appendChild(field);
        })
    })
    form.addEventListener('submit', requestLogin)
    main.appendChild(form);
}

function renderRegisterForm() {
    const fields = [
        { tag: 'input', attributes: { type: 'text', name: 'username', placeholder: 'Username' } },
        { tag: 'input', attributes: { type: 'password', name: 'password', placeholder: 'Password' } },
        { tag: 'input', attributes: { type: 'password', name: 'passwordConfirmation', placeholder: 'Confirm Password' } },
        { tag: 'input', attributes: { type: 'submit', value: 'Create Account' } }
    ]
    const form = document.createElement('form');
    fields.forEach(f => {
        let field = document.createElement(f.tag);
        Object.entries(f.attributes).forEach(([a, v]) => {
            field.setAttribute(a, v);
            form.appendChild(field);
        })
    })
    form.addEventListener('submit', requestRegistration)
    main.appendChild(form);
}

async function renderFeed() {
    const feed = document.createElement('section');
    feed.id = 'feed';
    username = localStorage.getItem('username');
    const usernameForm = { 'username': username };
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( usernameForm )
        }

        const r = await fetch(`http://localhost:3000/habits`, options)
        const postData = await r.json()
        console.log(r)
        // console.log(postData)
        const post = document.createElement('div');
        post.className = 'post';
        const user = document.createElement('h3');
        const body = document.createElement('p');
        user.textContent = postData.username;
        body.textContent = postData.sleeptarget;
        post.appendChild(user);
        post.appendChild(body);
        feed.appendChild(post);
        main.appendChild(feed);
    } catch (err) {
        console.warn(`Error: ${err}`);
    }
}

function renderProfile() {
    const profile = document.createElement('section');
    const greeting = document.createElement('h3');
    greeting.textContent = `Hi there, ${localStorage.getItem('username')}!`
    profile.appendChild(greeting);
    main.appendChild(profile);
}

function render404() {
    const error = document.createElement('h2');
    error.textContent = "Oops, we can't find that page sorry!";
    main.appendChild(error);
}

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
    let username = localStorage.getItem('username');
    let usernameForm = { 'username': username };
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( usernameForm )
        }
        const r = await fetch(`http://localhost:3000/habits/fetchUsername`, options)
        const postData = await r.json()
        // const post = document.createElement('div');
        // post.className = 'post';
        // const user = document.createElement('h3');
        // const body = document.createElement('p');
        // user.textContent = postData.username;
        // body.textContent = postData.sleeptarget;
        // post.appendChild(user);
        // post.appendChild(body);
        // feed.appendChild(post);
        // main.appendChild(feed);

        Dashboard(postData)

    } catch (err) {
        console.warn(`Error: ${err}`);
    }
}

async function renderProfile() {
    const profile = document.createElement('section');
    const greeting = document.createElement('h3');
    greeting.textContent = `Hi there, ${localStorage.getItem('username')}!`
    profile.appendChild(greeting);
    main.appendChild(profile);

    let username = localStorage.getItem('username');
    let usernameForm = { 'username': username };
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( usernameForm )
        }
        const r = await fetch(`http://localhost:3000/habits/fetchUsername`, options)
        const postData = await r.json()
        if (postData.sleeptarget == null){
            const form = document.createElement('form')
            const howManyHours = document.createElement('h3')
            howManyHours.textContent = "How many hours do you want to sleep per night?"

            const inputSleepTarget = document.createElement('input')
            inputSleepTarget.type = "number"
            inputSleepTarget.id = "sleeptarget"
            inputSleepTarget.placeholder = "Enter an integer between 1-16"
            inputSleepTarget.min = 1
            inputSleepTarget.max = 16

            const button = document.createElement('button')
            button.textContent = "Submit"

            form.appendChild(howManyHours)
            form.appendChild(inputSleepTarget)
            form.appendChild(button)
            profile.appendChild(form)
            form.addEventListener('submit', updateSleepTarget)

        } else {
            let today = new Date();
            today.setHours( today.getHours() + 1 );
            today = today.toISOString();
            let latestIndex = postData.sleepdate.length
            let latestDate = postData.sleepdate[latestIndex-1]
            if (latestDate != undefined){latestDate = latestDate.split('T')[0]}
            
            if(today.split('T')[0] != latestDate){
                const form = document.createElement('form')
                const howManyHours = document.createElement('h3')
                howManyHours.textContent = "How many hours did you sleep last night?"

                const inputSleepTarget = document.createElement('input')
                inputSleepTarget.type = "number"
                inputSleepTarget.id = "sleephour"
                inputSleepTarget.placeholder = "Enter an integer between 0-20"
                inputSleepTarget.min = 0
                inputSleepTarget.max = 20
                
                const button = document.createElement('button')
                button.textContent = "Submit"

                form.appendChild(howManyHours)
                form.appendChild(inputSleepTarget)
                form.appendChild(button)
                profile.appendChild(form)
                form.addEventListener('submit', updateSleepTime)
            }
        }
    } catch (err) {
        console.warn(`Error: ${err}`);
    }
}

async function updateSleepTime(){
    let today = new Date();
    today.setHours( today.getHours() + 1 );
    today = today.toISOString();
    let username = localStorage.getItem('username');
    sleephour = document.getElementById("sleephour").value
    let usernameForm = { 'username': username, 'sleephour': sleephour, 'sleepday': today };
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( usernameForm )
        }
        const r = await fetch(`http://localhost:3000/habits/updateSleepTime`, options)
        window.location.reload()
    } catch (err) {
        console.warn(`Error: ${err}`);
    }
}


async function updateSleepTarget(){
    let username = localStorage.getItem('username');
    sleeptarget = document.getElementById("sleeptarget").value
    let usernameForm = { 'username': username, 'sleeptarget': sleeptarget };
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( usernameForm )
        }
        const r = await fetch(`http://localhost:3000/habits/updateSleepTarget`, options)
        window.location.reload()
    } catch (err) {
        console.warn(`Error: ${err}`);
    }

}


function Dashboard(postData) {
    console.log(postData);
    let canvas = document.createElement('canvas');
    canvas.width = "400";
    canvas.height = "300";
    canvas.id = "myChart"
    main.appendChild(canvas)

    const ctx = document.getElementById('myChart').getContext('2d');

    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [...postData.sleepdate],
            datasets: [{
                label: '# of hours sleep',
                data: [...postData.sleephours],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });



}






function render404() {
    const error = document.createElement('h2');
    error.textContent = "Oops, we can't find that page sorry!";
    main.appendChild(error);
}

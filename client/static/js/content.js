function renderHomepage(){
    const homepage = document.createElement('div');
    homepage.innerHTML = `<div class="p-4 p-md-5 mb-4 text-white rounded bg-dark">
    <div class="col-md-6 px-0">
      <h1 class="display-4 fst-italic">Title of a longer featured blog post</h1>
      <p class="lead my-3">Multiple lines of text that form the lede, informing new readers quickly and efficiently about what’s most interesting in this post’s contents.</p>
      <p class="lead mb-0"><a href="#" class="text-white fw-bold">Continue reading...</a></p>
    </div>
  </div>

  <div class="row mb-2">
    <div class="col-md-6">
      <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        <div class="col p-4 d-flex flex-column position-static">
          <strong class="d-inline-block mb-2 text-primary">World</strong>
          <h3 class="mb-0">Featured post</h3>
          <div class="mb-1 text-muted">Nov 12</div>
          <p class="card-text mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
          <a href="#" class="stretched-link">Continue reading</a>
        </div>
        <div class="col-auto d-none d-lg-block">
          <svg class="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>

        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        <div class="col p-4 d-flex flex-column position-static">
          <strong class="d-inline-block mb-2 text-success">Design</strong>
          <h3 class="mb-0">Post title</h3>
          <div class="mb-1 text-muted">Nov 11</div>
          <p class="mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
          <a href="#" class="stretched-link">Continue reading</a>
        </div>
        <div class="col-auto d-none d-lg-block">
          <svg class="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>

        </div>
      </div>
    </div>
  </div>`;
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

        Dashboard(postData, username)

    } catch (err) {
        console.warn(`Error: ${err}`);
    }
}

async function renderProfile() {
    const profile = document.createElement('section');
    const greeting = document.createElement('h3');
    let name = `${localStorage.getItem('username')}`
    const capitalisedName = name.charAt(0).toUpperCase() + name.slice(1);
    greeting.textContent = `Hi there, ${capitalisedName}!`
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

            const howOftenText = document.createElement('h3')
            howOftenText.textContent = "How often do you want to track your sleep?"


            const howOfteninput = document.createElement('select')

            const dailyChoice = document.createElement('option')
            dailyChoice.textContent = "Daily"

            howOfteninput.appendChild(dailyChoice)
            profile.appendChild(howOftenText)
            profile.appendChild(howOfteninput)



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

                const howOften = document.createElement('h3')
                howOften.textContent = "How often would you like to track you?"

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
            } else{

                let streak = 0
                // let compare1 = new Date(postData.sleepdate[6].split('T')[0])
                // let compare2 = new Date(postData.sleepdate[5].split('T')[0])
                for (i = 0; i<postData.sleephours.length; i++){
                    if (postData.sleephours[i]>=postData.sleeptarget){
                        streak = streak + 1
                    } else if (postData.sleephours[i]<postData.sleeptarget) {
                        streak = 0
                    }
                }

                if (streak == 0) {
                    const tryHarder = document.createElement('h3')
                    tryHarder.textContent = `You should be more mindful of your sleep time`
                    const zeroStreak = document.createElement('h3')
                    zeroStreak.textContent = `you currently have a 0 day hot-streak.`
                    profile.appendChild(tryHarder)
                    profile.appendChild(zeroStreak)
                }
                else {
                    const WellDone = document.createElement('h3')
                    WellDone.textContent = `Well done, you are on a ${streak} day streak!`
                    award = document.createElement('img')
                    award.src = './static/images/example-award.png';
                    award.setAttribute('alt', 'award')
                    award.setAttribute('class', 'award')
                    profile.appendChild(WellDone)
                    profile.appendChild(award)
                }


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


function Dashboard(postData, username) {
    console.log(postData);
    let canvas = document.createElement('canvas');
    canvas.id = "myChart"
    canvas.setAttribute('aria-label', 'My Line Chart')
    canvas.setAttribute('role', 'canvas')
    let altText = document.createElement('span')
    altText.textContent = 'Line Chart mapping sleep data'
    canvas.appendChild(altText);

    let bootstrapdashboard = document.createElement('section')
    bootstrapdashboard.innerHTML =`
    <section class="container mx-auto">
    <div class="jumbotron p-3 p-md-5 text-white rounded">
  </div>
  </section>
  `
let title = document.createElement('h2')
let name = username
const capitalisedName = name.charAt(0).toUpperCase() + name.slice(1);
title.textContent = `${capitalisedName}'s historical sleep data`
title.setAttribute('class', 'my-4')
  main.appendChild(title)
    main.appendChild(bootstrapdashboard)


    document.getElementsByClassName("jumbotron")[0].appendChild(canvas)
    const ctx = document.getElementById('myChart').getContext('2d');
    let dateArray=[]
    for (i = 0; i<postData.sleepdate.length; i++){
        dateArray.push(postData.sleepdate[i].split('T')[0])
    }
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [...dateArray],
            datasets: [{
                label: 'number of hours sleep',
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
                tension: 0.3,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
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

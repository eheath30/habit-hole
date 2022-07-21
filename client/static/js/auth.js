async function requestLogin(e){
    // e.preventDefault();
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
        }
        const r = await fetch(`http://localhost:3000/auth/login`, options)
        const data = await r.json()
        if (data.err){ throw Error(data.err); }
        login(data);
    } catch (err) {
        alert("Wrong username or password"); window.location.reload(); throw Error(data.err);
    }
}

async function requestRegistration(e) {
    e.preventDefault();
    try {
        if (document.getElementById('password2').value === document.getElementById('password').value) {
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
            }
            const r = await fetch(`http://localhost:3000/auth/register`, options)
            const data = await r.json()
            if (data.err){
                if(data.err == "Error creating user: value too long for type character varying(16)") {
                    alert('Username is too long')
                }
                if(data.err == `Error creating user: duplicate key value violates unique constraint "users_username_key"`) {
                    alert('Username already exists')
                }
                 window.location.reload(); throw Error(data.err);}
            requestLogin(e);
        } else {
            alert('Password Must be Matching.');
            window.location.reload();
        }

    } catch (err) {
        console.warn(err);
    }
}

function login(data){
    const payload = jwt_decode(data.token);;
    localStorage.setItem('token', data.token);
    localStorage.setItem('username', payload.username);
    location.hash = '#profile';
}

function logout(){
    localStorage.clear();
    location.hash = '#login';
}

function currentUser(){
    const username = localStorage.getItem('username')
    return username;
}

module.exports = {requestLogin, requestRegistration, login, logout, currentUser}

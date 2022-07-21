(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
async function requestLogin(e){
    e.preventDefault();
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
            console.log(data.err)
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

},{}]},{},[1]);

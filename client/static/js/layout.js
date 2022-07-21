const publicRoutes = ['#', '#login', '#register'];
const privateRoutes = ['#dashboard', '#profile'];

window.addEventListener('hashchange', updateContent);

function updateNav(){
    let nav = document.querySelector('nav')
    return nav
    let links;
    let logoutBtn;
    links = privateRoutes.map(createNavLink);
    logoutBtn = document.createElement('a');
    logoutBtn.textContent = 'Logout';
    logoutBtn.id = 'logoutBtn'
    logoutBtn.setAttribute('class', 'nav-link text-light')
    // nav.appendChild(logoutBtn);
    // links.forEach(l => nav.insertBefore(l, logoutBtn))
}

function updateMain(path) {
    let main = document.querySelector('main')
    // main.innerHTML = '';
    if (path) {
        switch(path){
            case '#login':
                renderLoginForm(); break;
            case '#register':
                renderRegisterForm(); break;
            case '#dashboard':
                renderFeed(); break;
            case '#profile':
                renderProfile(); break;
            default:
                render404(); break;
        }
    } else {
        // renderHomepage();
    }
}

function createNavLink(route){
    const link = document.createElement('a');
    link.setAttribute('class', 'nav-link text-light');
    link.textContent = route === '#' ? 'Home' : `${route[1].toUpperCase()}${route.substring(2)}`;
    link.href = route;
    return link;
}

function updateContent(){
    const path = window.location.hash;
    // if (privateRoutes.includes(path) && !currentUser()){
        window.location.hash = '#';
    // } else {
        updateNav();
        updateMain(path);
    // }
}

updateContent();

module.exports = {updateNav, updateMain, createNavLink, updateContent}

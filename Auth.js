class Auth {
    static isLoggedIn = false;
    static favBtn = document.getElementById('favBtn');
    static signBtn = document.getElementById('signBtn')

    static getUser() {
        return new Promise((resolve, reject) =>
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    Auth.favBtn.classList.remove('d-none')
                    Auth.signBtn.innerHTML = '  <a class="nav-link" href="#">sign out</a>'
                    Auth.isLoggedIn = true;
                    return resolve(user);
                } else {
                    Auth.signBtn.innerHTML = '  <a class="nav-link" href="#">sign in/up</a>'
                    Auth.isLoggedIn = false;
                    return resolve(null);
                }
            })
        );
    }

    static async directToFirebase() {
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await firebase.auth().signInWithPopup(provider);
        return result;
    }

    static signOut() {
        firebase.auth().signOut()
            .then(() => {
                Auth.favBtn.classList.add('d-none')
            })
        signOutModalInstance.open();
    }

}

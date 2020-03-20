const IMAGE_PATH = 'https://image.tmdb.org/t/p/w370_and_h556_bestv2';
const movieList = document.getElementById('movieList')
let isSigned = false;
let user1;

class MovieView {
    static renderMovie(movies, favList) {
        movieList.innerHTML = '';
        movies.forEach(movie => {
            movieList.insertAdjacentHTML('beforeend', `
            <div class="col-lg-2 col-md-3 col-sm-4 col-6 animated fadeIn mb-4">       
                <a href="#">                 
                    <div class="view overlay zoom z-depth-2 rounded-lg poster">
                    <img src=${IMAGE_PATH + movie.poster_path} class="img-fluid poster movie-item">
                    <img src="./images/heart.png" class="position-absolute img-fluid fav-btn">
                    </div>
                    <p class="text-uppercase text-center font-weight-bold text-truncate text-muted my-4">${movie.title}</p>
                </a>
            </div>
        `)
        }
        )
        MovieView.movieItem(movies)
        MovieView.handleFav(favList, movies)
    }

    static movieItem(movies) {
        const movieItem = document.getElementsByClassName('movie-item')
        for (let i = 0; i < movies.length; i++) {
            movieItem[i].addEventListener('click', () => {
                window.location = `./movie?id=${movies[i].id}`
            })
        }
    }

    static handleFav(favList, movies) {
        let favBtns = document.getElementsByClassName('fav-btn')
        let isFav = false;

        for (let i = 0; i < movies.length; i++) {
            favList.forEach(favMovie => {
                if (movies[i].id == favMovie.id) {
                    favBtns[i].src = './images/heartfull.png'
                    favBtns[i].addEventListener('click',
                        () => NetworkRequests.removeFavorite(user1, movies[i], favBtns[i]), { once: true })
                    isFav = true;
                }
            })
            if (!isFav) {
                favBtns[i].addEventListener('click',
                    () => NetworkRequests.addFavorite(user1, movies[i], favBtns[i]), { once: true })
                isFav = false
            }
        }
    }
}

async function run() {

    let favList = await getFavList()

    handleNavBtns()
    let progress = document.getElementById('progressBar')

    NetworkRequests.getMovies()
        .then(movies => {
            progress.classList.add('d-none')
            MovieView.renderMovie(movies, favList)
            MovieView.movieItem(movies)
        })

    const searchField = document.getElementById('searchField')
    searchField.addEventListener('keydown', (e) => {
        if (e.keyCode == 13) {
            console.log(searchField.value);
            progress.classList.remove('d-none')
            movieList.classList.add('d-none')
            NetworkRequests.getSearchMovie(searchField.value)
                .then(movies => {
                    progress.classList.add('d-none')
                    movieList.classList.remove('d-none')
                    MovieView.renderMovie(movies)
                    MovieView.handleFav(favList)
                })
        }
    })

    let navFavBtn = document.getElementById('favBtn')
    navFavBtn.addEventListener('click', () => { MovieView.renderMovie(favList, favList) })
}

async function getFavList() {
    let user = await Auth.getUser()
    if (user) {
        isSigned = true;
        user1 = user;
        let favs = await NetworkRequests.getFavorite(user)
        return favs;
    }
    else {
        isSigned = false;
        return [];
    }
}

function handleNavBtns() {
    let title = document.getElementById('title')
    title.addEventListener('click', () => {
        location.reload(true);
    })

    let signBtn = document.getElementById('signBtn')
    signBtn.addEventListener('click', handleSignBtn)
}

function handleSignBtn() {
    if (isSigned) {
        Auth.signOut();
        isSigned = false;
    } else {
        Auth.directToFirebase()
        isSigned = true;
    }
}

document.addEventListener("DOMContentLoaded", run);


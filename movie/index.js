const IMAGE_PATH = 'https://image.tmdb.org/t/p/w1000_and_h563_face';
const ACTOR_IMAGE_PATH = 'https://image.tmdb.org/t/p/w370_and_h556_bestv2';

class SingleMovieView {
    static renderMovie(movie) {
        let tagline = document.getElementById('tagline')
        let overview = document.getElementById('overview')
        let title = document.getElementById('title')
        let html = document.getElementsByTagName('html')
        let genresList = document.getElementById('genres')
        let time = document.getElementById('time')
        let rate = document.getElementById('rate')

        time.innerText = movie.runtime + ' mins';
        rate.innerText = movie.vote + '/10';

        html[0].style.backgroundImage = `url(${IMAGE_PATH + movie.backdrop})`
        tagline.innerText = movie.tagline;
        overview.innerText = movie.overview;
        title.innerText = movie.title

        movie.genres.forEach(genre => {
            genresList.insertAdjacentHTML('beforeend', `
                <li class="mr-2 mt-2 mb-2 list-unstyled genres-item">
                    <span class="border border-white round-border p-2 text-white">${genre.name}</span>
                </li>
        `)
        })

        let favList = JSON.parse(localStorage.getItem('favs'))
        let favBtn = document.getElementById('favBtn')

        let user = JSON.parse(
            localStorage.getItem("firebase:authUser:AIzaSyBzRF4WCIC-7pk_YZlJtfyIDRj-W-yEk3M:[DEFAULT]"));

        favList.forEach(favMovie => {
            if (favMovie.id == movie.id) {
                console.log(favMovie.title)
                favBtn.src = '../images/heartfull.png'
                favBtn.addEventListener('click',
                    () => NetworkRequests.removeFavorite(user, { id: movie.id }, favBtn, true), { once: true })
            }
        })

        favBtn.addEventListener('click',
            () => NetworkRequests.addFavorite(user, { id: movie.id, title: movie.title, poster_path: movie.poster_path }, favBtn, true), { once: true })

    }

    static renderCast(cast) {
        let castList = document.getElementById('castList')
        cast.forEach(actor => {
            castList.insertAdjacentHTML('beforeend', `
            <li class="text-center mr-4 actor list-unstyled">
                <img class="circle-border border border-white"
                    src="${ACTOR_IMAGE_PATH + actor.profile}" alt="${actor.name}">
                <p class="text-muted mt-2">${actor.name}</p>
                <p class="text-white mt-2">${actor.character}</p>
            </li>
            `)
        })
    }

    static setTrailerLink(trailerKey) {
        let playButton = document.getElementById('playButton')
        playButton.addEventListener('click', () => {
            window.open(`https://www.youtube.com/watch?v=${trailerKey}`)
        })
    }
}

function run() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    NetworkRequests.getTrailer(id)
        .then((trailerKey) => SingleMovieView.setTrailerLink(trailerKey))

    NetworkRequests.getSingleMovie(id)
        .then(movie => {
            SingleMovieView.renderMovie(movie)
        })

    NetworkRequests.getCast(id)
        .then(cast => {
            SingleMovieView.renderCast(cast)
        })




}

document.addEventListener("DOMContentLoaded", run);


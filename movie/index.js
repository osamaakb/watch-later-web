const IMAGE_PATH = 'https://image.tmdb.org/t/p/w1000_and_h563_face';

class SingleMovieView {
    static renderMovie(movie) {
        let tagline = document.getElementById('tagline')
        let overview = document.getElementById('overview')
        let title = document.getElementById('title')
        let html = document.getElementsByTagName('html')
        let genresList = document.getElementById('genres')

        html[0].style.backgroundImage = `url(${IMAGE_PATH + movie.backdrop})`
        tagline.innerText = movie.tagline;
        overview.innerText = movie.overview;
        title.innerText = movie.title
        console.log(movie.genres);

        movie.genres.forEach(genre => {
            genresList.insertAdjacentHTML('beforeend', `
        <li class="mr-2 mt-2 mb-2">
            <span class=" border border-white round-border p-2 text-white">${genre.name}</span>
         </li>
        `)
        })


    }
}

function run() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    NetworkRequests.getSingleMovie(id)
        .then(movie => {
            console.log(movie);
            SingleMovieView.renderMovie(movie)
        })

}

document.addEventListener("DOMContentLoaded", run);


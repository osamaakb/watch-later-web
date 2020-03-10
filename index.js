const BASE_URL = 'https://api.themoviedb.org/3/';
const NOW_PLAYING = 'movie/now_playing?api_key=d2fa7ad1e26af0847d349d7dbd5f93e5';
const IMAGE_PATH = 'https://image.tmdb.org/t/p/w370_and_h556_bestv2';
class NetworkRequests {
    static getMovies() {
        return fetch(BASE_URL + NOW_PLAYING)
            .then(response => response.json())
            .then(movies => {
                return movies.results.map(movie => new Movie(movie))
            })
            .catch(err => console.log(err));
    }
}


class MovieView {

    static renderMovie(movie) {
        let movieList = document.getElementById('movieList')
        console.log(IMAGE_PATH + movie.backdrop);
        movieList.insertAdjacentHTML('beforeend', `
        <div class="col-lg-2 col-md-3 col-sm-4 col-6 animated fadeIn mb-4">       
            <a class="movie-item" href="#"> 
                <div class="view overlay zoom z-depth-2 rounded-lg">
                    <img src=${IMAGE_PATH + movie.poster} class="img-fluid">
                </div>
                <p class="text-uppercase text-center font-weight-bold text-truncate text-muted my-4">${movie.title}</p>
            </a>
        </div>
        `)

    }

    static renderMovies(movies) {
        movies.forEach(movie => {
            MovieView.renderMovie(movie)
        });
    }

}




function run() {
    NetworkRequests.getMovies()
        .then(movies => MovieView.renderMovies(movies))

}

document.addEventListener("DOMContentLoaded", run);


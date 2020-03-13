
const IMAGE_PATH = 'https://image.tmdb.org/t/p/w370_and_h556_bestv2';


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

    static movieItem(movies) {
        const movieItem = document.getElementsByClassName('movie-item')
        for (let i = 0; i < movies.length; i++) {
            movieItem[i].addEventListener('click', () => {
                window.location = `./movie?id=${movies[i].id}`
            })
        }

    }

}




function run() {
    NetworkRequests.getMovies()
        .then(movies => {
            MovieView.renderMovies(movies)
            MovieView.movieItem(movies)
        })

}

document.addEventListener("DOMContentLoaded", run);



const IMAGE_PATH = 'https://image.tmdb.org/t/p/w370_and_h556_bestv2';
const movieList = document.getElementById('movieList')

class MovieView {

    static renderMovie(movies) {
        movieList.innerHTML = '';
        movies.forEach(movie => {
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
        )
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

    let progress = document.getElementById('progressBar')


    NetworkRequests.getMovies()
        .then(movies => {
            progress.classList.add('d-none')
            MovieView.renderMovie(movies)
            MovieView.movieItem(movies)
        })


    const searchButton = document.getElementById('searchButton')
    const searchField = document.getElementById('searchField')
    // some comment
    searchButton.addEventListener('click', () => {
        progress.classList.remove('d-none')
        movieList.classList.add('d-none')
        NetworkRequests.getSearchMovie(searchField.value)
            .then(movies => {
                progress.classList.add('d-none')
                movieList.classList.remove('d-none')
                MovieView.renderMovie(movies)
                MovieView.movieItem(movies)
            })
    })
}

document.addEventListener("DOMContentLoaded", run);


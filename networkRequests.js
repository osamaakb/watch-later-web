const BASE_URL = 'https://api.themoviedb.org/3/';
const NOW_PLAYING = 'movie/now_playing?api_key=d2fa7ad1e26af0847d349d7dbd5f93e5';

class NetworkRequests {
    static getMovies() {
        return fetch(BASE_URL + NOW_PLAYING)
            .then(response => response.json())
            .then(movies => {
                return movies.results.map(movie => new Movie(movie))
            })
            .catch(err => console.log(err));
    }

    static getSingleMovie(id) {
        return fetch(BASE_URL + `movie/${id}?api_key=d2fa7ad1e26af0847d349d7dbd5f93e5`)
            .then(response => response.json())
            .then(movie => new MovieDetails(movie))
            .catch(err => console.log(err))
    }
}

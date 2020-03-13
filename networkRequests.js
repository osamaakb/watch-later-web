const BASE_URL = 'https://api.themoviedb.org/3/';
const NOW_PLAYING = 'movie/now_playing?api_key=d2fa7ad1e26af0847d349d7dbd5f93e5';
const API_KEY = '?api_key=d2fa7ad1e26af0847d349d7dbd5f93e5'
'https://api.themoviedb.org/3/search/movie?api_key=d2fa7ad1e26af0847d349d7dbd5f93e5&language=en-US&query=man'

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
        return fetch(BASE_URL + 'movie/' + id + API_KEY)
            .then(response => response.json())
            .then(movie => new MovieDetails(movie))
            .catch(err => console.log(err))
    }

    static getCast(id) {
        return fetch(BASE_URL + `movie/${id}/credits` + API_KEY)
            .then(response => response.json())
            .then(actors => {
                return actors.cast.slice(0, 6).map(actor => new Actor(actor))
            })
            .catch(err => console.log(err)
            )
    }

    static getTrailer(id) {
        return fetch(BASE_URL + `movie/${id}/videos` + API_KEY)
            .then(response => response.json())
            .then(trailers => {
                return trailers.results[0].key
            })
            .catch(err => console.log(err)
            )
    }

    static getSearchMovie(query) {
        return fetch(BASE_URL + "search/movie/" + API_KEY + `&query=${query}`)
            .then(response => response.json())
            .then(movies => {
                return movies.results.map(movie => new Movie(movie))
            })
            .catch(err => console.log(err));
    }
}

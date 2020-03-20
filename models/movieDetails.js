class MovieDetails {
    constructor(json) {
        this.id = json.id;
        this.backdrop = json.backdrop_path;
        this.genres = json.genres;
        this.overview = json.overview;
        this.releaseDate = json.release_date;
        this.tagline = json.tagline;
        this.title = json.title;
        this.vote = json.vote_average;
        this.runtime = json.runtime;
        this.poster_path = json.poster_path;
    }
}
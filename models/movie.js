class Movie {
    constructor(json) {
        this.poster = json.poster_path;
        this.title = json.title;
    }
}
class Movie {
    constructor(json) {
        this.id = json.id
        this.poster = json.poster_path;
        this.title = json.title;
    }
}
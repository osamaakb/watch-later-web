class Movie {
    constructor(json) {
        this.id = json.id
        this.poster_path = json.poster_path;
        this.title = json.title;
    }
}
function Anime({ anime, addAttribute }) {
    let attributes = {
        genres: [],
        rating: [],
        year: [],
    };

    if (anime !== null) {
        attributes.genres = anime.genres.map((genre) => genre.name);
        attributes.rating = anime.rating;
        attributes.year = anime.year;
    }

    if (anime !== null) {    
        return (
        <div>
            <div>
                <a href={anime.url} target="_blank" rel="noopener noreferrer">
                    <img
                    className="gallery-anime"
                    src={anime.images.jpg.image_url}
                    alt="Undefined anime from query"
                    width="180"
                    />
                </a>
            </div>
            <div>
                <h3>{anime.title}</h3>
                <div className="anime-attributes">
                    <div className="anime-attribute">
                        <h3>Genres:</h3>
                        <ul>
                            <li>{attributes.genres.map((genre, index) => (
                                <button onClick={() => addAttribute("genres", genre)} key={index}>{genre}</button>
                            ))}</li>
                        </ul>
                    </div>
                    <div className="anime-attribute">
                        <h3>Year:</h3>
                        <ul>
                            <li>{attributes.year}</li>
                        </ul>
                    </div>
                    <div className="anime-attribute">
                        <h3>Rating: </h3>
                        <ul>
                            <li><button onClick={() => addAttribute("rating", attributes.rating)}>{attributes.rating}</button></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )}
    else {
        return (
            <div>
                <h3>You haven't found an anime yet!</h3>
            </div>
        )
    }
}

export default Anime;
function Gallery({anime}) {
    return (
        <div>
            <h3>Previous anime:</h3>
            
            {anime && anime.length > 0 ? (
                anime.map((anime, index) => (
                    <li className="gallery" key={index}>
                        <a href={anime.url} target="_blank" rel="noopener noreferrer">
                            <img
                            className="gallery-anime"
                            src={anime.images.jpg.image_url}
                            alt="Undefined anime from query"
                            width="180"
                            />
                        </a>
                        <h3>{anime.title}</h3>
                        <br></br>
                    </li>
                ))
            ) : (
                <div>
                    <h3>You haven't found an anime yet!</h3>
                </div>
            )}
        </div>
    )
}

export default Gallery
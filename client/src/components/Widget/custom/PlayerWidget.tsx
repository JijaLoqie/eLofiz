export const PlayerWidget = () => {
    return (
        <div className="music-player">
            <div className="info">
                <div className="title">Music Title</div>
                <button className="button playlist" data-type="playlist" aria-label="Playlist">
                    [playlist]
                </button>
            </div>
            <div className="navigation">
                <button className="button" data-type="previous" type="button" aria-label="Previous track">
                    [prev]
                </button>
                <button className="button back" data-type="back">
                    [-30]
                </button>
                <div className="button play" data-type="play">
                    [play]
                </div>
                <button className="button forward" data-type="forward">
                    [+30]
                </button>
                <button className="button" data-type="next" type="button" aria-label="Next track">
                    [next]
                </button>
            </div>
            <div className="controls">
                <span className="progress">0:00:00</span>
                <button className="button v-minus" data-type="volume-decrease" aria-label="Decrease volume">
                    [v-]
                </button>
                <span className="volume">100 %</span>
                <button className="button v-increase" data-type="volume-increase" aria-label="Increase volume">
                    [v+]
                </button>
                <button className="button" data-type="random" aria-label="Random">
                    [random]
                </button>
            </div>
        </div>
    )
}
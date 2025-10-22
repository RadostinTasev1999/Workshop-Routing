import { useLatestGames } from "../../api/gameApi"
import {Link} from "react-router"

export default function Home(){

    const { latestGames } = useLatestGames()

     console.log('Latest games are:', latestGames)

    return (
        <section id="welcome-world">

            <div className="welcome-message">
                <h2>ALL new games are</h2>
                <h3>Only in GamesPlay</h3>
            </div>
            <img src="./images/four_slider_img01.png" alt="hero"/>

            <div id="home-page">
                <h1>Latest Games</h1>

                {/* <!-- Display div: with information about every game (if any) --> */}
                
                {
                    latestGames.length !== 0 ? 
                    (
                        latestGames.map((game) => {
                      return  <div className="game">
                            <div className="image-wrap">
                                <img src={game.imageUrl} />
                            </div>
                            <h3>{game.title}</h3>
                            <div className="rating">
                                <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                            </div>
                            <div className="data-buttons">
                                <Link to={`/games/${game._id}`} className="btn details-btn">Details</Link>
                            </div>
                        </div>
                    })
                    )
                    :
                    (
                        <p className="no-articles">No games yet</p>
                    )
                }
            </div>
        </section>
    )
}
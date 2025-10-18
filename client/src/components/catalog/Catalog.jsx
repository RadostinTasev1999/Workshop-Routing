// import { useEffect } from "react"
// import gameService from "../../services/gameService";
import { Link } from "react-router";
import { useGamesCatalog } from "../../api/gameApi";
  
// import { useGamesCatalog } from "../../api/gameApi";

export default function Catalog(){

    const { games } = useGamesCatalog()
    
    return (
        <>
        <section id="catalog-page">
            <h1>All Games</h1>
            {games.length !== 0 
                    ?
            (
                games.map((game) => (
                <div className="allGames">
                <div className="allGames-info">
                    <img src={game.imageUrl}/>
                    <h6>{game.category}</h6>
                    <h2>{game.title}</h2>
                    <Link to={`/games/${game._id}`} className="details-button">Details</Link>
                </div>

            </div>
            ))
            )   
                    :
            (
                <h3 className="no-articles">No articles yet!</h3>
            )
            }
        </section>
        </>
         
    )
}
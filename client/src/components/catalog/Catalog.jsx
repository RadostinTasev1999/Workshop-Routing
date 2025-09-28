import { useEffect } from "react"
import gameService from "../../api/gameService"
import { Link } from "react-router";
 import { useState } from "react";

export default function Catalog(){

      const [games,setGames] = useState([]);

    useEffect(() => {
      
         gameService.getAll()
             .then(result => setGames(result) )

    },[])

    return (
        <>
        <section id="catalog-page">
            <h1>All Games</h1>
            {games.length !== 0 && games.map((game) => (
                <div className="allGames">
                <div className="allGames-info">
                    <img src={game.imageUrl}/>
                    <h6>{game.category}</h6>
                    <h2>{game.title}</h2>
                    <Link to={`/games/${game._id}`} className="details-button">Details</Link>
                </div>

            </div>
            ))}
            
            {/* <!-- Display paragraph: If there is no games  --> */}
            <h3 className="no-articles">No articles yet</h3>
        </section>
        </>
         
    )
}
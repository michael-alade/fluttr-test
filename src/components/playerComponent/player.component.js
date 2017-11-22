import React from 'react'
import vehicleBox from '../../assets/images/space.png'

const PlayerComponent = ({ player, gameResult }) => {
    return (
      <div>
          <h3 className={`text-${player.playerColor}`}>Player {player.playerNumber}</h3>
          <h2 className="text-white">{player && player.name ? player.name : 'Loading..'}</h2>
          <h4 className="text-white">{player && player.species ? player.species.name : 'Loading..'}</h4>
          <div className="vehicle-box">
            <img src={vehicleBox} />
            <h3 className="text-white text-center">{player && player.vehicle ? player.vehicle.name : 'Loading..'}</h3>
          </div>
          { gameResult && gameResult[`player${player.playerNumber}`] ?
            <div className="player-result">
              <h4 className={`text-${player.playerColor}`}>
                { gameResult && gameResult[`player${player.playerNumber}`].totalTime !== null ?
                  Math.floor(gameResult[`player${player.playerNumber}`].totalTime) + ' hours' : 'N/A'  }
              </h4>
              <h4 className={`text-${player.playerColor}`}>
                { gameResult && gameResult[`player${player.playerNumber}`].totalTrips !== null ?
                  Math.floor(gameResult[`player${player.playerNumber}`].totalTrips) + ' trips' : 'N/A'  }
              </h4>
              <h5 className={`text-white`}>
                {`Speed: ${player.vehicle.max_atmosphering_speed} km/h`}
              </h5>
              <h5 className={`text-white`}>
                {`Cargo: ${player.vehicle.cargo_capacity} kg`}
              </h5>
            </div> :
            null
          }
      </div>
    )
}

export default PlayerComponent

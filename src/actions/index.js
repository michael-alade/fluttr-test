import {
  SELECT_PLAYER_ONE,
  SELECT_PLAYER_TWO,
  HANDLE_ERROR,
  GENERATE_RANDOM_GAME_VARIABLES,
  GAME_RESULT,
  RESET_GAME
} from './actionTypes'

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getVehicles = () => {
  const page = getRandomNumber(1, 4);
  return fetch(`https://swapi.co/api/vehicles/?page=${page}`).then(res => res.json())
};

const getPlayerSpecies = (playerSpeciesUrl) => {
  return fetch(playerSpeciesUrl).then(res => res.json())
}

const getPlayer = (page, cb) => {
    fetch(`https://swapi.co/api/people/?page=${page}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(people => {
        return getVehicles().then(res => {
          const vehicleIndex = getRandomNumber(0, res.results.length - 1)
          const personIndex = getRandomNumber(0, people.results.length - 1)

          return getPlayerSpecies(people.results[personIndex].species[0])
            .then(species => {
              return cb(null, {
                playerDetails: people.results[personIndex],
                species: species,
                vehicle: res.results[vehicleIndex] })
            }).catch(err => {
              return getPlayerSpecies(people.results[personIndex].species[0])
                .then(species => {
                  return cb(null, {
                    playerDetails: people.results[personIndex],
                    species: species,
                    vehicle: res.results[vehicleIndex]
                  })
                })
            })
        }).catch(err => {
          return cb(err, null)
        })
      })
};

const gamePlayAlgorithm = (player, gameVariables) => {
  let totalHoursPerTrip = gameVariables.distance / Number(player.vehicle.max_atmosphering_speed);
  let totalTrips;
  // check if the vehicle can carry all the gold in one trip
  if (Number(player.vehicle.cargo_capacity) < gameVariables.goldWeight) {
    // Number of trips to point B carrying a total weight of gold
    const totalNumberOfTripsToPointB = gameVariables.goldWeight / Number(player.vehicle.cargo_capacity);

    // Considering there will be return trips back to point A
    totalTrips = totalNumberOfTripsToPointB * 2;

    // subtracting the last trip since we have no gold to
    // carry from point A after picking the last one to point B
    totalTrips = totalTrips - 1;
  } else if (Number(player.vehicle.cargo_capacity) > gameVariables.goldWeight) {
    totalTrips = 1
  }
  
  // considering the fact that it takes takes an hour to load and unload respectively
  // add two hours to the totalHoursPerTrip
  totalHoursPerTrip = totalHoursPerTrip + 2; // add two hours
  const totalTime = totalHoursPerTrip * totalTrips

  return {
    totalTrips,
    totalTime
  }
}

export const generateRandomChallengeVariables = () => {
  return (dispatch) => {
    var randomDistance = getRandomNumber(1000, 99999);
    var randomGoldWeight = getRandomNumber(100, 9999);
    return dispatch({
      type: GENERATE_RANDOM_GAME_VARIABLES,
      payload: {
        distance: randomDistance,
        goldWeight: randomGoldWeight
      }
    });
  }
}

export const getRandomPlayers = (dispatch, payload) => {
  return dispatch => {
    let page = getRandomNumber(1, 9);
    const playerOne = getPlayer(page, (err, result) => {
      if (!err) {
        const player = Object.assign({}, result.playerDetails, { vehicle: result.vehicle, species: result.species })
        return dispatch({
          type: SELECT_PLAYER_ONE,
          player
        })
      }
      return dispatch({
        type: HANDLE_ERROR,
        err
      })
    });

    page = getRandomNumber(1, 9); // avoid picking the same player
    const playerTwo = getPlayer(page, (err, result) => {
      if (!err) {
        const player = Object.assign({}, result.playerDetails, { vehicle: result.vehicle, species: result.species })
        return dispatch({
          type: SELECT_PLAYER_TWO,
          player
        });
      }
      return dispatch({
        type: HANDLE_ERROR,
        err
      })
    });
  }
};

export const playGame = () => {
  return (dispatch, getState) => {
    const { gameVariables, player1, player2 } = getState()
    const playerOne = gamePlayAlgorithm(player1, gameVariables);
    const playerTwo = gamePlayAlgorithm(player2, gameVariables);
    return dispatch({
      type: GAME_RESULT,
      result: {
        player1: playerOne,
        player2: playerTwo
      }
    })
  }
}

export const resetGame = () => {
  return dispatch => {
    return dispatch({
      type: RESET_GAME,
      playersScore: {
        1: 0,
        2: 0
      }
    })
  }
}
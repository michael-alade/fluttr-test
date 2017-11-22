import { combineReducers } from 'redux'
import { 
    SELECT_PLAYER_ONE,
    SELECT_PLAYER_TWO,
    HANDLE_ERROR,
    GENERATE_RANDOM_GAME_VARIABLES,
    GAME_RESULT,
    RESET_GAME
} from '../actions/actionTypes'

const initialState = {
    player1: null,
    player2: null,
    gameStart: false,
    playersScore: {
      1: 0,
      2: 0
    },
    winner: null,
    gameResult: {
      player1: null,
      player2: null
    },
    gameVariables: {
        distance: null,
        goldWeight: null,
    },
    error: {
      status: false,
      err: null
    }
};

const starWars = (state = initialState, action) => {
  switch (action.type) {
    case RESET_GAME:
      return Object.assign({}, state, initialState, { playersScore: action.playersScore })
    case SELECT_PLAYER_ONE:
      return Object.assign({}, state, { player1: action.player });
    case SELECT_PLAYER_TWO:
      return Object.assign({}, state, { player2: action.player });
    case HANDLE_ERROR:
      return Object.assign({}, state, { err: { status: true, err: action.err } })
    case GENERATE_RANDOM_GAME_VARIABLES:
      return Object.assign({}, state, { gameVariables: action.payload, gameStart: true })
    case GAME_RESULT:
      let winner;
      let score = initialState.playersScore;
  
      // conditional statements to pick out the winner
      if (!action.result.player1.totalTime && action.result.player2.totalTime) {
        winner = `${state.player2.name} won the game`;
        score[2] = state.playersScore[2] + 1;
      } else if (action.result.player1.totalTime && !action.result.player2.totalTime) {
        winner = `${state.player1.name} won the game`;
        score[1] = state.playersScore[1] + 1;
      } else if (
        action.result.player1.totalTime && 
        action.result.player2.totalTime &&
        action.result.player1.totalTime === action.result.player2.totalTime
      ) {
        score[1] = state.playersScore[1] + 1;
        score[2] = state.playersScore[2] + 1;
        winner = `${state.player1.name} and ${state.player2.name} got a tie`;
      } else if (action.result.player1.totalTime > action.result.player2.totalTime) {
        winner = `${state.player2.name} won the game`;
        score[2] = state.playersScore[2] + 1;
      } else if (action.result.player1.totalTime < action.result.player2.totalTime) {
        winner = `${state.player1.name} won the game`;
        score[1] = state.playersScore[1] + 1;
      } else {
        winner = 'No one won the match'
      }

      return Object.assign({}, state, { 
        gameResult: action.result,
        playersScore: score,
        winner: winner
      })
    default:
      return state;
  }
};

// const rootReducer = combineReducers({
//   starWars
// });

export default starWars;

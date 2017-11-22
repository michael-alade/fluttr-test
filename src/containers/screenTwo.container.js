import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PlayerComponent from '../components/playerComponent/player.component';
import ScoreComponent from '../components/scoreComponent/score.component'
import * as actions from '../actions'

class ScreenTwo extends Component {
  componentWillMount () {
    if (!this.props.gameStart) {
      this.props.history.replace('/')
    }
  }
 
  toggleWinnerText () {
    if (this.props.winner) {
      return (
        <div className="col-md-12">
          <h1 className="text-center text-green">{ this.props.winner }</h1>
        </div>
      )
    }
    return null;
  }

  render () {
    return (
        <div className="container" style={{ paddingTop: '50px' }}>
            <div className="row">
                { this.toggleWinnerText() }
                <div className="col-md-4">
                    <PlayerComponent 
                      player={this.props.player1}
                      {...this.props}
                    />
                </div>
                <div className="col-md-4">
                  <ScoreComponent playersScore={this.props.playersScore} gameVariables={this.props.gameVariables} />
                </div>
                <div className="col-md-4">
                    <PlayerComponent
                      player={this.props.player2}
                      {...this.props}
                    />
                </div>
                <button onClick={ () => {
                  this.props.resetGame()
                  this.props.history.replace('/')
                }} className="btn btn-center btn-lg orange-btn">Next Match</button>
            </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    player1: Object.assign({}, state.player1, { playerNumber: 1, playerColor: 'blue' }),
    player2: Object.assign({}, state.player2, { playerNumber: 2, playerColor: 'red' }),
    gameVariables: state.gameVariables,
    gameResult: state.gameResult,
    winner: state.winner,
    playersScore: state.playersScore,
    gameStart: state.gameStart
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetGame: bindActionCreators(actions.resetGame, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenTwo);

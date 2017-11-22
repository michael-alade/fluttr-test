import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PlayerComponent from '../components/playerComponent/player.component';
import ScoreComponent from '../components/scoreComponent/score.component'
import * as actions from '../actions'

class ScreenOne extends Component {
  componentWillReceiveProps (nextProps) {
    if (nextProps.gameResult.player1) {
      this.props.history.relace('/results')
    }
  }

  componentWillMount () {
    if (!this.props.gameStart) {
      this.props.history.replace('/')
    }
  }
  render () {
    return (
        <div className="container" style={{ paddingTop: '50px' }}>
            <div className="row">
                <div className="col-md-4">
                    <PlayerComponent player={this.props.player1} />
                </div>
                <div className="col-md-4">
                  <ScoreComponent playersScore={this.props.playersScore} gameVariables={this.props.gameVariables} />
                </div>
                <div className="col-md-4">
                    <PlayerComponent player={this.props.player2} />
                </div>
                <button
                  onClick={() => {
                    this.props.playGame()
                    this.props.history.replace('/results')
                  }}
                  className="btn btn-center btn-lg orange-btn"
                >
                  Play
                </button>
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
    playersScore: state.playersScore,
    gameResult: state.gameResult,
    gameStart: state.gameStart
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    playGame: bindActionCreators(actions.playGame, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenOne);

import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PlayerComponent from '../components/playerComponent/player.component'
import * as actions from '../actions'



class HomePage extends Component {
  state = {
    loading: false
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.players.player1 && nextProps.players.player1) {
      return this.props.history.push('/play')
    }
  }
  start () {
    this.props.actions.getRandomPlayers()
    this.props.actions.generateRandomChallengeVariables()
    this.setState({ loading: true })
  }
  

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="start" style={{paddingTop: '300px'}}>
            <button onClick={() => this.start()} className="btn orange-btn">
              Start  
              { this.state.loading ? 
                <i style={{ marginLeft: '10px' }} className="fa fa-spinner fa-spin"></i> : null }
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    players: {
      player1: state.player1,
      player2: state.player2
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

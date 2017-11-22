import React, { Component, P } from 'react';
import PropTypes from 'prop-types';
import Gold from '../../assets/images/gold.png';
import Distance from '../../assets/images/distance.png'

const ScoreComponent = ({ gameVariables, playersScore }) => {
  return (
      <div className="score-box">
        <h2 className="text-center text-white">VS</h2>
        <div className="score">
            <h1 className="text-xl text-center text-white">{playersScore[1]} - {playersScore[2]}</h1>
        </div>
        <div className="gold-box">
            <div className="gold-img">
                <img src={Gold} />
            </div>
            <div className="gold-weight">
              <h3
                className="text-white">{
                  gameVariables && gameVariables.goldWeight ? `${gameVariables.goldWeight}kg` : 
                  'Loading...'}</h3>
            </div>
        </div>
        <div className="gold-box">
            <div className="gold-img">
                <img src={Distance} />
            </div>
            <div className="gold-weight">
                <h3
                  className="text-white">{
                    gameVariables && gameVariables.distance ? `${gameVariables.distance}km` : 
                    'Loading...'}</h3>
            </div>
        </div>
      </div>
  )
}

ScoreComponent.propTypes = {
  gameVariables: PropTypes.object,
  playersScore: PropTypes.object
}

export default ScoreComponent;
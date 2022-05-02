import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {

  addTrack() {
    this.props.onAddTrack(this.trackInput.value);
    this.trackInput.value = '';
  };

  findTrack() {
    this.props.onFindtrack(this.searchInput.value);
  };

  render() {
    return (
      <div className='container'>
        <div className='div'>
          <input className="input" type="text" ref={(input) => { this.trackInput = input }} />
          <button className="button" onClick={this.addTrack.bind(this)}>Add track</button>
        </div>
        <div className='div'>
          <input className="input" type="text" ref={(input) => { this.searchInput = input }} />
          <button className="button" onClick={this.findTrack.bind(this)}>Find track</button>
        </div>
        <ul className="list">
          {this.props.tracks.map((track, index) => 
            <li className='li' key={index}>{track.name}</li>
          )}
        </ul>
      </div>
    )
  };
};

export default connect(
  state => ({
    tracks: state.tracks.filter(track => track.name.includes(state.filterTracks))
  }),
  dispatch => ({
    onAddTrack: (name) => {
      const payload = {
        id: Date.now().toString(),
        name
      };
      dispatch({ type: 'ADD_TRACK', payload });
    },
    onFindtrack: (name) => {
      dispatch({ type: 'FIND_TRACK', payload: name });
    }
  })
)(App);
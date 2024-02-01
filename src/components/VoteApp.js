import React, { Component } from 'react';
import Movie from './Movie';

class VoteApp extends Component {
  render() {    
    return (
      <main role="main">
        <div className="jumbotron">
          <div className="container">
            <h1 className="display-3">Movie Vote App</h1>
            &copy; David Cepeda 2023
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <Movie id="avengers" title="Avengers" poster="avengers.png"/>
            </div>
            <div className="col-md-4">
              <Movie id="avatar" title="Avatar" poster="avatar.png"/>
            </div>
            <div className="col-md-4">
              <Movie id="starwars" title="Star Wars" poster="starwars.png"/>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default VoteApp;

import React, { Component } from 'react';
import Vote from './Vote';
import axios from 'axios';

class Movie extends Component {
  constructor() {
    super();
    this.APIHOSTPORT = `${process.env.REACT_APP_APIHOSTPORT}`;
    this.state = {
      movie: {},
      loaded: false
    };
  }

  componentDidMount() {
    axios.get(`https://${this.APIHOSTPORT}/movies/${this.props.id}`).then( 
      response => this.setState({
        movie: response.data,
        loaded: true
      })
    );
  }

  render() {
    if (this.state.loaded) {
      const { director, genre, releaseYear, votes } = this.state.movie.moviedetail;

      return (
        <div className="movie-card">
          <img src={"./img/" + this.props.poster} alt="poster" className="movie-image"/>
          <div className="movie-details">
            <h2>{this.props.title}</h2>
            <p><b>Director</b>: {director}</p>
            <p><b>Genre</b>: {genre}</p>
            <p><b>Release Year</b>: {releaseYear}</p>
            <div className="vote-section">
              <Vote id={this.props.id} initialVotes={votes}/>
            </div>
          </div>
        </div>
      );
    }
    return <div>Loading...</div>;
  }
}

export default Movie;

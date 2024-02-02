import React, { Component } from 'react';
import axios from 'axios';

class Vote extends Component {
  constructor(props) {
    super(props);
    this.APIHOSTPORT = `${process.env.REACT_APP_APIHOSTPORT}`; 
    this.state = {
      vote: props.initialVotes || 0
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const url = `https://${this.APIHOSTPORT}/movies/${this.props.id}/vote`; 
    axios.get(url)
      .then(response => this.setState({ vote: response.data.votes }))
  }

  render() {
    return (
      <div id={this.props.id}>
        <button className='button btn btn-outline-success' onClick={this.handleClick} type="button">+1</button>
        <div>
          <b>Votes</b>: {this.state.vote}
        </div>
      </div>
    )
  }
}

export default Vote;

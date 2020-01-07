import React, { Component } from 'react';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <ul class="tab tab-block">
        <li class="tab-item active">{/* <a href="#">Music</a> */}</li>
        <li class="tab-item">{/* <a href="#" class="active">Playlists</a> */}</li>
        <li class="tab-item">{/* <a href="#">Radio</a> */}</li>
        <li class="tab-item">{/* <a href="#">Connect</a> */}</li>
      </ul>
    );
  }
}

export default Home;

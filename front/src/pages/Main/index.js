import React, { Component } from 'react';
import Container from '../../components/Container';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <h1>Hello World</h1>
      </Container>
    );
  }
}

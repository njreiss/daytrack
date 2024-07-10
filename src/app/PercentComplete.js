import { Tomorrow } from 'next/font/google';
import React, { Component } from 'react';

class PercentComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: Date.now()
    };

    // Bind methods if necessary
    this.formatTime = this.formatTime.bind(this);
  }

  // Lifecycle methods
  componentDidMount() {
    // This method runs after the component has been rendered to the DOM
    console.log('Component did mount');

    this.intervalID = setInterval(() => {
        this.setState({
            time: Date.now()
        });
    }, 1);
  }

  componentDidUpdate(prevProps, prevState) {
    // This method runs after the component's updates are flushed to the DOM
    console.log('Component did update');
  }

  componentWillUnmount() {
    // This method runs before the component is removed from the DOM
    console.log('Component will unmount');
  }

  // Custom methods
  formatTime() {
    let time = Math.trunc(((this.state.time - 1703856000000) / 31622400000) * 100000000) / 1000000 + '%'
    return time
    // return this.state.time
  }

  render() {
    return (
      <div className='p-6 text-4xl'>
        {this.formatTime()}
      </div>
    );
  }
}

export default PercentComplete;
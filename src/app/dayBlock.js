import { Tomorrow } from 'next/font/google';
import React, { Component } from 'react';

class DayBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    // Bind methods if necessary
    }

  // Lifecycle methods
  componentDidMount() {
    // This method runs after the component has been rendered to the DOM
    console.log('Component did mount');
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

  render() {
    return (
      <div className='h-full p-4 text-2xl text-black w-full border border-1 rounded-md'>
        {console.log(this.props)}
        <div>{this.props.date.getDate()} </div>
        
      </div>
    );
  }
}

export default DayBlock;
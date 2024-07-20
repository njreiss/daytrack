import { Tomorrow } from 'next/font/google';
import React, { Component } from 'react';

class EventType extends Component {
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
        <div className='bottom-full w-full h-full bg-red-400 border border-1 border-red-400 rounded-md'>
          <button className='w-full p-1 whitespace-nowrap bg-white border border-1 border-red-400 rounded-md hover:bg-gray-100'>
            New Habit
          </button>
          <button className='w-full p-1 whitespace-nowrap bg-white border border-1 border-red-400 rounded-md hover:bg-gray-100'>
            New Goal
          </button>
        </div>

    );
  }
}

export default EventType;
import { Tomorrow } from 'next/font/google';
import React, { Component } from 'react';

class NewGoal extends Component {
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
      <div 
        onClick={this.props.close} 
        className='fixed inset-0 bg-black z-10 bg-opacity-20 w-full h-full flex justify-center items-center'
      >
        <div 
          onClick={(event) => event.stopPropagation()} 
          className='w-fit h-1/2 bg-white rounded-lg p-3'
        >
          <div className='flex justify-between space-x-6 items-start'>
            <div>
              <input 
                type='text' 
                placeholder='Goal Name' 
                className='p-2 text-lg font-medium'
              />
            </div>
            <button 
              onClick={this.props.close} 
              className='transition ease-in-out duration-300 text-2xl px-2 rounded-3xl hover:bg-red-400 
              hover:text-white'
            >
              &#10799;
            </button>
          </div>
          <div className='text-black'>
            poop
          </div>
        </div>
      </div>
    );
  }
}

export default NewGoal;
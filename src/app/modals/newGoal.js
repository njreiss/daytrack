import { Tomorrow } from 'next/font/google';
import React, { Component } from 'react';

class NewGoal extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    // Bind methods if necessary
    this.handleSubmit = this.handleSubmit.bind(this)
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
  getJSONDate(date) {

    let formattedDate = date.toJSON().split('T');
    return formattedDate[0];
  }
  handleSubmit() {
    this.props.submit(this.state);
  }
  render() {
    return (
      <div 
        onClick={this.props.close} 
        className='fixed inset-0 bg-black z-10 bg-opacity-20 w-full h-full flex justify-center items-center'
      >
        <div 
          onClick={(event) => event.stopPropagation()} 
          className='w-fit h-fit bg-white rounded-lg p-3'
        >
          <div className='flex justify-between space-x-6 items-start'>
            <div>
              <input 
                type='text' 
                placeholder='Goal Name' 
                className='p-2 text-lg font-medium border-2 border-gray-300 rounded-md'
              />
            </div>
            <button 
              onClick={this.props.close} 
              className='align-top transition ease-in-out duration-300 text-lg px-2 rounded-3xl hover:bg-red-400 
              hover:text-white'
            >
              &#x2715;
            </button>
          </div>
          <div className='font-medium pt-2'>
              Start Date
          </div>
          <input 
            type='date' 
            className='p-2 border border-2 border-gray-300 rounded-md' 
            defaultValue={this.getJSONDate(this.props.today)}
          />
          <div className='font-medium pt-2'>
              End Date
          </div>
          <input 
            type='date' 
            className='p-2 border border-2 border-gray-300 rounded-md' 
            defaultValue={this.getJSONDate(this.props.date)}
          />
          <button 
            className='w-full mt-2 transition ease-in-out duration-200 px-2 py-1 font-medium border-2 border-red-400 rounded-lg hover:bg-red-400 hover:text-white'
            onClick={this.handleSubmit}
          >
            {/* NEED TO PASS GOAL OBJECT UP */}
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default NewGoal;
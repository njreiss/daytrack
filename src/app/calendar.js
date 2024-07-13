import { Tomorrow } from 'next/font/google';
import React, { Component } from 'react';
import DayBlock from "./dayBlock.js"


class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      today: new Date(),
      // today: new Date('1995-12-17T03:24:00'),
      days: []
    };

    // Bind methods if necessary
    this.getDays = this.getDays.bind(this);
    }
  
  months = new Map([
    [0, 'January'],
    [1, 'Febuary'],
    [2, 'March'],
    [3, 'April'],
    [4, 'May'],
    [5, 'June'],
    [6, 'July'],
    [7, 'August'],
    [8, 'September'],
    [9, 'October'],
    [10, 'November'],
    [11, 'December'],
  ])
  // Lifecycle methods
  componentDidMount() {
    // This method runs after the component has been rendered to the DOM
    this.getDays();
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
  getDays() {
    // Copys today's date, sets it back to the first of the month
    const allDates = [];
    const first = new Date(this.state.today);
    first.setDate(1);
    first.setDate(-(first.getDay() - 1));

    for (let i = 0; i < 35; i++) {
        const aday = new Date(first);
        aday.setDate(first.getDate() + i);
        allDates.push(aday);
    }

    this.setState({
        days: allDates,
    });
  }

  // Custom methods

  render() {
    return (
      <div className='h-full p-6 w-full flex flex-col items-center'>
        <div className="text-4xl">
          {this.months.get(this.state.today.getMonth())}
        </div>
        <div className='w-full grid grid-cols-7'>
          <label className='border border-1 rounded-md'>Sun</label>
          <label className='border border-1 rounded-md'>Mon</label>
          <label className='border border-1 rounded-md'>Tues</label>
          <label className='border border-1 rounded-md'>Weds</label>
          <label className='border border-1 rounded-md'>Thurs</label>
          <label className='border border-1 rounded-md'>Fri</label>
          <label className='border border-1 rounded-md'>Sat</label>
        </div>
        <div className='w-full h-full grid grid-cols-7'>
          {this.state.days.map(day => <DayBlock date={day}/>)}
        </div>
      </div>
    );
  }
}

export default Calendar;
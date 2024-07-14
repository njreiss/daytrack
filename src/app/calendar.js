import { Tomorrow } from 'next/font/google';
import React, { Component } from 'react';
import DayBlock from "./dayBlock.js"
import next from 'next';


class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      today: new Date(),
      days: this.getDays(new Date()),
      percents: this.getPercents(),
    };

    // Bind methods if necessary
    this.getDays = this.getDays.bind(this);
    this.addMonth = this.addMonth.bind(this);
    this.subtractMonth = this.subtractMonth.bind(this);
    this.getPercents = this.getPercents.bind(this);
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
  getDays(date) {
    // Copys today's date, sets it back to the first of the month
    const allDates = [];
    const first = new Date(date);
    first.setDate(1);
    first.setDate(-(first.getDay() - 1));

    for (let i = 0; i < 35; i++) {
        const aday = new Date(first);
        aday.setDate(first.getDate() + i);
        allDates.push(aday);
    }
    return allDates;
  }
  addMonth() {
    const nextMonth = new Date(this.state.today);
    nextMonth.setMonth(nextMonth.getMonth() + 1, 1);
    this.setState({
      today: nextMonth,
      days: this.getDays(nextMonth),
    });
  }
  subtractMonth() {
    const prevMonth = new Date(this.state.today);
    prevMonth.setMonth(prevMonth.getMonth() - 1, 1);
    this.setState({
      today:prevMonth,
      days: this.getDays(prevMonth),
    });
  }
  getPercents() {
    const percentsMap = new Map();
    for (let i = 1; i < 101; i++) {
      const aDay = new Date(1704085200000 + (316224000 * i))
      percentsMap.set(i, aDay);
    }
    return percentsMap;
  }

  // Custom methods

  render() {
    return (
      <div className='h-full p-6 w-full flex flex-col'>
        <div className='flex justify-between'>
          <button className='text-2xl' onClick={this.subtractMonth}>
            &#129032;
          </button>
          <div className="text-4xl">
            {this.months.get(this.state.today.getMonth())}
          </div>
          <button className='text-2xl' onClick={this.addMonth}>
            &#129034;
          </button>
        </div>
        <div className='w-full grid grid-cols-7'>
          <label className='border border-1 rounded-md flex justify-center'>Sun</label>
          <label className='border border-1 rounded-md flex justify-center'>Mon</label>
          <label className='border border-1 rounded-md flex justify-center'>Tues</label>
          <label className='border border-1 rounded-md flex justify-center'>Weds</label>
          <label className='border border-1 rounded-md flex justify-center'>Thurs</label>
          <label className='border border-1 rounded-md flex justify-center'>Fri</label>
          <label className='border border-1 rounded-md flex justify-center'>Sat</label>
        </div>
        <div className='w-full h-full grid grid-cols-7'>
          {/* {console.log(this.state.percents)} */}
          {this.state.days.map(day => <DayBlock key={day} date={day} percents={this.state.percents}/>)}
        </div>
      </div>
    );
  }
}

export default Calendar;
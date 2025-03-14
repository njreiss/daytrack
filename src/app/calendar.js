import { Tomorrow } from 'next/font/google';
import React, { Component } from 'react';
import DayBlock from "./dayBlock.js"
import next from 'next';
import axios from 'axios';
import PercentComplete from "./PercentComplete.js";


class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      today: new Date(),
      days: this.getDays(new Date()),
      percents: this.getPercents(),
      habits: [],
      goals: [],
    };

    // Bind methods if necessary
    this.getDays = this.getDays.bind(this);
    this.addMonth = this.addMonth.bind(this);
    this.subtractMonth = this.subtractMonth.bind(this);
    this.getPercents = this.getPercents.bind(this);
    this.getHabits = this.getHabits.bind(this);
    this.handleNewGoal = this.handleNewGoal.bind(this);
    this.handleNewHabit = this.handleNewHabit.bind(this);
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
    // Looks like i started some api work! abandoning ship though lets do some local storage stuff
    // axios.get('http://localhost:5000/api/data')
    //   .then(response => {
    //     console.log('LOG GET RESPONSE');
    //     console.log(response.data);
    //     this.setState({...this.state, data: response.data, loading: false });
    //   })
    //   .catch(error => {
    //     console.error('Error fetching data:', error);
    //     this.setState({ error: error.message, loading: false });
    //   });
    let habits = localStorage.getItem('habits');
    if (habits) {
      this.setState({...this.state, 
        habits: JSON.parse(habits),
        
      });
    }
    let goals = localStorage.getItem('goals');
    if (goals) {
      this.setState({...this.state, 
        goals: JSON.parse(goals), 
      });
    }

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
    let allDates = [];

    const first = new Date(date);
    first.setDate(1);
    first.setDate(-(first.getDay() - 1));

    for (let i = 0; i < 35; i++) {
      const aday = new Date(first);
      aday.setDate(first.getDate() + i);
      const day = {date: aday}
      // lets check if a day is an even percent 
      allDates.push(day);
    }

    allDates = this.getPercents(first, allDates);
    allDates = this.getHabits(first, allDates);
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
  getHabits(firstDay, allDates) {
    
    return allDates;
  }
// 1704085200000
  getPercents(firstDay, allDates) {
    let a1stDay = new Date(firstDay); 
    let year = a1stDay.getFullYear();

     if (a1stDay.getMonth() == 12 && a1stDay.getDate() > 20) {
      year++;
    }

    let firstDOY = new Date(year, 0, 1);
    
    let startPerc = (firstDay - firstDOY)/31622400000;
    startPerc = Math.ceil(100 * startPerc);
    
    for (let day in allDates) {
      let percDay = new Date((startPerc * 316224000) + 1704085200000);
      if (allDates[day].date.getDate() == percDay.getDate()) {
        allDates[day].percent = true;
        if (startPerc == 100) {
          allDates[day].percentVal = startPerc;
        } else {
          allDates[day].percentVal = startPerc % 100;
        }
        // {(this.state.percentHour > 12 ? this.state.percentHour % 12 : (this.state.percentHour == 0 ? 12 : this.state.percentHour)) + ':' + (this.state.percentMinute < 10 ? '0' + this.state.percentMinute : this.state.percentMinute) + '' + (this.state.percentHour >= 12 ? 'pm':'am')}
        let atime= percDay.getHours() > 12 ? percDay.getHours() % 12 : (percDay.getHours() == 0 ? 12 : percDay.getHours());
        atime = atime + ':';
        atime = atime + (percDay.getMinutes() < 10 ? '0' + percDay.getMinutes() : percDay.getMinutes());
        atime = atime + (percDay.getHours() >= 12 ? 'pm':'am')
        allDates[day].percTime = atime;
        startPerc++;
      }
    }

    return allDates;
  }
  handleNewGoal(goal) {
    // let goals = this.state.goals;
    // goals.push(goal);

    this.state.goals.push(goal);
    localStorage.setItem('goals', JSON.stringify(this.state.goals));
  }
  handleNewHabit(habit) {
    this.state.habits.push(habit);
    localStorage.setItem('habits', JSON.stringify(this.state.habits));
  }

  // Custom methods

  render() {
    return (
      <div className='h-full p-8 w-full flex flex-col'>
        <div className='flex justify-between px-2 border rounded-lg'>
          <button className='text-2xl' onClick={this.subtractMonth}>
            {'<'}
          </button>
          <div className='flex space-x-5 tabular-nums'>
            <div className="text-3xl py-2">
              {this.months.get(this.state.today.getMonth()) + ', ' + this.state.today.getFullYear()}
            </div>
            <div className="text-3xl py-2">
              <PercentComplete/>
            </div>
          </div>
          <button className='text-2xl' onClick={this.addMonth}>
            {'>'}
          </button>
        </div>
        <div className='w-full grid grid-cols-7'>
          <label className='border border-1 rounded-md flex justify-center bg-red-400 text-white'>Sun</label>
          <label className='border border-1 rounded-md flex justify-center bg-red-400 text-white'>Mon</label>
          <label className='border border-1 rounded-md flex justify-center bg-red-400 text-white'>Tues</label>
          <label className='border border-1 rounded-md flex justify-center bg-red-400 text-white'>Weds</label>
          <label className='border border-1 rounded-md flex justify-center bg-red-400 text-white'>Thurs</label>
          <label className='border border-1 rounded-md flex justify-center bg-red-400 text-white'>Fri</label>
          <label className='border border-1 rounded-md flex justify-center bg-red-400 text-white'>Sat</label>
        </div>
        <div className='w-full h-full grid grid-cols-7'>
          {this.state.days.map(day => 
          <DayBlock 
            key={day} 
            day={day}
            submitGoal={this.handleNewGoal}
            submitHabit={this.handleNewHabit}/>)}
        </div>
      </div>
    );
  }
}

export default Calendar;
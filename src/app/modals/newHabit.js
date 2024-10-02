import { Tomorrow } from 'next/font/google';
import React, { Component } from 'react';
import axios from 'axios';


class NewHabit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      daily: true,
      timesDaily: 1,
      dayInterval: 1,
      week: {
        Su: false,
        Mo: false,
        Tu: false,
        We: false,
        Th: false,
        Fr: false,
        Sa: false,
      },
      weekdayFocus: true,
      daysWeekly: 1,
      weekInterval: 1,
      startDate: this.getJSONDate(),

    };

    // Bind methods if necessary
    this.toggleWeekdayFocus = this.toggleWeekdayFocus.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleNameChange = this.handleNameChange(this);
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
  handleNameChange = (event) => {
    this.setState({ name: event.target.value})
  }
  getJSONDate() {
    let date = this.props.date.toJSON().split('T');
    return date[0];
  }
  handleStartDateChange = (event) => {
    this.setState({ startDate: event.target.value});
  }
  handleOnChangeTimesAday = (event) => {
    this.setState({ timesDaily: event.target.value});
  }
  handleOnChangeDayInterval = (event) => {
    this.setState({ dayInterval: event.target.value});
  }
  toggleWeekdayFocus = () => {
    this.setState({...this.state, weekdayFocus: !this.state.weekdayFocus});
  }
  handleOnChangeWeekInterval = (event) => {
    this.setState({weekInterval: event.target.value})
  }
  handleSubmit() {
    // checks that there is a name that is not blank. 
    let allowed = this.state.name != '' && this.state.startDate != '';
    if (this.state.daily) {
      allowed = allowed && this.state.timesDaily >= 1 && this.state.timesDaily % 1 == 0;
      allowed = allowed && this.state.dayInterval >= 1 && this.state.dayInterval % 1 == 0;
      if (allowed) {
        let habit = {
          name: this.state.name,
          startDate: this.state.startDate,
          timesDaily: this.state.timesDaily,
          interval: this.state.dayInterval
        }
        this.props.submit(habit);
        this.props.close();
      }

    } else {
      if (this.state.weekInterval >= 1 && this.state.weekInterval % 1 == 0) {
        if (this.state.weekdayFocus) {
          allowed = this.state.week.Su || this.state.week.Mo || this.state.week.Tu || this.state.week.We || this.state.week.Th || this.state.week.Fr || this.state.week.Sa;
          if (allowed) {
            let habit = {
              name: this.state.name,
              startDate: this.state.startDate,
              week: this.state.week,
              interval: this.state.weekInterval
            }
            this.props.submit(habit);
            this.props.close();
          }
        } else {
        if (this.state.daysWeekly >= 1 && this.state.daysWeekly % 1 == 0) {
          let habit = {
            name: this.state.name,
            startDate: this.state.startDate,
            timesWeekly: this.state.daysWeekly,
            interval: this.state.weekInterval
          }
          
          this.props.submit(habit);
          this.props.close();
          } 
        }
      }
    }
  }
  // handleSubmit = (event) => {
  //   // event.preventDefault();
  //   // console.log('message:', this.state);
  //   // axios.post('http://localhost:5000/api/data', this.state )
  //   //   .then(response => {
  //   //     console.log('Response:', response.data);
  //   //     // Handle response as needed
  //   //   })
  //   //   .catch(error => {
  //   //     console.error('Error:', error);
  //   //     // Handle error as needed
  //   //   });
  //   // looks like i was attempting to implement a backend here as well 

  // }


  render() {
    return (
      <div 
        onClick={this.props.close} 
        className='fixed inset-0 bg-black z-10 bg-opacity-20 w-full h-full flex 
        justify-center items-center'
      >
        <div 
          onClick={(event) => event.stopPropagation()} 
          className='w-min h-fit bg-white rounded-lg p-3 pb-14 relative'
        >
          <div className='flex justify-between space-x-2 items-start'>
            <input 
              type='text' 
              placeholder='Habit Name'
              value={this.state.name} 
              onChange={this.handleNameChange}
              className='p-2 text-lg font-medium border-2 border-gray-300 rounded-md'
            />
            <button 
              onClick={this.props.close} 
              className='align-top transition ease-in-out duration-300 text-lg px-2 rounded-3xl hover:bg-red-400 
              hover:text-white'
            >
              &#x2715;
            </button>
          </div>
          <div className=''>
            <div className='font-medium pt-2'>
              Start Date
            </div>
            <input 
              type='date' 
              className='p-2 border border-2 border-gray-300 rounded-md' 
              value={this.state.startDate}
              onChange={this.handleStartDateChange}
              defaultValue={this.getJSONDate()}
            />
            <div className='w-full mt-2 flex justify-around border border-2 border-red-400 rounded-lg mb-2'>
              <button 
                onClick={() => this.setState({...this.state, daily:true})} 
                className={'py-0.5 w-1/2 font-medium ' + (this.state.daily ? 
                'bg-red-400 rounded-lg border border-1 border-white text-white': null)}
              >
                Daily
              </button>
              <button 
                onClick={() => this.setState({...this.state, daily:false})} 
                className={'py-0.5 w-1/2 font-medium ' + (this.state.daily ? null : 
                'bg-red-400 rounded-lg border border-1 border-white text-white')}
              >
                Weekly
              </button>
            </div>
            {this.state.daily ? 
              <div className='w-full text-sm font-medium'>
                <div>
                  {'Repeat '}
                  <input 
                    defaultValue='1' 
                    className='border border-2 border-gray-300 w-1/12 px-1 rounded-lg text-sm text-center'
                    onChange={this.handleOnChangeTimesAday}
                  /> 
                  {' time' + (this.state.timesDaily > 1 ? 's' : '') + ' per day'}
                </div>
                <div>
                  {'Repeat every '} 
                  <input 
                    defaultValue='1' 
                    className='border border-2 border-gray-300 w-1/12 px-1 rounded-lg text-sm text-center'
                    onChange={this.handleOnChangeDayInterval}
                  /> 
                  {' day' + (this.state.dayInterval > 1 ? 's' : '')}
                </div>
              </div>
            // Weekly
            :
            <div>
              <div className='border-2 border-gray-300 p-1 rounded-lg'>
                <div 
                  onClick={() => this.toggleWeekdayFocus()} 
                  className={'w-full border border-2 rounded-lg p-1 ' + 
                  (this.state.weekdayFocus ? 'border-red-400':'border-gray-300 group')}
                >
                  <div 
                    onClick={(event) => event.stopPropagation()} 
                    className={'flex justify-around ' + (this.state.weekdayFocus ? '':'pointer-events-none')}
                  >
                    <button onClick={() => this.setState({...this.state, week: {...this.state.week, Su: !this.state.week.Su}})} className={'transition fade-in-out duration-100 font-medium w-9 rounded-full py-1 ' + (this.state.week.Su ? (this.state.weekdayFocus ? 'bg-red-400 text-white' : 'bg-gray-300') : 'hover:bg-gray-300')}>Su</button>
                    <button onClick={() => this.setState({...this.state, week: {...this.state.week, Mo: !this.state.week.Mo}})} className={'transition fade-in-out duration-100 font-medium w-9 rounded-full py-1 ' + (this.state.week.Mo ? (this.state.weekdayFocus ? 'bg-red-400 text-white' : 'bg-gray-300') : 'hover:bg-gray-300')}>Mo</button>
                    <button onClick={() => this.setState({...this.state, week: {...this.state.week, Tu: !this.state.week.Tu}})} className={'transition fade-in-out duration-100 font-medium w-9 rounded-full py-1 ' + (this.state.week.Tu ? (this.state.weekdayFocus ? 'bg-red-400 text-white' : 'bg-gray-300') : 'hover:bg-gray-300')}>Tu</button>
                    <button onClick={() => this.setState({...this.state, week: {...this.state.week, We: !this.state.week.We}})} className={'transition fade-in-out duration-100 font-medium w-9 rounded-full py-1 ' + (this.state.week.We ? (this.state.weekdayFocus ? 'bg-red-400 text-white' : 'bg-gray-300') : 'hover:bg-gray-300')}>We</button>
                    <button onClick={() => this.setState({...this.state, week: {...this.state.week, Th: !this.state.week.Th}})} className={'transition fade-in-out duration-100 font-medium w-9 rounded-full py-1 ' + (this.state.week.Th ? (this.state.weekdayFocus ? 'bg-red-400 text-white' : 'bg-gray-300') : 'hover:bg-gray-300')}>Th</button>
                    <button onClick={() => this.setState({...this.state, week: {...this.state.week, Fr: !this.state.week.Fr}})} className={'transition fade-in-out duration-100 font-medium w-9 rounded-full py-1 ' + (this.state.week.Fr ? (this.state.weekdayFocus ? 'bg-red-400 text-white' : 'bg-gray-300') : 'hover:bg-gray-300')}>Fr</button>
                    <button onClick={() => this.setState({...this.state, week: {...this.state.week, Sa: !this.state.week.Sa}})} className={'transition fade-in-out duration-100 font-medium w-9 rounded-full py-1 ' + (this.state.week.Sa ? (this.state.weekdayFocus ? 'bg-red-400 text-white' : 'bg-gray-300') : 'hover:bg-gray-300')}>Sa</button>
                  </div>
                </div>
                <div className='py-0.5 flex justify-around items-center text-sm text-gray-500'>
                  <hr className='w-2/5 items-center'/>
                  or
                  <hr className='w-2/5 items-center'/>
                </div>
                <div 
                  onClick={() => this.toggleWeekdayFocus()} 
                  className={'w-full border-2 rounded-lg p-2 text-sm font-medium ' + 
                  (this.state.weekdayFocus ? 'border-gray-300': 'border-red-400' )}
                >
                  <div 
                    onClick={(event) => event.stopPropagation()} 
                    className={this.state.weekdayFocus ? 'pointer-events-none' : ''}
                  >
                    Complete on any <input defaultValue='1' onChange={(event) => this.setState({...this.state, daysWeekly: event.target.value})} className='border border-2 border-gray-300 rounded-lg w-6 px-1 text-center'/> day{this.state.daysWeekly > 1 ? 's': ''} of the week
                  </div>
                  
                </div>
              </div>
              <div className='pt-1 text-sm font-medium'>
                {'Repeat every '} 
                <input 
                  defaultValue='1' 
                  className='border border-2 border-gray-300 w-6 px-1 rounded-lg text-center'
                  onChange={this.handleOnChangeWeekInterval}
                /> 
                {' week' + (this.state.weekInterval > 1 ? 's' : '')}
              </div>
            </div>
            }
            <div className='absolute bottom-0 w-full'>
              <div className='pb-3 pr-6'>
                <button 
                  className='w-full mt-2 transition ease-in-out duration-200 px-2 py-1 font-medium border-2 border-red-400 rounded-lg hover:bg-red-400 hover:text-white'
                  onClick={this.handleSubmit}
                >
                  {/* NEED TO PASS HABIT OBJECT UP */}
                  Submit
                </button>
              </div>
            </div>    
          </div>
        </div>
      </div>
    );
  }
}

export default NewHabit;
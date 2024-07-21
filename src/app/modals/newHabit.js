import { Tomorrow } from 'next/font/google';
import React, { Component } from 'react';

class NewHabit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      daily: false,
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
    };

    // Bind methods if necessary
    this.toggleWeekdayFocus = this.toggleWeekdayFocus.bind(this);
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
  getJSONDate() {
    let date = this.props.date.toJSON().split('T');
    return date[0];
  }
  handleOnChangeTimesAday = (event) => {
    this.setState({...this.state, timesDaily: event.target.value});
  }
  handleOnChangeDayInterval = (event) => {
    this.setState({...this.state, dayInterval: event.target.value});
  }
  toggleWeekdayFocus = () => {
    this.setState({...this.state, weekdayFocus: !this.state.weekdayFocus});

  }
  handleOnChangeWeekInterval = (event) => {
    this.setState({...this.state,weekInterval: event.target.value})
  }
  render() {
    return (
      <div 
        onClick={this.props.close} 
        className='fixed inset-0 bg-black z-10 bg-opacity-20 w-full h-full flex 
        justify-center items-center'
      >
        <div 
          onClick={(event) => event.stopPropagation()} 
          className='w-min h-[42%] bg-white rounded-lg p-3 relative'
        >
          <div className='flex justify-between space-x-2 items-start'>
            <input 
              type='text' 
              placeholder='Habit Name' 
              className='p-2 text-lg font-medium border-2 border-gray-300 rounded-md'
            />
            <button 
              onClick={this.props.close} 
              className='transition ease-in-out duration-300 text-2xl px-2 rounded-3xl hover:bg-red-400 
              hover:text-white'
            >
              &#10799;
            </button>
          </div>
          <div className=''>
            <div className='font-medium pt-2'>
              Start Date
            </div>
            <input 
              type='date' 
              className='p-2 border border-2 border-gray-300 rounded-md' 
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
            <div className='absolute bottom-0 w-full pb-3 pr-6'>
              <button className='w-full mt-2 transition ease-in-out duration-200 px-2 py-1 font-medium border-2 border-red-400 rounded-lg hover:bg-red-400 hover:text-white'>Submit</button>
            </div>
            
          </div>
        </div>
      </div>
    );
  }
}

export default NewHabit;
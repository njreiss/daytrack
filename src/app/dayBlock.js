import { Tomorrow } from 'next/font/google';
import React, { Component } from 'react';
import EventType from "./EventType.js"


class DayBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
        today: new Date(),
        isToday: false,
        isPercent: false,
        percent: 0,
        percentHour: 0,
        percentMinute: 0,
        showEventType: false,
    };

    // Bind methods if necessary
    
    }

  // Lifecycle methods
  componentDidMount() {
    // This method runs after the component has been rendered to the DOM
    this.checkDate();
    // this.checkPercent();

    console.log('Component did mount');
  }

  componentDidUpdate(prevProps, prevState) {
    // This method runs after the component's updates are flushed to the DOM
    if (this.props.day.date.getDate() != prevProps.day.date.getDate()) {
        this.setState({
            isToday:false
        });
        this.checkDate();
    }
    console.log('Component did update');
  }

  componentWillUnmount() {
    // This method runs before the component is removed from the DOM
    console.log('Component will unmount');
  }

  // Custom methods
  checkDate() {
    if (this.props.day.date.getDate() == this.state.today.getDate() && this.props.day.date.getMonth() == this.state.today.getMonth()  && this.props.day.date.getYear() == this.state.today.getYear()) {
        this.setState({
            isToday: true
        });
    }
  }

  render() {
    return (
      <div className='transition ease-in-out duration-300 group relative p-2 border border-1 rounded-md hover:bg-gray-100'>
        <div className='flex justify-between'>
            <div className={this.state.isToday ? 'w-fit h-fit bg-red-400 rounded-full px-1 text-white' : null}>
                {this.props.day.date.getDate()}
            </div>        
            {/* Percent of year and tooltip */}
            <div className='group/tooltip relative h-fit'>
                <div className='text-red-400'>
                    {this.props.day.percent ? this.props.day.percentVal + '%' : null}
                </div>
                <div className='z-20 absolute invisible bg-gray-700 text-white bottom-full left-1/2 ml-[-30px] p-1 border rounded text-sm group-hover/tooltip:visible'>
                  {this.props.day.percTime}
                </div>
            </div>
        </div>
        <div className='absolute bottom-1 right-1'>
          <button onClick={() => this.setState({...this.state, showEventType: true})} className='group transition opacity-0 ease-in-out duration-300 invisible bg-red-400 px-2 text-white text-lg border rounded-full group-hover:visible group-hover:opacity-100'>
              +
              <div className='transition opacity-0 ease-in-out duration-300 absolute z-50 bottom-full ml-[-35px] text-black text-sm invisible group-focus-within:visible group-focus-within:opacity-100'>
                <EventType/>
              </div>
          </button>
        </div>
      </div>

    );
  }
}

export default DayBlock;
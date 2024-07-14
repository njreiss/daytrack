import { Tomorrow } from 'next/font/google';
import React, { Component } from 'react';

class DayBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
        today: new Date(),
        isToday: false,
        isPercent: false,
        percent: 0,
    };

    // Bind methods if necessary
    
    }

  // Lifecycle methods
  componentDidMount() {
    // This method runs after the component has been rendered to the DOM
    this.checkDate();
    this.checkPercent();

    console.log('Component did mount');
  }

  componentDidUpdate(prevProps, prevState) {
    // This method runs after the component's updates are flushed to the DOM
    if (this.props.date.getDate() != prevProps.date.getDate()) {
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
    if (this.props.date.getDate() == this.state.today.getDate() && this.props.date.getMonth() == this.state.today.getMonth()  && this.props.date.getYear() == this.state.today.getYear()) {
        this.setState({
            isToday: true
        });
    }
  }
  checkPercent() {
    for (const [key, value] of this.props.percents.entries()) {
        if (value.getDate() == this.props.date.getDate() && value.getMonth() == this.props.date.getMonth() && value.getYear() == this.props.date.getYear()) {
            this.setState({
                isPercent: true,
                percent: key
            });
        }
    }
  }

  render() {
    return (
      <div className='p-2 text-xl border border-1 rounded-md'>
        <div className={this.state.isToday ? 'w-fit bg-red-400 rounded-lg' : null}>{this.props.date.getDate()} </div>        
        <div>
            {this.state.isPercent ? this.state.percent : null}
        </div>
    </div>
    );
  }
}

export default DayBlock;
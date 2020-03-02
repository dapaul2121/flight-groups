import 'react-dates/initialize';
// import 'react-dates/lib/css/_datepicker.css';

import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';


import React from 'react'
import CheckboxList from './CheckboxList'
import CheckboxDates from './CheckboxDates'

class MemberForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        firstName: '',
        lastName: '',
        email: '',
        destinations: {},
        datesFree: {}
    };

    
    this.destinations = props.destinations
    this.datesFree = props.datesFree
    this.handleChange = this.handleChange.bind(this);
    this.handleDestinationChange = this.handleDestinationChange.bind(this)
    this.handleMemberSubmit = props.handleMemberSubmit
    this.handleDatesChange = this.handleDatesChange.bind(this)
    }
  
    handleChange(event) {
        const name = event.target.name 
        const value = event.target.value
        console.log(value)
        this.setState((state, props) => {
            state[name] = value
            return state
        });
    }

    handleDestinationChange(event) {
        const name = event.target.name 
        const value = event.target.checked 
        this.setState((state, props) => {
            if (value === true) {
                state.destinations[name] = value
            } else {
                delete state.destinations[name]
            }
            return state
        });
    }

    handleDatesChange(event) {
        const name = event.target.name 
        const value = event.target.checked 
        this.setState((state, props) => {
            if (value === true) {
                state.datesFree[name] = value
            } else {
                delete state.datesFree[name]
            }
            return state
        });
        // const name = event.target.name 
        // const value = event.target.checked 
        // console.log(value)
        // this.setState((state, props) => {
        //     debugger
        //     let target = Object.assign(state.datesFree[name])
        //     if (value === true) {
        //         target.isFree = value
        //     } else {
        //         delete target.isFree
        //     }
        //     state.datesFree[name] = target
        //     return state
        // });
    }
  
    // handleSubmit(event) {
    //   alert('A name was submitted: ' + this.state.firstName);
    //   event.preventDefault();
    // }
  
    render() {
      return (
        <form onSubmit={() => {this.handleMemberSubmit(this.state)}}>
          <label>
            First Name:
            <input type="text" name = 'firstName' value={this.state.firstName} onChange={this.handleChange} />
          </label>
          <label>
            Last Name:
            <input type="text" name = 'lastName' value={this.state.lastName} onChange={this.handleChange} />
          </label>
          <label>
            Email:
            <input type="text" name = 'email' value={this.state.email} onChange={this.handleChange} />
          </label>
          <CheckboxList handleCheckboxChange = {this.handleDestinationChange} allItems = {Object.keys(this.destinations)}/>
          <CheckboxDates datesFree = {this.datesFree} handleDatesChange = {this.handleDatesChange}/>
          
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

  export default MemberForm
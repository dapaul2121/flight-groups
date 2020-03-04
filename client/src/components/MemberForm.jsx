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
    }
  
    render() {
      return (
        <form onSubmit={() => {this.handleMemberSubmit(this.state)}}>
          <label> First Name: </label>
          <input type="text" name = 'firstName' value={this.state.firstName} onChange={this.handleChange} />      
          <label> Last Name: </label>
          <input type="text" name = 'lastName' value={this.state.lastName} onChange={this.handleChange} />
          <label> Email: </label>
          <input type="text" name = 'email' value={this.state.email} onChange={this.handleChange} />
          <CheckboxList handleCheckboxChange = {this.handleDestinationChange} allItems = {Object.keys(this.destinations)}/>
          <CheckboxDates datesFree = {this.datesFree} handleDatesChange = {this.handleDatesChange}/>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

  export default MemberForm
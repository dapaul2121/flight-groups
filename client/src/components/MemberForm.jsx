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
          <div >
            <label style = {{marginBottom: '0px', marginTop: '8px'}}> First Name: </label>
          </div>
          <div>
            <input type="text" name = 'firstName' style = {{textAlign: 'center'}} value={this.state.firstName} onChange={this.handleChange} /> 
          </div>
          <div>   
            <label style = {{marginBottom: '0px', marginTop: '8px'}}> Last Name: </label>
          </div>  
          <div> 
            <input type="text" name = 'lastName' style = {{textAlign: 'center'}} value={this.state.lastName} onChange={this.handleChange} />
          </div>
          <div> 
            <label style = {{marginBottom: '0px', marginTop: '8px'}}> Email: </label>
          </div>
          <div>
            <input type="text" name = 'email'  value={this.state.email} style = {{textAlign: 'center'}} onChange={this.handleChange} />
          </div>
          <CheckboxList handleCheckboxChange = {this.handleDestinationChange} allItems = {Object.keys(this.destinations)}/>
          <CheckboxDates datesFree = {this.datesFree} handleDatesChange = {this.handleDatesChange}/>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

  export default MemberForm
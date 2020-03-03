import React from 'react'
import CheckboxList from './CheckboxList'
import DateList from './DateList'

// import Form from 'react-bootstrap/Button'

import {Form, Button} from 'react-bootstrap'


console.log('Provider  ', Form.Label);

class GroupForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        // _id: null,
        name: '',
        datesFree: {},
        destinations: {},
        members: [],
        flights: []//
    };
      this.handleChange = this.handleChange.bind(this);
      this.handleDestinationChange = this.handleDestinationChange.bind(this)
      this.handleDateChange = this.handleDateChange.bind(this)
      this.airports = ['ORD', 'EUG', 'MSN', 'DFW', 'PDX', 'SEA']
    }
  
    handleChange(event) {
      this.setState({name: event.target.value});
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

    handleDateChange(dateObj, i) {
        this.setState((state, props) => {
            if (dateObj === null) {
                delete state.datesFree[i]
            } else {
                state.datesFree[i] = dateObj
            }
            return state 
            if (dateObj[Object.keys[0]] === null) {
                delete state.datesFree[Object.keys[0]]
                return state
            } else {
                return Object.assign(state.datesFree, dateObj)
            }
        })
    
    }


  
    render() {
      return (
        <Form onSubmit={() => {this.props.handleGroupSubmit(event, this.state)}}>
          <Form.Label> Name: </Form.Label>
            <Form.Control type="text" value={this.state.name} onChange={this.handleChange} />
          
          <CheckboxList allItems = {this.airports} handleCheckboxChange = {this.handleDestinationChange}/>
          <div>Trip Start Date : Trip End Date</div>
          <DateList maxDates = {5} handleDateChange = {this.handleDateChange}/>
          <input type="submit" value="Submit" />
        </Form>
      );
    }
  }

  export default GroupForm
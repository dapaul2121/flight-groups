import React from 'react'
import CheckboxList from './CheckboxList'
import DateList from './DateList'

class GroupForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: '',
        datesFree: {},
        destinations: {},
        members: [],
        flights: []
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
        })
    }

    render() {
      return (
        <form onSubmit={() => {this.props.handleGroupSubmit(event, this.state)}}>
          <div> Travel Group Name: </div>
          <input type="text" value={this.state.name} onChange={this.handleChange} />
          <CheckboxList allItems = {this.airports} handleCheckboxChange = {this.handleDestinationChange} style = {{float: 'left'}}/>
          <div style = {{margin: '20px 0px'}}>Trip Start Date : Trip End Date</div>
          <DateList maxDates = {5} handleDateChange = {this.handleDateChange}/>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

  export default GroupForm
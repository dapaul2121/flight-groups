import React from 'react'

import ItemSelectWrapper from '../styles/ItemSelectWrapper';

class DatePair extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          startDate: '',
          endDate: ''
      };
      this.handleChange = this.handleChange.bind(this);
      this.i = props.i
      this.handleDateChange = props.handleDateChange
    }
  
    handleChange(event) {
        const name = event.target.name
        const value = event.target.value
        this.setState((state, props) => {
            state[name] = value
            return state
        },() => {
            if(this.state.startDate !== '' && this.state.endDate !== '') {
                this.handleDateChange(this.state, this.i)
            } else {
                this.handleDateChange(null, this.i)
            }
        })
    }
  
    render() {
      return (
          <div>
            <ItemSelectWrapper>
              <input type="date" name = "startDate" max = {this.state.endDate} onChange = {this.handleChange}/>
            </ItemSelectWrapper>
            <ItemSelectWrapper>
              <input type="date" name = "endDate"  min = {this.state.startDate} onChange = {this.handleChange}/>
            </ItemSelectWrapper>
          </div>
      );
    }
  }

  export default DatePair
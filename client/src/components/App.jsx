import React from 'react';

import Header from './Header'
import GroupList from './GroupList'
import MemberList from './MemberList'
import FlightList from './FlightList'

const mockState = require('../../../mockData/appState')

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = mockState
        this.getGroupNames = this.getGroupNames.bind(this)
        this.changeSelectedGroup = this.changeSelectedGroup.bind(this)
    }

    getGroupNames() {
        return this.state.groups.map((group) => {
            return group.name
        })
    }

    changeSelectedGroup(newGroupIndex) {
        this.setState({selectedGroup: newGroupIndex})
    }

    render() {
        return (
        <div>
          {/* <div>hello world react app2</div> */}
          {/* <Header /> */}
          <GroupList names = {this.getGroupNames()} selectedGroup = {this.state.selectedGroup} changeSelectedGroup = {this.changeSelectedGroup}/>
          <input type = 'button' value = 'Add Group' onClick = {() => {}}></input>
          <MemberList members = {this.state.groups[this.state.selectedGroup].members}/>
          <input type = 'button' value = 'Add Member'></input>
          <FlightList />
        </div>
        )
    }
}

export default App
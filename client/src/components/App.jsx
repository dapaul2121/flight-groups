import React from 'react';
console.log("helllksjdflkdsjlkfjds")
import axios from 'axios';
import moment from 'moment';

import Header from './Header'
import GroupList from './GroupList'
import MemberList from './MemberList'
import FlightList from './FlightList'
import GroupForm from './GroupForm'
import MemberForm from './MemberForm'

import 'bootstrap/dist/css/bootstrap.css';
const emptyState = require('../../../mockData/appStateEmpty')

import GroupListWrapper from '../styles/GroupListWrapper'
import AppWrapper from '../styles/AppWrapper'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = emptyState

        this.changeSelectedGroup = this.changeSelectedGroup.bind(this)
        this.addGroupView = this.addGroupView.bind(this)
        this.addMemberView = this.addMemberView.bind(this)
        this.setView = this.setView.bind(this)

        this.handleGroupSubmit = this.handleGroupSubmit.bind(this)
        this.handleGroupSubmit = this.handleGroupSubmit
        this.handleMemberSubmit = this.handleMemberSubmit.bind(this)

        this.getGroupNames = this.getGroupNames.bind(this)
        this.getGroupDates = this.getGroupDates.bind(this)
        this.getGroupDestinations = this.getGroupDestinations.bind(this)
        this.getGroupFlightCombos = this.getGroupFlightCombos.bind(this)
    
    }

    componentDidMount() {
        axios.get('/group') 
            .then((response) => {
                if (response.data.length > 0) {
                    this.setState((state, props) => {
                        state.groups = response.data
                        state.currentGroup = 0
                        state.currentView = 'main'
                        return state
                    })
                } else {
                    this.setState((state, props) => {
                        state = emptyState
                        state.currentGroup = 0
                        state.currentView = 'main'
                        return state
                    })
                }
            })
    }

    getGroupNames() {
        return this.state.groups.map((group) => {
            return group.name
        })
    }

    changeSelectedGroup(newGroupIndex) {
        this.setState({selectedGroup: newGroupIndex})
    }

    handleGroupSubmit(event, group) {
        axios.post('/group', group)
            .then((response) => {
                return axios.get('/group') 
            })
            .then((response) => {
                this.setState((state, props) => {
                    state.groups = response.data
                    state.selectedGroup = response.data.length - 1
                    state.currentView = 'main'
                    return state
                })
            })
        event.preventDefault();
      }
    
    handleMemberSubmit(member) {
        axios.patch(`/group/${this.state.groups[this.state.selectedGroup]._id}/member`, {
            newMember: member,
            group: this.state.groups[this.state.selectedGroup]
        })
        .then((response) => {
            return axios.get('/group')
        }).then((response) => {
            this.setState((state, props) => {
                state.groups = response.data
                state.currentView = 'main'
                return state
            }, () => {
                axios.post(`/flight/${this.state.groups[this.state.selectedGroup]._id}`, this.getGroupFlightCombos())
                    .then((response) => {
                        this.setState((state, props) => {
                            state.groups[state.selectedGroup].flights = response.data
                            return state
                    })
                })
            })
        })
        event.preventDefault();
    }

    addGroupView() {
        this.setState({currentView: 'addGroup'})
    }

    addMemberView() {
        this.setState({currentView: 'addMember'})
    }

    getGroupFlightCombos() {
        const flightCombos = []
        const destinations = Object.keys(this.getGroupDestinations())
        const datesObj = this.getGroupDates()
        let dates = []

        for (let i in datesObj) {
            let formattedDate = {}
            formattedDate.outboundpartialdate = moment(datesObj[i].startDate).format('YYYY-MM-DD')
            formattedDate.inboundpartialdate = moment(datesObj[i].endDate).format('YYYY-MM-DD')
            dates.push(formattedDate)
        }
        const country = 'US'
        const currency = 'USD'
        const locale = 'en-US'
        const originplace = 'SFO-sky'
        for (let i = 0; i < destinations.length; i++) {
            for (let j = 0; j < dates.length; j++) {
                let newFlightCombo = {}
                Object.assign(newFlightCombo, {country, currency, locale, originplace})
                newFlightCombo.destinationplace = `${destinations[i]}-sky`
                Object.assign(newFlightCombo, dates[j])
                flightCombos.push(newFlightCombo)
            } 
        }
        return flightCombos
    }

    getGroupDestinations() {
        const currentGroup = this.state.groups[this.state.selectedGroup]
        let destinationsThatWork = Object.assign(currentGroup.destinations)
        for (let i = 0; i < currentGroup.members.length; i++) {
            let memberDestinations = currentGroup.members[i].destinations
            let newDestinationsThatWork = {}
            for (let airport in memberDestinations) {         
                if (destinationsThatWork[airport] === true) {
                    newDestinationsThatWork[airport] = true
                }
            }
            destinationsThatWork = newDestinationsThatWork
        }
        return destinationsThatWork

    }

    getGroupDates() {
        const currentGroup = this.state.groups[this.state.selectedGroup]
        let dateThatWorks = Object.assign(currentGroup.datesFree)
        for (let i = 0; i < currentGroup.members.length; i++) {
            let memberDestinations = currentGroup.members[i].datesFree
            let newDateThatWorks = {}
            for (let i in memberDestinations) {         
                if (dateThatWorks[i] !== undefined) {
                    newDateThatWorks[i] = Object.assign(dateThatWorks[i])
                }
            }
            dateThatWorks = newDateThatWorks
        }
        return dateThatWorks
    }

    setView() {
        if (this.state.currentView === 'main') {
            return (
            <span>
              <GroupListWrapper>
                <GroupList names = {this.getGroupNames()} selectedGroup = {this.state.selectedGroup} 
                 changeSelectedGroup = {this.changeSelectedGroup} />
                <input type = 'button' value = 'Add Group' onClick = {this.addGroupView}></input>
              </GroupListWrapper>
              <GroupListWrapper>
                <MemberList members = {this.state.groups[this.state.selectedGroup].members} />
                <input type = 'button' value = {`Add Member`} onClick = {this.addMemberView}></input>
              </GroupListWrapper>
              <FlightList flights = {this.state.groups[this.state.selectedGroup].flights}/>
            </span>
            )
        } else if (this.state.currentView === 'addGroup') {
            return <GroupForm handleGroupSubmit = {this.handleGroupSubmit}/>
        } else {
            return (
            <MemberForm handleMemberSubmit = {this.handleMemberSubmit} 
             destinations = {this.state.groups[this.state.selectedGroup].destinations}
             datesFree = {Object.assign(this.state.groups[this.state.selectedGroup].datesFree)}/>)
        }
    }

    render() {
        return (
        <AppWrapper>
          <Header view = {this.state.currentView} />
          {this.setView()}
        </AppWrapper>
        )
    }
}

export default App
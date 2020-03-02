import React from 'react';

import axios from 'axios';
import moment from 'moment';

import Header from './Header'
import GroupList from './GroupList'
import MemberList from './MemberList'
import FlightList from './FlightList'
import GroupForm from './GroupForm'
import MemberForm from './MemberForm'


const mockState = require('../../../mockData/appState')
const skyscannerAPI = require('../../../skyscannerAPI')

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = mockState

        this.getGroupNames = this.getGroupNames.bind(this)
        this.changeSelectedGroup = this.changeSelectedGroup.bind(this)
        this.addGroupView = this.addGroupView.bind(this)
        this.addMemberView = this.addMemberView.bind(this)
        this.setView = this.setView.bind(this)
        this.handleGroupSubmit = this.handleGroupSubmit.bind(this)
        this.handleGroupSubmit = this.handleGroupSubmit
        this.handleMemberSubmit = this.handleMemberSubmit.bind(this)

        this.getGroupDates = this.getGroupDates.bind(this)
        this.getGroupDestinations = this.getGroupDestinations.bind(this)
        this.createFlightPromises = this.createFlightPromises.bind(this)

        this.getGroupFlightCombos = this.getGroupFlightCombos.bind(this)
        this.getFlightInfo = this.getFlightInfo.bind(this)
        this.formatFlights = this.formatFlights.bind(this)
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
        this.setState((state, props) => {
            state.groups.push(group)
            state.currentGroup = state.groups.length
            state.currentView = 'main'
            return state
        })
        event.preventDefault();
      }
    
    handleMemberSubmit(member) {
        this.setState((state, props) => {
            state.groups[state.selectedGroup].members.push(member)
            state.currentView = 'main'
            return state
        }, () => {
            // this.getGroupDestinations();
            // this.getGroupDates()})
            // this.getGroupFlightCombos();});
            this.getFlightInfo();});
        event.preventDefault();

    }

    addGroupView() {
        this.setState({currentView: 'addGroup'})
    }

    addMemberView() {
        this.setState({currentView: 'addMember'})
    }

    createFlightPromises() {
        const flightPromises = []
        const flightCombos = this.getGroupFlightCombos()
        for (var i = 0; i < flightCombos.length; i++) {
        let flight = flightCombos[i]
        if (flight) {
            let URL = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/${flight.country}/${flight.currency}/${flight.locale}/${flight.originplace}/${flight.destinationplace}/${flight.outboundpartialdate}/${flight.inboundpartialdate}`
            let axiosFlights = axios.create({
                baseURL: URL,
                headers: {
                    "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
                    "x-rapidapi-key": skyscannerAPI
                    }
              });
            let newFlightPromise = new Promise((res, rej) => { 
                axiosFlights.get('/', {
                    inboundpartialdate: flight.inboundpartialdate
                })
                    .then((response) => {
                        console.log(response)
                        res(response)
                    })
                    .catch((err) => {
                        console.log(err)
                        rej(err)
                    })
                });
            flightPromises.push(newFlightPromise)
            }
        }
    console.log(flightPromises)
    return flightPromises
    }

    getFlightInfo() {
        Promise.all(this.createFlightPromises())
            .then((response) =>{
                let flights = response.map((flight) => {return flight.data})
                const formattedFlights = this.formatFlights(flights)
                this.setState((state, props) => {
                    state.groups[state.selectedGroup].flights = formattedFlights
                    return state

                })
            })


    }

    formatFlights(flights) {
            // origin: 'SFO',
            // destination: 'MSN',
            // startDate: '3/13/20',
            // endDate: '3/20/20',
            // price: 1337,
            // url: 'https://www.skyscanner.com/transport/flights/sfo/msn/200313/200320/?adults=1&children=0'
        const formattedFlightArr = []
        for (let i = 0; i < flights.length; i++) {
            let flight = flights[i]
            let formattedFlight = {}
            if (flight.Quotes.length > 0) {
                formattedFlight.price = flight.Quotes[0].MinPrice
                formattedFlight.startDate = moment(flight.Quotes[0].OutboundLeg.DepartureDate).format('MM-DD-YYYY')
                formattedFlight.endDate = moment(flight.Quotes[0].InboundLeg.DepartureDate).format('MM-DD-YYYY')
                formattedFlight.origin = flight.Places[1].IataCode
                formattedFlight.destination = flight.Places[0].IataCode
                formattedFlight.url = `https://www.skyscanner.com/transport/flights/${formattedFlight.origin}/${formattedFlight.destination}/${moment(formattedFlight.startDate).format('YYMMDD')}/${moment(formattedFlight.endDate).format('YYMMDD')}/?adults=1&children=0`
                formattedFlightArr.push(formattedFlight)
            } 
        }
        console.log(formattedFlightArr)
        return formattedFlightArr

    }

    changeFlightView() {

    }

    getGroupFlightCombos() {
        const flightCombos = []
        const destinations = Object.keys(this.getGroupDestinations())
        const datesObj = this.getGroupDates()
        let dates = []
        // const regex = /\//gi;
        
        for (let i in datesObj) {
            let formattedDate = {}
            formattedDate.outboundpartialdate = moment(datesObj[i].startDate).format('YYYY-MM-DD')
            formattedDate.inboundpartialdate = moment(datesObj[i].endDate).format('YYYY-MM-DD')
            // formattedDate.outboundpartialdate = datesObj[i].startDate.replace(regex, '-') 
            // formattedDate.inboundpartialdate = datesObj[i].endDate.replace(regex, '-') 
            dates.push(formattedDate)
        }
        const country = 'US'
        const currency = 'USD'
        const locale = 'en-US'
        const originplace = 'SFO-sky'
        for (let i = 0; i < destinations.length; i++) {
            // let newFlightCombo = {}
            // Object.assign(newFlightCombo, {country, currency, locale, originplace})
            // newFlightCombo.destinationplace = `${destinations[i]}-sky`
            for (let j = 0; j < dates.length; j++) {
                let newFlightCombo = {}
                Object.assign(newFlightCombo, {country, currency, locale, originplace})
                newFlightCombo.destinationplace = `${destinations[i]}-sky`
                Object.assign(newFlightCombo, dates[j])
                flightCombos.push(newFlightCombo)
            }
            
        }
        console.log(flightCombos)
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
        console.log(destinationsThatWork)
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
        console.log(dateThatWorks)
        return dateThatWorks

    }

    setView() {
        if (this.state.currentView === 'main') {
            return (
                <div>
                    <GroupList names = {this.getGroupNames()} selectedGroup = {this.state.selectedGroup} 
                     changeSelectedGroup = {this.changeSelectedGroup}/>
                    <input type = 'button' value = 'Add Group' onClick = {this.addGroupView}></input>
                    <MemberList members = {this.state.groups[this.state.selectedGroup].members}/>
                    <input type = 'button' value = {`Add Member to "${this.state.groups[this.state.selectedGroup].name}"`} onClick = {this.addMemberView}></input>
                    <FlightList flights = {this.state.groups[this.state.selectedGroup].flights}/>
                </div>
            )
        } else if (this.state.currentView === 'addGroup') {
            return <GroupForm handleGroupSubmit = {this.handleGroupSubmit}/>
        } else {
            return <MemberForm handleMemberSubmit = {this.handleMemberSubmit} 
                    destinations = {this.state.groups[this.state.selectedGroup].destinations}
                    datesFree = {Object.assign(this.state.groups[this.state.selectedGroup].datesFree)}/>
        }
    }

    render() {
        return (
        <div>
          <Header />
          {this.setView()}
        </div>
        )
    }
}

export default App
const axios = require('axios')
const skyscannerAPI = require('../../skyscannerAPI')
const moment = require('moment')

const createFlightPromises = (flightCombos) => {
    const flightPromises = []
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

const formatFlights = (flights) => {
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

const getFlights = (req, res) => {
    console.log(req)
    console.log('that was req.body')
    Promise.all(createFlightPromises(req.body))
        .then((response) =>{
            let flights = response.map((flight) => {return flight.data})
            const formattedFlights = formatFlights(flights)
            console.log(flights)
            res.send(formattedFlights)
        })
}

module.exports.getFlights = getFlights
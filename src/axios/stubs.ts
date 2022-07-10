import {IAirport, IAirportCountry, IAirportRegion, IAirportType, ServerResponse} from "../models/models";

interface GetAirportResponse<T> {
  data: ServerResponse<T>
}

interface GetHandbooksResponse<T> {
  data: Array<T>
}

const stubAirports = [
  {
    id: 1,
    name: '"Der Dingel" Airfiled',
    ident: 'DE-0140',
    local_code: 'DE',
    region: 'DE-HE',
    type: 'small_airport',
    country: 'German'
  } as IAirport,
  {
    id: 12,
    name: '‘S-Gravenvoeren heliport',
    ident: 'EBSN',
    local_code: 'BE',
    region: 'BE-WLG',
    type: 'closed',
    country: 'Belarus'
  } as IAirport,
  {
    id: 13,
    name: '(Old) Gila Bend Airport 1st',
    ident: 'US-1337',
    local_code: 'US',
    region: 'US-AZ',
    type: 'closed',
    country: 'USA'
  } as IAirport,
  {
    id: 22,
    name: '(Old) Puerto Peasco Airport',
    ident: 'MX-SON',
    local_code: 'MX',
    region: 'MMPE',
    type: 'closed',
    country: 'Mexico'
  } as IAirport,
  {
    id: 23,
    name: '02 Ranch Airport',
    ident: 'US-TX',
    local_code: 'US',
    region: 'USA',
    type: 'closed',
    country: 'USA'
  } as IAirport,
  {
    id: 30,
    name: '1 Razryvno-Moiseevskaya Helipad',
    ident: 'RU-TOM',
    local_code: 'RU',
    region: 'RUS',
    type: 'heliport',
    country: 'Russia'
  } as IAirport
]

export const axiosStub = {
  getAirports: (url: string, config: {params: any}): GetAirportResponse<IAirport> => {

    console.log("STUB:", "params=", config.params)

    const result = {
      data: {
        count: 6,
        next: 12,
        previous: 10,
        results: []
      } as ServerResponse<IAirport>
    }

    let airportResult = [...stubAirports]

    if (config.params.search !== undefined) {
      airportResult = airportResult.filter(airport => airport.name.toLowerCase().includes(config.params.search.toLowerCase()))
    }

    if (config.params.page !== undefined) {
      airportResult = airportResult.slice((config.params.page - 1) * config.params.count, config.params.page * config.params.count)
    }

    result.data.results = airportResult
    result.data.count = stubAirports.length

    return result
  },
  getRegions: (): GetHandbooksResponse<IAirportRegion> => {
    return {data: ['DE-HE', 'BE-WLG', 'US-AZ', 'MMPE', 'USA', 'RUS']}
  },
  getTypes: (): GetHandbooksResponse<IAirportType> => {
    return {data: ['small_airport', 'closed', 'heliport']}
  },
  getCountries: (): GetHandbooksResponse<IAirportCountry> => {
    return {data: ['German', 'Belarus', 'USA', 'Mexico', 'Russia']}
  }
}
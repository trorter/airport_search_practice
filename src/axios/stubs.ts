import {IAirport, ServerResponse} from "../models/models";

interface Response<T> {
  data: ServerResponse<T>
}

export const axiosStub = {
  get: (url: string, config: {params: any}): Response<IAirport> => {

    console.log("STUB:", "params=", config.params)

    return {
      data: {
        count: 1101,
        next: 12,
        previous: 10,
        results: [
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
          } as IAirport
        ]
      } as ServerResponse<IAirport>
    }
  }
}
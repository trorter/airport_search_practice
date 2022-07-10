import {IAirport, ServerResponse} from "../models/models";

interface Response<T> {
  data: ServerResponse<T>
}

export const axiosStub = {
  get: (url: string, config: {params: any}): Response<IAirport> => {

    console.log("STUB:", "params=", config.params)

    return {
      data: new class implements ServerResponse<IAirport> {
        count = 1101;
        next = 12;
        previous = 10;
        results = [
          new class implements IAirport {
            id = 1
            name = `"Der Dingel" Airfiled`
            ident = `DE-0140`
            local_code = `DE`
            region = `DE-HE`
            type = `small_airport`
            country = `German`
          }(),
          new class implements IAirport {
            id = 2
            name = `‘S-Gravenvoeren heliport`
            ident = `EBSN`
            local_code = `BE`
            region = `BE-WLG`
            type = `closed`
            country = `Belarus`
          }()
        ];
      }()
    }
  }
}
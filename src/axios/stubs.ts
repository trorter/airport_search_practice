import {IAirport, ServerResponse} from "../models/models";

interface Response<T> {
  data: ServerResponse<T>
}

export const axiosStub = {
  get: (): Response<IAirport> => {
    return {
      data: new class implements ServerResponse<IAirport> {
        counter = 11;
        next = 12;
        previous = 10;
        results = [
          new class implements IAirport {
            id = 1
            name = `"Der Dingel" Airfiled`
            ident = `1`
            local_code = `141`
            region = `Europe`
            type = `stub_1`
            country = `German`
          },
          new class implements IAirport {
            id = 2
            name = `‘S-Gravenvoeren heliport`
            ident = `12`
            local_code = `565`
            region = `Europe`
            type = `stub_2`
            country = `Belarus`
          },
        ];
      }
    }
  }
}
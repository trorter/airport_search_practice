import axios from "../../axios";
import {AppDispatch} from "../index";
import {handbookSlice} from "../slices/handbookSlice";
import {axiosStub} from "../../axios/stubs";
import {IAirportCountry, IAirportRegion, IAirportType} from "../../models/models";

export const fetchHandbooks = (page = 1, count = 50) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(handbookSlice.actions.fetching())

      let response
      if (process.env.REACT_APP_STUB_MODE === 'false') {
        response = await Promise.all([
          axios.get<Array<IAirportType>>('handbooks/airport-types', {}),
          axios.get<Array<IAirportRegion>>('handbooks/regions', {}),
          axios.get<Array<IAirportCountry>>('handbooks/countries', {}),
        ])
      } else {
        response = [
          axiosStub.getTypes(),
          axiosStub.getRegions(),
          axiosStub.getCountries()
        ]
      }
      //
      console.log(response)
      dispatch(handbookSlice.actions.fetchSuccess(
        {
        types: response[0].data,
        regions: response[1].data,
        countries: response[2].data,
      }))
    } catch (e) {
      // dispatch(airportSlice.actions.fetchError(e as Error))
    }
  }
}
import axios from "../../axios";
import {AppDispatch} from "../index";
import {IAirport, ServerResponse} from "../../models/models";
import {airportSlice} from "../slices/airportSlice";
import {axiosStub} from "../../axios/stubs";

export const fetchAirports = (page = 1, count = 50) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(airportSlice.actions.fetching())

      let response
      if (process.env.REACT_APP_STUB_MODE === 'false') {
        response = await axios.get<ServerResponse<IAirport>>("airports", {
          params: {page, count}
        })
      } else {
        response = axiosStub.getAirports("airports", {
          params: {page, count}
        })
      }

      dispatch(airportSlice.actions.fetchSuccess({
        airports: response.data.results,
        count: response.data.count
      }))
    } catch (e) {
      dispatch(airportSlice.actions.fetchError(e as Error))
    }
  }
}
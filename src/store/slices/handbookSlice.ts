import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IAirportCountry, IAirportRegion, IAirportType} from "../../models/models";

interface HandbookState {
  loading: boolean
  types: Array<IAirportType>
  regions: Array<IAirportRegion>
  countries: Array<IAirportCountry>
}

const initialState: HandbookState = {
  loading: false,
  types: [],
  regions: [],
  countries: []
}

interface HandbookPayload {
  types: Array<IAirportType>
  regions: Array<IAirportRegion>
  countries: Array<IAirportCountry>
}

export const handbookSlice = createSlice({
  name: 'handbook',
  initialState,
  reducers: {
    fetching(state) {
      state.loading = true
    },
    fetchSuccess(state, action: PayloadAction<HandbookPayload>) {
      state.loading = false

      state.types = action.payload.types
      state.regions = action.payload.regions
      state.countries = action.payload.countries
    }
  }
})

export default handbookSlice.reducer
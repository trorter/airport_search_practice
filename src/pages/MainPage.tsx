import AirportSearch from "../components/AirportSearch";
import AirportFilter from "../components/AirportFilter";
import AirportCard from "../components/AirportCard";
import {useEffect} from "react";
import {fetchAirports} from "../store/actions/airportActions";
import {useAppDispatch, useAppSelector} from "../hooks/redux";

export function MainPage() {

  const dispatch = useAppDispatch()

  const {error, loading, airports} = useAppSelector(state => state.airport)

  useEffect(() => {
    dispatch(fetchAirports())
  }, [])

  return (
    <div className={"container mx-auto max-w-[760px] pt-5"}>
      <AirportSearch />

      <AirportFilter />

      {
        airports.map(airport => <AirportCard key={airport.id} airport={airport} />)
      }
    </div>
  )
}
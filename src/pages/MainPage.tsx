import AirportSearch from "../components/AirportSearch";
import AirportFilter from "../components/AirportFilter";
import AirportCard from "../components/AirportCard";
import {useEffect} from "react";
import {fetchAirports} from "../store/actions/airportActions";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import ReactPaginate from "react-paginate";


export function MainPage() {

  const dispatch = useAppDispatch()

  const {error, loading, airports} = useAppSelector(state => state.airport)

  const pageCount = 10
  const pageChangeHandler = ({selected}: { selected: number }) => {
    console.log(selected)
  }

  useEffect(() => {
    dispatch(fetchAirports())
  }, [])

  return (
    <div className={"container mx-auto max-w-[760px] pt-5"}>
      <AirportSearch />

      <AirportFilter />

      {
        loading && <p className={"text-center text-lg"}>Loading...</p>
      }

      {
        error && <p className={"text-center text-lg text-red-600"}>{error}</p>
      }

      {
        airports.map(airport => <AirportCard key={airport.id} airport={airport} />)
      }

      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={pageChangeHandler}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="< previous"
        // renderOnZeroPageCount={null}
      />

    </div>
  )
}
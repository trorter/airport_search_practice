import {FC, useEffect, useState} from "react";
import {useInput} from "../hooks/input";
import {useDebounce} from "../hooks/debounce";
import axios from "../axios/index";
import {IAirport, ServerResponse} from "../models/models";
import {useNavigate} from "react-router-dom";

const AirportSearch: FC = () => {

  const navigate = useNavigate()
  const input = useInput('')
  const debounce = useDebounce<string>(input.value)

  const [airports, setAirports] = useState<Array<IAirport>>([])
  const [dropdown, setDropdown] = useState(false)

  async function searchAirports() {
    const response = await axios.get<ServerResponse<IAirport>>("airports", {params: {search: debounce, count: 10}})
    setAirports(response.data.results)
  }

  useEffect(() => {
    if (3 < debounce.length) {
      searchAirports().then(() => setDropdown(true))
    } else {
      setDropdown(false)
    }
  }, [debounce])

  return (
    <div className={"mb-4 relative"}>
      <input
        type={"text"}
        className={"border py-2 px-4 outline-0 w-full h-[42px]"}
        placeholder={"Type something here..."}
        {...input}
      />

      {dropdown && <ul className={"list-none absolute left-0 top-[42px] right-0 h-[200px] shadow-md bg-white overflow-y-scroll"} >
        {
          airports.map(airport => (
            <li
              key={airport.id}
              className={"py-2 px-4 mb-2 hover:bg-gray-500 hover:transition-colors cursor-pinter hover:text-white"}
              onClick={() => navigate(`/airport/${airport.id}`)}
            >
              {airport.name}
            </li>
          ))
        }
      </ul>}
    </div>
  )
}

export default AirportSearch
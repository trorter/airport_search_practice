import {ChangeEvent, FC, useEffect, useState} from "react";
import {useAppSelector} from "../hooks/redux";
import {IFilter} from "../models/models";

const AirportFilter: FC = () => {

  const {regions, countries, types, loading} = useAppSelector(state => state.handbook)
  const [filter, setFilter] = useState<IFilter>({
    type: '',
    country: '',
    region: ''
  })

  const [hasFilter, setHasFilter] = useState(false)

  const isFilterEnabled = () => {
    return filter.country || filter.region || filter.type
  }

  useEffect(() => {
    if (isFilterEnabled()) {
      setHasFilter(true)
    } else {
      setHasFilter(false)
    }
  }, [filter])


  if (loading) {
    return <p className={"text-center"}>Loading...</p>
  }

  const changeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setFilter(prev => ({...prev, [event.target.name]: event.target.value}))
  }

  const clearFilter = () => {
    setFilter({
      type: '',
      country: '',
      region: ''
    })
  }

  return (
    <div className={"border py-2 px-4 mb-2"} >
      <span className={"font-bold mr-2"}>Filter</span>

      <select
        name={"type"}
        className={"mr-2 border py-1 px-2"}
        onChange={changeHandler}
        value={filter.type}
      >
        <option value={""} disabled>Type</option>
        {
          types.map(t => <option key={t}>{t}</option>)
        }
      </select>

      <select
        name={"country"}
        className={"mr-2 border py-1 px-2"}
        onChange={changeHandler}
        value={filter.country}
      >
        <option value={""} disabled>Country</option>
        {
          countries.map(c => <option key={c}>{c}</option>)
        }
      </select>

      <select
        name={"region"}
        className={"border py-1 px-2 mr-4"}
        onChange={changeHandler}
        value={filter.region}
      >
        <option value={""} disabled>Region</option>
        {
          regions.map(r => <option key={r}>{r}</option>)
        }
      </select>

      {
        hasFilter && <button
          className={"py-1 px-4 bg-red-700 text-white rounded"}
          onClick={clearFilter}
        >
          &times;
        </button>
      }
    </div>
  )
}

export default AirportFilter
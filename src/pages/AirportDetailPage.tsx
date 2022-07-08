import {useParams} from "react-router-dom";

export function AirportDetailPage() {

  const {id} = useParams<{id: string}>()

  return (
    <div className={"container mx-auto pt-5 max-w-[760px]"}>
      <h1>Airport id - {id}</h1>
    </div>
  )
}
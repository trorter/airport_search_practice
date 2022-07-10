import React, {FC, useEffect} from 'react';
import {Routes, Route} from "react-router-dom";
import {MainPage} from "./pages/MainPage";
import {AuthPage} from "./pages/AuthPage";
import {AirportDetailPage} from "./pages/AirportDetailPage";
import Navigation from "./components/Navigation";
import {useAppDispatch} from "./hooks/redux";
import {fetchHandbooks} from "./store/actions/handbookActions";

const App: FC = () => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchHandbooks())
  }, [dispatch])


  return (
    <>
      <Navigation />
      <Routes>
        <Route path={"/"} element={<MainPage />} />
        <Route path={"/auth"} element={<AuthPage />} />
        <Route path={"/airport/:id"} element={<AirportDetailPage />} />
      </Routes>
    </>
  )
}

export default App

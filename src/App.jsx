/* eslint-disable no-unused-vars */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Analytic from "./pages/analytic";
import Apps from "./pages/apps";
import Crm from "./pages/crm";
import Revenue from "./pages/revenue";
import Home from "./pages/home";
import Nav from "./components/general/nav";
import FixedSideNav from "./components/general/fixedSideNav";
import "./App.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { FilterContext } from "./components/revenue/filterContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <FixedSideNav />
        <Routes>
          <Route
            path="/"
            index
            element={
              <FilterContext>
                <Revenue />
              </FilterContext>
            }
          />
          <Route path="/home" element={<Home />} />
          <Route path="/crm" element={<Crm />} />
          <Route path="/analytic" element={<Analytic />} />
        </Routes>
        <ToastContainer
          position="top-left"
          autoClose={5000}
          hideProgressBar={true}
          theme="light"
        />
      </BrowserRouter>
    </>
  );
}

export default App;

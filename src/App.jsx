import { BrowserRouter, Routes, Route } from "react-router-dom";
import Analytic from "./pages/analytic";
import Apps from "./pages/apps";
import Crm from "./pages/crm";
import Revenue from "./pages/revenue";
import Home from "./pages/home";
import Nav from "./components/general/nav";
import "./App.scss";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route index element={<Revenue />} />
          <Route path="/crm" element={<Crm />} />
          <Route path="/apps" element={<Apps />} />
          <Route path="/analytic" element={<Analytic />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

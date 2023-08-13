import MainLayout from "./components/layout/MainLayout";
import { Router, Route, Routes } from "react-router-dom";
import PlatFormLaunch from "./components/platformLaunch/platFormLaunch";
import Chart from "./components/marketingPlan/Chart";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<PlatFormLaunch />}></Route>
          <Route path="/marketingPlan" element={<Chart />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;

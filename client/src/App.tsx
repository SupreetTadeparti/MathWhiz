import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./routes/Landing";
import Home from "./routes/Generator";
import Background from "./components/Background";
import { useState } from "react";

function App() {
  let [monochrome, setMonochrome] = useState(false);
  let [progress, setProgress] = useState(false);

  return (
    <>
      <Background monochrome={monochrome} progress={progress} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing setMonochrome={setMonochrome} />} />
          <Route
            path="/generator"
            element={
              <Home setMonochrome={setMonochrome} setProgress={setProgress} />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./routes/Landing";
import Generator from "./routes/Generator";
import Vault from "./routes/Vault";
import Background from "./components/Background";
import Viewer from "./routes/Viewer";
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
              <Generator setMonochrome={setMonochrome} setProgress={setProgress} />
            }
          />
          <Route path="/vault" element={<Vault />} />
          <Route
            path="/viewer"
            element={
              <Viewer setMonochrome={setMonochrome} setProgress={setProgress} />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

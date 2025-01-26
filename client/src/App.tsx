import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./routes/Landing";
import Home from "./routes/Home";
import Background from "./components/Background";
import { useState } from "react";

function App() {
  let [monochrome, setMonochrome] = useState(false);

  return (
    <>
      <Background monochrome={monochrome} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing setMonochrome={setMonochrome} />} />
          <Route path="/app" element={<Home setMonochrome={setMonochrome} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";

// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <>
//       <h1 class="text-3xl font-bold underline">Hello world!</h1>
//     </>
//   );
// }

// export default App;

import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import User from "./pages/User";
import Album from "./pages/Album";
import Photo from "./pages/Photo";

function App() {
  return (
    <Router>
      <div className="">
        <h1 className="text-2xl lg:text-3xl text-center font-bold mb-4 my-8">
          PhotoApp
        </h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/album/:id" element={<Album />} />
          <Route path="/photo/:id" element={<Photo />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;

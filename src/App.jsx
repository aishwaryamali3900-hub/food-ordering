import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Order from "./pages/Order";
import Orders from "./pages/Orders";

import "./App.css";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/menu"
          element={<Menu />}
        />

        <Route
          path="/order/:id"
          element={<Order />}
        />

        <Route
          path="/orders"
          element={<Orders />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
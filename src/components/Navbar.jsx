import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        🍴 Food Ordering
      </div>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/orders">My Orders</Link>
      </div>

    </nav>
  );
}

export default Navbar;
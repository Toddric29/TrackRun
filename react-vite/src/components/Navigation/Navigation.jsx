import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <NavLink className='nav-link' to="/">Home</NavLink>
        </div>
        <div className="navbar-middle">
        <NavLink className='nav-link' to='/training-plans'>Training Plans</NavLink>
        </div>
        <div className="navbar-right">
        <ProfileButton />
        </div>
    </nav>
  );
}

export default Navigation;

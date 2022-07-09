import {NavLink} from "react-router-dom";

export const Navbar = () => {

  return (
        <nav>
          <div className="nav-wrapper blue darken-1" style={{padding: '0 2rem'}}>
            <span className="brand-logo">Доставка Їжі</span>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><NavLink to={'/'}>Головна</NavLink></li>
              <li><NavLink to={'/cart'}>Корзина</NavLink></li>
            </ul>
          </div>
        </nav>
  )
}

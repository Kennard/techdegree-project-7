import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {  
   return (
    <nav className="main-nav">
        <ul>
          <li><NavLink to="/search/whales">Whales</NavLink></li>
          <li><NavLink to="/search/lakes">Lakes</NavLink></li>
          <li><NavLink to="/search/cupcakes">Cupcakes</NavLink></li>
        </ul>
  
    </nav>

    );
}


export default Nav;
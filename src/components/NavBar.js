import React, { Component } from 'react'
import { Link } from "react-router-dom";
export class Navbar extends Component {
  render() {
    return (
      <div className="navbar bg-primary">
        <div className="navbar bg-primary">
        Hello users
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/create">Create Product</Link>
          </li>
          <li>
            <Link to="/index">Products</Link>
          </li>
        </ul>
      </div>
      </div>
    )
  }
}

export default Navbar
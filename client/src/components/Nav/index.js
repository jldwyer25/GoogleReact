import React from "react";
import "./style.css";

function Nav() {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <a className="navbar-brand" href="/">
        Google Book Search
      </a>
      <br></br>
      <a className="Books" href="/books">Books</a>
    </nav>
  );
}

export default Nav;
import * as React from "react";
import { Component } from "react";

class Navigation extends Component {
  state = {
    pages: [
      { name: "Home", active: false },
      { name: "Producten", active: true },
      { name: "Over", active: false },
      { name: "Contact", active: false }
    ]
  };

  render() {
    return (
      <div className="header">
        <img
          className="header__logo"
          src="https://uilogos.co/img/logotype/circle.png"
          title="Company Logo"
          alt="Company Logo"
        />
        <nav className="menu">
          {this.state.pages.map(page => (
            <ul className={page.active ? "menu__item--active" : "menu__item"}>
              {page.name}
            </ul>
          ))}
        </nav>
      </div>
    );
  }
}

export default Navigation;

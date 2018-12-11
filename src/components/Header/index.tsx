import * as React from "react";
import ReactSVG from "react-svg";
import photoSrc from "../../static/img/camera-retro.svg";
import "./header.sass";

const Header = (props: any) => (
  <div className="header">
    <div className="logo">
      <ReactSVG svgClassName="logo__svg" src={photoSrc} />
    </div>
    <div className="logo-type">SapientPhoto</div>
    <div className="header__search-form">
      <input className="header__search-form__input" />
      <button className="header__search-form__button">
        Search
      </button>
    </div>
  </div>
);

export default Header;

import * as React from "react";
import ReactSVG from "react-svg";
import photoSrc from "../../static/img/camera-retro.svg";
import "./header.sass";

class Header extends React.Component<any> {
  public render() {
    const {
      handleQueryChange,
      handleGetPhotos,
      searchTerm,
      currentSearchTerm
    } = this.props;
    const { handleKeyPress } = this;

    return (
      <div className="header">
        <div className="logo">
          <ReactSVG svgClassName="logo__svg" src={photoSrc} />
        </div>
        <div className="logo-type">SapientPhoto</div>
        <div className="header__search-form">
          <input
            onChange={handleQueryChange}
            onKeyPress={handleKeyPress}
            value={searchTerm}
            className="header__search-form__input"
          />
          <button
            onClick={handleGetPhotos}
            className="header__search-form__button"
          >
            Search
          </button>
        </div>
        {currentSearchTerm ? <div>Showing: {currentSearchTerm}</div> : null}
      </div>
    );
  }
  private handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      this.props.handleGetPhotos();
    }
  };
}

export default Header;

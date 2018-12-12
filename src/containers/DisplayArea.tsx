import * as React from "react";
import { debounce, throttle } from "lodash";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { getPhotos } from "../store/actions/photos";
import DisplayGrid from "../components/DisplayGrid";

const KEY_RESOLUTION_WIDTH = 1400;

interface IDisplayAreaState {
  width: number;
}

class DisplayArea extends React.Component<any> {
  public state: IDisplayAreaState = {
    width: window.innerWidth
  };
  private events: any;

  public componentDidMount() {
    this.createEvents();
    this.onResize();
    window.addEventListener("scroll", this.events.onScroll, false);
    window.addEventListener("resize", this.events.onResize, false);
  }

  public componentWillUnmount() {
    window.removeEventListener("scroll", this.events.onScroll, false);
    window.removeEventListener("resize", this.events.onResize, false);
  }

  public render() {
    return (
      <DisplayGrid {...this.props} numberOfColumns={this.countColumns()} />
    );
  }
  private countColumns = () => {
    const { width } = this.state;
    if (width > KEY_RESOLUTION_WIDTH) {
      return 5;
    }
    return Math.max(1, Math.floor(width / (KEY_RESOLUTION_WIDTH / 5)));
  };
  private createEvents = () => {
    this.events = {
      onScroll: debounce(this.onScroll, 500, { leading: true }),
      onResize: throttle(this.onResize, 500, { leading: false })
    };
    return this.events;
  };
  private onScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      this.props.photo.length &&
      !this.props.loading
    ) {
      const { searchTerm, searchType } = this.props;
      this.props.actions.getPhotosOnScroll(searchTerm, searchType);
    }
  };
  private onResize = () => {
    this.setState({ width: window.innerWidth });
  };
}

const mapStateToProps = (state: any) => {
  const { photos, loading } = state;
  const { photo, pageNumber, searchTerm, searchType } = photos;
  return {
    loading,
    photo,
    pageNumber,
    searchTerm,
    searchType
  };
};

const mapDispatchToProps = (dispatch: Dispatch, getState: any): any => ({
  actions: {
    getPhotosOnScroll: bindActionCreators(
      (searchTerm, searchType) => getPhotos(searchTerm, searchType),
      dispatch
    )
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayArea);

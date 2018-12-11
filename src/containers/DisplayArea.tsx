import * as React from "react";
import { debounce } from "lodash";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { getPhotos } from "../store/actions/photos";

class DisplayArea extends React.Component<any> {
  public componentDidMount() {
    window.addEventListener(
      "scroll",
      debounce(this.onScroll, 500, { leading: true }),
      false
    );
  }

  public componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
  }

  public render() {
    return (
      <div>
        <pre>{JSON.stringify(this.props, null, 2)}</pre>
      </div>
    );
  }

  private onScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      this.props.photo.length
    ) {
      const { searchTerm, searchType } = this.props;
      console.log({ searchTerm, searchType });
      this.props.actions.getPhotosOnScroll(searchTerm, searchType);
    }
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

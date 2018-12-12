import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { getPhotos } from "../store/actions/photos";
import Header from "../components/Header";

interface ISearchAreaState {
  searchTerm: string;
  searchType: string;
}
export class SearchArea extends React.Component<any, ISearchAreaState> {
  constructor(props: any) {
    super(props);
    this.state = { searchTerm: "", searchType: "tags" };
  }
  public render() {
    const { handleQueryChange, handleGetPhotos } = this;
    const { searchTerm, searchType } = this.state;
    const { currentSearchTerm } = this.props;
    return (
      <Header
        handleQueryChange={handleQueryChange}
        handleGetPhotos={handleGetPhotos}
        searchTerm={searchTerm}
        searchType={searchType}
        currentSearchTerm={currentSearchTerm}
      />
    );
  }
  private handleQueryChange = (event: any) => {
    this.setState({ searchTerm: event.target.value });
  };

  private handleGetPhotos = async () => {
    const { searchTerm, searchType } = this.state;
    if (searchTerm && searchTerm.length) {
      this.props.actions.getInitialPhotos(searchTerm, searchType);
      this.setState({ searchTerm: "" });
    }
  };
}

const mapStateToProps = (state: any) => ({
  currentSearchTerm: state.photos.searchTerm ? state.photos.searchTerm : null
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    getInitialPhotos: bindActionCreators(
      (searchTerm: string, searchType: string) =>
        getPhotos(searchTerm, searchType),
      dispatch
    )
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchArea);

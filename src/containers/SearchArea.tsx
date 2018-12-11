import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { getInitialPhotos } from "../store/actions/photos";
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
    const { handleQueryChange, handleGetPhotos, handleChangeSearchType } = this;
    const { searchTerm, searchType } = this.state;
    return (
      <Header
        handleQueryChange={handleQueryChange}
        handleGetPhotos={handleGetPhotos}
        handleChangeSearchType={handleChangeSearchType}
        searchTerm={searchTerm}
        searchType={searchType}
      />
    );
  }
  private handleChangeSearchType = (event: any): void => {
    this.setState({ searchType: event.target.value });
  };
  private handleQueryChange = (event: any): void => {
    this.setState({ searchTerm: event.target.value });
  };
  private handleGetPhotos = (): void => {
    this.props.actions.getInitialPhotos(
      this.state.searchTerm,
      this.state.searchType
    );
    this.setState({ searchTerm: "" });
  };
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    getInitialPhotos: bindActionCreators(
      (searchTerm: string, searchType: string) =>
        getInitialPhotos(searchTerm, searchType),
      dispatch
    )
  }
});

export default connect(
  null,
  mapDispatchToProps
)(SearchArea);

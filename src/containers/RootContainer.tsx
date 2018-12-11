import * as React from "react";
import { connect } from "react-redux";
import { IFlickrResponse } from "../types";
import DisplayArea from "./DisplayArea";
import SearchArea from "./SearchArea";

interface IRootContainerState {
  next?: () => () => Promise<IFlickrResponse>;
}
export class RootContainer extends React.Component<any, IRootContainerState> {
  constructor(props: any) {
    super(props);
    this.state = { next: undefined };
  }
  public render() {
    const { next } = this.state;
    const { setNextApiCall, executeApiCall } = this;
    return (
      <>
        <DisplayArea executeApiCall={executeApiCall} />
        <SearchArea
          executeApiCall={executeApiCall}
          setNextApiCall={setNextApiCall}
        />
      </>
    );
  }
  private setNextApiCall = (
    apiCall: () => () => Promise<IFlickrResponse>
  ): Promise<void> =>
    new Promise(resolve => {
      this.setState({ next: apiCall }, resolve);
    });
  private executeApiCall = async (): void => {
    if (!this.state.next || this.props.loading) {
      return;
    }
    const next = await this.state.next();
    this.setNextApiCall({ next });
  };
}

const mapStateToProps = (state: any) => ({
  loading: state.loading
});

export default connect(
  mapStateToProps,
  null
)(RootContainer);

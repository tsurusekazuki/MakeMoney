import React from "react";
import { connect } from "react-redux";
import { getPosts, patchPostFavorite, getTags } from "./../actions";
import Toppage from "./../components/TopPage/TopPage";

const mapStateToProps = state => ({
  postIndex: state.postIndex.postIndex,
  allTags: state.cosme.allTags
});

const mapDispatchToProps = dispatch => ({
  getPosts: () => dispatch(getPosts()),
  getTags: () => dispatch(getTags()),
  patchPostFavorite: (id, data) => dispatch(patchPostFavorite(id, data))
});

class ToppageContainer extends React.Component {
  componentDidMount() {
    this.props.getPosts();
    this.props.getTags();
  }
  render() {
    return (
      <Toppage
        posts={this.props.postIndex}
        allTags={this.props.allTags}
        patchPostFavorite={this.props.patchPostFavorite}
      />
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ToppageContainer);

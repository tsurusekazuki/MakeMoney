import React from "react";
import { connect } from "react-redux";
import { getPostDetail, getRelatedCosmes } from "./../actions";
import PostDetail from "./../components/TopPage/PostDetail";

const mapStateToProps = state => ({
  postDetail: state.postDetail.postDetail,
  tags: state.cosme.tags
});

const mapDispatchToProps = dispatch => ({
  getPostDetail: id => dispatch(getPostDetail(id)),
  getRelatedCosmes: id => dispatch(getRelatedCosmes(id))
});

class PostDetailContainer extends React.Component {
  componentDidMount() {
    const path = window.location.pathname;
    const id = path.replace(/[^0-9]/g, "");
    this.props.getPostDetail(id);
    this.props.getRelatedCosmes(id);
  }
  render() {
    return (
      <PostDetail
        getPostDetail={getPostDetail}
        postDetail={this.props.postDetail}
        tags={this.props.tags}
      />
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetailContainer);

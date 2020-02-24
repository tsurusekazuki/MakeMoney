import React from "react";
import { connect } from "react-redux";
import { getCosmes, submitPost, submitCosmes } from "./../actions";

import CreateForm from "./../components/CreateForm/CreateForm";

const mapStateToProps = state => ({
  cosmes: state.cosme.cosmes
});

const mapDispatchToProps = dispatch => ({
  getCosmes: () => dispatch(getCosmes()),
  submitCosmes: data => dispatch(submitCosmes(data)),
  submitPost: data => dispatch(submitPost(data))
});

const CreatFormContainer = ({
  submitPost,
  getCosmes,
  submitCosmes,
  cosmes
}) => {
  return (
    <CreateForm
      submitPost={submitPost}
      getCosmes={getCosmes}
      submitCosmes={submitCosmes}
      cosmes={cosmes}
    />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatFormContainer);

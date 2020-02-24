import { POST_DETAIL } from "./../constants/actionTypes";
const initialState = {
  postDetail: {}
};
export default (state = initialState, action) => {
  switch (action.type) {
    case POST_DETAIL:
      const data = action.response.data;
      return { postDetail: data };
    default:
      return state;
  }
};

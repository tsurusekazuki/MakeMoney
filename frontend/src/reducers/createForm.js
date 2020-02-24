import { SELECT_COSME } from "./../constants/actionTypes";
import { SUBMIT_POST } from "./../constants/actionTypes";

export default (create_form = {}, action) => {
  switch (action.type) {
    case SELECT_COSME:
      const data = action.response.data;
      return { ...create_form, data };
    case SUBMIT_POST:
      return { ...create_form };
    default:
      return create_form;
  }
};

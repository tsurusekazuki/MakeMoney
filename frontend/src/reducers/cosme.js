import {
  GET_COSMES,
  SUBMIT_COSMES,
  GET_RELATED_COSMES,
  GET_TAGS
} from "./../constants/actionTypes";
const initialState = {
  cosmes: [],
  tags: [],
  allTags: []
};
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_COSMES:
      const data = action.data;
      const newData = data.map(element => {
        const Obj = {};
        Obj["id"] = String(element.id);
        Obj["text"] = String(element.text);
        return Obj;
      });
      return { ...initialState, cosmes: newData };

    case GET_RELATED_COSMES:
      const data2 = action.data;
      return { ...initialState, tags: data2 };

    case GET_TAGS:
      const data3 = action.data;
      return { ...initialState, allTags: data3 };
    case SUBMIT_COSMES:
      return state;
    default:
      return state;
  }
};

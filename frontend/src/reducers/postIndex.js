import { GET_POSTS, PATCH_POST_FOR_FAVORITE } from "./../constants/actionTypes";
const initialState = {
  postIndex: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      const data = action.data;
      return { postIndex: data };
    case PATCH_POST_FOR_FAVORITE:
      const data3 = action.data;
      const filterByID = item => {
        if (item.id !== data3.id) {
          return true;
        }
        return false;
      };
      const newPostIndex = state.postIndex.filter(filterByID);
      const newPostIndex2 = [...newPostIndex, data3];
      newPostIndex2.sort((a, b) => {
        if (a.favorite_count > b.favorite_count) return -1;
        if (a.favorite_count < b.favorite_count) return 1;
        return 0;
      });
      return { postIndex: newPostIndex2 };
    default:
      return state;
  }
};

import { combineReducers } from "redux";
import createForm from "./createForm";
import postDetail from "./postDetail";
import postIndex from "./postIndex";
import cosme from "./cosme";

export default combineReducers({ createForm, postDetail, postIndex, cosme });

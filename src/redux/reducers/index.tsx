import { combineReducers } from "redux";
import currentFolderReducer from "./currentFolderReducer";
import CreateReducer from "./CreateReducer";
import searchFolderReducer from "./searchFolderReducer";
import setDisplayVal from "./setDisplay";

const rootReducer = combineReducers({
  fileFolder: CreateReducer,
  currentFolder: currentFolderReducer,
  search: searchFolderReducer,
  setDisplay:setDisplayVal,
});


export default rootReducer;

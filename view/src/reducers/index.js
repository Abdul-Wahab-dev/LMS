import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import news from "./newsReducer";
import complainsReducer from "./complainReducer";
import officalDocsReducer from "./officalDocsReducer";
import assignmentReducer from "./assignmentReducer";
import fypReducer from "./fypReducer";
import eventReducer from "./eventReducer";
import sliderReducer from "./sliderReducer";
import programAndBatchReducer from "./programAndBatchReducer";
import quoteReducer from "./quoteReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  complain: complainsReducer,
  news,
  officalDocs: officalDocsReducer,
  assignment: assignmentReducer,
  fyp: fypReducer,
  events: eventReducer,
  slider: sliderReducer,
  programAndBatch: programAndBatchReducer,
  quote: quoteReducer,
});

import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import usersReducer from "./users";
import plansReducer from "./training_plans";
import activitiesReducer from "./activities";
import planCommentsReducer from "./training_plan_comments";
import activityCommentsReducer from "./activity_comments";
import tagsReducer from "./tags";

const rootReducer = combineReducers({
  session: sessionReducer,
  userState: usersReducer,
  plans: plansReducer,
  activities: activitiesReducer,
  planComments: planCommentsReducer,
  activityComments: activityCommentsReducer,
  tags: tagsReducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;

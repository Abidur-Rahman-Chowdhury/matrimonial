import { combineReducer } from "./rootReducer";

const { configureStore } = require("@reduxjs/toolkit");

export const store = () =>
  configureStore(
    {
      reducer: combineReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
      // middleware: [thunk, logger],

      devTools: process.env.NODE_ENV !== "production",
    }
    // applyMiddleware()
  );

// const store = createStore(()=>[], {}, applyMiddleware());

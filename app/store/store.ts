import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./authSlice";
import packagesReducer from "./packagesSlice";
import usersReducer from "./usersSlice";
import companiesReducer from "./companiesSlice";

export const store = configureStore({
  reducer: {
    // auth: authReducer,
    packages: packagesReducer,
    users: usersReducer,
    companies: companiesReducer,
  },
  middleware: (gDM) => gDM({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

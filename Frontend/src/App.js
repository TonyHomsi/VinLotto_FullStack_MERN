import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Users from "./user/pages/Users";
import UserProfiles from "./profiles/pages/UserProfiles";
import UpdateProfile from "./profiles/pages/UpdateProfile";
import Video from "./profiles/pages/Video";
import Auth from "./user/pages/Auth";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";
import Swish from "./profiles/pages/Swish";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Video />
        </Route>
        <Route path="/user" exact>
          <Users />
        </Route>
        <Route path="/:userId/profiles" exact>
          <UserProfiles />
        </Route>
        <Route path="/profiles/swish" exact>
          <Swish />
        </Route>
        <Route path="/profiles/:profileId">
          <UpdateProfile />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Video />
        </Route>
        <Route path="/user" exact>
          <Users />
        </Route>
        <Route path="/:userId/profiles" exact>
          <UserProfiles />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Switch>{routes}</Switch>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;

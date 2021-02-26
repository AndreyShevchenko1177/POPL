import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/auth/sign-in";
import Profiles from "./pages/profiles";
import PoplsItem from "./pages/popls";
import Connections from "./pages/connections";
import ClipApp from "./pages/clipApp";
import SignUp from "./pages/auth/sign-up";
import Dashboard from "./pages/dashboard";
import PrivateRoute from "./core/PrivateRoute";
import setAxios from "./config/axios.config";
import RealTimeAnalytics from "./pages/analytics";
import NewProfile from "./pages/newProfile";
import CrmIntegrations from "./pages/crmIntegrations";
import Campaigns from "./pages/campaigns";
import PopBranding from "./pages/popBranding";

setAxios();

function titleCase(str) {
  return str.replace(/(^|\s)\S/g, (t) => t.toUpperCase());
}

export default function App() {
  const profileData = useSelector(({ authReducer }) => authReducer.signIn.data);
  return (
    <Router>
      <Switch>
        {/* <Main> */}
        <Route path="/sign-up" exact>
          <SignUp />
        </Route>
        <Route path="/sign-in" exact>
          <Login />
        </Route>
        <PrivateRoute path="/profiles" exact isLoggedIn={profileData?.id}>
          <Profiles />
        </PrivateRoute>
        <PrivateRoute
          path="/profiles/new-profile"
          exact
          isLoggedIn={profileData?.id}
        >
          <NewProfile />
        </PrivateRoute>
        <PrivateRoute
          path="/profiles/popls/:id"
          exact
          isLoggedIn={profileData?.id}
        >
          <PoplsItem />
        </PrivateRoute>
        <PrivateRoute path="/connections" exact isLoggedIn={profileData?.id}>
          <Connections />
        </PrivateRoute>
        <PrivateRoute
          path="/connections/crm-integrations"
          exact
          isLoggedIn={profileData?.id}
        >
          <CrmIntegrations />
        </PrivateRoute>
        <PrivateRoute path="/campaigns" exact isLoggedIn={profileData?.id}>
          <Campaigns />
        </PrivateRoute>
        <PrivateRoute
          path="/campaings/pop-branding"
          exact
          isLoggedIn={profileData?.id}
        >
          <PopBranding />
        </PrivateRoute>
        <PrivateRoute path="/clip-app" exact isLoggedIn={profileData?.id}>
          <ClipApp />
        </PrivateRoute>
        <PrivateRoute
          path="/analytics/real-time"
          exact
          isLoggedIn={profileData?.id}
        >
          <RealTimeAnalytics />
        </PrivateRoute>
        <PrivateRoute path="/settings" isLoggedIn={profileData?.id}>
          <div>Settings</div>
        </PrivateRoute>
        <PrivateRoute path="/" exact isLoggedIn={profileData?.id}>
          <Dashboard />
        </PrivateRoute>
        <Route path="*">
          <div>Not found</div>
        </Route>
      </Switch>
    </Router>
  );
}

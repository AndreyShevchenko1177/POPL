import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
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
import OverallAnalytics from "./pages/overallAnalytics";
import NewProfile from "./pages/newProfile";
import CrmIntegrations from "./pages/crmIntegrations";
import Campaigns from "./pages/campaigns";
import PopBranding from "./pages/popBranding";
import Settings from "./pages/settings";
import GeneralSettings from "./pages/generalSettings";
import Billing from "./pages/billing";
import { SuccessPage } from "./pages/stripeResultPages";
import { deleteCookies } from "./utils/cookie";

setAxios();

function App(props) {
  const profileData = useSelector(({ authReducer }) => authReducer.signIn.data);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.split("/")[1] !== "billing") {
      deleteCookies("sessionId");
    }
  }, []);

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
        <PrivateRoute path="/profiles/popls" exact isLoggedIn={profileData?.id}>
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
          path="/analytics/overall"
          exact
          isLoggedIn={profileData?.id}
        >
          <OverallAnalytics />
        </PrivateRoute>
        <PrivateRoute path="/settings" exact isLoggedIn={profileData?.id}>
          <Settings />
        </PrivateRoute>
        <PrivateRoute path="/settings/general-settings" exact isLoggedIn={profileData?.id}>
          <GeneralSettings />
        </PrivateRoute>
        <PrivateRoute path="/settings/billing" exact isLoggedIn={profileData?.id}>
          <Billing />
        </PrivateRoute>
        <PrivateRoute path="/billing/success/:sessionId" exact isLoggedIn={profileData?.id} stripe={true}>
          <SuccessPage />
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

export default App;

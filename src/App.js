import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Auth from "./pages/auth/Auth";
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
import AddExistingProfile from "./pages/addExistingProfile";
import AddNewProfile from "./pages/addNewProfile";
import CrmIntegrations from "./pages/crmIntegrations";
import Campaigns from "./pages/campaigns";
import PopBranding from "./pages/popBranding";
import Settings from "./pages/settings";
import GeneralSettings from "./pages/generalSettings";
import Billing from "./pages/billing";
import AddProfile from "./pages/addProfile";
import Templates from "./pages/templates";
import AddTemplate from "./pages/addTemplate";
import MyTemplates from "./pages/myTemplates";
import { SuccessPage } from "./pages/stripeResultPages";
import { deleteCookies } from "./utils/cookie";
import { getProfileInfoRequest } from "./store/actions";
import { getDashboardPlanAction } from "./pages/auth/store/actions";

setAxios();

function App(props) {
  const profileData = useSelector(({ authReducer }) => authReducer.signIn.data);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname.split("/")[1] !== "billing") {
      deleteCookies("sessionId");
    }
    if (profileData) {
      dispatch(getProfileInfoRequest(profileData.id));
      dispatch(getDashboardPlanAction(profileData.id));
    }
    // const options = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "X-Platform": "ios",
    //     Authorization: "Bearer iasbLElmaZpZjsOcAXsBxoaKfvcGLGYV",
    //   },
    //   body: JSON.stringify({
    //     product_id: "prod_JSxR7LsvIZrqXl",
    //     price: 4.99,
    //     currency: "USD",
    //     is_restore: "false",
    //     app_user_id: "306074",
    //     fetch_token: "sub_JSxSU2qWRtIPWI",
    //   }),
    // };
    // fetch("https://api.revenuecat.com/v1/receipts", options)
    //   .then((response) => response.json())
    //   .then((response) => console.log(response))
    //   .catch((err) => console.error(err));
  }, [profileData]);

  return (
    <Router>
      <Switch>
        <Route path="/sign-up" exact>
          <Auth>
            <SignUp />
          </Auth>
        </Route>
        <Route path="/sign-in" exact>
          <Auth>
            <Login />
          </Auth>
        </Route>
        <PrivateRoute path="/profiles" exact isLoggedIn={profileData?.id}>
          <Profiles />
        </PrivateRoute>
        <PrivateRoute
          path="/profiles/new-profile"
          exact
          isLoggedIn={profileData?.id}
        >
          <AddExistingProfile />
        </PrivateRoute>
        <PrivateRoute
          path="/profiles/add-profile/new"
          exact
          isLoggedIn={profileData?.id}
        >
          <AddNewProfile />
        </PrivateRoute>
        <PrivateRoute
          path="/profiles/add-profile"
          exact
          isLoggedIn={profileData?.id}
        >
          <AddProfile />
        </PrivateRoute>
        <PrivateRoute path="/popls" exact isLoggedIn={profileData?.id}>
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
          path="/analytics"
          exact
          isLoggedIn={profileData?.id}
        >
          <OverallAnalytics />
        </PrivateRoute>
        <PrivateRoute path="/settings" exact isLoggedIn={profileData?.id}>
          <Settings />
        </PrivateRoute>
        <PrivateRoute path="/templates" exact isLoggedIn={profileData?.id}>
          <Templates />
        </PrivateRoute>
        <PrivateRoute path="/templates/add-template" exact isLoggedIn={profileData?.id}>
          <AddTemplate />
        </PrivateRoute>
        <PrivateRoute path="/templates/my-templates" exact isLoggedIn={profileData?.id}>
          <MyTemplates />
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

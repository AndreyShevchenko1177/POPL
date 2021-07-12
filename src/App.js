import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  withRouter,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Auth from "./pages/auth/Auth";
import Login from "./pages/auth/sign-in";
import Profiles from "./pages/profiles";
import PoplsItem from "./pages/popls";
import Connections from "./pages/connections";
import ClipApp from "./pages/clipApp";
import SignUp from "./pages/auth/sign-up";
import ForgotPassword from "./pages/forgotPassword";
import Dashboard from "./pages/dashboard";
import PrivateRoute from "./core/PrivateRoute";
import setAxios from "./config/axios.config";
import OverallAnalytics from "./pages/overallAnalytics";
import CreateAccountByEmailInvite from "./pages/createAccountByEmailInvite";
import AddNewProfile from "./pages/createNewAccount";
import Campaigns from "./pages/campaigns";
import Notifications from "./pages/notifications";
import EmailNotifcations from "./pages/emailNotifications";
import PopBranding from "./pages/popBranding";
import Settings from "./pages/settings";
import GeneralSettings from "./pages/generalSettings";
import Billing from "./pages/billing";
import AddProfile from "./pages/addProfile";
import LoginExistingProfile from "./pages/loginExistingProfile";
import Templates from "./pages/templates";
import AddTemplate from "./pages/addTemplate";
import MyTemplates from "./pages/myTemplates";
import ExportToCrm from "./pages/exportToCrm";
import CrmSalesForce from "./pages/crmSalesForce";
import { SuccessPage } from "./pages/stripeResultPages";
import { deleteCookies } from "./utils/cookie";
import { getProfileInfoRequest } from "./store/actions";
import { getDashboardPlanAction } from "./pages/auth/store/actions";

setAxios();

function App(props) {
  const profileData = useSelector(({ authReducer }) => authReducer.signIn.data);
  const dashboardPlan = useSelector(({ authReducer }) => authReducer.dashboardPlan.data);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname.split("/")[1] !== "billing") {
      deleteCookies("sessionId");
    }
    if (profileData) {
      dispatch(getDashboardPlanAction(profileData.id));
    }
  }, [profileData]);

  useEffect(() => {
    if (dashboardPlan !== null && profileData.id) dispatch(getProfileInfoRequest(profileData.id));
  }, [dashboardPlan]);

  return (
    // <Router>
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
      <Route path="/forgot-password" exact>
        <Auth>
          <ForgotPassword />
        </Auth>
      </Route>
      <PrivateRoute path="/accounts" exact isLoggedIn={profileData?.id}>
        <Profiles />
      </PrivateRoute>
      <PrivateRoute
        path="/accounts/new-account/email-invite"
        exact
        isLoggedIn={profileData?.id}
      >
        <CreateAccountByEmailInvite/>
      </PrivateRoute>
      <PrivateRoute
        path="/accounts/new-account/log-in"
        exact
        isLoggedIn={profileData?.id}
      >
        <LoginExistingProfile />
      </PrivateRoute>
      <PrivateRoute
        path="/accounts/add-account/new"
        exact
        isLoggedIn={profileData?.id}
      >
        <AddNewProfile />
      </PrivateRoute>
      <PrivateRoute
        path="/accounts/add-account"
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
      <PrivateRoute path="/campaigns" exact isLoggedIn={profileData?.id}>
        <Campaigns />
      </PrivateRoute>
      <PrivateRoute path="/notifications" exact isLoggedIn={profileData?.id}>
        <Notifications />
      </PrivateRoute>
      <PrivateRoute path="/email-notifications" exact isLoggedIn={profileData?.id}>
        <EmailNotifcations />
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
      <PrivateRoute path="/connections/export-to-crm" exact isLoggedIn={profileData?.id}>
        <ExportToCrm />
      </PrivateRoute>
      <PrivateRoute
        path="/connections/crm-salesforce"
        exact
        isLoggedIn={profileData?.id}
      >
        <CrmSalesForce />
      </PrivateRoute>
      <Route path="*">
        <div>Not found</div>
      </Route>
    </Switch>
    // </Router>
  );
}

export default App;

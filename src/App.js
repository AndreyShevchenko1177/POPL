import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/auth/sign-in";
import Popls from "./pages/popls";
import SignUp from "./pages/auth/sign-up";
import PrivateRoute from "./core/PrivateRoute";
import setAxios from "./config/axios.config";

setAxios();

function titleCase(str) {
  return str.replace(/(^|\s)\S/g, function (t) {
    return t.toUpperCase();
  });
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
          <Popls />
        </PrivateRoute>
        <PrivateRoute path="/campaigns" exact isLoggedIn={profileData?.id}>
          <Campaigns />
        </PrivateRoute>
        <PrivateRoute path="/analytics" isLoggedIn={profileData?.id}>
          <Analytics />
        </PrivateRoute>
        <PrivateRoute path="/" exact isLoggedIn={profileData?.id}>
          <Home />
        </PrivateRoute>
        <Route path="*">
          <div>Not found</div>
        </Route>
      </Switch>
    </Router>
  );
}

function Home() {
  return <h2>Overview</h2>;
}

// function Popls() {
//   return <h2>Popls</h2>;
// }
function Campaigns() {
  return <h2>Popls</h2>;
}

function Analytics() {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Analytics</h2>
      <Switch>
        <Route path={`${match.path}/:module`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  let { module } = useParams();
  return <h3>Module: {titleCase(module.replace("-", " "))}</h3>;
}

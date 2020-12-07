import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import Main from "layout/Main";
import Container from "@material-ui/core/Container";

function titleCase(str) {
  return str.replace(/(^|\s)\S/g, function (t) {
    return t.toUpperCase();
  });
}

export default function App() {
  return (
    <Router>
      <Container fixed>
        <Switch>
          <Main>
            <Route path="/popls" exact>
              <Popls />
            </Route>
            <Route path="/campaigns" exact>
              <Campaigns />
            </Route>
            <Route path="/analytics">
              <Analytics />
            </Route>
            <Route path="/" exact>
              <Home />
            </Route>
          </Main>
        </Switch>
      </Container>
    </Router>
  );
}

function Home() {
  return <h2>Overview</h2>;
}

function Popls() {
  return <h2>Popls</h2>;
}
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

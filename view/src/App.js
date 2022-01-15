import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Row, Col } from "shards-react";
import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// components
// import Error from "./views/Errors";
import PreLoader from "./utils/preLoader";
import MainNavbar from "./components/layout/MainNavbar/MainNavbar";
import MainSidebar from "./components/layout/MainSidebar/MainSidebar";
import history from "./history";
// stylesheets
import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
import "./assets/custom.css";
import "./assets/mediaQuery.css";

// Token
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
// import { pecMembersList } from "./actions/pecAction";
// import { cspMembers } from "./actions/cspAction";
import store from "./store";
// component
const Index = lazy(() => import("./views/index"));
const Register = lazy(() => import("./components/auth/Register"));
const Login = lazy(() => import("./components/auth/Login"));
const Routes = lazy(() => import("./Routes"));
const SimpleSideBar = lazy(() =>
  import("./components/layout/MainSidebar/SimpleSideBar")
);
// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
  }
}

const App = props => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  // dispatch(pecMembersList());
  // dispatch(cspMembers());
  // }, []);
  const auth = useSelector(state => state.auth);
  return (
    <div>
      <Suspense fallback={<PreLoader />}>
        <Router history={history}>
          <MainNavbar />
          {auth.isAuthenticated === false ||
          window.location.pathname === "/" ||
          window.location.pathname === "/user-login" ? (
            <SimpleSideBar test="props" />
          ) : null}
          {/* <Container fluid> */}
          <Switch>
            <Route path="/" exact component={Index} />
            {/* <Route path="/" exact component={Error} /> */}
            <Route path="/user-register" exact component={Register} />
            {/* <Route path="/user-register" exact component={Error} /> */}

            <Route path="/user-login" exact component={Login} />
            {/* <Route path="/user-login" exact component={Error} /> */}

            <Row className="w-100 m-sm-none">
              <Col lg="2" sm="0">
                <MainSidebar role={auth.user.role} />
              </Col>
              <Col lg="10" sm="12" className="p-sm-none">
                <Routes />
              </Col>
            </Row>
          </Switch>
        </Router>
      </Suspense>
    </div>
  );
};
export default App;

import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Redirect, Switch } from "react-router-dom";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import AddMovie from "./components/addMovie";
import RegisterationForm from "./components/registerationForm";
import Logout from "./components/logout";
import ProtectedRoute from "./components/common/protectedRoute";
import auth, { getJwt } from "./services/authService";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={this.state.user} />
        <main className="container">
          <Switch>
            <ProtectedRoute path="/movies/:id" component={AddMovie} />
            <Route path="/register" component={RegisterationForm}></Route>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/logout" component={Logout}></Route>
            <Route
              path="/movies"
              render={(props) => <Movies {...props} user={this.state.user} />}
            ></Route>
            <Route path="/customers" component={Customers}></Route>
            <Route path="/rentals" component={Rentals}></Route>
            <Route path="/notFound" component={NotFound}></Route>
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/notFound" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;

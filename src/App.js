import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import Piano from './containers/Piano/Piano';
import Auth from './components/Auth/Auth';
import Logout from './components/Auth/Logout/Logout';

import Wrapper from './hoc/Wrapper/Wrapper';

import * as actions from './store/actions/index';

class App extends Component {

  componentDidMount() {
    this.props.onCheckAuth();
  };

  render() {

    let routes = (
      <Switch>
        <Route path="/piano-app" component={Piano} />
        <Redirect to="/piano-app" />
      </Switch>
    );

    return (
      <Wrapper>
        <Layout>
          {routes}
        </Layout>
      </Wrapper>
    );
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onCheckAuth: () => dispatch(actions.authCheck())
  };
};

export default withRouter(connect(null, mapDispatchToProps)(App));

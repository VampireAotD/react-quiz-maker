import React from 'react';
import Layout from './HOC/Layout/Layout'
import Header from './containers/Header/Header'
import Main from './containers/Main/Main'
import Questions from './containers/Questions/Questions'
import Footer from './containers/Footer/Footer'
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import Auth from "./pages/Auth/Auth";
import QuestionsList from "./pages/QuestionsList/QuestionsList";
import QuizMaker from "./pages/QuizMaker/QuizMaker";
import Error from './containers/404/404'
import ErrorBoundary from './HOC/ErrorBoundary/ErrorBoundary'
import {connect} from "react-redux";
import {autoLogin} from "./redux/actions/actionAuth";
import Logout from "./components/Logout/Logout";

class App extends React.Component{

    componentDidMount(){
        this.props.autoLogin()
    }

  render(){

      let routes = (
          <Switch>
              <Route path='/' exact component={QuestionsList}/>
              <Route path='/auth/' component={Auth}/>
              <Route path='/question/:id' component={Questions}/>
              <Route path='/404/' component={Error}/>
              <Redirect to='/404'/>
          </Switch>
      )

      if(this.props.isAuth){
          routes = (
              <Switch>
                  <Route path='/' exact component={QuestionsList}/>
                  <Route path='/auth/' component={Auth}/>
                  <Route path='/question/:id' component={Questions}/>
                  <Route path='/quiz-maker/' component={QuizMaker}/>
                  <Route path='/exit' component={Logout}/>
                  <Route path='/404/' component={Error}/>
                  <Redirect to='/404'/>
              </Switch>
          )
      }

      return (
          <ErrorBoundary>
              <Layout>
                  <Header/>
                  <Main>
                      {routes}
                  </Main>
                  <Footer/>
              </Layout>
          </ErrorBoundary>
      );
  }
}

function mapStateToProps(state){
    return{
        isAuth : !!state.auth.token
    }
}

function mapDispatchToProps(dispatch) {
    return{
        autoLogin : () => dispatch(autoLogin())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))

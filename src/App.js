import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';

import Contact from './pages/contact/contact.page';
import ContactList from './pages/contact-list/contact-list.page';
import ContactsForm from './pages/contact-form/contact-form.page';
import Deal from './pages/deal/deal.page';
import DealList from './pages/deal-list/deal-list.page';
import DealForm from './pages/deal-form/deal-form.page';
import Header from './components/header/header.component';
import Home from './components/home/home.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.page';

import './App.css';

const App = props => {

  const { currentUser, setCurrentUser } = props;

  useEffect(() => {
    const unsubsribe = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot =>
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })
        );
      } else {
        setCurrentUser(userAuth);
      }
    });

    return () => unsubsribe();
  }, [setCurrentUser]);

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/contact/:contactId' component={Contact} />
        <Route path='/contact-list' component={ContactList} />
        <Route path='/contact-form' component={ContactsForm} />
        <Route path='/deal/:dealId' component={Deal} />
        <Route path='/deal-list' component={DealList} />
        <Route path='/deal-form' component={DealForm} />
        <Route 
          exact 
          path='/sign-in'
          render={() =>
            currentUser ?
              <Redirect to='/' />
              :
              <SignInAndSignUp />
          }
        />
      </Switch>
    </Router>
  );
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

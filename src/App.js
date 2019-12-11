import React from 'react';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component.jsx';
import Header from './components/header/header.component';
import Sign from './pages/sign/sign.component';
import {Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {auth ,createUserProfileDocument} from '../src/firebase/filebase.utils';
import './App.css';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      currentUser: null // default state
    }
  }
  
  unsubscribeAuth = null;

  componentDidMount() { // fetching credentials
    this.unsubscribeAuth= auth.onAuthStateChanged( async userAuth => { // authState built in method in firebase
      
      // storing data into firebase database
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth); // checks to see if database has updated at reference (userRef)
          
        userRef.onSnapshot(snapshot => {
            
            this.setState({
              currentUser: {
                id: snapshot.id,  // returns snapShot object with data related to new and old users
                // must use .data method to see snapshot data
                ...snapshot.data()
              }
            })
            console.log(this.state)
          })
      } 

      this.setState({currentUser: userAuth})
    
  });
}


  componentWillUnmount() {
    this.unsubscribeAuth()
  }

  render(){
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path= '/' component={HomePage} /> 
          <Route path= '/shop' component={ShopPage} />
          <Route path= '/signin' component={Sign} />
        </Switch>
      </div>
    )
  }
}

export default App;

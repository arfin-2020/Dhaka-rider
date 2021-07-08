import { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Login from './components/Login/Login';
import Home from './components/Pages/Home/Home';
import PrivateRouter from "./components/PrivateRouter/PrivateRouter";
import Search from "./components/Search/Search";

export const userContext = createContext() 

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  return (
    <userContext.Provider value={[loggedInUser,setLoggedInUser]}>
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/'>
            <Home/>
          </Route>
          <Route  path='/login'>
            <Login />
          </Route>
          <PrivateRouter exact path ='/booked/:id'>
            <Search/>
          </PrivateRouter>
          
        </Switch>
      </Router>
    </div>
    </userContext.Provider>
  );
}

export default App;

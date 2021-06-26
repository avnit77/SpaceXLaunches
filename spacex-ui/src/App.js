import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LaunchPage from './components/features/launch-page/LaunchPage'


const App = () => (
  <React.Fragment>
      {/* <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div> */}
      <div className="pageContent">
          <Router>
              <Switch>
                  {/* <UserContextProvider> */}
                  <Route
                                    exact
                                    path="/"
                                    component={LaunchPage}
                                />
                  {/* </UserContextProvider> */}
              </Switch>
          </Router>
      </div>
      {/* <ToastContainer /> */}
  </React.Fragment>
)

export default App

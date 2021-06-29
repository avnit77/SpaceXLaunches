import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LaunchPage from './components/features/launch-page/LaunchPage'
import LaunchContextProvider from './components/wrappers/LaunchContext'


const App = () => (
  <React.Fragment>
      <div className="pageContent">
          <Router>
              <Switch>
                  <LaunchContextProvider>
                  <Route
                                    exact
                                    path="/"
                                    component={LaunchPage}
                                />
                  </LaunchContextProvider>
              </Switch>
          </Router>
      </div>
      {/* <ToastContainer /> */}
  </React.Fragment>
)

export default App

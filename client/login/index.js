import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';

import LoginPage from './components/LoginPage';

// class LoginApp extends React.Component {
    
//     // render() {
//     //     return (
//     //         <LoginPage/>
//     //     )
//     // }
// }

// render(<LoginApp/>, document.getElementById("login"));

// ReactDOM.render((
//     <BrowserRouter>
//       <LoginPage/>
//     </BrowserRouter>
//   ), document.getElementById("login"))

//   ReactDOM.render((
//     <Route exact path="/" render={() => (
//         loggedIn ? (
//           <Redirect to="/dashboard"/>
//         ) : (
//           <PublicHomePage/>
//         )
//       )}/>
//   ), document.getElementById("login"))
 import React from 'react';
 import {render} from 'react-dom';

 import SignUpPage from './components/SignUpPage';

 class RegistrationApp extends React.Component {
     render() {
         return (
             <div className="container">
                  <SignUpPage/>
             </div>
          ) 
     }
}

render(<RegistrationApp/>, document.getElementById("registration"));
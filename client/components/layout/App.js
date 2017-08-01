import React from 'react';
import Navbar from '../navigation/Navbar';
import Home from './Home';
class App extends React.Component {
    render() {
        return(
            <div className="container">
                <Navbar/>
                <Home/>
            </div>
        );
    }
}

export default App;
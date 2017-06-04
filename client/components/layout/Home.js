import React from 'react';
import {Dynamic} from '../containers/Dynamic';
import {Navbar} from '../containers/Navbar';
import {Settings} from '../containers/Settings'; 
import {Tasks} from '../containers/Tasks'; 


export class Home extends React.Component {
    render() {
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <Navbar/>
                    </div>
                </div>
                 <div className="row">
                    <div className="col-md-4 tasks">
                        <Tasks/>
                    </div>
                    <div className="col-md-6 dynamic">
                        <Dynamic/>
                    </div>
                    <div className="col-md-2 settings">
                        <Settings/>
                    </div>
                </div>
            </div>
        )
    }
}
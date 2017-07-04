import React from 'react';
import Dynamic from '../dynamic/Dynamic';
import Navbar from '../navigation/Navbar';
import Sidebar from '../sidebar/Sidebar'; 
import TaskContainer from '../taskContainer/TaskContainer'; 


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
                        <TaskContainer/>
                    </div>
                    <div className="col-md-6 dynamic">
                        <Dynamic/>
                    </div>
                    <div className="col-md-2 settings">
                        <Sidebar/>
                    </div>
                </div>
            </div>
        )
    }
}
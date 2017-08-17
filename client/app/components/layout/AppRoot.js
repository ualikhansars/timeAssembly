import React from 'react';

class AppRoot extends React.Component {
    render() {
        return(
            <div className="container">
                {this.props.children}
            </div>
        );
    }
}

export default AppRoot;
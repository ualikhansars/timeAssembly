import React from 'react';

class Meridien extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-6">
                    <button className="btn btn-default">A.M</button>
                </div>
                <div className="col-md-6">
                     <button className="btn btn-default">P.M</button>
                </div>
            </div>
        );
    }
}

export default Meridien;
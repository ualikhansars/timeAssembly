import React from 'react';

class Week extends React.Component {
    render() {
        return(
            <div className="week container">
                <div className="row">
                    <div className="col-md-12">
                        <span onClick={() => this.props.onClickDay('Sunday')}>Su</span>
                        <span onClick={() => this.props.onClickDay('Monday')}>Mo</span>
                        <span onClick={() => this.props.onClickDay('Tuesday')}>Tu</span>
                        <span onClick={() => this.props.onClickDay('Wednesday')}>We</span>
                        <span onClick={() => this.props.onClickDay('Thursday')}>Th</span>
                        <span onClick={() => this.props.onClickDay('Friday')}>Fr</span>
                        <span onClick={() => this.props.onClickDay('Saturday')}>St</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Week;
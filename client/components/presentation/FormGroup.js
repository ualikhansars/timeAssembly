import React from 'react';

class FormGroup extends React.Component {
    render() {
        return (
            <div className="form-group row">
                        <label htmlFor="formGroupExampleInput" className="col-md-12">Title</label>
                        <input type="text" className="form-control col-md-12" id="todo_title" name="title" placeholder="Study" />
            </div>
        );
    }
}

export default FormGroup;
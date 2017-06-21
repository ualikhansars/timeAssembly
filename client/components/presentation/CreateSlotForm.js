import React from 'react';

class CreateSlotForm extends React.Component {
    render() {
        return (
             <div className="slots-form">
                <form action="/todo" id="create_todo" method="post">
                    <div className="form-group row">
                        <label htmlFor="formGroupExampleInput" className="col-md-12">Title</label>
                        <input type="text" className="form-control col-md-12" id="todo_title" name="title" placeholder="Study" />
                    </div>
                    <div className="form-group row">
                        <label htmlFor="todo_category" className="col-md-12">Category</label>
                        <input type="text" className="form-control col-md-12" id="todo-category" name="category" placeholder="Important" />
                    </div>
                    <div className="form-group row">
                        <label htmlFor="formGroupExampleInput2" className="col-md-12">Duration</label>
                        <input type="number" className="form-control col-md-12" id="todo_duration" name="duration" placeholder="Minutes" />
                    </div>
                    <div className="row">
                         <label className="col-md-12">StartTime</label>
                    </div>
                    <div className="form-group row">
                        <input type="number" className="form-control col-sm-5" id="start_time_hours" name="start_time_hours" placeholder="Hours" />:
                        <input type="number" className="form-control col-sm-5" id="start_time_minutes" name="start_time_minutes" placeholder="Minutes" />
                    </div>
                    <div className="row">
                         <label className="col-md-12">FinishTime</label>
                    </div>
                    <div className="form-group row">
                        <input type="number" className="form-control col-sm-5" id="finish_time_hours" name="finish_time_hours" placeholder="Hours" />:
                        <input type="number" className="form-control col-sm-5" id="finish_time_minutes" name="finish_time_minutes" placeholder="Minutes" />
                    </div>
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <button onClick={this.props.showSlotsForm} type="submit" className="btn btn-success">Create</button>
                        </div>
                    </div>
                </form>
             </div>   
        );
    }
}

export default CreateSlotForm;
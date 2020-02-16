import React from "react";

export default ({ addWork: { title, date }, handleChange, submitWork }) => {
  return (
    <div className="row">
      <div className="col-12 col-md-6 col-lg-5">
        <div className="form-group mb-lg-0">
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={e => handleChange(e, "addWork", "title")}
            placeholder="Work"
          />
        </div>
      </div>
      <div className="col-12 col-md-6 col-lg-5">
        <div className="form-group mb-lg-0">
          <input
            type="text"
            className="form-control"
            value={date}
            onChange={e => handleChange(e, "addWork", "date")}
            placeholder="Date"
          />
        </div>
      </div>
      <div className="col-12 col-lg-2">
        <span
          className="btn btn-block btn-outline-primary"
          onClick={submitWork}
        >
          Add
        </span>
      </div>
    </div>
  );
};

import React from "react";
import uuid from "uuid/v4";
import { workList } from "../../Constants";

export default ({ addWork: { title, date }, handleChange, submitWork }) => {
  return (
    <div className="row">
      <div className="col-12 col-md-6 col-lg-5">
        <div className="form-group mb-lg-0">
          <input
            type="text"
            className="form-control"
            value={title}
            list="workList"
            onChange={e => handleChange(e, "addWork", "title")}
            placeholder="Work"
          />
          <datalist id="workList">
            {workList.map(item => (
              <option value={item} key={uuid()} />
            ))}
          </datalist>
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

import React from "react";

export default function Header() {
  return (
    <>
      <div className="row">
        <div className="col-md-12 pl-0">
          <h1 className="poplhead1">POPLS</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-1 p-0">
          <div className="checkboxpopl1">
            <label className="container">
              <input
                id="inbox0"
                className="custom-control-input"
                type="checkbox"
              />
              <label
                htmlFor="inbox0"
                className="custom-control-label sentCheck12 d-flex"
              >
                <i className="fa fa-angle-down" aria-hidden="true" />
              </label>
            </label>
          </div>
        </div>
        <div className="col-md-8">
          <div className="poplsearchBox">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control searchRight"
                placeholder="Search here....."
              />
              <div className="input-group-append searchRight1">
                <button className="btn " type="submit">
                  <i className="fa fa-search" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 pr-0">
          <button className="btn addnewpoplbtn">
            <i className="fa fa-plus-circle" aria-hidden="true" /> Add New Popl
          </button>
        </div>
      </div>
    </>
  );
}

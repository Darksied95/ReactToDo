import React from "react";

const AddContent = ({ onAdd, onSort, list }) => {
  return (
    <div>
      <input type="text" ref={list} className="col-10" />
      <button onClick={onAdd} className="col-2 btn-primary">
        Add
      </button>
      <button onClick={onSort} className=" btn-primary">
        Sort
      </button>
    </div>
  );
};

export default AddContent;

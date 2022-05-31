import React from "react";

const RenderList = ({ stateLists, onCheck, onEdit, onDelete }) => {
  if (!stateLists.length) {
    return <p>Click Add to create a new list</p>;
  }
  return (
    <ul>
      {stateLists.map((list, index) => (
        <div key={index} className=" mb-3">
          <li
            onClick={() => onCheck(index)}
            htmlFor={index}
            style={list.checked ? { textDecoration: "line-through" } : null}
            className="ml-2"
          >
            {list.name}
          </li>
          <button
            className="btn btn-secondary btn-sm col-2 mr-3"
            onClick={() => onEdit(index)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger btn-sm col-2 ml-1"
            onClick={() => onDelete(index)}
          >
            Delete
          </button>
        </div>
      ))}
    </ul>
  );
};

export default RenderList;

import React, { Component } from "react";

class Todos extends Component {
  state = {
    lists: [],
  };
  list = React.createRef();
  indexToBeAdded = -1;

  componentDidMount() {
    let lists = localStorage.getItem("lists") || [];
    if (lists.length) {
      lists = JSON.parse(lists);
    }
    this.setState({ lists });
  }
  renderList = () => {
    if (!this.state.lists.length) {
      return <p>Click Add to create a new list</p>;
    }
    return (
      <ul>
        {this.state.lists.map((list, index) => (
          <div key={index} className=" mb-3">
            <li
              onClick={() => this.handleCheck(index)}
              htmlFor={index}
              style={list.checked ? { textDecoration: "line-through" } : null}
              className="ml-2"
            >
              {list.name}
            </li>
            <button
              className="btn btn-secondary btn-sm col-2 mr-3"
              onClick={() => this.handleEdit(index)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger btn-sm col-2 ml-1"
              onClick={() => this.handleDelete(index)}
            >
              Delete
            </button>
          </div>
        ))}
      </ul>
    );
  };
  handleAdd = () => {
    const { value } = this.list.current;
    const lists = [...this.state.lists];
    if (value) {
      if (this.indexToBeAdded >= 0) {
        lists[this.indexToBeAdded].name = this.list.current.value;
        this.indexToBeAdded = -1;
        localStorage.setItem("lists");
      } else {
        lists.push({ name: value, checked: false });
        localStorage.setItem("lists", JSON.stringify(lists));
      }
    }
    this.setState({ lists });
    this.list.current.value = "";
  };

  handleDelete(index) {
    const lists = [...this.state.lists];
    lists.splice(index, 1);
    localStorage.setItem("lists", JSON.stringify(lists));
    this.setState({ lists });
  }

  handleEdit(index) {
    const lists = [...this.state.lists];
    this.list.current.value = lists[index].name;
    this.indexToBeAdded = index;
  }
  handleCheck(index) {
    const lists = [...this.state.lists];
    lists[index] = { ...lists[index] };
    lists[index].checked = !lists[index].checked;
    localStorage.setItem("lists", JSON.stringify(lists));
    this.setState({ lists });
  }
  handleSort = () => {
    const lists = [...this.state.lists];
    lists.sort((a, b) => b.checked - a.checked);
    this.setState({ lists });
  };
  render() {
    return (
      <div>
        <div>
          <input type="text" ref={this.list} className="col-10" />
          <button onClick={this.handleAdd} className="col-2 btn-primary">
            Add
          </button>
          <button onClick={this.handleSort} className=" btn-primary">
            Sort
          </button>
        </div>
        {this.renderList()}
      </div>
    );
  }
}

export default Todos;

import React, { Component } from "react";
import AddContent from "./addContent";
import RenderList from "./renderList";

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

  handleDelete = (index) => {
    const lists = [...this.state.lists];
    lists.splice(index, 1);
    localStorage.setItem("lists", JSON.stringify(lists));
    this.setState({ lists });
  };

  handleEdit = (index) => {
    const lists = [...this.state.lists];
    this.list.current.value = lists[index].name;
    this.indexToBeAdded = index;
  };
  handleCheck = (index) => {
    const lists = [...this.state.lists];
    lists[index] = { ...lists[index] };
    lists[index].checked = !lists[index].checked;
    localStorage.setItem("lists", JSON.stringify(lists));
    this.setState({ lists });
  };
  handleSort = () => {
    const lists = [...this.state.lists];
    lists.sort((a, b) => b.checked - a.checked);
    this.setState({ lists });
  };
  render() {
    return (
      <div>
        <AddContent
          onAdd={this.handleAdd}
          onSort={this.handleSort}
          list={this.list}
        />
        <RenderList
          stateLists={this.state.lists}
          onCheck={this.handleCheck}
          onEdit={this.handleEdit}
          onDelete={this.handleDelete}
        />
      </div>
    );
  }
}

export default Todos;

import React from "react";
import CardList from "./CardList";
import SearchBox from "./SearchBox";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchfield: "",
    };
  }

  fetchData = async function () {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users#"
      );
      if (!response.ok) {
        throw new Error("Could not fetch data");
      }
      const data = response.json();
      return data;
    } catch (error) {
      alert(error.message);
    }
  };

  async componentDidMount() {
    const users = await this.fetchData();
    this.setState({ robots: users });
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value });
  };

  render() {
    const filteredRobots = this.state.robots.filter((robot) => {
      return robot.name
        .toLowerCase()
        .includes(this.state.searchfield.toLowerCase());
    });

    if (this.state.robots.length === 0) {
      return <h1>Loading...</h1>;
    } else {
      return (
        <div className="tc">
          <h1 className="teko-title f1">robofriends</h1>
          <SearchBox searchChange={this.onSearchChange} />
          <CardList robots={filteredRobots} />;
        </div>
      );
    }
  }
}

export default App;

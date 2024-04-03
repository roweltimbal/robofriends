import React from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import "./App.css";
import ErrorBoundry from "../components/ErrorBoundry";

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
    const { robots, searchfield } = this.state;
    const filteredRobots = robots.filter((robot) => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    });

    return !robots.length ? (
      <h1>Loading...</h1>
    ) : (
      <div className="tc">
        <h1 className="teko-title f1">robofriends</h1>
        <SearchBox searchChange={this.onSearchChange} />

        <Scroll>
          <ErrorBoundry>
            <CardList robots={filteredRobots} />
          </ErrorBoundry>
        </Scroll>
      </div>
    );
  }
}

export default App;

import React from "react";
import "./App.css";
import axios from "axios";


class App extends React.Component {
  state = {
    user: {},
    userText: "ChrisRDaniels",
    userFollowers: []
  };

  componentDidMount() {
    axios.get(`https://api.github.com/users/ChrisRDaniels`)
    .then(res => {
      this.setState({
        user: res.data
      })
      console.log(res)
    })
    .catch(err =>{
      console.log(err)
    })

    axios.get(`https://api.github.com/users/ChrisRDaniels/followers`)
    .then(res => {
      console.log(res)
      this.setState({
        userFollowers: res.data
      })
      console.log(this.state.userFollowers)
    })
  }

  handleChanges = e => {
    this.setState({
      userText: e.target.value
    })
  }
    

  fetchUser = e => {
    e.preventDefault()
    axios.get(`https://api.github.com/users/${this.state.userText}`)
    .then(res => {
      this.setState({
        user: res.data
      })
      console.log(res)
    })
    .catch(err =>{
      console.log(err)
    })

    axios.get(`https://api.github.com/users/${this.state.userText}/followers`)
    .then(res => {
      console.log(res)
      this.setState({
        userFollowers: res.data
      })
      console.log(this.state.userFollowers)
    })
  }

    

  render() {
    return (
      <div className="App">
        <div className='get-user'>
          <input type='text' value={this.state.userText} onChange={this.handleChanges} />
          <button onClick={this.fetchUser}>Lookup User</button>
        </div>
        <div className="user-card">
          <h2>{this.state.user.name}</h2>
          <p>Bio: {this.state.user.bio}</p>
          <p>Following: {this.state.user.following}</p>
          <p>Followers: {this.state.user.followers}</p>
          <img src= {`http://ghchart.rshah.org/${this.state.userText}`} alt=" Github chart"/>
        </div>
        <h2>{this.state.user.name}'s Followers</h2>
        <div className="follower-list">
          {this.state.userFollowers.map(item => 
            <div className='follower-card'>
              <img src={item.avatar_url} />
              <h4>{item.login}</h4>
              <p>{item.html_url}</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}
export default App;
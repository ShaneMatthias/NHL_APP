import React, { Component } from 'react';
import SideDrawer from './components/SideDrawer'
import Details from './components/Details'

class App extends Component {
    state = {
        teams: {},
        roster: {},
        loading: true
    }

    //When a team is clicked, fetch the roster
    handleClick = (item) => {
        fetch(`https://statsapi.web.nhl.com/api/v1/teams/${item.key}/roster`,{ 
            method: "GET"
        })
        .then(res => res.json())
        .then(body => this.handleGetSuccess(body))
        .catch(err => console.log(err))
    }

    //Handle Fetch Success
    handleGetSuccess = (body) => {
        this.setState({ roster: body.roster })
    }

    render() {
        const { roster, loading } = this.state

        return (
            <div className="App">

                <div style={{width: window.innerWidth/7}}>
                    <SideDrawer handleClick={this.handleClick}/>
                </div>

                <div>
                    <Details roster={roster} loading={loading}/>
                </div>

            </div>
        );
    }
}

export default App;

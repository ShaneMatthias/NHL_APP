import React, { Component } from 'react';
import SideDrawer from './components/SideDrawer'
import Details from './components/Details'
import './styles.css/App.css'

class App extends Component {
    state = {
        roster: {},
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

    handleSort = (sortBy) => {
        const { roster } = this.state
        console.log(roster)

        if(sortBy === 'name') {
            roster.sort((a,b) => 
                (a.person.fullName > b.person.fullName) 
                ? 1 
                : ((b.person.fullName > a.person.fullName) 
                ? -1 
                : 0
            ))
            this.setState({ roster })
        } 
        
        else {
            roster.sort((a,b) => 
                (parseInt(a.jerseyNumber) > parseInt(b.jerseyNumber))
                ? 1 
                : ((parseInt(b.jerseyNumber) > parseInt(a.jerseyNumber))
                ? -1 
                : 0
            ))
            this.setState({ roster })
        }
    }

    render() {
        const { roster } = this.state

        return (
            <div className="app-container">

                <div className='component-container'>
                    <div style={{width: window.innerWidth/7}}>
                        <SideDrawer handleClick={this.handleClick}/>
                    </div>
                    
                    <div style={{width: window.innerWidth}}>
                        <Details roster={roster} handleSort={this.handleSort}/>
                    </div>
                </div>

            </div>
        );
    }
}

export default App;

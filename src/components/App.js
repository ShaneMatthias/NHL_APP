import React, { Component } from 'react'
import { Button, Menu, Icon, Spin, Avatar, notification } from 'antd'
import Roster from './Roster'
import SideDrawer from './common/SideDrawer'

import '../styles/App.css'

class App extends Component {
    state = {
        roster: {},
        teams: [],
        teamID: 0,
        drawerVisible: false,
        loading: true,
        err: false,
        errMessage: ''
    }

    //Fetching teams for drawer menu//
    componentDidMount() {
        fetch('https://statsapi.web.nhl.com/api/v1/teams',{ 
            method: "GET"
        })
        .then(res => res.json())
        .then(body => this.setState({ teams: body.teams }, () => {
            this.setState({ loading: false })
        }))
        .catch(err => {
            notification['error']({
                message: 'Network Error',
                description: err.message
            })
        })
    }

    //Fetch the roster when a team is clicked//
    handleTeamSelect = (item) => {
        this.setState({ loading: true, drawerVisible: false })
        fetch(`https://statsapi.web.nhl.com/api/v1/teams/${item.key}/roster`,{ 
            method: "GET"
        })
        .then(res => res.json())
        .then(body => this.setState({ roster: body.roster, teamID: item.key }, ()=> {
            this.setState({ loading: false })
        }))
        .catch(err => {
            notification['error']({
                message: 'Network Error',
                description: err.message
            })
        })
    }

    //Callback for closing side drawer//
    closeDrawer = () => {this.setState({ drawerVisible: false })}

    //Render list for drawer menu//
    renderMenu = (teams, loading) => {
        if(loading) 
            return <Spin spinning={loading}></Spin>

        return (
            <Menu style={{width: window.innerWidth/6, marginLeft: -window.innerWidth/60 }} theme='light'>
                {teams.map(team => { 
                    return (
                        <Menu.Item onClick={team => this.handleTeamSelect(team)} key={team.id}>
                            <Avatar className='logo' src={require(`../assets/${team.abbreviation}.png`)}/>{team.name}
                        </Menu.Item>
                    )
                })}
            </Menu>
        )
    }

    //Render the table title base on team clicked//
    renderTableTitle = (teams, loading, id) => {
        if(loading || !teams.length || id === 0)
            return <h1>No Roster</h1>
        
        const teamName = teams.filter(team => parseInt(team.id) === parseInt(id))

        return <h1>{teamName[0].name}</h1>
    }
 

    renderTest = (state) => {
        alert(state)
    }

    render() {
        const { roster, teams, teamID, drawerVisible, loading, err, errMessage } = this.state

        return (
            <React.Fragment>

                <div className='header-container'>
                    <div>
                        <Button onClick={() => this.setState({ drawerVisible: true })}>
                            <Icon type='right' />
                        </Button>
                    </div>

                    <div className='table-title-container'>
                        {this.renderTableTitle(teams, loading, teamID)}
                    </div>
                </div>

                <Spin spinning={loading}><Roster roster={roster} /></Spin>

                <SideDrawer 
                    drawerVisible={drawerVisible} 
                    drawerTitle='NHL Teams'
                    pos='left'
                    width={window.innerWidth/6}
                    closeDrawer={() => this.setState({ drawerVisible: false })} 
                    renderMenu={() => this.renderMenu(teams, loading)} 
                    />
            </React.Fragment>
        );
    }
}

export default App;
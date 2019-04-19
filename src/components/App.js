import React, { Component } from 'react';
import { Drawer, Button, Menu, Icon, Spin, Avatar } from 'antd'
import Roster from './Roster'
import '../styles/App.css'

class App extends Component {
    state = {
        roster: {},
        teams: {},
        drawerVisible: false,
        loading: true
    }

    //////////////////////////////////
    //Fetching teams for drawer menu//
    componentDidMount() {
        fetch('https://statsapi.web.nhl.com/api/v1/teams',{ 
            method: "GET"
        })
        .then(res => res.json())
        .then(body => this.setState({ teams: body.teams }, () => {
            this.setState({ loading: false })
        }))
        .catch(err => console.log(err))
    }

    ////////////////////////////////////////////
    //Fetch the roster when a team is clicked//
    handleTeamSelect = (item) => {
        this.setState({ loading: true, drawerVisible: false })
        fetch(`https://statsapi.web.nhl.com/api/v1/teams/${item.key}/roster`,{ 
            method: "GET"
        })
        .then(res => res.json())
        .then(body => this.setState({ roster: body.roster }, ()=> {
            this.setState({ loading: false })
        }))
        .catch(err => console.log(err))
    }

    ///////////////////////////////
    //Render list for drawer menu//
    renderMenu = (teams, loading) => {
        if(loading) 
            return <Spin spinning={loading}></Spin>

        return (
            <Menu style={{width: window.innerWidth/7, marginLeft: -window.innerWidth/60 }} theme='light'>
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

    render() {
        const { roster, teams, drawerVisible, loading } = this.state

        return (
            <React.Fragment>

                <Button onClick={() => this.setState({ drawerVisible: true })}>
                    <Icon type='right' />
                </Button>

                <Spin spinning={loading}><Roster roster={roster} /></Spin>

                <Drawer
                    width={window.innerWidth/7}
                    title='NHL Teams'
                    placement='left'
                    visible={drawerVisible}
                    onClose={() => this.setState({ drawerVisible:false })}   
                    >
                    {this.renderMenu(teams, loading)}
                </Drawer>

            </React.Fragment>
        );
    }
}

export default App;

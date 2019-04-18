import React from 'react';
import { Menu } from 'antd';
import "antd/dist/antd.css";

export default class SideDrawer extends React.Component {
    state = { 
        teams: {},
        loading: true
    }

    //Fetching the teams
    componentDidMount() {
        fetch('https://statsapi.web.nhl.com/api/v1/teams',{ 
            method: "GET"
        })
        .then(res => res.json())
        .then(body => this.handleGetSuccess(body))
        .catch(err => console.log(err))
    }

    //Handle Fetch Success
    handleGetSuccess = (body) => {
        this.setState({ teams: body.teams }, () => {
            this.setState({ loading: false })
        })
    }

    //Render Whole List
    renderList = () => {
        const { teams } = this.state

        if(this.state.loading) {
            return <h1>LOADING</h1>
        }

        return (
            <Menu theme='dark'>
                {teams.map((team) => this.renderItem(team))}
            </Menu>
        )
    }

    //Render Each Item
    renderItem = (team) => {
        return (
            <Menu.Item onClick={item => this.props.handleClick(item)} key={team.id}>{team.name}</Menu.Item>
        )
    }

    
    render() {
        return (
            <div>
                {this.renderList()}
            </div>
        )
    }
}
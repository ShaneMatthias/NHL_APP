
import React from 'react';
import { Menu } from 'antd';
import "antd/dist/antd.css";

export default class SideDrawer extends React.Component {
    state = { 
        
    }

    //Function for checking is an object is empty
    objectEmpty = (obj) => {
        for (let prop in obj) { 
            return false; 
        } 
        return true; 
    }

    renderRoster = (roster) => {
        if(this.objectEmpty(roster)) {
            return (
                <h1>CLICK A TEAM</h1>
            )
        }
        
        return (
            <div>
                {roster.map((item) => this.renderPlayer(item))}
            </div>
        )
    }

    renderPlayer = (item) => {
        console.log(item.person)
        return (
            <div className='list-item-container'>
                <li key={item.person.id}>{item.person.fullName}</li>
                <li key={item.person.id}>{item.person.fullName}</li>
                <li key={item.person.id}>{item.person.fullName}</li>
            </div>

        )
    }

    render() {
        const { roster, loading } = this.props

        return (
            <div>
                {this.renderRoster(roster, loading)}
            </div>
        )
    }
}

import React from 'react';
import { Menu, Button, Modal } from 'antd';
import "antd/dist/antd.css";
import '../styles.css/Details.css'

export default class SideDrawer extends React.Component {
    state = { 
        visible: false,
        player: ''
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
            <Menu>
                {roster.map((item) => this.renderPlayer(item))}
            </Menu>
        )
    }

    renderPlayer = (item) => {
        return (
            <Menu.Item onClick={player => this.showModal(player)} key={item.person.id}>
                {item.jerseyNumber}
                {item.person.fullName}
                {item.position.name}
            </Menu.Item>

        )
    }

    showModal = (player) => {
        console.log(player)
        this.setState({
            visible: true,
            player: player
        });
    }

    render() {
        const { roster, loading, handleSort } = this.props
        const { player } = this.state

        return (
            <div>
                <Modal
                    visible={this.state.visible}
                    title="Title"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={<Button key="back" onClick={() => this.setState({ visible: false })}>Return</Button>}
                >
                    <h1>{player.fullName}</h1>
                </Modal>


                {this.renderRoster(roster, loading)}
                <Button onClick={() => handleSort('name')}>Sory By Name</Button>
                <Button onClick={() => handleSort('number')}>Sory By Num</Button>
            </div>
        )
    }
}
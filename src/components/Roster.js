import React from 'react';
import { Modal, Table, Spin } from 'antd';
import "antd/dist/antd.css";
import '../styles/Roster.css'

export default class Roster extends React.Component {
    state = { 
        modalVisible: false,
        player: {},
        country: {},
        loading: false
    }

    ///////////////////////////////////////////////
    //Function for checking is an object is empty//
    objectEmpty = (obj) => {
        for (let prop in obj) { 
            return false; 
        } 
        return true; 
    }

    //////////////////////////////
    //Rendering the roster table//
    //Along with sorting and filtering//
    renderRoster = (roster) => {
        const width = window.innerWidth
        const { loading } = this.state

        if(this.objectEmpty(roster)) {
            return (
                <div className='tooltip-container'>
                    <span className='tooltip'>Please Open the drawer by clicking on the icon on the top left and select a team.</span>
                </div>
            )
        }

        //Giving each object a unique key
        roster.map((item, i) => item.key = i )
        
        return (
            //Table
            <Spin spinning={loading} size='large'>
                <Table 
                    onRow={(record) => ({ onClick: () => this.handlePlayerClick(record) })} 
                    style={{width: width}} 
                    pagination={false} 
                    dataSource={roster} > 

                    {/* Column for # */}
                    <Table.Column
                        width={width/3}
                        title="#"
                        dataIndex="jerseyNumber"
                        key="num"
                        sorter={(a, b) => a.jerseyNumber - b.jerseyNumber}
                    />

                    {/* Column for full Name */}
                    <Table.Column
                        width={width/3}
                        title="Name"
                        dataIndex="person.fullName"
                        key="name"
                        sorter={(a, b) => a.person.fullName.localeCompare(b.person.fullName)}
                    />
                    
                    {/* Column for position */}
                    <Table.Column
                        width={width/3}
                        title="Position"
                        dataIndex="position.name"
                        key="pos"
                        filters={
                            [
                                { text: 'Goalie', value: 'Goalie'},
                                { text: 'Defenseman', value: 'Defenseman'},
                                { text: 'Center', value: 'Center'},
                                { text: 'Right Wing', value: 'Right Wing'},
                                { text: 'Left Wing', value: 'Left Wing'},
                            ]
                        }
                        onFilter ={(value, record) => record.position.name === value}
                    />
                </Table>
            </Spin>
        )
    }

    /////////////////////////////////////////////////////////////
    //Fetch player data when a player from the table is clicked//
    handlePlayerClick = (item) => {
        this.setState({ loading: true })

        fetch(`https://statsapi.web.nhl.com/api/v1/people/${item.person.id}`,{ 
            method: "GET"
        })
        .then(res => res.json())
        .then(body => this.fetchCountry(body))
        .catch(err => console.log(err))
    }

    ////////////////////////////////////
    //Fetch country using external API//
    fetchCountry = (data) => {
        const code = data.people[0].nationality
        const player = data.people[0]

        fetch(`https://restcountries.eu/rest/v2/alpha/${code}`,{ 
            method: "GET"
        })
        .then(res => res.json())
        .then(body => this.setState({ country: body, player: player  }, () => {
            this.setState({ modalVisible: true, loading: false })
        }))
        .catch(err => console.log(err))
    }

    render() {
        const width = window.innerWidth
        const height = window.innerHeight
        const { roster } = this.props
        const { player, modalVisible, country } = this.state

        return (
            <React.Fragment>
  
               <Modal
                    visible={modalVisible}
                    title="Player Info"
                    footer={false}
                    onCancel={() => this.setState({ modalVisible: false })} >
                    <h1>{player.fullName}</h1>
                    <h2>{country.name}</h2>
                    <img height={height/10} width={width/10} src={country.flag} alt='alt' />
                </Modal>

                {this.renderRoster(roster)}
            </React.Fragment>
        )
    }
}
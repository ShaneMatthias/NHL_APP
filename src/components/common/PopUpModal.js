import React from 'react';
import { Modal } from 'antd'

/* PROPS                           
modalVisible(number):               width of drawer 

title(number):                      drawer visibility 

footer(string) :                    drawer title 

closeModal(string) :                left, right, top or bottom

headerText(function) :              function to hide drawer

desc(function) :                    function that renders the menu on the drawer 

imgSrc(function) :                  function that renders the menu on the drawer 

height(function) :                  function that renders the menu on the drawer 

width(function) :                   function that renders the menu on the drawer 
*/

//Reusable Pop Up Modal Component//
const SideDrawer = ({ modalVisible, title, footer, closeModal, headerText, desc, imgSrc, height, width }) => {
    return (
        <Modal
            visible={modalVisible}
            title={title}
            footer={footer}
            onCancel={() => closeModal()} >
            <h1>{headerText}</h1>
            <h2>{desc}</h2>
            <img height={height} width={width} src={imgSrc} alt='alt' />
        </Modal>
    )
}

export default SideDrawer
import React from 'react';
import { Modal } from 'antd'

//////////////////////////////////
//Reusable Pop Up Moal Component//
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
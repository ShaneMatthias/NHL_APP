import React from 'react';
import { Drawer } from 'antd'

//////////////////////////////////
//Reusable Side Drawer Component//
const SideDrawer = ({ width, drawerVisible, drawerTitle, pos, closeDrawer, renderMenu }) => {
    return (
        <Drawer
            width={width}
            title={drawerTitle}
            placement={pos}
            visible={drawerVisible}
            onClose={() => closeDrawer()}   
            >
            {renderMenu()}
        </Drawer>
    )
}

export default SideDrawer
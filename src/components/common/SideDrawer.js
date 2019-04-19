import React from 'react';
import { Drawer } from 'antd'

/* PROPS                           
width(number):                  width of drawer 

drawerVisible(number):          drawer visibility 

drawerTitle(string) :           drawer title 

pos(string) :                   left, right, top or bottom

closeDrawer(function) :         function to hide drawer

renderMenu(function) :          function that renders the menu on the drawer 
*/

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
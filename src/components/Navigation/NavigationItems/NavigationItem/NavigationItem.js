import React from 'react';

import SubMenuItems from '../../SubMenuItems/SubMenuItems';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faStar } from '@fortawesome/free-regular-svg-icons';

library.add(faUser, faStar);

const navigationItem = (props) => {
    let navItem;
    let subMenu;
    switch (props.type) {
        case "user":
            navItem = (
                <FontAwesomeIcon icon={faUser} />
            );
            subMenu = (
                <SubMenuItems type='user' clicked={props.clicked} isLoggedIn={props.isLoggedIn} />
            );
            break;
        case "favourites":
            navItem = (
                <FontAwesomeIcon icon={faStar} />
            );
            subMenu = (
                <SubMenuItems type='favourites' clicked={props.clicked} isFavourite={props.isFavourite} />
            );
            break;
        default:
            break;
    }
    return (
        <li>
            {navItem}
            {subMenu}
        </li>
    );
};

export default navigationItem;
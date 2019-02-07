import React from 'react';

import SubMenuItem from '../SubMenuItems/SubMenuItem/SubMenuItem';

import Wrapper from '../../../hoc/Wrapper/Wrapper';

const subMenuItems = (props) => {
    let subMenuItems;
    switch (props.type) {
        case "user":
            subMenuItems = (
                <Wrapper>
                    <SubMenuItem label={!props.isLoggedIn ? "Log in" : "Log out"} type="Log in" clicked={props.clicked} />
                    <SubMenuItem label="Save My Settings" type="Save settings" clicked={props.clicked} />
                </Wrapper>
            );
            break;
        case "favourites":
            subMenuItems = (
                <Wrapper>
                    {!props.isFavourite ? 
                         <SubMenuItem label="Save current selection as favourite" type="Save favourite" clicked={props.clicked} /> :
                         <SubMenuItem label="Favourite saved" type="save favourite" disabled={true} />
                    }
                   
                    <SubMenuItem label="Display favourites by type" type="Display favourites by type" clicked={props.clicked} />
                    <SubMenuItem label="Display favourites by key" type="Display favourites by key" clicked={props.clicked} />
                </Wrapper>
            );
            break;
        default:

            break;
    }
    return (
        <ul>
            {subMenuItems}
        </ul>
    );
};

export default subMenuItems;
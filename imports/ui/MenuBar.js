import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';


const MenuBar = (props) => {
  console.log(props.selectedMenu);
  return (
    <div className="item-list">
      <p>Barra de Menu</p>
      <p className={props.selectedMenu === 'profile' ? 'item item--selected' : 'item' } onClick={()=>Session.set('selectedMenu','profile')}>Profile</p>
      <p className={props.selectedMenu === 'budget' ? 'item item--selected' : 'item' } onClick={()=>Session.set('selectedMenu','budget')}>Orçamentos</p>
      <p className={props.selectedMenu === 'kits' ? 'item item--selected' : 'item' } onClick={()=>Session.set('selectedMenu','kits')}>Kits</p>
    </div>
  );
};

MenuBar.propTypes = {
  selectedMenu: React.PropTypes.string.isRequired
};

export default createContainer(() => {
  const selectedMenu = Session.get('selectedMenu');

  return {
    selectedMenu
  };
}, MenuBar);

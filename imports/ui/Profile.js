import React from 'react';

import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';


const Profile = (props) => {
  return (
    <p className={props.selectedMenu === 'profile' ? 'budget' : 'budget budget__toggle'}>Profile here!</p>
  );
};

Profile.propTypes = {
  selectedMenu: React.PropTypes.string.isRequired
};

export default createContainer(() => {
  const selectedMenu = Session.get('selectedMenu');

  return {
    selectedMenu
  };
}, Profile);

import React from 'react';

import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

import AddKits from './AddKits';
import KitsList from './KitsList';
import KitsListFilters from './KitsListFilters';

const Kits = (props) => {
  return (
    <div className={props.selectedMenu === 'kits' ? 'budget' : 'budget budget__toggle'}>
        <KitsListFilters/>
        <AddKits/>
        <KitsList/>
    </div>
  );
};

Kits.propTypes = {
  selectedMenu: React.PropTypes.string.isRequired
};

export default createContainer(() => {
  const selectedMenu = Session.get('selectedMenu');

  return {
    selectedMenu
  };
}, Kits);

import React from 'react';

import LinksList from './LinksList';
import AddLink from './AddLink';
import LinksListFilters from './LinksListFilters';

import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';


export class Link extends React.Component {
  render() {
    return (
      <div className={this.props.selectedMenu === 'budget' ? 'budget' : 'budget budget__toggle'}>
        <LinksListFilters/>
        <AddLink/>
        <LinksList/>
      </div>
    );
  }
};

Link.propTypes = {
  selectedMenu: React.PropTypes.string.isRequired
};

export default createContainer(() => {
  const selectedMenu = Session.get('selectedMenu');

  return {
    selectedMenu
  };
}, Link);

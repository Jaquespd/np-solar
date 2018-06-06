import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import FlipMove from 'react-flip-move';

import { Kits } from '../api/kits';
import { Links } from '../api/links';
import KitsListItem from './KitsListItem';

export default class LinksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [],
      kits: []
    };
  }
  componentDidMount() {
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe('links');
      const links = Links.find({
        visible: Session.get('showVisible')
      }).fetch();
      this.setState({ links });
    });
    this.kitsTracker = Tracker.autorun(() => {
      Meteor.subscribe('kits');
      const kits = Kits.find({
        availability: Session.get('showAvailability')
      }, {
        sort: {
          power: 1
        }
      } ).fetch();
      this.setState({ kits });
    });

  }
  componentWillUnmount() {
    console.log('componentWillUnmount KitsList');
    this.linksTracker.stop();
    this.kitsTracker.stop();
  }
  renderLinksListItems() {
    if (this.state.kits.length === 0) {
      return (
        <div className="subitem">
          <p className="subitem__status-message">Não há kits</p>
        </div>
      );
    }

    return this.state.kits.map((kit) => {
      const shortUrl = Meteor.absoluteUrl(kit._id);
      return <KitsListItem key={kit._id} shortUrl={shortUrl} {...kit}/>;
    });
  }
  render() {
    return (
      <div>
        <FlipMove maintainContainerHeight={true}>
          {this.renderLinksListItems()}
        </FlipMove>
      </div>
    );
  }
};

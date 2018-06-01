import React from 'react';

import LinksList from './LinksList';
import AddLink from './AddLink';
import LinksListFilters from './LinksListFilters';

// import { Links } from '../api/links';
// import FlipMove from 'react-flip-move';

export default class Link extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modeBudget: false
    };
  }
  componentDidMount() {
    console.log('componentDidMount Link');
  }
  componentWillUnmount() {
    console.log('componentWillUnmount Link');
  }
  render() {
    return (
      <div className="budget">
        <LinksListFilters/>
        <AddLink/>
        <LinksList/>
      </div>
    );
  }
};

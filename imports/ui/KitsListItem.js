import { Meteor } from 'meteor/meteor';
import React from 'react';
import moment from 'moment';
import { Session } from 'meteor/session';

import { Kits } from '../api/kits';

export default class KitsListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
    };
  }
  renderStats() {
    if (typeof this.props.registrationDate === 'number') {
      registrationMessage = `(create ${ moment(this.props.registrationDate).fromNow() })`;
    }

    return <p className="item__message">{this.props.registrationMessage}</p>;
  }
  render() {
    return (
      <div className="subitem">
        <h2>Potencia: {this.props.power}</h2>
        <p className="subitem__message">Codigo: {this.props.code}, Marca do Inversor: {this.props.inverterBrand}</p>
        {/* {this.renderStats()} */}
        <button className="button button--pill" onClick={() => {
          Meteor.call('kits.setAvailability', this.props._id, !this.props.availability);
        }}>
          {this.props.availability ? 'Indisponibilizar' : 'Disponibilizar'}
        </button>
      </div>
    );
  }
};

KitsListItem.propTypes = {
  _id: React.PropTypes.string.isRequired,
  userId: React.PropTypes.string.isRequired,
  power: React.PropTypes.string.isRequired,
  shortUrl: React.PropTypes.string.isRequired,
  code: React.PropTypes.string.isRequired,
  price: React.PropTypes.string.isRequired,
  numberPanels: React.PropTypes.string.isRequired,
  area: React.PropTypes.string.isRequired,
  inverterBrand: React.PropTypes.string.isRequired,
  availability: React.PropTypes.bool.isRequired,
  registrationDate: React.PropTypes.number.isRequired,
  dateSoldOut: React.PropTypes.number
};

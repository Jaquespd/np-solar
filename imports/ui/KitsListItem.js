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
      registrationMessage = `(cadastrado a ${ moment(this.props.registrationDate).fromNow() })`;
    }

    return <p className="subitem__message">{registrationMessage}</p>;
  }
  render() {
    return (
      <div className="subitem">
        <h2>Kit Gerador: {this.props.power} kWp</h2>
        <p className="subitem__message">Preço: R$ {this.props.price}, Marca do Inversor: {this.props.inverterBrand}</p>
        <p className="subitem__message">N. Paineis: {this.props.numberPanels} placas, Area: {this.props.area} m², Codigo: {this.props.code}</p>
        {this.renderStats()}
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

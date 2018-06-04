import React from 'react';
import Modal from 'react-modal';
import { Meteor } from 'meteor/meteor';

export default class AddKits extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // power, code, price, numberPanels, area, inverterBrand
      isOpen: false,
      error: '',
      power: '',
      code: '',
      price: '',
      numberPanels: '',
      area: '',
      inverterBrand: ''
    };
  }
  onSubmit(e) {
    const { power } = this.state;
    const { code } = this.state;
    const { price } = this.state;
    const { numberPanels } = this.state;
    const { area } = this.state;
    const { inverterBrand } = this.state;

    e.preventDefault();

    Meteor.call('kits.insert', power, code, price, numberPanels, area, inverterBrand, (err, res) => {
      if (!err) {
        this.handleModalClose();
      } else {
        this.setState({ error: err.reason });
      }
    });
  }
  onChangePower(e) {
    this.setState({
      power: e.target.value
    });
  }
  onChangeCode(e) {
    this.setState({
      code: e.target.value
    });
  }
  onChangePrice(e) {
    this.setState({
      price: e.target.value
    });
  }
  onChangeNumberPanels(e) {
    this.setState({
      numberPanels: e.target.value
    });
  }
  onChangeArea(e) {
    this.setState({
      area: e.target.value
    });
  }
  onChangeInverterBrand(e) {
    this.setState({
      inverterBrand: e.target.value
    });
  }
  handleModalClose() {
    this.setState({
      isOpen: false,
      error: '',
      power: '',
      code: '',
      price: '',
      numberPanels: '',
      area: '',
      inverterBrand: ''
    });
  }
  render() {
    return (
      <div>
        <button className="button" onClick={() => this.setState({isOpen: true})}>+ Kits</button>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel="Add kits"
          onAfterOpen={() => this.refs.power.focus()}
          onRequestClose={this.handleModalClose.bind(this)}
          className="boxed-view__box"
          overlayClassName="boxed-view boxed-view--modal">
          <h1>Especificações</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined}
          <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
                <input
                  type="number"
                  placeholder="POTENCIA"
                  ref="power"
                  value={this.state.power}
                  onChange={this.onChangePower.bind(this)}
                />
                <input
                  type="text"
                  placeholder="CODIGO"
                  ref="code"
                  value={this.state.code}
                  onChange={this.onChangeCode.bind(this)}
                />
                <input
                  type="number"
                  placeholder="PRECO"
                  ref="price"
                  value={this.state.price}
                  onChange={this.onChangePrice.bind(this)}
                />
                <input
                  type="number"
                  placeholder="QTD PAINEIS"
                  ref="numberPanels"
                  value={this.state.numberPanels}
                  onChange={this.onChangeNumberPanels.bind(this)}
                />
                <input
                  type="number"
                  placeholder="AREA"
                  ref="area"
                  value={this.state.area}
                  onChange={this.onChangeArea.bind(this)}
                />
                <input
                  type="text"
                  placeholder="MARCA DO INVERSOR"
                  ref="inverterBrand"
                  value={this.state.inverterBrand}
                  onChange={this.onChangeInverterBrand.bind(this)}
                />
              <button className="button">Confirmar</button>
              <button type="button" className="button button--secondary" onClick={this.handleModalClose.bind(this)}>Cancelar</button>
          </form>
        </Modal>
      </div>
    );
  }
}

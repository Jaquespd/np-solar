import { Meteor } from 'meteor/meteor';
import React from 'react';
import Modal from 'react-modal';
import moment from 'moment';
import { Session } from 'meteor/session';

import { Kits } from '../api/kits';

export default class LinksListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      error: '',
      consumption: '',
      input: '',
      streetLighting: '',
      energyPrice:'',
      budgetOpen: false,
      kits: []
    };
  }
  onSubmit(e) {
    const { consumption } = this.state;
    const { input } = this.state;
    const { streetLighting } = this.state;
    const { energyPrice } = this.state;

    e.preventDefault();

    Meteor.call('links.updateEletricalData', this.props._id, consumption, input, streetLighting, energyPrice, (err, res) => {
      if (!err) {
        this.handleModalClose();
      } else {
        this.setState({ error: err.reason });
      }
    });
  }
  componentDidMount() {
    // TODO fazer traker, subscribe in colection, set state kits
    console.log('componentDidMount LinksListItems');
    this.kitsTracker = Tracker.autorun(() => {
      Meteor.subscribe('kits');
      const kits = Kits.find({
        availability: true
      }).fetch();
      this.setState({ kits });
    });
  }
  componentWillUnmount() {
    // TODO stop tracker
    this.kitsTracker.stop();
  }
  onChangeConsumption(e) {
    this.setState({
      consumption: e.target.value
    });
  }
  onChangeInput(e) {
    this.setState({
      input: e.target.value
    });
  }
  onChangeStreetLighting(e) {
    this.setState({
      streetLighting: e.target.value
    });
  }
  onChangeEnergyPrice(e) {
    this.setState({
      energyPrice: e.target.value
    });
  }
  handleModalClose() {
    this.setState({
      isOpen: false,
      error: '',
      consumption: '',
      input: '',
      streetLighting: '',
      energyPrice:''
    });
  }
  addKit() {


    // 'kits.insert'(power, code, price, numberPanels, area, inverterBrand) {
    Meteor.call('kits.insert', {power:'5'}, {code: '54478'}, {price: "2500"}, {numberPanels: "5"}, {area: '8'}, {inverterBrand: 'Xing'}, (err, res) => {
      if (!err) {
        console.log('Erro ao adicionar os kits');
      } else {
        this.setState({ error: err.reason });
      }
    });
  }
  renderStats() {
    const visitMessage = this.props.visitedCount === 1 ? 'visit' : 'visits';
    let visitedMessage = null;

    if (typeof this.props.lastVisitedAt === 'number') {
      visitedMessage = `(create ${ moment(this.props.lastVisitedAt).fromNow() })`;
    }

    return <p className="item__message">{this.props.visitedCount} {visitMessage} {visitedMessage}</p>;
  }
  genBudget() {
    // Tenho Consumo, tipo de entrada, iluminacao publica e preco da energia
    // Consumo / Quantidade energia que 1kWp gera / fator perdas
    // potencia do gerador * preco do kWp
    // potencia do gerador / potencia dos paineis
    let calc = 0;
    const rateAvailability = this.props.input === "Monofásica" ? 15 : 100;
    calc = (this.props.consumption / 12 - rateAvailability) / 166 / 0.8;
    const powerGenerator = parseFloat(calc.toFixed(1));
    const generatorPrice = Math.ceil(powerGenerator * 4500);
    const numberPanels = Math.ceil(powerGenerator * 1000 / 330);
    const installationArea = numberPanels * 2;
    const billEnergy = rateAvailability * parseFloat(this.props.energyPrice) + parseFloat(this.props.streetLighting);
    const generatedEnergy = Math.ceil(numberPanels * 330 / 1000 * 166 * 0.8);
    calc = generatorPrice / generatedEnergy / this.props.energyPrice / 12;
    const payBack = parseFloat(calc.toFixed(1));
    calc = generatedEnergy * this.props.energyPrice;
    const monthlySavings = parseFloat(calc.toFixed(2));
    calc = monthlySavings * 12;
    const annualSavings = parseFloat(calc.toFixed(2));
    calc = annualSavings * 25;
    const projectSavings = parseFloat(calc.toFixed(2));

    console.log("Entrada:", this.props.input,"Consumo minimo:", rateAvailability,"Potencia do Gerador:", powerGenerator,
    "Preco do Gerador:", generatorPrice,"Numero de Paineis:", numberPanels,"Area de Instalacao:", installationArea,
    "Conta de Energia:", billEnergy, "Energia Gerada:", generatedEnergy, "Payback:", payBack, "Economia Mensal:",
     monthlySavings, "Economia Anual:", annualSavings, "Economia em 25 anos:", projectSavings);

     Session.set('selectedBudgetId',this.props._id);
     this.setState({budgetOpen: true});
     console.log(this.state.budgetOpen);
  }
  genPower() {
    // this.addKit();
    let calc = 0;
    const rateAvailability = this.props.input === "Monofásica" ? 15 : 100;
    calc = (this.props.consumption / 12 - rateAvailability) / 166 / 0.8;
    const powerGenerator = parseFloat(calc.toFixed(1));
    return powerGenerator;
  }
  renderBudget() {
    return (
      <div className="testPage">
        <div>
          <p>Dados Elétricos</p>
          <p>Consumo: {this.props.consumption} kWh p/ano, {this.props.consumption / 12} kWh p/mês</p>
          <p>Entrada: {this.props.input}.</p>
          <p>Potencia Necessaria: {this.genPower()} kWp.</p>
          <p>Iluminação Pública: R$ {this.props.streetLighting} reais.</p>
          <p>Valor do kWh: R$ {this.props.energyPrice}.</p>
        </div>
        <button className="button button--pill" onClick={()=>this.setState({budgetOpen:false})}>Escolher Gerador</button>
        <div>
          <p>Resultado</p>
          <p>Potencia do Gerador: 3.9 kWp.</p>
          <p>Valor do Gerador: R$ 12.000,00 reais, equivalente a R$ 4.500,00 reais p/ kWp</p>
          <p>Numero de Paineis: 14 de 275W ou 10 de 330W.</p>
          <p>Area de Instalação: 24 m²</p>
          <p>Previsão da Conta de Luz: R$ 10,00 reais.</p>
          <p>Tempo de retorno: 4,5 anos</p>
          <p>Economia mensal: R$ 200,00 reais</p>
          <p>Economia Anual: R$ 2.500,00 reais</p>
          <p>Economia 25 anos: R$ 22.500,00 reais</p>
        </div>
        <div>
          <p>Observações</p>
          <p>Aumento do dolar...</p>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div>
        <div className="subitem">
          <h2>Nome: {this.props.name}</h2>
          <p className="subitem__message">Celular: {this.props.phone}, Email: {this.props.email}</p>
          {this.renderStats()}
          <button className="button button--pill" onClick={() => this.setState({isOpen: true})}>Config</button>
          <Modal
            isOpen={this.state.isOpen}
            contentLabel="Add eletricalData"
            onAfterOpen={() => this.refs.consumption.focus()}
            onRequestClose={this.handleModalClose.bind(this)}
            className="boxed-view__box"
            overlayClassName="boxed-view boxed-view--modal">
            <h1>Dados Elétricos</h1>
            {this.state.error ? <p>{this.state.error}</p> : undefined}
            <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
                  <input
                    type="text"
                    placeholder="CONSUMO ANUAL kWh"
                    ref="consumption"
                    value={this.state.consumption}
                    onChange={this.onChangeConsumption.bind(this)}
                  />
                  <input
                    type="text"
                    placeholder="ENTRADA"
                    ref="input"
                    value={this.state.input}
                    onChange={this.onChangeInput.bind(this)}
                  />
                  <input
                    type="text"
                    placeholder="iluminacao Publica"
                    ref="streetLighting"
                    value={this.state.streetLighting}
                    onChange={this.onChangeStreetLighting.bind(this)}
                  />
                  <input
                    type="text"
                    placeholder="Preço da Energia"
                    ref="energyPrice"
                    value={this.state.energyPrice}
                    onChange={this.onChangeEnergyPrice.bind(this)}
                  />
                <button className="button">Confirmar</button>
                <button type="button" className="button button--secondary" onClick={this.handleModalClose.bind(this)}>Cancelar</button>
            </form>
          </Modal>
          <button className="button button--pill" onClick={() => {this.genBudget()}}>Gerar</button>
          <button className="button button--pill">Enviar</button>
          <button className="button button--pill" onClick={() => {
            Meteor.call('links.setVisibility', this.props._id, !this.props.visible);
          }}>
            {this.props.visible ? 'Arquivar' : 'Desarquivar'}
          </button>
          <button className="button button--pill" onClick={() => {
            Meteor.call('links.delete', this.props._id);
          }}>Deletar</button>
        </div>
        <div>
          {this.state.budgetOpen ? this.renderBudget() : undefined }
        </div>
      </div>
    );
  }
};

LinksListItem.propTypes = {
  _id: React.PropTypes.string.isRequired,
  userId: React.PropTypes.string.isRequired,
  visible: React.PropTypes.bool.isRequired,
  shortUrl: React.PropTypes.string.isRequired,
  visitedCount: React.PropTypes.number.isRequired,
  lastVisitedAt: React.PropTypes.number,
  name: React.PropTypes.string.isRequired,
  phone: React.PropTypes.string.isRequired,
  email: React.PropTypes.string.isRequired,
  eletricalData: React.PropTypes.bool.isRequired,
  budget: React.PropTypes.bool.isRequired
};

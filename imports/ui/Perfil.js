import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import FlipMove from 'react-flip-move';
import { createContainer } from 'meteor/react-meteor-data';


import { Vendedors } from '../api/vendedors';
import KitsListItem from './KitsListItem';

export class Perfil extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vendedor: {},
      error: '',
      selectedMenu: '',
      editInfPersonal: false,
      editInfFinance: false,
    };
  }
  componentDidUpdate() {
    console.log('componente Update');
    if (this.props.vendedor === this.state.vendedor) {
      console.log('são iguais:');

    } else {
      console.log('NAO são iguais:');
      this.setState({
        vendedor: this.props.vendedor
      });
    }
  }
  insertProfile() {
    console.log('Criar perfil padrao');
    const { name } = this.state;
    const { cpf } = this.state;
    const { phone } = this.state;
    const { email } = this.state;
    const { commissionKwp } = this.state;
    const { limitCommissionKwp } = this.state;
    const { commissionProject } = this.state;

    Meteor.call('vendedors.insert', name, cpf, phone, email, commissionKwp, limitCommissionKwp, commissionProject, (err, res) => {
      if (!err) {
        console.log('Perfil adicionado!');
      } else {
        this.setState({ error: err.reason });
      }
    });
  }
  onChangeName(e) {
    const name = e.target.value;
    this.props.call('vendedors.update', this.props.vendedor._id, { name });
  }
  onChangeCpf(e) {
    const cpf = e.target.value;
    this.props.call('vendedors.update', this.props.vendedor._id, { cpf });
  }
  onChangePhone(e) {
    const phone = e.target.value;
    this.props.call('vendedors.update', this.props.vendedor._id, { phone });
  }
  onChangeEmail(e) {
    const email = e.target.value;
    this.props.call('vendedors.update', this.props.vendedor._id, { email });
  }
  onChangeCommissionKwp(e) {
    const commissionKwp = e.target.value;
    this.props.call('vendedors.update', this.props.vendedor._id, { commissionKwp });
  }
  onChangeLimitCommissionKwp(e) {
    const limitCommissionKwp = e.target.value;
    this.props.call('vendedors.update', this.props.vendedor._id, { limitCommissionKwp });
  }
  onChangeCommissionProject(e) {
    const commissionProject = e.target.value;
    this.props.call('vendedors.update', this.props.vendedor._id, { commissionProject });
  }
  infPersonal() {
    if (!this.state.editInfPersonal) {
      return (
        <div>
          <button onClick={() => {this.setState({editInfPersonal: true})}}>Edit</button>
          <h1>{this.state.vendedor.name}</h1>
          <p>CPF: {this.state.vendedor.cpf}</p>
          <p>Celular: {this.state.vendedor.phone}</p>
          <p>Email: {this.state.vendedor.email}</p>
          <p>Ativo desde: 3 meses atras</p>
        </div>
      );
    } else {
      return (
        <div>
          <label>
            Nome:
            <input
              type="text"
              placeholder="Nome"
              ref="name"
              value={this.state.vendedor.name}
              onChange={this.onChangeName.bind(this)}/>
          </label>
          <label>
            CPF:
            <input
              type="text"
              placeholder="CPF"
              ref="cpf"
              value={this.state.vendedor.cpf}
              onChange={this.onChangeCpf.bind(this)}/>
          </label>
          <label>
            Celular:
            <input
              type="text"
              placeholder="Celular"
              ref="phone"
              value={this.state.vendedor.phone}
              onChange={this.onChangePhone.bind(this)}/>
          </label>
          <label>
            Email:
            <input
              type="text"
              placeholder="Email"
              ref="email"
              value={this.state.vendedor.email}
              onChange={this.onChangeEmail.bind(this)}/>
          </label>
          <button onClick={() =>  this.setState({editInfPersonal: false}) }>Confirmar</button>
        </div>
      );
    }
  }
  infFinance() {
    if (!this.state.editInfFinance) {
      return (
        <div>
          <button onClick={() => {this.setState({editInfFinance: true})}}>Edit</button>
          <p>Comissão</p>
          <p>R$ {this.state.vendedor.commissionKwp} p/ kWp (até {this.state.vendedor.limitCommissionKwp} kWp)</p>
          <p>R$ {this.state.vendedor.commissionProject} p/ venda (acima {this.state.vendedor.limitCommissionKwp} kWp)</p>
        </div>
      );
    } else {
      return (
        <div>
          <label>
            Comissão por kWp:
            <input
              type="number"
              placeholder="Comissão"
              ref="commissionKwp"
              value={this.state.vendedor.commissionKwp}
              onChange={this.onChangeCommissionKwp.bind(this)}/>
          </label>
          <label>
            Limite da comissão por kWp:
            <input
              type="number"
              placeholder="Limite"
              ref="limitCommissionKwp"
              value={this.state.vendedor.limitCommissionKwp}
              onChange={this.onChangeLimitCommissionKwp.bind(this)}/>
          </label>
          <label>
            Comissão por projeto:
            <input
              type="number"
              placeholder="comissão"
              ref="commissionProject"
              value={this.state.vendedor.commissionProject}
              onChange={this.onChangeCommissionProject.bind(this)}/>
          </label>
          <button onClick={() => this.setState({editInfFinance: false}) }>Confirmar</button>
        </div>
      );
    }
  }
  renderLinksListItems() {
    if (true) {
      return (
        <div className={this.props.selectedMenu === 'profile' ? 'budget' : 'budget budget__toggle'}>
          <div className="subitem">
            {this.state.error ? <p>{this.state.error}</p> : undefined}
            {this.infPersonal()}
            <hr/>
            {this.infFinance()}
            <hr/>
            <p>Estatistica</p>
            <p>Numero de Orçamentos Realizados: {this.state.vendedor.budgetMade}</p>
            <p>Numero de Orçamentos Ativos: {this.state.vendedor.budgetActive}</p>
            <p>Numero de Orçamentos Enviados: {this.state.vendedor.budgetSend}</p>
            <p>Pespectiva de Comissão: R$ {this.state.vendedor.budgetSend * this.state.vendedor.commissionProject}</p>

          </div>
        </div>
      );
    }
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

Perfil.propTypes = {
  selectedMenu: React.PropTypes.string,
  vendedor: React.PropTypes.object,
  call: React.PropTypes.func.isRequired
};

export default createContainer(() => {
  const selectedMenu = Session.get('selectedMenu');

  Meteor.subscribe('vendedors');
  const userId = Meteor.userId();

  return {
    selectedMenu,
    vendedor: Vendedors.findOne({userId}),
    call: Meteor.call
  };
}, Perfil);

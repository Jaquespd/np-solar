import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import { Session } from 'meteor/session';
import { ProfileUser } from '../api/profileUser';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileUser: [],
      selectedMenu: '',
      name: 'Usuario',
      cpf: '000.000.000.00',
      phone: '00 00000-0000',
      email: 'email@dominio.com',
      commissionKwp: '500',
      limitCommissionKwp: '5',
      commissionProject: '3000'
    };
  }
  componentDidMount() {
    this.profileUserTracker = Tracker.autorun(() => {
      Meteor.subscribe('profileUser');
      const profileUser2 = ProfileUser.find({
        userId: this.userId
      }).fetch();
      this.setState({ profileUser: profileUser2 });
      console.log(profileUser2);
      if (this.state.profileUser.length === 1) {

        console.log('Criar perfil padrao');
        const { name } = this.state;
        const { cpf } = this.state;
        const { phone } = this.state;
        const { email } = this.state;
        const { commissionKwp } = this.state;
        const { limitCommissionKwp } = this.state;
        const { commissionProject } = this.state;

        Meteor.call('profileUser.insert', name, cpf, phone, email, commissionKwp, limitCommissionKwp, commissionProject, (err, res) => {
          if (!err) {
            console.log('deu certo!');
          } else {
            this.setState({ error: err.reason });
          }
        });
      } else {
        console.log('perfil existente');
      }
      this.setState({ profileUser: profileUser2 });
    });
    Tracker.autorun(() => {
      this.setState({selectedMenu: Session.get('selectedMenu')});
    });
  }
  componentWillUnmount() {
    console.log('componentWillUnmount Profile');
    this.profileUserTracker.stop();
  }
  render() {
    return (
      <div className={this.state.selectedMenu === 'profile' ? 'budget' : 'budget budget__toggle'}>
        <div className="subitem">
        <button className="button button--pill">Edit</button>
        <form className="boxed-view__form">
          <label>
            Nome:
            <input/>
          </label>
          <label>
            CPF:
            <input/>
          </label>
          <label>
            Celular:
            <input/>
          </label>
          <label>
            Email:
            <input/>
          </label>
          <button className="button button--pill">Confirmar</button>
          <button className="button button--pill">Cancelar</button>
        </form>
        <h1>Jaques Pereira Delgado</h1>
        <p>CPF: 051.431.414-19</p>
        <p>Celular: 84 996522011</p>
        <p>Email: jaquespd@gmail.com</p>
        <p>Ativo desde: 3 meses atras</p>
        <hr/>
        <button className="button button--pill">Edit</button>
        <form className="boxed-view__form">
          <label>
            Comissão p/ kWp:
            <input/>
          </label>
          <label>
            Limite:
            <input/>
          </label>
          <label>
            Comissão projeto:
            <input/>
          </label>
          <button className="button button--pill">Confirmar</button>
          <button className="button button--pill">Cancelar</button>
        </form>
        <p>Comissão</p>
        <p>R$ 300,00 p/ kWp (até 5 kWp)</p>
        <p>R$ 2000,00 p/ venda (acima 5 kWp)</p>
        <hr/>
        <p>Estatistica</p>
        <p>Numero de Orçamentos Realizados: 22</p>
        <p>Numero de Orçamentos Ativos: 8</p>
        <p>Numero de Orçamentos Enviados: 5</p>
        <p>Pespectiva de Comissão: R$ 16.000,00</p>
      </div>
      </div>
    );
  }
}

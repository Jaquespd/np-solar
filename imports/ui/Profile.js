import React from 'react';

import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';


const Profile = (props) => {
  return (
    <div className={props.selectedMenu === 'profile' ? 'budget' : 'budget budget__toggle'}>
      <h1>Jaques Pereira Delgado</h1>
      <p>CPF: 051.431.414-19</p>
      <p>Celular: 84 996522011</p>
      <p>Email: jaquespd@gmail.com</p>
      <p>Ativo desde: 3 meses atras</p>
      <hr/>
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
  );
};

Profile.propTypes = {
  selectedMenu: React.PropTypes.string.isRequired
};

export default createContainer(() => {
  const selectedMenu = Session.get('selectedMenu');

  return {
    selectedMenu
  };
}, Profile);

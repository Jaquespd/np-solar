import React from 'react';
import Modal from 'react-modal';
import { Meteor } from 'meteor/meteor';

export default class AddLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      error: '',
      name: '',
      phone: '',
      email: ''
    };
  }
  onSubmit(e) {
    const { name } = this.state;
    const { phone } = this.state;
    const { email } = this.state;

    e.preventDefault();

    Meteor.call('links.insert', name, phone, email, (err, res) => {
      if (!err) {
        this.handleModalClose();
      } else {
        this.setState({ error: err.reason });
      }
    });
  }
  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }
  onChangePhone(e) {
    this.setState({
      phone: e.target.value
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }
  handleModalClose() {
    this.setState({
      isOpen: false,
      error: '',
      name: '',
      phone: '',
      email: ''
    });
  }
  render() {
    return (
      <div>
        <button className="button" onClick={() => this.setState({isOpen: true})}>+ Orçamento</button>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel="Add link"
          onAfterOpen={() => this.refs.name.focus()}
          onRequestClose={this.handleModalClose.bind(this)}
          className="boxed-view__box"
          overlayClassName="boxed-view boxed-view--modal">
          <h1>Dados Pessoais</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined}
          <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
                <input
                  type="text"
                  placeholder="NOME"
                  ref="name"
                  value={this.state.name}
                  onChange={this.onChangeName.bind(this)}
                />
                <input
                  type="tel"
                  placeholder="CELULAR"
                  ref="phone"
                  value={this.state.phone}
                  onChange={this.onChangePhone.bind(this)}
                />
                <input
                  type="email"
                  placeholder="EMAIL"
                  ref="email"
                  value={this.state.email}
                  onChange={this.onChangeEmail.bind(this)}
                />
              <button className="button">Confirmar</button>
              <button type="button" className="button button--secondary" onClick={this.handleModalClose.bind(this)}>Cancelar</button>
          </form>
        </Modal>
      </div>
    );
  }
}

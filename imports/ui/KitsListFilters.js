import React from 'react';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

export default class KitsListFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAvailability: true
    };
  }
  componentDidMount() {
    this.tracker = Tracker.autorun(() => {
      this.setState({
        showAvailability: Session.get('showAvailability')
      })
    });
  }
  componentWillUnmount() {
    this.tracker.stop();
  }
  render() {
    return (
      <div>
        <label className="checkbox">
          <input className="checkbox__box" type="checkbox" checked={!this.state.showAvailability} onChange={(e) => {
            Session.set('showAvailability', !e.target.checked);
          }}/>
          mostrar insdisponiveis
        </label>
      </div>
    );
  }
}

import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import { browserHistory } from 'react-router';

import { routes, onAuthChange } from '../imports/routes/routes';
import '../imports/startup/simple-schema-configuration.js';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  const currentPagePrivacy = Session.get('currentPagePrivacy');

  onAuthChange(isAuthenticated, currentPagePrivacy);
});

Tracker.autorun(() => {
  const selectedNoteId = Session.get('selectedNoteId');
  const selectedMenu = Session.get('selectedMenu');
  Session.set('isNavOpen', false);

  if (selectedNoteId) {
    browserHistory.replace(`/dashboard/${selectedNoteId}`);
  }
});

Tracker.autorun(() => {
  const isNavOpen = Session.get('isNavOpen');

  document.body.classList.toggle('is-nav-open', isNavOpen);
});

Meteor.startup(() => {
  Session.set('selectedNoteId', undefined);
  Session.set('selectedBudgetId', undefined);
  Session.set('selectedMenu', 'profile');
  Session.set('isNavOpen', false);
  Session.set('showVisible', true);
  Session.set('showAvailability', true);
  ReactDOM.render(routes, document.getElementById('app'));
});

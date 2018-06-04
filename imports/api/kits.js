import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';

export const Kits = new Mongo.Collection('kits');

if (Meteor.isServer) {
  Meteor.publish('kits', function () {
    return Kits.find({
      // availability: true
      // TODO FAZER A LOGICA PARA USER E ADMIN
    });
  });
}

Meteor.methods({
  'kits.insert'(power, code, price, numberPanels, area, inverterBrand) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      power: {
        type: String,
        min: 1
      },
      code: {
        type: String,
        min: 1
      },
      price: {
        type: String,
        min: 1
      },
      numberPanels: {
        type: String,
        min: 1
      },
      area: {
        type: String,
        min: 1
      },
      inverterBrand: {
        type: String,
        min: 1
      }
    }).validate({ power, code, price, numberPanels, area, inverterBrand });

    return Kits.insert({
      userId: this.userId,
      power,
      code,
      price,
      numberPanels,
      area,
      inverterBrand,
      availability: true,
      registrationDate: moment().valueOf(),
      dateSoldOut: null
    });
  },
  'kits.remove'(_id) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id });

    Notes.remove({ _id, userId: this.userId });
  },
  'kits.update'(_id) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({
      _id
    });

    Kits.update({
      _id,
      userId: this.userId
    }, {
      $set: {
        availability: false,
        dateSoldOut: moment().valueOf()
      }
    });
  },
  'kits.setAvailability'(_id, availability) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      availability: {
        type: Boolean
      }
    }).validate({ _id, availability });

    Kits.update({
      _id,
      userId: this.userId
    }, {
      $set: { availability }
    });
  }
});

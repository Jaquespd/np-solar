import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
  Meteor.publish('links', function () {
    return Links.find({ userId: this.userId });
  });
}

Meteor.methods({
  'links.insert'(url) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      url: {
        type: String,
        label: 'Your name',
        min: 1
      }
    }).validate({ url });

    Links.insert({
      _id: shortid.generate(),
      userId: this.userId,
      visible: true,
      visitedCount: 0,
      lastVisitedAt: new Date().getTime(),
      url,
      eletricalData: false,
      consumption: null,
      input: null,
      streetLighting: null,
      energyPrice: null,
      budget: false
    });
  },
  'links.updateEletricalData'(_id, consumption, input, streetLighting, energyPrice) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      consumption: {
        type: String,
        min: 1
      },
      input: {
        type: String,
        min: 1
      },
      streetLighting: {
        type: String,
        min: 1
      },
      energyPrice: {
        type: String,
        min: 1
      }
    }).validate({ _id, consumption, input, streetLighting, energyPrice });

    Links.update({ _id }, {
      $set: {
        consumption: consumption,
        input: input,
        streetLighting: streetLighting,
        energyPrice: energyPrice,
        eletricalData: true
      }
    })
  },
  'links.delete'(_id) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id });

    Links.remove({
      _id,
      userId: this.userId
    });
  },
  'links.setVisibility'(_id, visible) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      visible: {
        type: Boolean
      }
    }).validate({ _id, visible });

    Links.update({
      _id,
      userId: this.userId
    }, {
      $set: { visible }
    });
  },
  'links.trackVisit'(_id) {
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id });

    Links.update({ _id }, {
      $set: {
        lastVisitedAt: new Date().getTime()
      },
      $inc: {
        visitedCount: 1
      }
    })
  }
});

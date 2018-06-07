import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Profile = new Mongo.Collection('profile');

if (Meteor.isServer) {
  Meteor.publish('profile', function () {
    return Profile.find({ userId: this.userId });
  });
}

Meteor.methods({
  'profile.insert'(name, cpf, phone, email, commissionKwp, limitCommissionKwp, commissionProject) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      name: {
        type: String,
        label: 'Your name',
        min: 1
      },
      cpf: {
        type: String,
        label: 'Your CPF',
        min: 1
      },
      phone: {
        type: String,
        label: 'Your phone',
        regEx: SimpleSchema.RegEx.Phone
      },
      email: {
        type: String,
        label: 'Your email',
        regEx: SimpleSchema.RegEx.Email
      },
      commissionKwp: {
        type: String,
        label: 'Your commissionKwp',
        min: 1
      },
      limitCommissionKwp: {
        type: String,
        label: 'Your limitCommissionKwp',
        min: 1
      },
      commissionProject: {
        type: String,
        label: 'Your commissionProject',
        min: 1
      }
    }).validate({ name, cpf, phone, email, commissionKwp, limitCommissionKwp, commissionProject });

    Profile.insert({
      userId: this.userId,
      name,
      cpf,
      phone,
      email,
      createDate: new Date().getTime(),
      commissionKwp,
      limitCommissionKwp,
      commissionProject,
      budgetMade: 0,
      budgetActive: 0,
      budgetSend: 0
    });
  },
  'profile.updateCommission'(_id, commissionKwp, limitCommissionKwp, commissionProject) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      commissionKwp: {
        type: String,
        min: 1
      },
      limitCommissionKwp: {
        type: String,
        min: 1
      },
      commissionProject: {
        type: String,
        min: 1
      }
    }).validate({ _id, commissionKwp, limitCommissionKwp, commissionProject });

    Profile.update({ _id }, {
      $set: {
        commissionKwp,
        limitCommissionKwp,
        commissionProject
      }
    })
  },
  'profile.incBudgetMade'(_id) {
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id });

    Profile.update({ _id }, {
      $inc: {
        budgetMade: 1
      }
    })
  },
  'profile.decBudgetMade'(_id) {
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id });

    Profile.update({ _id }, {
      $inc: {
        budgetMade: -1
      }
    })
  },
  'profile.incBudgetActive'(_id) {
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id });

    Profile.update({ _id }, {
      $inc: {
        budgetActive: 1
      }
    })
  },
  'profile.decBudgetActive'(_id) {
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id });

    Profile.update({ _id }, {
      $inc: {
        budgetActive: -1
      }
    })
  },
  'profile.incBudgetSend'(_id) {
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id });

    Profile.update({ _id }, {
      $inc: {
        budgetSend: 1
      }
    })
  },
  'profile.decBudgetSend'(_id) {
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id });

    Profile.update({ _id }, {
      $inc: {
        budgetSend: -1
      }
    })
  }
});

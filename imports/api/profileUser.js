import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const ProfileUser = new Mongo.Collection('profileUser');

if (Meteor.isServer) {
  Meteor.publish('profileUser', function () {
    return ProfileUser.find({ userId: this.userId });
  });
}

Meteor.methods({
  'profileUser.insert'(name, cpf, phone, email, commissionKwp, limitCommissionKwp, commissionProject) {
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

    ProfileUser.insert({
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
  'profileUser.updateCommission'(_id, commissionKwp, limitCommissionKwp, commissionProject) {
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

    ProfileUser.update({ _id }, {
      $set: {
        commissionKwp,
        limitCommissionKwp,
        commissionProject
      }
    })
  },
  'profileUser.incBudgetMade'(_id) {
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id });

    ProfileUser.update({ _id }, {
      $inc: {
        budgetMade: 1
      }
    })
  },
  'profileUser.decBudgetMade'(_id) {
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id });

    ProfileUser.update({ _id }, {
      $inc: {
        budgetMade: -1
      }
    })
  },
  'profileUser.incBudgetActive'(_id) {
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id });

    ProfileUser.update({ _id }, {
      $inc: {
        budgetActive: 1
      }
    })
  },
  'profileUser.decBudgetActive'(_id) {
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id });

    ProfileUser.update({ _id }, {
      $inc: {
        budgetActive: -1
      }
    })
  },
  'profileUser.incBudgetSend'(_id) {
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id });

    ProfileUser.update({ _id }, {
      $inc: {
        budgetSend: 1
      }
    })
  },
  'profileUser.decBudgetSend'(_id) {
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id });

    ProfileUser.update({ _id }, {
      $inc: {
        budgetSend: -1
      }
    })
  }
});

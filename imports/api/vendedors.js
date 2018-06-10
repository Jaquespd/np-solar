import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';

export const Vendedors = new Mongo.Collection('vendedors');

if (Meteor.isServer) {
  Meteor.publish('vendedors', function () {
    return Vendedors.find({
      userId: this.userId
      // TODO FAZER A LOGICA PARA USER E ADMIN
    });
  });
}

Meteor.methods({
  'vendedors.insert'(name, cpf, phone, email, commissionKwp, limitCommissionKwp, commissionProject) {
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

    Vendedors.insert({
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
  'vendedors.updateInfPersonal'(name, cpf, phone, email) {
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
      }
    }).validate({ name, cpf, phone, email });

    Vendedors.update({
      userId: this.userId
    }, {
      $set: {
        name,
        cpf,
        phone,
        email
      }
    });
  },
  'vendedors.updateInfFinance'(commissionKwp, limitCommissionKwp, commissionProject) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
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
    }).validate({ commissionKwp, limitCommissionKwp, commissionProject });

    Vendedors.update({
      userId: this.userId
    }, {
      $set: {
        commissionKwp,
        limitCommissionKwp,
        commissionProject
      }
    });
  },
  'vendedors.update'(_id, updates) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      name: {
        type: String,
        optional: true
      },
      cpf: {
        type: String,
        optional: true
      },
      phone: {
        type: String,
        optional: true
      },
      email: {
        type: String,
        optional: true
      },
      commissionKwp: {
        type: String,
        optional: true
      },
      limitCommissionKwp: {
        type: String,
        optional: true
      },
      commissionProject: {
        type: String,
        optional: true
      },
      budgetMade: {
        type: String,
        optional: true
      },
      budgetActive: {
        type: String,
        optional: true
      },
      budgetSend: {
        type: String,
        optional: true
      }
    }).validate({
      _id,
      ...updates
    });

    Vendedors.update({
      _id,
      userId: this.userId
    }, {
      $set: {
        ...updates
      }
    });
  }
})

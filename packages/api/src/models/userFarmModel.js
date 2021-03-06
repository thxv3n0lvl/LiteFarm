/* 
 *  Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>   
 *  This file (userFarmModel.js) is part of LiteFarm.
 *  
 *  LiteFarm is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *  
 *  LiteFarm is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  GNU General Public License for more details, see <https://www.gnu.org/licenses/>.
 */

const Model = require('objection').Model;

class userFarm extends Model {
  static get tableName() {
    return 'userFarm';
  }

  static get idColumn() {
    return  ['user_id', 'farm_id'];
  }

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['user_id', 'farm_id'],

      properties: {
        user_id: { type: 'string' },
        farm_id: { type: 'string' },
        role_id: { type: 'number' },
        has_consent: { type: ['boolean', 'null'] },
        status: {
          type: 'enum',
          enum: ['Active', 'Inactive', 'Invited',],
        },
        created_at: { type: 'string' },
        consent_version: { type: 'string' },
        wage: {
          type : 'object',
          required: ['type', 'amount'],
          properties: {
            type: {
              type: 'string',
              enum: ['hourly', 'annually'],
            },
            amount:{ type: 'number' },
          },
        },
      },
      additionalProperties: false,
    };
  }

  static get relationMappings() {
    return {
      user:{
        modelClass:require('./userModel'),
        relation: Model.HasOneRelation,
        join: {
          from: 'userFarm.user_id',
          to: 'users.user_id',
        },
      },
      farm: {
        modelClass:require('./farmModel'),
        relation: Model.HasOneRelation,
        join: {
          from: 'userFarm.farm_id',
          to: 'farm.farm_id',
        },

      },
      role: {
        modelClass:require('./roleModel'),
        relation: Model.HasOneRelation,
        join: {
          from: 'userFarm.role_id',
          to: 'role.role_id',
        },
      },
    }
  }
}

module.exports = userFarm;

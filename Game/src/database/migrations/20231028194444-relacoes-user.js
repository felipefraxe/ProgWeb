'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.addConstraint('Users', {
          type: 'foreign key',
          fields: ['cursoId'],
          name: 'users_cursos_fk',
          references: {
              table: 'Cursos',
              field: 'id'
          },
          onDelete: 'restrict',
          onUpdate: 'restrict'
      });
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.removeConstraint("Users", "users_cursos_fk");
  }
};

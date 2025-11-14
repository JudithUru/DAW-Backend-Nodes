'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    let [fotos, fotos_metadata] = await queryInterface.sequelize.query('SELECT id FROM fotos')
    let [etiquetas, etiquetas_metadata] = await queryInterface.sequelize.query('SELECT id FROM etiquetas')

    const relaciones = [];

    //10 relaciones
    for (let i = 0; i < 10; i++) {
      const fotoRandom = fotos[Math.floor(Math.random() * fotos.length)];

      const etiquetaRandom = etiquetas[Math.floor(Math.random() * etiquetas.length)];

      relaciones.push({
        foto_id: fotoRandom.id,
        etiqueta_id: etiquetaRandom.id,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    // Insertar todas las relaciones
    await queryInterface.bulkInsert('fotoetiquetas', relaciones, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('fotoetiquetas', null, {})

  }

}

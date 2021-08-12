import Sequelize from 'sequelize'

export default (sequelizeInstance) => {
  const Model = sequelizeInstance.define(
    'helps',
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      goal: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      when: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      conditions: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      cumulable: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      link: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      who: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      section: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      situtation: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      count_vue: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      underscored: true,
    }
  )

  Model.associate = function (models) {
    return models
  }

  return Model
}

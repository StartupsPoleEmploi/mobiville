module.exports = {
  up: async (queryInterface, Sequelize, models) => {
    await models.socialhousings.create(
      {
        code_reg: 1,
        nb_2019: 37004,
      },
      true
    )
    await models.socialhousings.create(
      {
        code_reg: 2,
        nb_2019: 33198,
      },
      true
    )
    await models.socialhousings.create(
      {
        code_reg: 3,
        nb_2019: 18243,
      },
      true
    )
    await models.socialhousings.create(
      {
        code_reg: 4,
        nb_2019: 75654,
      },
      true
    )
    await models.socialhousings.create(
      {
        code_reg: 6,
        nb_2019: 275,
      },
      true
    )
    await models.socialhousings.create(
      {
        code_reg: 11,
        nb_2019: 1311708,
      },
      true
    )
    await models.socialhousings.create(
      {
        code_reg: 24,
        nb_2019: 193254,
      },
      true
    )
    await models.socialhousings.create(
      {
        code_reg: 27,
        nb_2019: 189789,
      },
      true
    )
    await models.socialhousings.create(
      {
        code_reg: 28,
        nb_2019: 307834,
      },
      true
    )
    await models.socialhousings.create(
      {
        code_reg: 32,
        nb_2019: 579987,
      },
      true
    )
    await models.socialhousings.create(
      {
        code_reg: 44,
        nb_2019: 429276,
      },
      true
    )
    await models.socialhousings.create(
      {
        code_reg: 52,
        nb_2019: 232626,
      },
      true
    )
    await models.socialhousings.create(
      {
        code_reg: 53,
        nb_2019: 179167,
      },
      true
    )
    await models.socialhousings.create(
      {
        code_reg: 75,
        nb_2019: 304548,
      },
      true
    )
    await models.socialhousings.create(
      {
        code_reg: 76,
        nb_2019: 298342,
      },
      true
    )
    await models.socialhousings.create(
      {
        code_reg: 84,
        nb_2019: 570353,
      },
      true
    )
    await models.socialhousings.create(
      {
        code_reg: 93,
        nb_2019: 314046,
      },
      true
    )
    await models.socialhousings.create(
      {
        code_reg: 94,
        nb_2019: 14530,
      },
      true
    )
  },
  down: (/*queryInterface , Sequelize*/) => {},
}

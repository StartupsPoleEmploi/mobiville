module.exports = {
  up: async (queryInterface, Sequelize, models) => {
    await models.regions.update(
      { average_delay_obtain_social_housing: 14 },
      { where: { former_code: '42' } }
    )
    await models.regions.update(
      { average_delay_obtain_social_housing: 17 },
      { where: { former_code: '72' } }
    )
    await models.regions.update(
      { average_delay_obtain_social_housing: 18 },
      { where: { former_code: '83' } }
    )
    await models.regions.update(
      { average_delay_obtain_social_housing: 17 },
      { where: { former_code: '25' } }
    )
    await models.regions.update(
      { average_delay_obtain_social_housing: 13 },
      { where: { former_code: '26' } }
    )
    await models.regions.update(
      { average_delay_obtain_social_housing: 16 },
      { where: { former_code: '53' } }
    )
    await models.regions.update(
      { average_delay_obtain_social_housing: 7 },
      { where: { former_code: '24' } }
    )
    await models.regions.update(
      { average_delay_obtain_social_housing: 5 },
      { where: { former_code: '21' } }
    )
    await models.regions.update(
      { average_delay_obtain_social_housing: 16 },
      { where: { former_code: '94' } }
    )
    await models.regions.update(
      { average_delay_obtain_social_housing: 5 },
      { where: { former_code: '43' } }
    )
    await models.regions.update(
      { average_delay_obtain_social_housing: 7 },
      { where: { former_code: '01' } }
    )
    await models.regions.update(
      { average_delay_obtain_social_housing: 12 },
      { where: { former_code: '03' } }
    )
    await models.regions.update(
      { average_delay_obtain_social_housing: 8 },
      { where: { former_code: '23' } }
    )
    await models.regions.update(
      { average_delay_obtain_social_housing: 32 },
      { where: { former_code: '11' } }
    )
    await models.regions.update(
      { average_delay_obtain_social_housing: 14 },
      { where: { former_code: '91' } }
    )
    await models.regions.update(
      { average_delay_obtain_social_housing: 5 },
      { where: { former_code: '74' } }
    )
    await models.regions.update(
      { average_delay_obtain_social_housing: 7 },
      { where: { former_code: '41' } }
    )
    await models.regions.update(
      { average_delay_obtain_social_housing: 13 },
      { where: { former_code: '02' } }
    )
    await models.regions.update(
      { average_delay_obtain_social_housing: 9 },
      { where: { former_code: '73' } }
    )
    await models.regions.update(
      { average_delay_obtain_social_housing: 11 },
      { where: { former_code: '31' } }
    )
    await models.regions.update(
      { average_delay_obtain_social_housing: 12 },
      { where: { former_code: '52' } }
    )
    await models.regions.update(
      { average_delay_obtain_social_housing: 9 },
      { where: { former_code: '22' } }
    )
    await models.regions.update(
      { average_delay_obtain_social_housing: 10 },
      { where: { former_code: '54' } }
    )
    await models.regions.update(
      { average_delay_obtain_social_housing: 19 },
      { where: { former_code: '93' } }
    )
    await models.regions.update(
      { average_delay_obtain_social_housing: 11 },
      { where: { former_code: '04' } }
    )
    await models.regions.update(
      { average_delay_obtain_social_housing: 11 },
      { where: { former_code: '82' } }
    )
  },
  down: (/*queryInterface , Sequelize*/) => {},
}

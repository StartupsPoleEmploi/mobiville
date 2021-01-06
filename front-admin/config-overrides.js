// override create-react-app config

/* eslint-disable no-param-reassign */
module.exports = function override(config, env) {
  // manage root path
  config.output.publicPath = '/admin'

  return config
}

// override create-react-app config

/* eslint-disable no-param-reassign */
module.exports = function override(config, env) {
  // manage root path
  const isEnvDevelopment = env === 'development'
  if (isEnvDevelopment) {
    config.output.publicPath = '/admin'
  }

  return config
}

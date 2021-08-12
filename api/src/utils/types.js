import { Types as ksTypes } from 'koa-smart'

const general = {
  boolean: (defaultValue = false) =>
    ksTypes.boolean().truthy(['1', 1]).falsy(['0', 0]).default(defaultValue),
}
/*
const User = {
  email: () =>
    ksTypes
      .string()
      .lowercase()
      .regex(REGEX_EMAIL)
      .setErrorMsg('does not match format'),

  password: () =>
    ksTypes
      .string()
      .trim()
      .min(8)
      .max(32),
};*/

export const Types = ksTypes

export default {
  ...general,
}

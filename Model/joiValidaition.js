const Joi = require("joi");

const schemaJoi = Joi.object({
  name: Joi.string().required(),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }).required()
});


module.exports = { schemaJoi };

import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PasswordResetValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    token: schema.string(),
    email: schema.string({}, [rules.email(), rules.exists({ table: 'users', column: 'email' })]),
    password: schema.string({}, [rules.confirmed()]),
  })

  public messages = {}
}

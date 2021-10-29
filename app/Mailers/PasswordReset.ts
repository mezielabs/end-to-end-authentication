import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import User from 'App/Models/User'

export default class PasswordReset extends BaseMailer {
  constructor(private user: User) {
    super()
  }

  public prepare(message: MessageContract) {
    message
      .subject('Your password has been reset')
      .from('admin@example.com')
      .to(this.user.email)
      .htmlView('auth/emails/password-reset', { user: this.user })
  }
}

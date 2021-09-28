import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import User from 'App/Models/User'

export default class PasswordResetRequest extends BaseMailer {
  constructor(private user: User, private token: string) {
    super()
  }

  public prepare(message: MessageContract) {
    message
      .subject('Reset your password')
      .from('admin@example.com')
      .to(this.user.email)
      .htmlView('auth/emails/password-reset-request', { user: this.user, token: this.token })
  }
}

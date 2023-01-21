import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import User from 'App/Models/User'
import Route from '@ioc:Adonis/Core/Route'

export default class VerifyEmail extends BaseMailer {
  constructor(private user: User) {
    console.log('here')

    super()
  }

  public prepare(message: MessageContract) {
    console.log('there')

    const signedUrl = Route.makeSignedUrl(
      'verification.verify',
      {
        email: this.user.email,
      },
      {
        expiresIn: '24h',
      }
    )

    message
      .subject('Verify your email address')
      .from('admin@example.com')
      .to(this.user.email)
      .htmlView('auth/emails/verify-email', { user: this.user, signedUrl })
  }
}

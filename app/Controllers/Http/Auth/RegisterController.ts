import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import RegisterValidator from 'App/Validators/RegisterValidator'
import Event from '@ioc:Adonis/Core/Event'

export default class RegisterController {
  public create({ view }: HttpContextContract) {
    return view.render('auth/register')
  }

  public async store({ request, session, response }: HttpContextContract) {
    const payload = await request.validate(RegisterValidator)

    const user = await User.create(payload)

    Event.emit('userRegistered', user)

    session.flash({
      alert: {
        type: 'success',
        message: `Register successful! A verification link has been sent to ${payload.email}, kindly follow the link to verify your email address.`,
      },
    })

    return response.redirect().back()
  }
}

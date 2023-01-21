import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ConfirmPassword from '@ioc:Mezielabs/ConfirmPassword'

export default class ConfirmPasswordController {
  public create({ view }: HttpContextContract) {
    return view.render('auth/confirm-password')
  }

  public async store({ request, auth, session, response }: HttpContextContract) {
    try {
      await ConfirmPassword.confirm(auth, auth.user!.email, request.input('password'), session)

      return response.intended()
    } catch (error) {
      session.flash({
        alert: {
          type: 'error',
          message: "We couldn't verify your credentials.",
        },
      })

      return response.redirect().back()
    }
  }
}

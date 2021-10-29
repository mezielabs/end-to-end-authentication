import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import LoginValidator from 'App/Validators/LoginValidator'
import Hash from '@ioc:Adonis/Core/Hash'

export default class AuthController {
  public create({ view }: HttpContextContract) {
    return view.render('auth/login')
  }

  public async store({ request, session, response, auth }: HttpContextContract) {
    const { email, password, remember, intended } = await request.validate(LoginValidator)

    // try {
    //   await auth.attempt(email, password, remember)

    //   session.flash({
    //     alert: {
    //       type: 'info',
    //       message: "Welcome back, you're now signed in.",
    //     },
    //   })

    //   return response.redirect('/')
    // } catch (error) {
    //   session.flash({
    //     alert: {
    //       type: 'error',
    //       message: "We couldn't verify your credentials.",
    //     },
    //   })

    //   return response.redirect().back()
    // }

    // const user = await User.query().where('email', email).whereNotNull('email_verified_at').first()
    const user = await User.query().where('email', email).first()

    if (user) {
      if (!user.emailVerifiedAt) {
        session.flash({
          alert: {
            type: 'error',
            message: 'Kindly verify your email address to log in.',
          },
        })

        return response.redirect().back()
      }

      const passwordVerified = await Hash.verify(user.password, password)

      if (passwordVerified) {
        await auth.login(user, remember)

        // const intendedUrl = session.get('intended_url', false)

        // if (intendedUrl) {
        //   const redirectToIntendedUrl = response.redirect(intendedUrl)

        //   session.forget('intended_url')

        //   return redirectToIntendedUrl
        // }

        return intended ? response.redirect(intended) : response.redirect('/')
      }
    }

    session.flash({
      alert: {
        type: 'error',
        message: "We couldn't verify your credentials.",
      },
    })

    return response.redirect().back()
  }

  public async destroy({ auth, response }: HttpContextContract) {
    await auth.logout()

    return response.redirect('/')
  }
}

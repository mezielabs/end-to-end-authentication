import Event from '@ioc:Adonis/Core/Event'
import PasswordReset from 'App/Mailers/PasswordReset'
import PasswordResetRequest from 'App/Mailers/PasswordResetRequest'
import VerifyEmail from 'App/Mailers/VerifyEmail'

Event.on('userRegistered', async (user) => {
  await new VerifyEmail(user).send()
})

Event.on('passwordResetRequested', async ({ user, token }) => {
  await new PasswordResetRequest(user, token).send()
})

Event.on('passwordReset', async (user) => {
  await new PasswordReset(user).send()
})

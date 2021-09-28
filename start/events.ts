import Event from '@ioc:Adonis/Core/Event'
import VerifyEmail from 'App/Mailers/VerifyEmail'

Event.on('userRegistered', async (user) => {
  await new VerifyEmail(user).send()
})

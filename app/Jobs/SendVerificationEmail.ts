import type { JobHandlerContract, Job } from '@ioc:Setten/Queue'
import VerifyEmail from 'App/Mailers/VerifyEmail'
import User from 'App/Models/User'

export type SendVerificationEmailPayload = {
  user: User
}

export default class implements JobHandlerContract {
  constructor(public job: Job) {
    this.job = job
  }

  /**
   * Base Entry point
   */
  public async handle({ user }: SendVerificationEmailPayload) {
    await new VerifyEmail(user).send()
  }

  /**
   * This is an optional method that gets called if it exists when the retries has exceeded and is marked failed.
   */
  public async failed() {}
}

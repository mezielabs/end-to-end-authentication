import { SendVerificationEmailPayload } from 'App/Jobs/SendVerificationEmail'

declare module '@ioc:Setten/Queue' {
  interface JobsList {
    'App/Jobs/SendVerificationEmail': SendVerificationEmailPayload
  }
}

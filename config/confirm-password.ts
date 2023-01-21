import { ConfirmPasswordConfig } from '@ioc:Mezielabs/ConfirmPassword'

const confirmPasswordConfig: ConfirmPasswordConfig = {
  sessionKeyName: 'confirmed_password_at',
  passwordTimeout: 60,
  redirectTo: '/confirm-password',
}

export default confirmPasswordConfig

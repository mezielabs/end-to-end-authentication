import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('home')
}).as('home')

Route.get('/dashboard', async ({ view }) => {
  return view.render('dashboard')
})
  .as('dashboard')
  .middleware('auth')

Route.group(() => {
  Route.get('/register', 'RegisterController.create').middleware('guest')
  Route.post('/register', 'RegisterController.store').middleware('guest')

  Route.get('/verification/new', 'EmailVerificationController.create').middleware('guest')
  Route.post('/verification', 'EmailVerificationController.store').middleware('guest')
  Route.get('/verification/:email', 'EmailVerificationController.verify')
    .as('verification.verify')
    .middleware('guest')

  Route.get('/login', 'AuthController.create').middleware('guest')
  Route.post('/login', 'AuthController.store').middleware('guest')

  Route.get('/forgot-password', 'PasswordResetRequestController.create').middleware('guest')
  Route.post('/forgot-password', 'PasswordResetRequestController.store').middleware('guest')

  Route.get('/reset-password/:token', 'PasswordResetController.create').middleware('guest')
  Route.post('/reset-password', 'PasswordResetController.store').middleware('guest')

  Route.post('/logout', 'AuthController.destroy').middleware('auth')
}).namespace('App/Controllers/Http/Auth')

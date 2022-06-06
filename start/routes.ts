import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('home')
}).as('home')

Route.get('/dashboard', async ({ view }) => {
  return view.render('dashboard')
}).middleware('auth')

Route.group(() => {
  Route.group(() => {
    Route.get('/register', 'RegisterController.create')
    Route.post('/register', 'RegisterController.store')

    Route.get('/verification/new', 'EmailVerificationController.create')
    Route.post('/verification', 'EmailVerificationController.store')
    Route.get('/verification/:email', 'EmailVerificationController.verify').as(
      'verification.verify'
    )

    Route.get('/login', 'AuthController.create')
    Route.post('/login', 'AuthController.store')

    Route.get('/forgot-password', 'PasswordResetRequestController.create')
    Route.post('/forgot-password', 'PasswordResetRequestController.store')

    Route.get('/reset-password/:token', 'PasswordResetController.create')
    Route.post('/reset-password', 'PasswordResetController.store')
  }).middleware('guest')

  Route.post('/logout', 'AuthController.destroy').middleware('auth')
}).namespace('App/Controllers/Http/Auth')

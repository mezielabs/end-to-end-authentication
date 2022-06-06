# End-to-end Authentication

## Getting started

Clone the project repository by running the command below:

```bash
# using SSH
git clone git@github.com:mezielabs/end-to-end-authentication.git
# using HTTPS
git clone https://github.com/mezielabs/end-to-end-authentication.git
```

After cloning, run:

```bash
npm install
```

Duplicate `.env.example`:

```bash
cp env.example .env
```

Generate `APP_KEY`:

```bash
node ace generate:key
```

> This will output a random string, which you will need to add inside `.env`.

Update environment variables:

```txt
// .env

APP_KEY=YOUR_GENERATED_KEY_COPIED_FROM_ABOVE
DB_CONNECTION=mysql
DB_HOST=localhost
DB_NAME=YOUR_DATABASE_NAME
DB_USER=YOUR_DATABASE_USERNAME
DB_PASSWORD=YOUR_DATABASE_PASSWORD
```

> Remember to update `YOUR_DATABASE_NAME`, `YOUR_DATABASE_USERNAME` and `YOUR_DATABASE_PASSWORD` with your database details.

Run the migrations:

```bash
node ace migration:run
```

Finally, start the application:

```bash
node ace serve
```

Then visit [http://127.0.0.1:3333](http://127.0.0.1:3333) to see the application in action.

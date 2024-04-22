
# TUV Nord Central API

The current internal system of TUV Nords is scattered to multiple applications. This caused data discrepancy and redundancy that caused a lot of complications in the operational process. The employee also needs to log in with different accounts for each application. We want to set this Central Data as a foundation to streamline all the internal applications and as a source of truth for any further system.

## Run Locally

Clone the project

```bash
  git clone git@github.com:PT-TUV-NORD-Indonesia/tuv-nord-central-api.git
```

Go to the project directory

```bash
  cd tuv-nord-central-api
```

Install dependencies

```bash
  yarn install
```

Start the server

```bash
  yarn run dev
```

## Database Setup

Migrate the database

```bash
  yarn db.migrate
```

Generate the database

```bash
  yarn db.generate
```

Initial seeder database

```bash
  yarn db.seed
```

## Tech Stack

**Server:** Node JS, Express, Prisma, Typescript

**Database:** MySQL

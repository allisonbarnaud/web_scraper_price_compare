# Scraper APP

## Database

While in development you can build and rebuild the dummy database with the following commands from the **terminal (NOT psql)** while project folder root is current directory.

### create database
```
createdb scraper_app && psql -d scraper_app < db/schema.sql && psql -d scraper_app < db/seed.sql
```

### rebuild database
```
dropdb scraper_app && createdb scraper_app && psql -d scraper_app < db/schema.sql && psql -d scraper_app < db/seed.sql
```
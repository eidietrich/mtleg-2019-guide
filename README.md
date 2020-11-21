# Montana Free Press 2019 legislative guide.

Scrapes bill and voting data for the 2019 Montana Legislature's [LAWS system] and presents it via a [Gatsby](http://gatsbyjs.org/) app. A project of the [Montana Free Press](htpps://montanafreepress.org)

Adapted from the OpenStates project's [Montana scrapers](https://github.com/openstates/openstates-scrapers)

## Repo organization

- `/scrapers` - OpenStates scraping code for Montana Legislature.
- `/analysis` - (messy) code for one-off data exploration
- `/processing` - Python scripts for cleaning and prepping scraped data
- `/app` - Gatsby front end.
- `/data-static` - Static data inputs (hand-curated legislative rosters)
- `/data-processed` - Data files out of processing step

Note that it would have been better practice to separate front-end repo entirely from scraping/data management.


## Commands

### Fetch data via scrape
```npm run scrape```
or
```
docker-compose run --rm scrape mt bills --scrape
```
This assumes Docker is installed and running. See the OpenStates [getting started guide](https://docs.openstates.org/en/latest/contributing/getting-started.html).

Writes to `_cache` and `_data` folders (left untracked by version control). 

### Prep scraped data for app presentation
```npm run parse```
or
```node processing/scrape-parsing.js```

Pulls results of scrape from `./_data/mt/`, does some cleaning/processing and produces a single file for the front-end to draw from at `./app/src/data/mtleg-2019.json`. Note that this relies on config options set in  `/app/src/process/config.js` (e.g. lawmaker names that need cleaning) -- config file has a strange location so it can also be referenced by the front-end app.

Also writes files to `./analysis` directory, intended for one-off exploratory analyses and data reporting for separate projects. There are some messy Jupyter notebooks in that folder that probably should be dropped from the repo.

### Development server
```npm run start```
or
```cd app; npm run start)```

Fires up local Gatsby development server. Docker isn't necessary for this.

### Build for deployment
```npm run build``` or ```(cd app; npm run build)```

Builds to `app/track-mtleg-2019` (outside version control).

### Deployment
(Outdated since MTFP non longer uses Flywheel as the hosting service for our Wordpress site. We also now host standalone web app builds in an Amazon S3 bucket)
```npm run upload```
or 
```
(cd app; lftp -c \"open sftp://ericdietrich@sftp.flywheelsites.com/mtfpeditor/montana-free-press/apps; mirror -eR track-mtleg-2019/\")

```

## Other notes

Git history in this repo is... messy because it started life as a fork of the openstates project.

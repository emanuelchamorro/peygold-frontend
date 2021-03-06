# NgPeyGold

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.9.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# Docker (docker-compose):

Install docker and docker-compose and run: `docker-compose up -d`

Now you can run any command with:

`docker-compose exec ng-peygold the command`

For example:

## Development server

Run `docker-compose exec ng-peygold ng serve --host 0.0.0.0` for a dev server. 

Navigate to `http://localhost:4201/`. The app will automatically reload if you change any of the source files.


### Util development commands:

The next command list is just for development information:

```
docker-compose exec ng-peygold ng generate component
docker-compose exec ng-peygold ng generate service
```

## Firebase deploy:

### Configure Firebase

1 Authenticate with firebase cli:
```
docker-compose exec ng-peygold firebase login
```

2 Select and Configure the project: (Choose Hosting feature)
```
docker-compose exec ng-peygold firebase init
```

The previous step should be executed just one time. 
After running the previous step, you can go to deploy the app directly.  

### Deploy the app

Build the production app.
```
docker-compose exec ng-peygold ng build --prod
```

Deploy the app 
```
docker-compose exec ng-peygold firebase deploy
```

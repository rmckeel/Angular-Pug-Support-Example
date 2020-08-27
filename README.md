# Angular Pug Support Example
Angular has a method for [adding Pug support via the Angular CLI](https://github.com/danguilherme/ng-cli-pug-loader/).
However, this method is a bit brittle because of the deep file modifications it makes in node_modules directory.

This is an example of Angular 10 pug support that does not require deep file manipulation.

All necessary changes are in [this commit](https://github.com/rmckeel/Angular-Pug-Support-Example/commit/1c9ebf2f76b99edc4acd793e05ede0cd0be8bf33)

On an existing project, the steps are:

1. `npm i -D apply-loader pug-loader pug @angular-builders/custom-webpack`
1. Added angular.webpack.js
1. Modified angular.json "builder" lines from `@angular-devkit/build-angular:abcd...` `@angular-builders/custom-webpack:abcd...`
1. Changed templateUrl from html file to a newly built pug file. Boom!

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.6.

## Ongoing Development

See a way to improve?  I'm not surprised!  Please submit a merge request and I will consider.

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

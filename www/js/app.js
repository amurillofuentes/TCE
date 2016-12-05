// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova', 'jett.ionic.filter.bar'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

.state('menu.addMyPets', {
    url: '/addPet',
    views: {
      'side-menu21': {
        templateUrl: 'templates/addMyPets.html',
        controller: 'addMyPetsCtrl'
      }
    }
  })

  .state('menu.home', {
    url: '/home',
    views: {
      'side-menu21': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })
  .state('menu.detailTreatment', {
    url: '/detailTreatment',
    views: {
      'side-menu21': {
        templateUrl: 'templates/detailTreatment.html',
        controller: 'detailTreatmentCtrl'
      }
    }
  })

  .state('menu.addTreatment', {
    url: '/addActuacion',
    views: {
      'side-menu21': {
        templateUrl: 'templates/addTreatment.html',
        controller: 'addTreatmentCtrl'
      }
    }
  })

.state('menu.myPets', {
    url: '/addActuacion',
    views: {
      'side-menu21': {
        templateUrl: 'templates/myPets.html',
        controller: 'myPetsCtrl'
      }
    }
  })
   .state('menu.detailPet', {
    url: '/detailPet',
    views: {
      'side-menu21': {
        templateUrl: 'templates/detailPet.html',
        controller: 'detailPetCtrl'
      }
    }
  })

.state('menu.versions', {
    url: '/detailPet',
    views: {
      'side-menu21': {
        templateUrl: 'templates/versions.html',
        controller: 'versionsCtrl',
      }
    }
  })
  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl',
    abstract:true
  })  
  ;

  $urlRouterProvider.otherwise('/side-menu21/home');

$ionicConfigProvider.navBar.alignTitle('left');

});

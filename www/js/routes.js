angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
$stateProvider

.state('menu.aAdirMascotas', {
    url: '/addPet',
    views: {
      'side-menu21': {
        templateUrl: 'templates/aAdirMascotas.html',
        controller: 'aAdirMascotasCtrl'
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
  .state('menu.detalleDeActuaciN', {
    url: '/detailEvent',
    views: {
      'side-menu21': {
        templateUrl: 'templates/detalleDeActuaciN.html',
        controller: 'detalleDeActuaciNCtrl'
      }
    }
  })

  .state('menu.aAdirActuaciN', {
    url: '/addActuacion',
    views: {
      'side-menu21': {
        templateUrl: 'templates/aAdirActuaciN.html',
        controller: 'aAdirActuaciNCtrl'
      }
    }
  })

.state('menu.test', {
    url: '/test',
    views: {
      'side-menu21': {
        templateUrl: 'templates/test.html',
        controller: 'testCtrl'
      }
    }
  })
  
  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl',
    abstract:true
  })

$urlRouterProvider.otherwise('/side-menu21/addPet')

  

});
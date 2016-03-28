angular.module('app.controllers', [])

    .controller('aAdirMascotasCtrl', function($scope, $ionicPopup, $timeout) {
        $scope.$on('$ionicView.loaded', function(viewInfo, state) {
            initValues();
            console.log('CTRL - $ionicView.loaded', viewInfo, state);
        });
        $scope.$on('$ionicView.unloaded', function(viewInfo, state) {
            console.log('CTRL - $ionicView.unloaded', viewInfo, state);
        });

        function initValues(){
            $scope.interfaz = {};
            $scope.imagestring = {};
            $scope.console = {};
            $scope.lastPhoto="init";
            $scope.imagestring ="img/perroIcon.jpg";
            $scope.interfaz.namePet = 'nombre';
            $scope.interfaz.datePet = new Date;
            $scope.interfaz.typePet = 'Perro';
            $scope.interfaz.typesPet = [{ "name": "Perro" }, { "name": "Gato" }, { "name": "Tortuga" }];
            selectIfDefaultImage();
        }
        
        function CheckCamposIntroducidosOk() {
            //TODO: Chequeo de campos introducidos ok
            /*
            if allIsGood(){
                return true;   
            }else {
                var alertPopup = $ionicPopup.alert({
                    title: 'Añadir mascotas',
                    template: 'Error 1. Rellena todos los campos correctamente'
                });
            }
            */
        };
        $scope.addPetInSystem = function() {
            //TODO: logica de añadir mascota.
            /*
            if allIsGood(){
                return true;   
            }else {
                var alertPopup = $ionicPopup.alert({
                        title: 'Añadir mascotas',
                        template: 'Error 2. Rellena todos los campos correctamente'
                });
            }
            */
        };
        function addPet() {
            if ((camposIntroducidosOk()) && (addPetInSystem())) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Añadir mascotas',
                    template: 'Mascota añadida correctamente'
                });
                alertPopup.then(function(res) {
                    initValues();
                });
            }
        };
        
        function selectIfDefaultImage() {
            if($scope.imagestring == "img/perroIcon.jpg" || $scope.imagestring == "img/gatoIcon.jpg"){
                $scope.imagestring = "img/perroIcon.jpg";
                if($scope.interfaz.typePet=='Gato'){
                    $scope.imagestring = "img/gatoIcon.jpg";
                }
            }
        }

        $scope.launchCapturePhoto = function($state) {
            $scope.console="launchCapturePhoto";
            if (navigator.camera) {
                $scope.console="launchCapturePhoto--1";
                navigator.camera.getPicture(
                    onPhotoDataSuccess, 
                    cameraError,
                    { quality: 50,
                      destinationType: destinationType.DATA_URL });
            } else {
                $scope.console="launchCapturePhoto-selectIfDefaultImage";
                selectIfDefaultImage();
            }
        };
        
        function onPhotoDataSuccess(imageData) {
            $scope.console="onPhotoDataSuccess";
            console.log(imageData);
            var smallImage = document.getElementById('smallImage');
            smallImage.style.display = 'block';
            smallImage.src = "data:image/jpeg;base64," + imageData;  
        }
        
        $scope.launchPhotoAlbum = function($state) {
            $scope.console="launchPhotoAlbum";
            if (navigator.camera) {
                $scope.console="launchPhotoAlbum--1";
                navigator.camera.getPicture(
                    onPhotoURISuccess, 
                    cameraError,
                    { sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM, 
                      quality: 50,
                      destinationType: destinationType.FILE_URI }
                    );
            } else {
                $scope.console="launchPhotoAlbum-selectIfDefaultImage";
                selectIfDefaultImage();
            }
        };
        function onPhotoURISuccess(imageURI) {
            $scope.console="onPhotoURISuccess";
            if (imageURI.substring(0, 21) == "content://com.android") {
                var photo_split = imageURI.split("%3A");
                imageURI = "content://media/external/images/media/" + photo_split[1];
            }
            $scope.imagestring = imageURI;
            var largeImage = document.getElementById('largeImage');
            largeImage.style.display = 'block';
            largeImage.src = imageURI;
        }
        
        function cameraError(message) {
            $scope.console="cameraError";
            alert('Failed because: ' + message);
        }

        function finishAddPet() {
            $scope.console="finishAddPet";
            if ((camposIntroducidosOk()) && (addPetInSystem())) {
                //TODO: redirigir a la home   
            }
        };

        $scope.showPopupAddName = function() {
            var myPopup = $ionicPopup.show({
                template: '<input type="text" ng-model="interfaz.namePet">',
                title: 'Nombre de tu mascota',
                subTitle: '',
                scope: $scope,
                buttons: [
                    {
                        text: '<b>Guardar</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            if (!$scope.interfaz.namePet) {
                                e.preventDefault();
                            } else {
                                return $scope.interfaz.namePet;
                            }
                        }
                    }
                ]
            });
            myPopup.then(function(res) {
                console.log('Tapped!', res);
            });

            $timeout(function() {
                myPopup.close();
            }, 30000);
        };

        $scope.showPopupAddDate = function() {
            var myPopup = $ionicPopup.show({
                template: '<input type="date" ng-model="interfaz.datePet">',
                title: 'Fecha de tu mascota',
                subTitle: '',
                scope: $scope,
                buttons: [
                    {
                        text: '<b>Guardar</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            if (!$scope.interfaz.datePet) {
                                e.preventDefault();
                            } else {
                                return $scope.interfaz.datePet;
                            }
                        }
                    }
                ]
            });
            myPopup.then(function(res) {
                console.log('Tapped!', res);
            });

            $timeout(function() {
                myPopup.close();
            }, 30000);
        };

        $scope.showPopupAddType = function() {
            var myPopup = $ionicPopup.show({
                template: '<ion-list>                                ' +
                '  <ion-radio ng-repeat="pet in interfaz.typesPet" ng-model="interfaz.typePet" ng-value="pet.name">{{pet.name}} ' +
                '</ion-list>                               ',
                title: 'Tipo de tu mascota',
                subTitle: '',
                scope: $scope,
                buttons: [
                    {
                        text: '<b>Guardar</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            if (!$scope.interfaz.typePet) {
                                e.preventDefault();
                            } else {
                                selectIfDefaultImage();
                                return $scope.interfaz.typePet;
                            }
                        }
                    }
                ]
            });
            myPopup.then(function(res) {
                console.log('Tapped!', res);
            });

            $timeout(function() {
                myPopup.close();
            }, 30000);
        };

    })

    .controller('homeCtrl', function($scope, $ionicModal) {
        $scope.groups = [
            { name: 'Mostrar', id: 1, items: [{ subName: 'SubGrup1', subId: 'Curtis' }, { subName: 'SubGrup1', subId: 'Lucky' }] },
        ];

        $ionicModal.fromTemplateUrl('templates/my-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });

        $scope.openModal = function() {
            $scope.modal.show();
        };

        $scope.closeModal = function() {
            $scope.modal.hide();
        };

        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });

        $scope.$on('modal.hidden', function() {
        });

        $scope.$on('modal.removed', function() {
        });

        $scope.toggleGroup = function(group) {
            if ($scope.isGroupShown(group)) {
                $scope.shownGroup = null;
            } else {
                $scope.shownGroup = group;
            }
        };
        $scope.isGroupShown = function(group) {
            return $scope.shownGroup === group;
        };
    })

    .controller('menuCtrl', function($scope) {
    })
    .controller('detalleDeActuaciNCtrl', function($scope) {
    })
    .controller('testCtrl', function($scope) {
        console.log("entra");
        
        $scope.getPhoto = function() {
            console.log('Getting camera');
            $scope.lastPhoto="init";
            navigator.camera.getPicture(onSuccess, onFail, { quality: 50, 
            destinationType: Camera.DestinationType.FILE_URI }); 

            function onSuccess(imageURI) {
                $scope.lastPhoto="onSuccess";
                $scope.lastPhoto = imageURI;
                alert('lastPhoto: ' + $scope.lastPhoto);
            }

            function onFail(message) {
                alert('Failed because: ' + message);
            }
       }
       
       $scope.getImage = function() {
            console.log('Getting image');
            $scope.lastPhoto="init";
            navigator.camera.getPicture(onSuccess, onFail, { 
                sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM,
                quality: 50, 
            destinationType: Camera.DestinationType.FILE_URI }); 

            function onSuccess(imageURI) {
                $scope.lastPhoto="onSuccessImage";
                $scope.lastPhoto = imageURI;
                alert('lastPhotoImage: ' + $scope.lastPhoto);
            }

            function onFail(message) {
                alert('Failed image because: ' + message);
            }
       }
    })
    .controller('aAdirActuaciNCtrl', function($scope) {
        // A confirm dialog
        $scope.showConfirm = function() {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Consume Ice Cream',
                template: 'Are you sure you want to eat this ice cream?'
            });

            confirmPopup.then(function(res) {
                if (res) {
                    console.log('You are sure');
                } else {
                    console.log('You are not sure');
                }
            });
        };

        // An alert dialog
        $scope.showAlert2 = function() {
            var alertPopup = $ionicPopup.alert({
                title: 'Don\'t eaccct that!',
                template: 'It might taste good'
            });

            alertPopup.then(function(res) {
                console.log('Thankss you for not eating my delicious ice cream cone');
            });
        };
    })

    ;
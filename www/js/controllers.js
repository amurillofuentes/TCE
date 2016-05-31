/*

//alarmas!!!
//VOLVER DE UNA WEB
//VER ACTUACIONES DESDE DETALLE DE MASCOTA
//CAMARA


//TODO: Buscar el TODO
refs por si acaso
https://github.com/JrSchild/jr-crop/tree/master/examples
http://ngcordova.com/docs/plugins/imagePicker/

HOME: 

Badge para iOS	
Investigar calendario
Estadisticas
Sistema de errores

*/

angular.module('app.controllers', [])

    .controller('myPetsCtrl', function ($scope, $ionicPopup, $timeout, BlankService, $window, $state) {
        $scope.service = BlankService;
        BlankService.initValuesFromMemory();

        $scope.$on('$ionicView.afterEnter', function () {
            console.log('myPetsCtrl -- $ionicView.afterEnter');

        });

        $scope.$on('$ionicView.loaded', function () {
            console.log('myPetsCtrl -- $ionicView.loaded');
            BlankService.reloadHome = true;
            BlankService.initValuesFromMemory();
        });

        $scope.addPet = function () {
            console.log('myPetsCtrl -- addPet');
            $state.go('menu.addMyPets');
        };

        $scope.showDetailPet = function (pet) {
            console.log('myPetsCtrl -- showDetailPet');
            BlankService.detailPet = pet;
            $state.go('menu.detailPet');
        };

        $scope.hayMascotaFunct = function (value) {
            console.log('myPetsCtrl -- hayMascotaFunct');
            try {
                if (BlankService.mascotas.length > 0) {
                    return true;
                } else {
                    return false;
                }
            } catch (e) { return false; }
        };


        $scope.borrarMascota = function (pet) {
            console.log('myPetsCtrl -- borrarMascota');
            var confirmPopup = $ionicPopup.confirm({
                title: 'Borrar Mascota',
                template: 'Al borrar la mascota también se borrarán todas sus actuaciones. ¿Quieres continuar?'
            });

            confirmPopup.then(function (res) {
                if (res) {
                    BlankService.removeByAttr(BlankService.mascotas, 'id', pet.id);
                    BlankService.removeByAttr(BlankService.actuacionesDeLasMascotas, 'idPet', pet.id);
                    BlankService.saveDataInInternalPhoneMemory("mascotas", BlankService.mascotas);
                    BlankService.saveDataInInternalPhoneMemory("actuacionesDeLasMascotas", BlankService.actuacionesDeLasMascotas);
                    return true;

                }
            });
        };
    })

    .controller('addMyPetsCtrl', function ($scope, $ionicPopup, $timeout, BlankService, $window, $state, $ionicHistory) {

        $scope.$on('$ionicView.afterEnter', function () {
            console.log('addMyPetsCtrl -- $ionicView.afterEnter');
        });

        $scope.$on('$ionicView.loaded', function () {
            console.log('addMyPetsCtrl -- $ionicView.loaded');
            initValues();
            BlankService.reloadHome = true;
            BlankService.initValuesFromMemory();
        });

        $scope.$on('$ionicView.beforeLeave', function () {
            console.log('addMyPetsCtrl -- $ionicView.beforeLeave');

            BlankService.initValuesFromMemory();
        });
        $scope.$on('$ionicView.leave', function () {
            console.log('addMyPetsCtrl -- $ionicView.leave');

            BlankService.initValuesFromMemory();

        });

        BlankService.initValuesFromMemory();
        function initValues() {
            console.log('addMyPetsCtrl -- initValues');

            $scope.console = {};
            $scope.lastPhoto = "init";

            $scope.interfaz = {};
            $scope.interfaz.namePet = '';
            $scope.interfaz.datePet = new Date;
            $scope.interfaz.typePet = 'Perro';
            $scope.interfaz.typesPet = [{ "name": "Perro" }, { "name": "Gato" }];
            $scope.interfaz.imagePet = "img/perroIcon.jpg";

            $scope.pet = {};
            $scope.pet.id = '';
            $scope.pet.name = '';
            $scope.pet.date = '';
            $scope.pet.type = '';
            $scope.pet.image = '';

            $scope.interfaz.ocultarFinish = false;

            if (BlankService.mascotas.length == 0) {
                $scope.interfaz.ocultarFinish = true;
            }
            selectIfDefaultImage();
        }

        function selectIfDefaultImage() {
            console.log('addMyPetsCtrl -- selectIfDefaultImage');
            if ($scope.interfaz.imagePet == "img/perroIcon.jpg" || $scope.interfaz.imagePet == "img/gatoIcon.jpg") {
                $scope.interfaz.imagePet = "img/perroIcon.jpg";
                if ($scope.interfaz.typePet == 'Gato') {
                    $scope.interfaz.imagePet = "img/gatoIcon.jpg";
                }
            }
        }

        function camposIntroducidosOk() {
            console.log('addMyPetsCtrl -- camposIntroducidosOk');

            $scope.pet.name = $scope.interfaz.namePet;
            $scope.pet.date = $scope.interfaz.datePet;
            $scope.pet.type = $scope.interfaz.typePet;
            $scope.pet.image = $scope.interfaz.imagePet;
            $scope.pet.id = BlankService.IDGenerator(8);

            if ($scope.pet.name != undefined && $scope.pet.name != '' && $scope.pet.name != 'nombre') {
                if ($scope.pet.type != undefined && $scope.pet.type != '') {
                    if ($scope.pet.date != undefined && $scope.pet.date != '') {
                        return true;
                    } else {
                        console.log('addMyPetsCtrl - addPetInSystem-pet.date');
                    }
                } else {
                    console.log('addMyPetsCtrl - addPetInSystem-pet.type');
                }
            } else {
                console.log('addMyPetsCtrl - addPetInSystem-pet.name');
            }
            var alertPopup = $ionicPopup.alert({
                title: 'Añadir mascotas',
                template: 'Error 1. Rellena todos los campos correctamente'
            });
        };

        function createActuacion(nombre, fecha) {
            console.log('addMyPetsCtrl -- createActuacion');

            $scope.act = {};
            $scope.act.id = BlankService.IDGenerator(8);
            $scope.act.name = nombre;
            $scope.act.date = fecha;
            $scope.act.idPet = $scope.pet.id;
            $scope.act.namePet = $scope.pet.name;
            $scope.act.datePet = $scope.pet.date;
            $scope.act.typePet = $scope.pet.type;
            $scope.act.imagePet = $scope.pet.image;
            $scope.act.isVisible = true;
            $scope.act.nameAlarm = "Nunca";
            $scope.act.alarmId = "0";
            $scope.act.alarmSystemId = "0";
            return $scope.act;
        }

        function createActuacionesDeMascota() {
            console.log('addMyPetsCtrl -- createActuacionesDeMascota');

            //creo las actuaciones depende de si es perro o gatoIcon
            if ($scope.pet.type = 'perro') {
                //10 de enero: desparasitación interna
                $scope.newact = createActuacion('desparasitación interna', new Date('2016-01-10T09:00:00'));
                BlankService.actuacionesDeLasMascotas.push($scope.newact);
                $scope.act = {};
                //01 de abril: ANALÍTICA DE FILARIA*
                $scope.newact = createActuacion('ANALÍTICA DE FILARIA*', new Date('2016-04-01T09:00:00'));
                BlankService.actuacionesDeLasMascotas.push($scope.newact);
                $scope.act = {};
                //10 de abril: desparasitación interna
                $scope.newact = createActuacion('desparasitación interna', new Date('2016-04-10T09:00:00'));
                BlankService.actuacionesDeLasMascotas.push($scope.newact);
                $scope.act = {};
                //15 de abril: prevención Filaria en pastilla
                $scope.newact = createActuacion('prevención Filaria en pastilla', new Date('2016-04-15T09:00:00'));
                BlankService.actuacionesDeLasMascotas.push($scope.newact);
                $scope.act = {};
                //15 de abril: PONER COLLAR PREVENCIÓN LEISHMANIA
                $scope.newact = createActuacion('PONER COLLAR PREVENCIÓN LEISHMANIA', new Date('2016-04-15T09:00:00'));
                BlankService.actuacionesDeLasMascotas.push($scope.newact);
                $scope.act = {};
                //1 de mayo: PREVENCIÓN ANUAL FILARIA GUARDIAN**
                $scope.newact = createActuacion('PREVENCIÓN ANUAL FILARIA GUARDIAN**', new Date('2016-05-01T09:00:00'));
                BlankService.actuacionesDeLasMascotas.push($scope.newact);
                $scope.act = {};
                //1 a 29 de mayo: LEISGUARD PREVENCIÓN LEISHMANIA
                $scope.newact = createActuacion('LEISGUARD PREVENCIÓN LEISHMANIA', new Date('2016-05-15T09:00:00'));
                BlankService.actuacionesDeLasMascotas.push($scope.newact);
                $scope.act = {};
                //15 de mayo: prevención Filaria en pastilla
                $scope.newact = createActuacion('prevención Filaria en pastilla', new Date('2016-05-15T09:00:00'));
                BlankService.actuacionesDeLasMascotas.push($scope.newact);
                $scope.act = {};
                //15 de junio: prevención Filaria en pastilla
                $scope.newact = createActuacion('prevención Filaria en pastilla', new Date('2016-06-15T09:00:00'));
                BlankService.actuacionesDeLasMascotas.push($scope.newact);
                $scope.act = {};
                //1 a 29 de julio: LEISGUARD PREVENCIÓN LEISHMANIA
                $scope.newact = createActuacion('LEISGUARD PREVENCIÓN LEISHMANIA', new Date('2016-07-10T09:00:00'));
                BlankService.actuacionesDeLasMascotas.push($scope.newact);
                $scope.act = {};
                //10 de julio: desparasitación interna
                $scope.newact = createActuacion('desparasitación interna', new Date('2016-07-10T09:00:00'));
                BlankService.actuacionesDeLasMascotas.push($scope.newact);
                $scope.act = {};
                //15 de julio: prevención Filaria en pastilla
                $scope.newact = createActuacion('prevención Filaria en pastilla', new Date('2016-07-15T09:00:00'));
                BlankService.actuacionesDeLasMascotas.push($scope.newact);
                $scope.act = {};
                //15 de agosto: prevención Filaria en pastilla
                $scope.newact = createActuacion('prevención Filaria en pastilla', new Date('2016-08-15T09:00:00'));
                BlankService.actuacionesDeLasMascotas.push($scope.newact);
                $scope.act = {};
                //1 a 29 de septiembre: LEISGUARD PREVENCIÓN LEISHMANIA
                $scope.newact = createActuacion('LEISGUARD PREVENCIÓN LEISHMANIA', new Date('2016-09-15T09:00:00'));
                BlankService.actuacionesDeLasMascotas.push($scope.newact);
                $scope.act = {};
                //15 de septiembre: prevención Filaria en pastilla
                $scope.newact = createActuacion('prevención Filaria en pastilla', new Date('2016-09-15T09:00:00'));
                BlankService.actuacionesDeLasMascotas.push($scope.newact);
                $scope.act = {};
                //10 de octubre: desparasitación interna
                $scope.newact = createActuacion('desparasitación interna', new Date('2016-10-10T09:00:00'));
                BlankService.actuacionesDeLasMascotas.push($scope.newact);
                $scope.act = {};
                //10 de diciembre: ANALÍTICA DE LEISHMANIA*
                $scope.newact = createActuacion('ANALÍTICA DE LEISHMANIA', new Date('2016-12-10T09:00:00'));
                BlankService.actuacionesDeLasMascotas.push($scope.newact);
                $scope.act = {};
            } else if ($scope.pet.type = 'gato') {

            }
            return true;
        }

        $scope.finishPet = function () {
            console.log('addMyPetsCtrl -- finishPet');

            BlankService.initValuesFromMemory();
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('menu.home');
        };

        $scope.addPet = function () {
            console.log('addMyPetsCtrl -- addPet');

            if (camposIntroducidosOk()) {
                if (BlankService.savePetInSystem($scope.pet)) {
                    if (createActuacionesDeMascota()) {
                        if (BlankService.saveActuacionesDeMascota()) {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Añadir mascotas',
                                template: 'Mascota añadida correctamente'
                            });
                            alertPopup.then(function (res) {
                                initValues();
                            });
                        }
                    }
                }
            }
        };

        /*
                $scope.launchCapturePhoto = function ($state) {
                    $scope.console = "launchCapturePhoto";
                    if (navigator.camera) {
                        $scope.console = "launchCapturePhoto--1";
                        navigator.camera.getPicture(
                            onPhotoDataSuccess,
                            cameraError,
                            {
                                quality: 50,
                                destinationType: destinationType.DATA_URL
                            });
                    } else {
                        $scope.console = "launchCapturePhoto-selectIfDefaultImage";
                        selectIfDefaultImage();
                    }
                };
        
                function onPhotoDataSuccess(imageData) {
                    $scope.console = "onPhotoDataSuccess";
                    var smallImage = document.getElementById('smallImage');
                    smallImage.style.display = 'block';
                    smallImage.src = "data:image/jpeg;base64," + imageData;
                }
        
                $scope.launchPhotoAlbum = function ($state) {
                    $scope.console = "launchPhotoAlbum";
                    if (navigator.camera) {
                        $scope.console = "launchPhotoAlbum--1";
                        navigator.camera.getPicture(
                            onPhotoURISuccess,
                            cameraError,
                            {
                                sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM,
                                quality: 50,
                                destinationType: destinationType.FILE_URI
                            }
                        );
                    } else {
                        $scope.console = "launchPhotoAlbum-selectIfDefaultImage";
                        selectIfDefaultImage();
                    }
                };
                function onPhotoURISuccess(imageURI) {
                    $scope.console = "onPhotoURISuccess";
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
                    $scope.console = "cameraError";
                    alert('Failed because: ' + message);
                }
        */
        $scope.showPopupAddName = function () {
            console.log('addMyPetsCtrl -- showPopupAddName');

            var myPopup = $ionicPopup.show({
                template: '<input type="text" ng-model="interfaz.namePet">',
                title: 'Nombre de tu mascota',
                subTitle: '',
                scope: $scope,
                buttons: [
                    {
                        text: '<b>Guardar</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            if (!$scope.interfaz.namePet) {
                                e.preventDefault();
                            } else {
                                return $scope.interfaz.namePet;
                            }
                        }
                    }
                ]
            });
            myPopup.then(function (res) {
            });

            $timeout(function () {
                myPopup.close();
            }, 30000);
        };

        $scope.showPopupAddDate = function () {
            console.log('addMyPetsCtrl -- showPopupAddDate');

            var myPopup = $ionicPopup.show({
                template: '<input type="date" ng-model="interfaz.datePet">',
                title: 'Fecha de tu mascota',
                subTitle: '',
                scope: $scope,
                buttons: [
                    {
                        text: '<b>Guardar</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            if (!$scope.interfaz.datePet) {
                                e.preventDefault();
                            } else {
                                return $scope.interfaz.datePet;
                            }
                        }
                    }
                ]
            });
            myPopup.then(function (res) {
            });

            $timeout(function () {
                myPopup.close();
            }, 30000);
        };

        $scope.showPopupAddType = function () {
            console.log('addMyPetsCtrl -- showPopupAddType');

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
                        onTap: function (e) {
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
            myPopup.then(function (res) {
            });

            $timeout(function () {
                myPopup.close();
            }, 30000);
        };

    })

    .controller('detailPetCtrl', function ($scope, $ionicPopup, $timeout, BlankService, $window, $state, $ionicHistory) {
        $scope.service = BlankService;

        $scope.$on('$ionicView.afterEnter', function () {
            console.log('detailPetCtrl - $ionicView.afterEnter');
        });

        $scope.$on('$ionicView.loaded', function () {
            console.log('detailPetCtrl - $ionicView.loaded');
            initValues();
            BlankService.reloadHome = true;
            BlankService.initValuesFromMemory();
        });

        function initValues() {
            console.log('detailPetCtrl -- initValues');
            $scope.lastPhoto = "init";
            $scope.typesPet = [{ "name": "Perro" }, { "name": "Gato" }];
        }

        function camposIntroducidosOk() {
            console.log('detailPetCtrl - camposIntroducidosOk');
            if (BlankService.detailPet.name != undefined && BlankService.detailPet.name != '' && BlankService.detailPet.name != 'nombre') {
                if (BlankService.detailPet.type != undefined && BlankService.detailPet.type != '') {
                    if (BlankService.detailPet.date != undefined && BlankService.detailPet.date != '') {
                        return true;
                    } else {
                        console.log('detailPetCtrl - camposIntroducidosOk-pet.date');
                    }
                } else {
                    console.log('detailPetCtrl - camposIntroducidosOk-pet.type');
                }
            } else {
                console.log('detailPetCtrl - camposIntroducidosOk-pet.name');
            }
            var alertPopup = $ionicPopup.alert({
                title: 'Modificar mascota',
                template: 'Error 1. Rellena todos los campos correctamente'
            });
        };

        $scope.modifyPet = function () {
            console.log('detailPetCtrl - modifyPet');

            if (camposIntroducidosOk()) {

                BlankService.removeByAttr(BlankService.mascotas, 'id', BlankService.detailPet.id);
                BlankService.mascotas.push(BlankService.detailPet);

                var actuacionesFound = [];
                var actuacionFound = {};
                i = 0;
                for (i; i < BlankService.actuacionesDeLasMascotas.length; i++) {
                    if (BlankService.actuacionesDeLasMascotas[i].idPet == BlankService.detailPet.id) {
                        actuacionFound = BlankService.actuacionesDeLasMascotas[i];
                        actuacionFound.namePet = BlankService.detailPet.name;
                        actuacionFound.datePet = BlankService.detailPet.date;
                        actuacionFound.typePet = BlankService.detailPet.type;
                        actuacionFound.imagePet = BlankService.detailPet.image;
                        actuacionesFound.push(actuacionFound);
                    }
                }

                BlankService.removeByAttr(BlankService.actuacionesDeLasMascotas, 'idPet', BlankService.detailPet.id);

                i = 0;
                for (i; i < BlankService.actuacionesDeLasMascotas.length; i++) {
                    actuacionesFound.push(BlankService.actuacionesDeLasMascotas[i]);
                }

                BlankService.saveMascotas();
                BlankService.saveDataInInternalPhoneMemory("actuacionesDeLasMascotas", actuacionesFound);

                var alertPopup = $ionicPopup.alert({
                    title: 'Añadir mascotas',
                    template: 'Mascota modificada correctamente'
                });
                alertPopup.then(function (res) {
                    BlankService.initValuesFromMemory();

                    $ionicHistory.nextViewOptions({
                        disableBack: true
                    });

                    $state.go("menu.home")
                });

            }
        };
        /*
                $scope.launchCapturePhoto = function ($state) {
                    $scope.console = "launchCapturePhoto";
                    if (navigator.camera) {
                        $scope.console = "launchCapturePhoto--1";
                        navigator.camera.getPicture(
                            onPhotoDataSuccess,
                            cameraError,
                            {
                                quality: 50,
                                destinationType: destinationType.DATA_URL
                            });
                    } else {
                        $scope.console = "launchCapturePhoto-selectIfDefaultImage";
                        selectIfDefaultImage();
                    }
                };
        
                function onPhotoDataSuccess(imageData) {
                    $scope.console = "onPhotoDataSuccess";
                    var smallImage = document.getElementById('smallImage');
                    smallImage.style.display = 'block';
                    smallImage.src = "data:image/jpeg;base64," + imageData;
                }
        
                $scope.launchPhotoAlbum = function ($state) {
                    $scope.console = "launchPhotoAlbum";
                    if (navigator.camera) {
                        $scope.console = "launchPhotoAlbum--1";
                        navigator.camera.getPicture(
                            onPhotoURISuccess,
                            cameraError,
                            {
                                sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM,
                                quality: 50,
                                destinationType: destinationType.FILE_URI
                            }
                        );
                    } else {
                        $scope.console = "launchPhotoAlbum-selectIfDefaultImage";
                        selectIfDefaultImage();
                    }
                };
                function onPhotoURISuccess(imageURI) {
                    $scope.console = "onPhotoURISuccess";
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
                    $scope.console = "cameraError";
                    alert('Failed because: ' + message);
                }
        */
        $scope.viewTreatmentsPet = function () {
            console.log('detailPetCtrl - viewTreatmentsPet');

            BlankService.setViewGroupForDetailPet();
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('menu.home');
        }

        $scope.showPopupAddName = function () {
            console.log('detailPetCtrl -- showPopupAddName');

            var myPopup = $ionicPopup.show({
                template: '<input type="text" ng-model="service.detailPet.name">',
                title: 'Nombre de tu mascota',
                subTitle: '',
                scope: $scope,
                buttons: [
                    {
                        text: '<b>Guardar</b>',
                        type: 'button-positive',
                        onTap: function (e) {

                        }
                    }
                ]
            });
            myPopup.then(function (res) {
            });

            $timeout(function () {
                myPopup.close();
            }, 30000);
        };

        $scope.showPopupAddDate = function () {
            console.log('detailPetCtrl -- showPopupAddDate');

            var myPopup = $ionicPopup.show({
                template: '<input type="date" ng-model="service.detailPet.date">',
                title: 'Fecha de tu mascota',
                subTitle: '',
                scope: $scope,
                buttons: [
                    {
                        text: '<b>Guardar</b>',
                        type: 'button-positive',
                        onTap: function (e) {

                        }
                    }
                ]
            });
            myPopup.then(function (res) {
            });

            $timeout(function () {
                myPopup.close();
            }, 30000);
        };

        $scope.showPopupAddType = function () {
            console.log('detailPetCtrl -- showPopupAddType');

            var myPopup = $ionicPopup.show({
                template: '<ion-list>                                ' +
                '  <ion-radio ng-repeat="pet in typesPet" ng-model="service.detailPet.type" ng-value="pet.name">{{pet.name}} ' +
                '</ion-list>                               ',
                title: 'Tipo de tu mascota',
                subTitle: '',
                scope: $scope,
                buttons: [
                    {
                        text: '<b>Guardar</b>',
                        type: 'button-positive',
                        onTap: function (e) {

                        }
                    }
                ]
            });
            myPopup.then(function (res) {
            });

            $timeout(function () {
                myPopup.close();
            }, 30000);
        };

    })

    .controller('menuCtrl', function ($scope) {
    })

    .controller('ImagePickerController', function ($scope, $cordovaImagePicker, BlankService, $ionicPlatform, $cordovaContacts, $jrCrop, $cordovaFile) {
        $scope.service = BlankService;
        $ionicPlatform.ready(function () {
            $scope.getImageSaveContact = function () {
                cordova.plugins.diagnostic.requestRuntimePermissions(function (statuses) {
                    for (var permission in statuses) {
                        switch (statuses[permission]) {
                            case cordova.plugins.diagnostic.permissionStatus.GRANTED:
                                console.log("ImagePickerController -- Permission granted to use " + permission);
                                var options = {
                                    maximumImagesCount: 1,
                                    width: 800,
                                    height: 800,
                                    quality: 80
                                };
                                $cordovaImagePicker.getPictures(options).then(function (results) {
                                    console.log("ImagePickerController -- $cordovaImagePicker.getPictures ");
                                    for (var i = 0; i < results.length; i++) {
                                        $jrCrop.crop({
                                            url: results[i],
                                            width: 60,
                                            height: 60,
                                            title: 'Selecciona'
                                        }).then(function (canvas) {
                                            console.log("ImagePickerController -- $cordovaImagePicker.getPictures function ok ");
                                            $scope.interfaz.imagePet = canvas;
                                            console.log("ImagePickerController -- saveImageDataToLibrary ");
                                            window.canvas2ImagePlugin.saveImageDataToLibrary(
                                                function (msg) {
                                                    console.log("ImagePickerController -- saveImageDataToLibrary result ", msg);
                                                    if (($scope.interfaz != undefined) && ($scope.interfaz != null)) {
                                                        $scope.interfaz.imagePet = msg;
                                                    }
                                                    if (($service.detailPet != undefined) && ($service.detailPet != null)) {
                                                        service.detailPet.image = msg;
                                                    }
                                                },
                                                function (err) {
                                                    console.log("ImagePickerController -- saveImageDataToLibrary error ", err);
                                                },
                                                canvas
                                            );
                                        }, function () {
                                        });
                                    }
                                }, function (error) {
                                    console.log('ImagePickerController -- Error: ' + JSON.stringify(error));
                                });
                                break;
                            case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
                                console.log("ImagePickerController -- Permission to use " + permission + " has not been requested yet");
                                break;
                            case cordova.plugins.diagnostic.permissionStatus.DENIED:
                                console.log("ImagePickerController -- Permission denied to use " + permission + " - ask again?");
                                break;
                            case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
                                console.log("ImagePickerController -- Permission permanently denied to use " + permission + " - guess we won't be using it then!");
                                break;
                        }
                    }
                }, function (error) {
                    console.error("ImagePickerController -- The following error occurred: " + error);
                }, [
                        cordova.plugins.diagnostic.runtimePermission.READ_EXTERNAL_STORAGE
                    ]);
            };
        });
    })

    .controller('versionsCtrl', function ($scope, BlankService) {
        $scope.service = BlankService;
        $scope.borrarDatos = function () {
            console.log('versionsCtrl -- borrarDatos');
            BlankService.clearData();
        }
    })

    .controller('homeCtrl', function ($scope, $ionicModal, $ionicFilterBar, $filter, BlankService, $state, $window, $ionicPopup, $timeout) {
        $scope.service = BlankService;
        $scope.$on('$ionicView.afterEnter', function () {
            console.log("homeCtrl -- $ionicView.afterEnter");
        });

        $scope.hayMascotaFunct = function (value) {
            console.log('homeCtrl -- hayMascotaFunct');
            try {
                if (BlankService.mascotas.length > 0) {
                    return true;
                } else {
                    return false;
                }
            } catch (e) { return false; }
        };

        $scope.hayActuacionesFunct = function (value) {
            console.log('homeCtrl -- hayActuacionesFunct');
            try {
                if (BlankService.actuacionesDeLasMascotas.length > 0) {
                    return true;
                } else {
                    return false;
                }
            } catch (e) { return false; }
        };

        $scope.ocultarBotoneraFunct = function (value) {
            console.log('homeCtrl -- ocultarBotoneraFunct');
            var ocultarBotonera = true;
            if ((BlankService.mascotas != undefined) && (BlankService.mascotas.length > 0) && (BlankService.actuacionesDeLasMascotas != undefined) && (BlankService.actuacionesDeLasMascotas.length > 0)) {
                ocultarBotonera = false;
            }
            return ocultarBotonera;
        };

        $scope.$on('$ionicView.loaded', function () {
            console.log("homeCtrl -- $ionicView.loaded");
            BlankService.initValuesFromMemory();
            $scope.choice = '';
        });

        $scope.$on('$ionicView.beforeEnter', function () {
            console.log("homeCtrl -- $ionicView.beforeEnter");
            BlankService.initValuesFromMemory();
        });

        $scope.$on('$ionicView.enter', function () {
            console.log("homeCtrl -- $ionicView.enter");
            initSystem();
        });

        function initSystem() {
            console.log('homeCtrl -- initSystem');
            $scope.interfaz = {};
            $scope.interfaz.order = 'Mascota';
            mascotas = [];
            var retrievedObject = localStorage.getItem("mascotas");
            mascotas = JSON.parse(retrievedObject);
            var filterBarInstance;
            getItems();
            processGroup();
            console.log("homeCtrl -- check if come from notification");
            if (processIfComeFromNotification() == false) {
            }
        }
        BlankService.reloadHome = true;
        BlankService.initValuesFromMemory();

        function processIfComeFromNotification() {
            console.log('homeCtrl -- processIfComeFromNotification');
            found = false;
            if (BlankService.existsDataFromInternalPhoneMemory("treatmentId_notif")) {
                BlankService.treatmentId_notif = BlankService.getDataFromInternalPhoneMemory("treatmentId_notif");
                if ((BlankService.treatmentId_notif != undefined) && (BlankService.treatmentId_notif != null) && (BlankService.treatmentId_notif != '')) {
                    console.log('homeCtrl -- hay id desde notificacion valido');
                    var i = 0;
                    index = -1;
                    for (i; i < BlankService.actuacionesDeLasMascotas.length; i++) {
                        if ((BlankService.actuacionesDeLasMascotas[i] != undefined) && (BlankService.actuacionesDeLasMascotas[i] != null)) {
                            if (BlankService.actuacionesDeLasMascotas[i].id == BlankService.treatmentId_notif) {
                                console.log('homeCtrl -- Actuacion encontrada. Redirigiendo a detalle');
                                found = true;
                                index = i;
                                break;
                            }
                        }
                    }
                    if (found) {
                        BlankService.detailTreatment = BlankService.actuacionesDeLasMascotas[index];
                        $state.go('menu.detailTreatment');
                    } else {
                        console.log('homeCtrl -- el id recibido no concuerda con ninguna actuacion del sistema');
                        var alertPopup = $ionicPopup.alert({
                            title: 'Actuación no encontrada',
                            template: 'La actuación de la notificación no existe'
                        });
                        alertPopup.then(function (res) {
                            console.log('homeCtrl--popup -- el id recibido no existe');
                        });
                    }
                }
            }
            return found;
        }



        $scope.showFilterOrder = function () {
            console.log('homeCtrl -- showFilterOrder');

            var myPopup = $ionicPopup.show({
                template: '<ion-list>                                ' +
                '  <ion-radio ng-repeat="order in service.orders" ng-model="interfaz.order" ng-value="order.name">{{order.name}} ' +
                '</ion-list>                               ',
                title: 'Ordenar por...',
                subTitle: '',
                scope: $scope,
                buttons: [
                    {
                        text: '<b>Guardar</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            if (!$scope.interfaz.order) {
                                e.preventDefault();
                            } else {
                                return $scope.interfaz.order;
                            }
                        }
                    }
                ]
            });
            myPopup.then(function (res) {
                processOrder();
            });

            $timeout(function () {
                myPopup.close();
            }, 30000);
        };

        $scope.showFilterGroup = function () {
            console.log('homeCtrl -- showFilterGroup');

            var myPopup = $ionicPopup.show({
                template: '<ion-list>                                ' +
                '  <ion-checkbox ng-repeat="item in service.elemes" ng-model="item.selected">{{item.subId}}  ' +
                '</ion-list>                               ',
                title: 'Mostrar actuaciones de ...',
                subTitle: '',
                scope: $scope,
                buttons: [
                    {
                        text: '<b>Guardar</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                        }
                    }
                ]
            });
            myPopup.then(function (res) {
                processGroup();
            });

            $timeout(function () {
                myPopup.close();
            }, 30000);
        };

        $scope.redirectToaddTreatment = function () {
            console.log('homeCtrl -- redirectToaddTreatment');
            $state.go('menu.addTreatment');
        };

        $scope.redirectToaddPet = function () {
            console.log('homeCtrl -- redirectToaddPet');
            $state.go('menu.addMyPets');
        };

        $scope.borrarActuacion = function ($item) {
            console.log('homeCtrl -- borrarActuacion');
            BlankService.initValuesFromMemory();
            BlankService.removeByAttr(BlankService.actuacionesDeLasMascotas, 'id', $item.id);
            BlankService.saveDataInInternalPhoneMemory("actuacionesDeLasMascotas", BlankService.actuacionesDeLasMascotas);
        };

        function processOrder() {
            console.log('homeCtrl -- processOrder');

            if ($scope.interfaz.order == "Mascota") {
                BlankService.changeOrder('ordernombremascota');
            } else if ($scope.interfaz.order == "Fecha") {
                BlankService.changeOrder('orderfechamascota');
            } else if ($scope.interfaz.order == "Actuacion") {
                BlankService.changeOrder('ordernombreactuacion');
            }
        }

        function processGroup(filterText) {
            console.log('homeCtrl -- processGroup');

            var i = 0;
            var size = BlankService.actuacionesDeLasMascotas.length;

            for (i; i < BlankService.actuacionesDeLasMascotas.length; i++) {
                //1 chequeo si es visible o no.
                var k = 0;
                for (k; k < BlankService.elemes.length; k++) {
                    if (BlankService.actuacionesDeLasMascotas[i] != undefined) {
                        if (BlankService.actuacionesDeLasMascotas[i].namePet == BlankService.elemes[k].subId) {
                            //establezco si es visible o no
                            BlankService.actuacionesDeLasMascotas[i].isVisible = BlankService.elemes[k].selected;
                            //ahora, si no es visible, me da igual. Pero si lo es, hay que ver si entra dentro del filtro.

                            //si es visible
                            if (BlankService.elemes[k].selected) {
                                if (filterText == undefined | '') {
                                    BlankService.actuacionesDeLasMascotas[i].isVisible = true;
                                } else if (((BlankService.actuacionesDeLasMascotas[i].namePet)).indexOf(filterText) != -1) {
                                    //es visible y hay filtro
                                    BlankService.actuacionesDeLasMascotas[i].isVisible = true;
                                } else if (((BlankService.actuacionesDeLasMascotas[i].name)).indexOf(filterText) != -1) {
                                    //es visible y hay filtro
                                    BlankService.actuacionesDeLasMascotas[i].isVisible = true;
                                } else {
                                    //ya es visible pero no coincide con filtro. la oculto
                                    BlankService.actuacionesDeLasMascotas[i].isVisible = false;
                                }
                            }
                        }
                    }
                }
            }
        }

        function getItems() {
            console.log('homeCtrl -- getItems');

            $scope.items = BlankService.actuacionesDeLasMascotas;
        }

        function testFilter(filterText) {
            console.log('homeCtrl -- testFilter');

            var i = 0;
            var size = BlankService.actuacionesDeLasMascotas.length;

            for (i; i < BlankService.actuacionesDeLasMascotas.length; i++) {
                //1 chequeo si es visible o no.
                var k = 0;
                for (k; k < BlankService.elemes.length; k++) {
                    if (BlankService.actuacionesDeLasMascotas[i] != undefined) {
                        if (BlankService.actuacionesDeLasMascotas[i].namePet == BlankService.elemes[k].subId) {
                            //establezco si es visible o no
                            BlankService.actuacionesDeLasMascotas[i].isVisible = BlankService.elemes[k].selected;
                            //ahora, si no es visible, me da igual. Pero si lo es, hay que ver si entra dentro del filtro.

                            //si es visible
                            if (BlankService.elemes[k].selected) {
                                if (filterText == undefined | '') {
                                    BlankService.actuacionesDeLasMascotas[i].isVisible = true;
                                } else if (((BlankService.actuacionesDeLasMascotas[i].namePet.toLowerCase())).indexOf(filterText.toLowerCase()) != -1) {
                                    //es visible y hay filtro
                                    BlankService.actuacionesDeLasMascotas[i].isVisible = true;
                                } else if (((BlankService.actuacionesDeLasMascotas[i].name.toLowerCase())).indexOf(filterText.toLowerCase()) != -1) {
                                    //es visible y hay filtro
                                    BlankService.actuacionesDeLasMascotas[i].isVisible = true;
                                } else {
                                    //ya es visible pero no coincide con filtro. la oculto
                                    BlankService.actuacionesDeLasMascotas[i].isVisible = false;
                                }
                            }
                        }
                    } else {
                    }
                }
            }
        }

        $scope.showFilterBar = function ($filter) {
            console.log('homeCtrl -- showFilterBar');

            BlankService.initValuesFromMemory();

            filterBarInstance = $ionicFilterBar.show({
                items: $scope.items,
                update: function (filteredItems, filterText) {
                    $scope.items = filteredItems;
                    if (filterText) {
                        testFilter(filterText);
                    }
                },
                cancel: function (filteredItems) {
                    testFilter();
                }
            });
        };

        $scope.refreshItems = function () {
            console.log('homeCtrl -- refreshItems');

            if (filterBarInstance) {
                filterBarInstance();
                filterBarInstance = null;
            }

            $timeout(function () {
                getItems();
                $scope.$broadcast('scroll.refreshComplete');
            }, 1000);
        };

        $scope.showDetail = function ($item) {
            console.log('homeCtrl -- showDetail');

            BlankService.initValuesFromMemory();
            BlankService.detailTreatment = $item;
            $state.go('menu.detailTreatment');
        }
    })

    .controller('addTreatmentCtrl', function ($scope, $ionicPopup, $timeout, BlankService, $window, $state, $cordovaLocalNotification) {
        $scope.service = BlankService;
        $scope.$on('$ionicView.afterEnter', function () {
        });

        $scope.$on('$ionicView.loaded', function () {
            console.log('addTreatmentCtrl -- $ionicView.loaded');
            initValues();
            BlankService.reloadHome = true;
            BlankService.initValuesFromMemory();
        });

        $scope.addActuacion = function () {
            console.log('addTreatmentCtrl -- addActuacion');
            if ((camposIntroducidosOk()) && (saveActuacionInSystem())) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Añadir actuacion',
                    template: 'Actuacion añadida correctamente'
                });
                alertPopup.then(function (res) {
                    BlankService.initValuesFromMemory();
                    $window.history.back();

                });
            }
        };
        function initValues() {
            console.log('addTreatmentCtrl -- initValues');

            $scope.interfaz = {};
            $scope.interfaz.nameAct = '';
            $scope.interfaz.dateAct = new Date;
            $scope.interfaz.petName = '';
            $scope.interfaz.alarmName = 'Nunca';

            $scope.act = {};
            $scope.act.id = '';
            $scope.act.name = '';
            $scope.act.date = '';
            $scope.act.nameAlarm = '';
            $scope.act.alarmId = '';
            $scope.act.idPet = '';
            $scope.act.namePet = '';
            $scope.act.datePet = '';
            $scope.act.typePet = '';
            $scope.act.imagePet = '';
            $scope.act.isVisible = true;

            $scope.mascotasToShow = [];
            var i = 0;
            for (mascota in BlankService.mascotas) {
                $scope.mascotasToShow.push(
                    {
                        subId: JSON.stringify(BlankService.mascotas[i].name).replace(/\"/g, ""),
                        id: i,
                        selected: true
                    }
                );
                i++;
            }
        }

        $scope.showPopupAddNameAct = function () {
            console.log('addTreatmentCtrl -- showPopupAddNameAct');

            var myPopup = $ionicPopup.show({
                template: '<input type="text" ng-model="interfaz.nameAct">',
                title: 'Nombre de la actuacion',
                subTitle: '',
                scope: $scope,
                buttons: [
                    {
                        text: '<b>Guardar</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            if (!$scope.interfaz.nameAct) {
                                e.preventDefault();
                            } else {
                                return $scope.interfaz.nameAct;
                            }
                        }
                    }
                ]
            });
            myPopup.then(function (res) {
            });

            $timeout(function () {
                myPopup.close();
            }, 30000);
        };

        $scope.showPopupAddDateAct = function () {
            console.log('addTreatmentCtrl -- showPopupAddDateAct');

            var myPopup = $ionicPopup.show({
                template: '<input type="date" ng-model="interfaz.dateAct">',
                title: 'Fecha de la actuacion',
                subTitle: '',
                scope: $scope,
                buttons: [
                    {
                        text: '<b>Guardar</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            if (!$scope.interfaz.dateAct) {
                                e.preventDefault();
                            } else {
                                return $scope.interfaz.dateAct;
                            }
                        }
                    }
                ]
            });
            myPopup.then(function (res) {
            });

            $timeout(function () {
                myPopup.close();
            }, 30000);
        };


        $scope.showPopupAddMultiplePet = function () {
            console.log('addTreatmentCtrl -- showPopupAddMultiplePet');

            var myPopup = $ionicPopup.show({
                template: '<ion-list>                                ' +
                '<ion-checkbox ng-repeat="pet in mascotasToShow" ng-model="pet.selected" ng-checked="pet.selected" ng-value="pet.id">{{pet.subId}} ' +
                '</ion-list>                               ',
                title: 'Mascota',
                subTitle: '',
                scope: $scope,
                buttons: [
                    {
                        text: '<b>Guardar</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                        }
                    }
                ]
            });
            myPopup.then(function (res) {
            });

            $timeout(function () {
                myPopup.close();
            }, 30000);
        };

        $scope.showPopupAddAlarm = function () {
            console.log('addTreatmentCtrl -- showPopupAddAlarm');

            var myPopup = $ionicPopup.show({
                template: '<ion-list>                                ' +
                '  <ion-radio ng-repeat="alarm in service.alarmas" ng-model="interfaz.alarmName" ng-value="alarm.name">{{alarm.name}} ' +
                '</ion-list>                               ',
                title: 'Alarma',
                subTitle: '',
                scope: $scope,
                buttons: [
                    {
                        text: '<b>Guardar</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            if (!$scope.interfaz.alarmName) {
                                e.preventDefault();
                            } else {
                                return $scope.interfaz.alarmName;
                            }
                        }
                    }
                ]
            });
            myPopup.then(function (res) {
            });

            $timeout(function () {
                myPopup.close();
            }, 30000);
        };

        function saveActuacionInSystem() {
            console.log('addTreatmentCtrl -- saveActuacionInSystem');

            //guardar una actuacion por cada mascota seleccionada
            var k = 0;
            for (k; k < $scope.mascotasToShow.length; k++) {
                if ($scope.mascotasToShow[k].selected) {
                    someSelected = true;
                    var pet = BlankService.findPetbyName($scope.mascotasToShow[k].subId);
                    $scope.act.id = BlankService.IDGenerator(8);
                    $scope.act.idPet = pet.id;
                    $scope.act.datePet = pet.date;
                    $scope.act.typePet = pet.type;
                    $scope.act.namePet = pet.name;
                    $scope.act.imagePet = pet.image;
                    $scope.act.alarmSystemId = processAssignAlarm($scope.act);
                    BlankService.actuacionesDeLasMascotas.push($scope.act);
                }
            }

            BlankService.saveDataInInternalPhoneMemory("actuacionesDeLasMascotas", BlankService.actuacionesDeLasMascotas);

            return true;
        };

        function processAssignAlarm(actuacion) {
            console.log('addTreatmentCtrl -- processAssignAlarm');

            if (actuacion != undefined) {
                if (actuacion.nameAlarm != undefined) {
                    if (actuacion.alarmId != "0") {
                        var now = actuacion.date.getTime();
                        var timeAlarm;
                        if (actuacion.alarmId == "1") {
                            //12 horas antes
                            timeAlarm = new Date(now - 12 * 60 * 60 * 1000);
                        } else if (actuacion.alarmId == "2") {
                            //1 dia antes
                            var now = actuacion.date.getTime();
                            timeAlarm = new Date(now - 24 * 60 * 60 * 1000);
                        } else if (actuacion.alarmId == "3") {
                            //2 dias antes
                            timeAlarm = new Date(now - 48 * 60 * 60 * 1000);
                        }
                        var idAlarmaInSystem = BlankService.IDGenerator(4);
                        var text = actuacion.namePet + " - " + actuacion.name;
                        asignoAlarmaInSystem(timeAlarm, idAlarmaInSystem, actuacion.id, text)
                        return idAlarmaInSystem;
                    }
                }
            }
        }

        function asignoAlarmaInSystem(cuando, idAlarm, treatmentId, text) {

            console.log('addTreatmentCtrl -- asignoAlarmaInSystem with');
            console.log('addTreatmentCtrl -- text: ', text);
            console.log('addTreatmentCtrl -- idAlarm: ', idAlarm);
            console.log('addTreatmentCtrl -- treatmentId: ', treatmentId);
            console.log('addTreatmentCtrl -- cuando: ', cuando);
            try {
                $cordovaLocalNotification.schedule({
                    id: idAlarm,
                    title: 'AgenDog',
                    text: text,
                    at: cuando,
                    //badge: number, The number currently set as the badge of the app icon in Springboard (iOS) or at the right-hand side of the local notification (Android)
                    data: { treatmentId: treatmentId }
                }).then(function (result) {
                    console.log('addTreatmentCtrl -- asignoAlarmaInSystem - Notification launched');
                });
            } catch (e) {
                console.log('addTreatmentCtrl -- asignoAlarmaInSystem - ha petao', e);
            }
        };

        function camposIntroducidosOk() {
            console.log('addTreatmentCtrl -- camposIntroducidosOk');

            $scope.act.name = $scope.interfaz.nameAct;
            $scope.act.date = $scope.interfaz.dateAct;
            $scope.act.nameAlarm = $scope.interfaz.alarmName;
            if ($scope.act.name != undefined && $scope.act.name != '' && $scope.act.name != 'nombre') {
                if ($scope.act.date != undefined && $scope.act.date != '') {
                    if ($scope.act.nameAlarm != undefined && $scope.act.nameAlarm != '') {
                        var k = 0;
                        someSelected = false;
                        for (k; k < $scope.mascotasToShow.length; k++) {
                            if ($scope.mascotasToShow[k].selected) {
                                someSelected = true;
                            }
                        }
                        if (someSelected) {
                            var alarm = BlankService.findAlarmbyName($scope.act.nameAlarm);
                            if (alarm) {
                                $scope.act.alarmId = alarm.id;
                                return true;
                            } else {
                                console.log('addTreatmentCtrl - camposIntroducidosOk-Fallo por BlankService.findAlarmbyName');
                            }
                        } else {
                            console.log('addTreatmentCtrl - camposIntroducidosOk-Fallo por NotPets');
                        }
                    } else {
                        console.log('addTreatmentCtrl - camposIntroducidosOk-Fallo por act.nameAlarm');
                    }
                } else {
                    console.log('addTreatmentCtrl - camposIntroducidosOk-Fallo por act.date');
                }
            } else {
                console.log('addTreatmentCtrl - camposIntroducidosOk-Fallo por act.name');
            }
            var alertPopup = $ionicPopup.alert({
                title: 'Añadir actuacion',
                template: 'Error 1. Rellena todos los campos correctamente'
            });
        };
    })

    .controller('detailTreatmentCtrl', function ($scope, $ionicPopup, $timeout, BlankService, $window, $state, $cordovaLocalNotification, $ionicPlatform) {
        $scope.actuacion = BlankService.detailTreatment;
        $scope.service = BlankService;

        $ionicPlatform.ready(function () {

            $scope.scheduleInstantNotification = function (idAlarm, text, at, treatmentId) {
                $cordovaLocalNotification.schedule({
                    //id: idAlarm,
                    id: idAlarm,
                    title: 'AgenDog',
                    text: text,
                    at: at,
                    //badge: number, The number currently set as the badge of the app icon in Springboard (iOS) or at the right-hand side of the local notification (Android)
                    //data: { treatmentId: treatmentId }
                    data: { "treatmentId": treatmentId }
                });

                cordova.plugins.notification.local.on("click", function (notification) {
                    console.log('detailTreatmentCtrl - Notificacion  -  pulso en notificacion');

                    var unpackedData = JSON.parse(notification.data);
                    var notificationProfilID = unpackedData['treatmentId'];

                    localStorage.setItem("treatmentId_notif", JSON.stringify(notificationProfilID));

                    console.log('detailTreatmentCtrl -- Notificacion -- todo ok.');
                    //initSystem();

                    $state.go('menu.detailTreatment');
                });
            };

            $scope.cancelSingleNotification = function (idAlarm) {
                $cordovaLocalNotification.cancel(idAlarm).then(function (result) {
                    console.log('detailPetCtrl -- Notification Canceled ', idAlarm);
                });
            };
        });
        $scope.$on('$ionicView.loaded', function () {
            console.log('detailTreatmentCtrl -- $ionicView.loaded');
            BlankService.initDetailTreatment();
            initValues();
            BlankService.reloadHome = true;
            BlankService.initValuesFromMemory();
        });

        $scope.$on('$ionicView.enter', function () {
            console.log('detailTreatmentCtrl -- $ionicView.enter');

            //Hay Notificacion
            if (BlankService.comesFromNotification()) {
                console.log('detailTreatmentCtrl -- comesFromNotification = true');
                //viene de notificacion. borro la memoria de la notificacion y muestro popup
                BlankService.treatmentId_notif = undefined;
                BlankService.removeDataFromInternalPhoneMemory("treatmentId_notif");

                var confirmPopup = $ionicPopup.confirm({
                    title: 'Detalle de actuacion',
                    template: '¿Quieres utilizar los servicios de TeCuroEnCasa para esta actuación de tu mascota?'
                });

                confirmPopup.then(function (res) {
                    if (res) {
                        BlankService.saveDataInInternalPhoneMemory("detailTreatmentId", BlankService.detailTreatment.id);
                        $window.open('http:///tecuroencasa.com/consultas/', '_blank');
                        console.log('detailTreatmentCtrl -- Compraaaaa');
                    } else {
                        console.log('detailTreatmentCtrl -- No compra');
                    }
                });
            }
        });

        $scope.$on('$ionicView.afterEnter', function () {
            console.log('detailTreatmentCtrl -- $ionicView.afterEnter');
        });

        $scope.solicitarConsulta = function () {
            console.log('detailTreatmentCtrl -- solicitarConsulta');
            BlankService.saveDataInInternalPhoneMemory("detailTreatmentId", BlankService.detailTreatment.id);
            $window.open('http:///tecuroencasa.com/consultas/', '_blank');
        };
        $scope.modifyTreatment = function () {
            console.log('detailTreatmentCtrl -- modifyTreatment');

            if ((camposIntroducidosOk()) && (saveActuacionInSystem())) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Añadir actuacion',
                    template: 'Actuacion modificada correctamente'
                });
                alertPopup.then(function (res) {
                    BlankService.initValuesFromMemory();
                    $window.history.back();
                });
            }
        };
        $scope.forwardAlarm = function (secondsForward) {
            console.log('detailTreatmentCtrl -- forwardAlarm');

            if (BlankService.detailTreatment.alarmId != undefined) {
                if (BlankService.detailTreatment.alarmId != "0") {
                    var idAlarmaInSystem = BlankService.detailTreatment.alarmSystemId;
                    var now = new Date().getTime();
                    var timeAlarm = new Date(now + secondsForward * 1000);
                    var text = BlankService.detailTreatment.namePet + " - " + BlankService.detailTreatment.name;
                    asignoAlarmaInSystem(timeAlarm, idAlarmaInSystem, BlankService.detailTreatment.id, text)
                }
            }
        };

        function getActuacion(pet) {
            console.log('detailTreatmentCtrl -- getActuacion');
            $scope.newact = {};
            $scope.newact.id = BlankService.IDGenerator(8);
            $scope.newact.name = $scope.act.name;
            $scope.newact.date = $scope.act.date;
            $scope.newact.idPet = pet.id;
            $scope.newact.namePet = pet.name;
            $scope.newact.datePet = pet.date;
            $scope.newact.typePet = pet.type;
            $scope.newact.imagePet = pet.image;
            $scope.newact.isVisible = $scope.act.isVisible;
            $scope.newact.nameAlarm = $scope.act.nameAlarm;
            $scope.newact.alarmId = $scope.act.alarmId;
            return $scope.newact;
        }
        function saveActuacionInSystem() {
            console.log('detailTreatmentCtrl -- saveActuacionInSystem');

            //guardar una actuacion por cada mascota seleccionada
            var k = 0;
            for (k; k < $scope.mascotasToShow.length; k++) {
                if ($scope.mascotasToShow[k].selected) {
                    someSelected = true;
                    var act = getActuacion(BlankService.findPetbyName($scope.mascotasToShow[k].subId));
                    //añado alarma
                    act.alarmSystemId = processAssignAlarm(act);
                    BlankService.actuacionesDeLasMascotas.push(act);
                }
            }

            //borro la antigua
            BlankService.removeByAttr(BlankService.actuacionesDeLasMascotas, 'id', BlankService.detailTreatment.id);

            BlankService.saveDataInInternalPhoneMemory("actuacionesDeLasMascotas", BlankService.actuacionesDeLasMascotas);
            return true;
        }
        function processDeleteAlarm(actuacion) {
            console.log('detailTreatmentCtrl -- processDeleteAlarm');

            if (actuacion != undefined) {
                if (actuacion.alarmSystemId != undefined) {
                    borroAlarmaInSystem(actuacion.alarmSystemId)
                }
            }
        }
        function borroAlarmaInSystem(idAlarm) {
            console.log('detailTreatmentCtrl -- borroAlarmaInSystem');

            console.log('detailPetCtrl -- borroAlarmaInSystem with');
            console.log('detailPetCtrl -- idAlarm: ', idAlarm);
            try {
                $scope.cancelSingleNotification(idAlarm);
            } catch (e) { }
        };

        function processAssignAlarm(actuacion) {
            console.log('detailTreatmentCtrl -- processAssignAlarm');

            if ((actuacion != undefined) && (actuacion.date != undefined)) {
                if (actuacion.nameAlarm != undefined) {
                    if (actuacion.alarmId != "0") {
                        var now = new Date(actuacion.date).getTime();
                        var timeAlarm;
                        if (actuacion.alarmId == "1") {
                            //12 horas antes
                            timeAlarm = new Date(now - 12 * 60 * 60 * 1000);
                        } else if (actuacion.alarmId == "2") {
                            //1 dia antes
                            var now = actuacion.date.getTime();
                            timeAlarm = new Date(now - 24 * 60 * 60 * 1000);
                        } else if (actuacion.alarmId == "3") {
                            //2 dias antes
                            timeAlarm = new Date(now - 48 * 60 * 60 * 1000);
                        }
                        var idAlarmaInSystem = BlankService.IDGenerator(4);
                        var text = actuacion.namePet + " - " + actuacion.name;
                        asignoAlarmaInSystem(timeAlarm, idAlarmaInSystem, actuacion.id, text)
                        return idAlarmaInSystem;
                    }
                }
            }
        }

        function asignoAlarmaInSystem(cuando, idAlarm, treatmentId, text) {
            console.log('detailTreatmentCtrl -- asignoAlarmaInSystem with...');
            console.log('detailTreatmentCtrl -- text: ', text);
            console.log('detailTreatmentCtrl -- idAlarm: ', idAlarm);
            console.log('detailTreatmentCtrl -- treatmentId: ', treatmentId);
            console.log('detailTreatmentCtrl -- cuando: ', cuando);
            try {
                $scope.scheduleInstantNotification(10, text, cuando, treatmentId);
            } catch (e) {
            }
        };

        function camposIntroducidosOk() {
            console.log('detailTreatmentCtrl -- camposIntroducidosOk');

            $scope.act.name = BlankService.detailTreatment.name;
            $scope.act.date = BlankService.detailTreatment.date;
            $scope.act.nameAlarm = BlankService.detailTreatment.nameAlarm;
            if ($scope.act.name != undefined && $scope.act.name != '' && $scope.act.name != 'nombre') {
                if ($scope.act.date != undefined && $scope.act.date != '') {
                    if ($scope.act.nameAlarm != undefined && $scope.act.nameAlarm != '') {
                        var k = 0;
                        someSelected = false;
                        for (k; k < $scope.mascotasToShow.length; k++) {
                            if ($scope.mascotasToShow[k].selected) {
                                someSelected = true;
                            }
                        }
                        if (someSelected) {
                            var alarm = BlankService.findAlarmbyName($scope.act.nameAlarm);
                            if (alarm) {
                                $scope.act.alarmId = alarm.id;
                                return true;
                            } else {
                                console.log('detailTreatmentCtrl - camposIntroducidosOk-Fallo por BlankService.findAlarmbyName');
                            }
                        } else {
                            console.log('detailTreatmentCtrl - camposIntroducidosOk-Fallo por NotPets');
                        }
                    } else {
                        console.log('detailTreatmentCtrl - camposIntroducidosOk-Fallo por act.nameAlarm');
                    }

                } else {
                    console.log('detailTreatmentCtrl - camposIntroducidosOk-Fallo por act.date');
                }
            } else {
                console.log('detailTreatmentCtrl - camposIntroducidosOk-Fallo por act.name');
            }

            var alertPopup = $ionicPopup.alert({
                title: 'Añadir actuacion',
                template: 'Error 1. Rellena todos los campos correctamente'
            });
        }


        function initValues() {
            console.log('detailTreatmentCtrl -- initValues');

            $scope.interfaz = {};
            $scope.interfaz.nameAct = '';
            $scope.interfaz.dateAct = new Date;
            $scope.interfaz.petName = '';
            $scope.interfaz.alarmName = 'Nunca';

            $scope.act = {};
            $scope.act.id = '';
            $scope.act.name = '';
            $scope.act.date = '';
            $scope.act.namePet = '';
            $scope.act.nameAlarm = '';
            $scope.act.alarmId = '';
            $scope.act.idPet = '';
            $scope.act.namePet = '';
            $scope.act.datePet = '';
            $scope.act.typePet = '';
            $scope.act.imagePet = '';
            $scope.act.isVisible = true;

            $scope.mascotasToShow = [];
            var i = 0;
            for (mascota in BlankService.mascotas) {
                subId = JSON.stringify(BlankService.mascotas[i].name).replace(/\"/g, "");
                if (subId == BlankService.detailTreatment.namePet) {
                    $scope.mascotasToShow.push(
                        {
                            subId: JSON.stringify(BlankService.mascotas[i].name).replace(/\"/g, ""),
                            id: i,
                            selected: true
                        }
                    );
                } else {
                    $scope.mascotasToShow.push(
                        {
                            subId: JSON.stringify(BlankService.mascotas[i].name).replace(/\"/g, ""),
                            id: i,
                            selected: false
                        }
                    );
                }
                i++;
            }
        }

        $scope.showPopupAddNameAct = function () {
            var myPopup = $ionicPopup.show({
                template: '<input type="text" ng-model="actuacion.name">',
                title: 'Nombre de la actuacion',
                subTitle: '',
                scope: $scope,
                buttons: [
                    {
                        text: '<b>Guardar</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            if (!$scope.actuacion.name) {
                                e.preventDefault();
                            } else {
                                return $scope.actuacion.name;
                            }
                        }
                    }
                ]
            });
            myPopup.then(function (res) {
            });

            $timeout(function () {
                myPopup.close();
            }, 30000);
        };

        $scope.showPopupAddDateAct = function () {
            console.log("detailTreatmentCtrl -- $scope.showPopupAddDateAct");
            console.log("detailTreatmentCtrl -- $scope.showPopupAddDateAct", $scope.actuacion);
            console.log("detailTreatmentCtrl -- $scope.showPopupAddDateAct", $scope.actuacion.date);

            if (($scope.actuacion != null) && ($scope.actuacion != undefined) && ($scope.actuacion.date != null) && ($scope.actuacion.date != undefined)) {
                var newfecha = new Date($scope.actuacion.date);
                $scope.actuacion.date = newfecha;
            }

            var myPopup = $ionicPopup.show({
                template: '<input type="date" ng-model="actuacion.date">',
                title: 'Fecha de la actuacion',
                subTitle: '',
                scope: $scope,
                buttons: [
                    {
                        text: '<b>Guardar</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            if (!$scope.actuacion.date) {
                                e.preventDefault();
                            } else {
                                return $scope.actuacion.date;
                            }
                        }
                    }
                ]
            });
            myPopup.then(function (res) {
            });

            $timeout(function () {
                myPopup.close();
            }, 30000);
        };

        $scope.showPopupAddMultiplePet = function () {
            var myPopup = $ionicPopup.show({
                template: '<ion-list>                                ' +
                '<ion-checkbox ng-repeat="pet in mascotasToShow" ng-model="pet.selected" ng-checked="pet.selected" ng-value="pet.id">{{pet.subId}} ' +
                '</ion-list>                               ',
                title: 'Mascota',
                subTitle: '',
                scope: $scope,
                buttons: [
                    {
                        text: '<b>Guardar</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                        }
                    }
                ]
            });
            myPopup.then(function (res) {
            });

            $timeout(function () {
                myPopup.close();
            }, 30000);
        };

        $scope.showPopupAddAlarm = function () {
            var myPopup = $ionicPopup.show({
                template: '<ion-list>                                ' +
                '  <ion-radio ng-repeat="alarm in service.alarmas" ng-model="actuacion.nameAlarm" ng-value="alarm.name">{{alarm.name}} ' +
                '</ion-list>                               ',
                title: 'Alarma',
                subTitle: '',
                scope: $scope,
                buttons: [
                    {
                        text: '<b>Guardar</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                        }
                    }
                ]
            });
            myPopup.then(function (res) {
            });

            $timeout(function () {
                myPopup.close();
            }, 30000);
        };
    })


    ;
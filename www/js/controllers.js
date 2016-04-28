angular.module('app.controllers', [])

    .controller('aAdirMascotasCtrl', function ($scope, $ionicPopup, $timeout) {

        $scope.$on('$ionicView.loaded', function (viewInfo, state) {

            $scope.mascotas = [];
            $scope.actuacionesDeLasMascotas = [];

            localStorage.clear();

            initValues();
            initValuesFromMemory();

            console.log('CTRL - $ionicView.loaded', viewInfo, state);
        });
        $scope.$on('$ionicView.unloaded', function (viewInfo, state) {
            console.log('CTRL - $ionicView.unloaded', viewInfo, state);
        });

        function initValuesFromMemory() {
            console.log('CTRL - getValuesFromMemory');

            console.log('CTRL - $scope.mascotas.length antes ', $scope.mascotas.length);
            if (localStorage.getItem("mascotas") !== null) {
                $scope.mascotas = getDataFromInternalPhoneMemory("mascotas");
            }
            console.log('CTRL - $scope.mascotas.length despues ', $scope.mascotas.length);

            console.log('CTRL - $scope.actuacionesDeLasMascotas.length qntes ', $scope.actuacionesDeLasMascotas.length);
            if (localStorage.getItem("actuacionesDeLasMascotas") !== null) {
                $scope.actuacionesDeLasMascotas = getDataFromInternalPhoneMemory("actuacionesDeLasMascotas");
            }
            console.log('CTRL - $scope.actuacionesDeLasMascotas.length despues ', $scope.actuacionesDeLasMascotas.length);

        }

        function initValues() {
            console.log('CTRL - initValues');
            $scope.imagestring = {};
            $scope.console = {};
            $scope.lastPhoto = "init";
            $scope.imagestring = "img/perroIcon.jpg";

            $scope.interfaz = {};
            $scope.interfaz.namePet = 'nombre';
            $scope.interfaz.datePet = new Date;
            $scope.interfaz.typePet = 'Perro';
            $scope.interfaz.typesPet = [{ "name": "Perro" }, { "name": "Gato" }];

            $scope.pet = {};
            $scope.pet.id = '';
            $scope.pet.name = '';
            $scope.pet.date = '';
            $scope.pet.type = '';

            selectIfDefaultImage();

        }


        var sort_by = function (field, reverse, primer) {
            var key = primer ?
                function (x) { return primer(x[field]) } :
                function (x) { return x[field] };
            reverse = !reverse ? 1 : -1;
            return function (a, b) {
                return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
            }
        }

        function selectIfDefaultImage() {
            console.log('CTRL - selectIfDefaultImage');
            if ($scope.imagestring == "img/perroIcon.jpg" || $scope.imagestring == "img/gatoIcon.jpg") {
                $scope.imagestring = "img/perroIcon.jpg";
                if ($scope.interfaz.typePet == 'Gato') {
                    $scope.imagestring = "img/gatoIcon.jpg";
                }
            }
        }
        function camposIntroducidosOk() {
            console.log('CTRL - camposIntroducidosOk');

            $scope.pet.name = $scope.interfaz.namePet;
            $scope.pet.date = $scope.interfaz.datePet;
            $scope.pet.type = $scope.interfaz.typePet;
            $scope.pet.id = Date.now();

            console.log('CTRL - camposIntroducidosOk - $scope.pet.id=', $scope.pet.id);
            console.log('CTRL - camposIntroducidosOk - $scope.pet.name=', $scope.pet.name);
            console.log('CTRL - camposIntroducidosOk - $scope.pet.date=', $scope.pet.date);
            console.log('CTRL - camposIntroducidosOk - $scope.pet.type=', $scope.pet.type);

            if ($scope.pet.name != undefined && $scope.pet.name != '') {
                if ($scope.pet.type != undefined && $scope.pet.type != '') {
                    if ($scope.pet.date != undefined && $scope.pet.date != '') {
                        console.log('CTRL - addPetInSystem-return true');
                        return true;
                    } else {
                        console.log('CTRL - addPetInSystem-pet.date');
                    }
                } else {
                    console.log('CTRL - addPetInSystem-pet.type');
                }
            } else {
                console.log('CTRL - addPetInSystem-pet.name');
            }
            var alertPopup = $ionicPopup.alert({
                title: 'Añadir mascotas',
                template: 'Error 1. Rellena todos los campos correctamente'
            });
        };

        function savePetInSystem() {
            console.log('CTRL - savePetInSystem');
            console.log('CTRL - savePetInSystem', $scope.mascotas);
            $scope.mascotas.push($scope.pet);
            saveDataInInternalPhoneMemory("mascotas", $scope.mascotas);
            return true;

        };

        function createActuacionesDeMascota() {
            //creo las actuaciones depende de si es perro o gatoIcon
            console.log("CTRL - createActuacionesDeMascota");

            $scope.act = {};

            if ($scope.pet.type = 'perro') {
                //10 de enero: desparasitación interna
                $scope.act.id = Date.now(); $scope.act.name = 'desparasitación interna'; $scope.act.date = new Date('2016-01-10T09:00:00'); $scope.act.idPet = $scope.pet.id; $scope.act.namePet = $scope.pet.name; $scope.act.datePet = $scope.pet.date; $scope.act.typePet = $scope.pet.type; $scope.act.isVisible=true;  
                console.log("CTRL - createActuacionesDeMascota - perro", JSON.stringify($scope.act));
                $scope.actuacionesDeLasMascotas.push($scope.act);
                $scope.act = {};
                //01 de abril: ANALÍTICA DE FILARIA*
                $scope.act.id = Date.now(); $scope.act.name = 'ANALÍTICA DE FILARIA*'; $scope.act.date = new Date('2016-04-01T09:00:00'); $scope.act.idPet = $scope.pet.id; $scope.act.namePet = $scope.pet.name; $scope.act.datePet = $scope.pet.date; $scope.act.typePet = $scope.pet.type; $scope.act.isVisible=true;
                console.log("CTRL - createActuacionesDeMascota - perro", JSON.stringify($scope.act));
                $scope.actuacionesDeLasMascotas.push($scope.act);
                $scope.act = {};
                //10 de abril: desparasitación interna
                $scope.act.id = Date.now(); $scope.act.name = 'desparasitación interna'; $scope.act.date = new Date('2016-04-10T09:00:00'); $scope.act.idPet = $scope.pet.id; $scope.act.namePet = $scope.pet.name; $scope.act.datePet = $scope.pet.date; $scope.act.typePet = $scope.pet.type; $scope.act.isVisible=true;
                console.log("CTRL - createActuacionesDeMascota - perro", JSON.stringify($scope.act));
                $scope.actuacionesDeLasMascotas.push($scope.act);
                $scope.act = {};
                //15 de abril: prevención Filaria en pastilla
                $scope.act.id = Date.now(); $scope.act.name = 'prevención Filaria en pastilla'; $scope.act.date = new Date('2016-04-15T09:00:00'); $scope.act.idPet = $scope.pet.id; $scope.act.namePet = $scope.pet.name; $scope.act.datePet = $scope.pet.date; $scope.act.typePet = $scope.pet.type; $scope.act.isVisible=true;
                console.log("CTRL - createActuacionesDeMascota - perro", JSON.stringify($scope.act));
                $scope.actuacionesDeLasMascotas.push($scope.act);
                $scope.act = {};
                //15 de abril: PONER COLLAR PREVENCIÓN LEISHMANIA
                $scope.act.id = Date.now(); $scope.act.name = 'PONER COLLAR PREVENCIÓN LEISHMANIA'; $scope.act.date = new Date('2016-04-15T09:00:00'); $scope.act.idPet = $scope.pet.id; $scope.act.namePet = $scope.pet.name; $scope.act.datePet = $scope.pet.date; $scope.act.typePet = $scope.pet.type; $scope.act.isVisible=true;
                console.log("CTRL - createActuacionesDeMascota - perro", JSON.stringify($scope.act));
                $scope.actuacionesDeLasMascotas.push($scope.act);
                $scope.act = {};
                //1 de mayo: PREVENCIÓN ANUAL FILARIA GUARDIAN**
                $scope.act.id = Date.now(); $scope.act.name = 'PREVENCIÓN ANUAL FILARIA GUARDIAN**'; $scope.act.date = new Date('2016-05-01T09:00:00'); $scope.act.idPet = $scope.pet.id; $scope.act.namePet = $scope.pet.name; $scope.act.datePet = $scope.pet.date; $scope.act.typePet = $scope.pet.type; $scope.act.isVisible=true;
                console.log("CTRL - createActuacionesDeMascota - perro", JSON.stringify($scope.act));
                $scope.actuacionesDeLasMascotas.push($scope.act);
                $scope.act = {};
                //1 a 29 de mayo: LEISGUARD PREVENCIÓN LEISHMANIA
                $scope.act.id = Date.now(); $scope.act.name = 'LEISGUARD PREVENCIÓN LEISHMANIA'; $scope.act.date = new Date('2016-05-15T09:00:00'); $scope.act.idPet = $scope.pet.id; $scope.act.namePet = $scope.pet.name; $scope.act.datePet = $scope.pet.date; $scope.act.typePet = $scope.pet.type; $scope.act.isVisible=true;
                console.log("CTRL - createActuacionesDeMascota - perro", JSON.stringify($scope.act));
                $scope.actuacionesDeLasMascotas.push($scope.act);
                $scope.act = {};
                //15 de mayo: prevención Filaria en pastilla
                $scope.act.id = Date.now(); $scope.act.name = 'prevención Filaria en pastilla'; $scope.act.date = new Date('2016-05-15T09:00:00'); $scope.act.idPet = $scope.pet.id; $scope.act.namePet = $scope.pet.name; $scope.act.datePet = $scope.pet.date; $scope.act.typePet = $scope.pet.type; $scope.act.isVisible=true;
                console.log("CTRL - createActuacionesDeMascota - perro", JSON.stringify($scope.act));
                $scope.actuacionesDeLasMascotas.push($scope.act);
                $scope.act = {};
                //15 de junio: prevención Filaria en pastilla
                $scope.act.id = Date.now(); $scope.act.name = 'prevención Filaria en pastilla'; $scope.act.date = new Date('2016-06-15T09:00:00'); $scope.act.idPet = $scope.pet.id; $scope.act.namePet = $scope.pet.name; $scope.act.datePet = $scope.pet.date; $scope.act.typePet = $scope.pet.type; $scope.act.isVisible=true;
                console.log("CTRL - createActuacionesDeMascota - perro", JSON.stringify($scope.act));
                $scope.actuacionesDeLasMascotas.push($scope.act);
                $scope.act = {};
                //1 a 29 de julio: LEISGUARD PREVENCIÓN LEISHMANIA
                $scope.act.id = Date.now(); $scope.act.name = 'LEISGUARD PREVENCIÓN LEISHMANIA'; $scope.act.date = new Date('2016-07-10T09:00:00'); $scope.act.idPet = $scope.pet.id; $scope.act.namePet = $scope.pet.name; $scope.act.datePet = $scope.pet.date; $scope.act.typePet = $scope.pet.type; $scope.act.isVisible=true;
                console.log("CTRL - createActuacionesDeMascota - perro", JSON.stringify($scope.act));
                $scope.actuacionesDeLasMascotas.push($scope.act);
                $scope.act = {};
                //10 de julio: desparasitación interna
                $scope.act.id = Date.now(); $scope.act.name = 'desparasitación interna'; $scope.act.date = new Date('2016-07-10T09:00:00'); $scope.act.idPet = $scope.pet.id; $scope.act.namePet = $scope.pet.name; $scope.act.datePet = $scope.pet.date; $scope.act.typePet = $scope.pet.type; $scope.act.isVisible=true;
                console.log("CTRL - createActuacionesDeMascota - perro", JSON.stringify($scope.act));
                $scope.actuacionesDeLasMascotas.push($scope.act);
                $scope.act = {};
                //15 de julio: prevención Filaria en pastilla
                $scope.act.id = Date.now(); $scope.act.name = 'prevención Filaria en pastilla'; $scope.act.date = new Date('2016-07-15T09:00:00'); $scope.act.idPet = $scope.pet.id; $scope.act.namePet = $scope.pet.name; $scope.act.datePet = $scope.pet.date; $scope.act.typePet = $scope.pet.type; $scope.act.isVisible=true;
                console.log("CTRL - createActuacionesDeMascota - perro", JSON.stringify($scope.act));
                $scope.actuacionesDeLasMascotas.push($scope.act);
                $scope.act = {};
                //15 de agosto: prevención Filaria en pastilla
                $scope.act.id = Date.now(); $scope.act.name = 'prevención Filaria en pastilla'; $scope.act.date = new Date('2016-08-15T09:00:00'); $scope.act.idPet = $scope.pet.id; $scope.act.namePet = $scope.pet.name; $scope.act.datePet = $scope.pet.date; $scope.act.typePet = $scope.pet.type; $scope.act.isVisible=true;
                console.log("CTRL - createActuacionesDeMascota - perro", JSON.stringify($scope.act));
                $scope.actuacionesDeLasMascotas.push($scope.act);
                $scope.act = {};
                //1 a 29 de septiembre: LEISGUARD PREVENCIÓN LEISHMANIA
                $scope.act.id = Date.now(); $scope.act.name = 'LEISGUARD PREVENCIÓN LEISHMANIA'; $scope.act.date = new Date('2016-09-15T09:00:00'); $scope.act.idPet = $scope.pet.id; $scope.act.namePet = $scope.pet.name; $scope.act.datePet = $scope.pet.date; $scope.act.typePet = $scope.pet.type; $scope.act.isVisible=true;
                console.log("CTRL - createActuacionesDeMascota - perro", JSON.stringify($scope.act));
                $scope.actuacionesDeLasMascotas.push($scope.act);
                $scope.act = {};
                //15 de septiembre: prevención Filaria en pastilla
                $scope.act.id = Date.now(); $scope.act.name = 'prevención Filaria en pastilla'; $scope.act.date = new Date('2016-09-15T09:00:00'); $scope.act.idPet = $scope.pet.id; $scope.act.namePet = $scope.pet.name; $scope.act.datePet = $scope.pet.date; $scope.act.typePet = $scope.pet.type; $scope.act.isVisible=true;
                console.log("CTRL - createActuacionesDeMascota - perro", JSON.stringify($scope.act));
                $scope.actuacionesDeLasMascotas.push($scope.act);
                $scope.act = {};
                //10 de octubre: desparasitación interna
                $scope.act.id = Date.now(); $scope.act.name = 'desparasitación interna'; $scope.act.date = new Date('2016-10-10T09:00:00'); $scope.act.idPet = $scope.pet.id; $scope.act.namePet = $scope.pet.name; $scope.act.datePet = $scope.pet.date; $scope.act.typePet = $scope.pet.type; $scope.act.isVisible=true;
                console.log("CTRL - createActuacionesDeMascota - perro", JSON.stringify($scope.act));
                $scope.actuacionesDeLasMascotas.push($scope.act);
                $scope.act = {};
                //10 de diciembre: ANALÍTICA DE LEISHMANIA*
                $scope.act.id = Date.now(); $scope.act.name = 'ANALÍTICA DE LEISHMANIA'; $scope.act.date = new Date('2016-12-10T09:00:00'); $scope.act.idPet = $scope.pet.id; $scope.act.namePet = $scope.pet.name; $scope.act.datePet = $scope.pet.date; $scope.act.typePet = $scope.pet.type; $scope.act.isVisible=true;
                console.log("CTRL - createActuacionesDeMascota - perro", JSON.stringify($scope.act));
                $scope.actuacionesDeLasMascotas.push($scope.act);
                $scope.act = {};
            } else if ($scope.pet.type = 'gato') {

            }

            console.log("CTRL - createActuacionesDeMascota - actuaciones - ok");
            return true;
        }

        function saveActuacionesDeMascota() {
            console.log('CTRL - saveActuacionesDeMascota');
            saveDataInInternalPhoneMemory("actuacionesDeLasMascotas", $scope.actuacionesDeLasMascotas);
            initValuesFromMemory()
            return true;
        };

        function saveDataInInternalPhoneMemory(key, value) {
            console.log('CTRL -saveDataInInternalPhoneMemory');
            var antes = [];
            var despues = [];
            if (getDataFromInternalPhoneMemory(key) !== null) {
                antes = getDataFromInternalPhoneMemory(key);
            }
            saveDataEndInInternalPhoneMemory(key, value);
            if (getDataFromInternalPhoneMemory(key) !== null) {
                despues = getDataFromInternalPhoneMemory(key);
            }
            console.log('CTRL -saveDataInInternalPhoneMemory- antes ', antes.length);
            console.log('CTRL -saveDataInInternalPhoneMemory- despues ', despues.length);
        }

        function getDataFromInternalPhoneMemory(key) {
            var retrievedObject = localStorage.getItem(key);
            return JSON.parse(retrievedObject);
        }
        function saveDataEndInInternalPhoneMemory(key, value) {
            console.log('CTRL - saveDataEndInInternalPhoneMemory...');
            localStorage.setItem(key, JSON.stringify(value));
            console.log('CTRL - saveDataEndInInternalPhoneMemory ok --', JSON.stringify(value));
        }


        $scope.addPet = function () {
            console.log('CTRL - addPet');
            if ((camposIntroducidosOk()) && (savePetInSystem()) && (createActuacionesDeMascota()) && (saveActuacionesDeMascota())) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Añadir mascotas',
                    template: 'Mascota añadida correctamente'
                });
                alertPopup.then(function (res) {
                    initValues();
                });
            }
        };



        $scope.launchCapturePhoto = function ($state) {
            console.log('CTRL - launchCapturePhoto');
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
            console.log('CTRL - onPhotoDataSuccess');
            $scope.console = "onPhotoDataSuccess";
            console.log(imageData);
            var smallImage = document.getElementById('smallImage');
            smallImage.style.display = 'block';
            smallImage.src = "data:image/jpeg;base64," + imageData;
        }

        $scope.launchPhotoAlbum = function ($state) {
            console.log('CTRL - launchPhotoAlbum');
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
            console.log('CTRL - onPhotoURISuccess');
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
            console.log('CTRL - cameraError');
            $scope.console = "cameraError";
            alert('Failed because: ' + message);
        }

        $scope.showPopupAddName = function () {
            console.log('CTRL - showPopupAddName');
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
                console.log('Tapped!', res);
            });

            $timeout(function () {
                myPopup.close();
            }, 30000);
        };

        $scope.showPopupAddDate = function () {
            console.log('CTRL - showPopupAddDate');
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
                console.log('Tapped!', res);
            });

            $timeout(function () {
                myPopup.close();
            }, 30000);
        };

        $scope.showPopupAddType = function () {
            console.log('CTRL - showPopupAddType');
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
                console.log('Tapped!', res);
            });

            $timeout(function () {
                myPopup.close();
            }, 30000);
        };

    })

    .controller('homeCtrl', function ($scope, $ionicModal) {
        $scope.$on('$ionicView.loaded', function (viewInfo, state) {
            console.log('homeCtrl - $ionicView.loaded', viewInfo, state);
            getValuesFromMemory();

            $scope.choice = '';

            $scope.elemes = [];
            console.log('homeCtrl -$scope.mascotas1', JSON.stringify($scope.mascotas));
            var i = 0;
            var name = '';
            for (mascota in $scope.mascotas) {
                $scope.elemes.push(
                    {
                        subName: 'SubGrup1',
                        subId: JSON.stringify($scope.mascotas[i].name).replace(/\"/g, ""),
                        id: i,
                        selected: true
                    });
                i++;
            }

            $scope.groups = [];
            $scope.groups.push({ name: 'Mostrar', id: 1, items: $scope.elemes });

        });

        var sort_by = function (field, reverse, primer) {
            var key = primer ?
                function (x) { return primer(x[field]) } :
                function (x) { return x[field] };
            reverse = !reverse ? 1 : -1;
            return function (a, b) {
                return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
            }
        }
        $scope.processFilters = function ($filter) {
            console.log('homeCtrl - processFilters');
            console.log('homeCtrl - eleccionFilter', $filter);
            console.log('homeCtrl - eleccionCheckBoxes', JSON.stringify($scope.elemes));

            if ($filter == 'filtro-fecha') {
                reorderactuacionesDeLasMascotasByDate();
            } else if ($filter == 'filtro-mascota') {
                reorderactuacionesDeLasMascotasByNameMascota();
            } else if ($filter == 'filtro-actuacion') {
                reorderactuacionesDeLasMascotasByNameActuacion();
            }
            
            for (element in $scope.elemes){
                var nombre=element.subId;
                var isVisible=element.selected;
                
                procesarVisibilidad(nombre, isVisible);
            }
            
           

        };

        $scope.$on('$ionicView.unloaded', function (viewInfo, state) {
            console.log('homeCtrl - $ionicView.unloaded', viewInfo, state);
        });

        function procesarVisibilidad(nombre, isVisible){
            for (actuacion in $scope.actuacionesDeLasMascotas){
                if (actuacion.namePet==nombre){
                    actuacion.isVisible=isVisible;
                }
            }
        }

        function getDataFromInternalPhoneMemory(key) {
            var retrievedObject = localStorage.getItem(key);
            return JSON.parse(retrievedObject);
        }
        function saveDataEndInInternalPhoneMemory(key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        }

        function getValuesFromMemory() {
            console.log('homeCtrl - getValuesFromMemory');
            if (getDataFromInternalPhoneMemory("mascotas") === null) {
                $scope.mascotas = [];
            } else {
                $scope.mascotas = getDataFromInternalPhoneMemory("mascotas");
            }

            if (getDataFromInternalPhoneMemory("actuacionesDeLasMascotas") === null) {
                $scope.mascotas = [];
            } else {
                $scope.actuacionesDeLasMascotas = getDataFromInternalPhoneMemory("actuacionesDeLasMascotas");
            }

            console.log('homeCtrl - mascotas length -', $scope.mascotas.length);
            console.log('homeCtrl - actuacionesDeLasMascotas length -', $scope.actuacionesDeLasMascotas.length);
        }

        function reorderactuacionesDeLasMascotasByNameActuacion() {
            console.log("CTRL - reorderactuacionesDeLasMascotasByNameActuacion - antes", JSON.stringify($scope.actuacionesDeLasMascotas));
            $scope.actuacionesDeLasMascotas.sort(sort_by('name', false, function (a) { return a.toUpperCase() }));
            console.log("CTRL - reorderactuacionesDeLasMascotasByNameActuacion - despues", JSON.stringify($scope.actuacionesDeLasMascotas));
        }
        function reorderactuacionesDeLasMascotasByDate() {
            console.log("CTRL - reorderactuacionesDeLasMascotasByDate - antes", JSON.stringify($scope.actuacionesDeLasMascotas));
            $scope.actuacionesDeLasMascotas.sort(sort_by('date', false, function (a) { return a }));
            console.log("CTRL - reorderactuacionesDeLasMascotasByDate - despues", JSON.stringify($scope.actuacionesDeLasMascotas));
        }
        function reorderactuacionesDeLasMascotasByNameMascota() {
            console.log("CTRL - reorderactuacionesDeLasMascotasByNameMascota - antes", JSON.stringify($scope.actuacionesDeLasMascotas));
            $scope.actuacionesDeLasMascotas.sort(sort_by('namePet', false, function (a) { return a }));
            console.log("CTRL - reorderactuacionesDeLasMascotasByNameMascota - despues", JSON.stringify($scope.actuacionesDeLasMascotas));
        }






        $ionicModal.fromTemplateUrl('templates/my-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.openModal = function () {
            $scope.modal.show();
        };

        $scope.closeModal = function () {
            $scope.modal.hide();
        };

        $scope.$on('$destroy', function () {
            $scope.modal.remove();
        });

        $scope.$on('modal.hidden', function () {
        });

        $scope.$on('modal.removed', function () {
        });

        $scope.toggleGroup = function (group) {
            if ($scope.isGroupShown(group)) {
                $scope.shownGroup = null;
            } else {
                $scope.shownGroup = group;
            }
        };
        $scope.isGroupShown = function (group) {
            return $scope.shownGroup === group;
        };
    })

    .controller('menuCtrl', function ($scope) {
    })
    .controller('detalleDeActuaciNCtrl', function ($scope) {
    })
    .controller('testCtrl', function ($scope) {
        console.log("entra");

        $scope.getPhoto = function () {
            console.log('Getting camera');
            $scope.lastPhoto = "init";
            navigator.camera.getPicture(onSuccess, onFail, {
                quality: 50,
                destinationType: Camera.DestinationType.FILE_URI
            });

            function onSuccess(imageURI) {
                $scope.lastPhoto = "onSuccess";
                $scope.lastPhoto = imageURI;
                alert('lastPhoto: ' + $scope.lastPhoto);
            }

            function onFail(message) {
                alert('Failed because: ' + message);
            }
        }

        $scope.getImage = function () {
            console.log('Getting image');
            $scope.lastPhoto = "init";
            navigator.camera.getPicture(onSuccess, onFail, {
                sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM,
                quality: 50,
                destinationType: Camera.DestinationType.FILE_URI
            });

            function onSuccess(imageURI) {
                $scope.lastPhoto = "onSuccessImage";
                $scope.lastPhoto = imageURI;
                alert('lastPhotoImage: ' + $scope.lastPhoto);
            }

            function onFail(message) {
                alert('Failed image because: ' + message);
            }
        }
    })
    .controller('aAdirActuaciNCtrl', function ($scope) {
        $scope.showConfirm = function () {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Consume Ice Cream',
                template: 'Are you sure you want to eat this ice cream?'
            });

            confirmPopup.then(function (res) {
                if (res) {
                    console.log('You are sure');
                } else {
                    console.log('You are not sure');
                }
            });
        };

        $scope.showAlert2 = function () {
            var alertPopup = $ionicPopup.alert({
                title: 'Don\'t eaccct that!',
                template: 'It might taste good'
            });

            alertPopup.then(function (res) {
                console.log('Thankss you for not eating my delicious ice cream cone');
            });
        };
    })

    ;
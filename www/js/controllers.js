angular.module('app.controllers', [])

    .controller('addMyPetsCtrl', function ($scope, $ionicPopup, $timeout) {

        $scope.$on('$ionicView.loaded', function (viewInfo, state) {

            $scope.mascotas = [];
            $scope.actuacionesDeLasMascotas = [];
            clearData();
            initValues();
            initValuesFromMemory();

            console.log('addMyPetsCtrl - $ionicView.loaded', viewInfo, state);
        });
        $scope.$on('$ionicView.unloaded', function (viewInfo, state) {
            console.log('addMyPetsCtrl - $ionicView.unloaded', viewInfo, state);
        });

        function initValuesFromMemory() {
            console.log('addMyPetsCtrl - getValuesFromMemory');

            console.log('addMyPetsCtrl - $scope.mascotas.length antes ', $scope.mascotas.length);
            if (localStorage.getItem("mascotas") !== null) {
                $scope.mascotas = getDataFromInternalPhoneMemory("mascotas");
            }
            console.log('addMyPetsCtrl - $scope.mascotas.length despues ', $scope.mascotas.length);

            console.log('addMyPetsCtrl - $scope.actuacionesDeLasMascotas.length qntes ', $scope.actuacionesDeLasMascotas.length);
            if (localStorage.getItem("actuacionesDeLasMascotas") !== null) {
                $scope.actuacionesDeLasMascotas = getDataFromInternalPhoneMemory("actuacionesDeLasMascotas");
            }
            console.log('addMyPetsCtrl - $scope.actuacionesDeLasMascotas.length despues ', $scope.actuacionesDeLasMascotas.length);

        }
        function IDGenerator() {

            this.length = 8;
            this.timestamp = +new Date;

            var _getRandomInt = function (min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            this.generate = function () {
                var ts = this.timestamp.toString();
                var parts = ts.split("").reverse();
                var id = "";

                for (var i = 0; i < this.length; ++i) {
                    var index = _getRandomInt(0, parts.length - 1);
                    id += parts[index];
                }

                return id;
            }


        }
        function initValues() {
            console.log('addMyPetsCtrl - initValues');
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
            console.log('addMyPetsCtrl - selectIfDefaultImage');
            if ($scope.imagestring == "img/perroIcon.jpg" || $scope.imagestring == "img/gatoIcon.jpg") {
                $scope.imagestring = "img/perroIcon.jpg";
                if ($scope.interfaz.typePet == 'Gato') {
                    $scope.imagestring = "img/gatoIcon.jpg";
                }
            }
        }
        function camposIntroducidosOk() {
            console.log('addMyPetsCtrl - camposIntroducidosOk');

            $scope.pet.name = $scope.interfaz.namePet;
            $scope.pet.date = $scope.interfaz.datePet;
            $scope.pet.type = $scope.interfaz.typePet;
            $scope.pet.id = IDGenerator();

            console.log('addMyPetsCtrl - camposIntroducidosOk - $scope.pet.id=', $scope.pet.id);
            console.log('addMyPetsCtrl - camposIntroducidosOk - $scope.pet.name=', $scope.pet.name);
            console.log('addMyPetsCtrl - camposIntroducidosOk - $scope.pet.date=', $scope.pet.date);
            console.log('addMyPetsCtrl - camposIntroducidosOk - $scope.pet.type=', $scope.pet.type);

            if ($scope.pet.name != undefined && $scope.pet.name != '' && $scope.pet.name != 'nombre') {
                if ($scope.pet.type != undefined && $scope.pet.type != '') {
                    if ($scope.pet.date != undefined && $scope.pet.date != '') {
                        console.log('addMyPetsCtrl - addPetInSystem-return true');
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

        function savePetInSystem() {
            console.log('addMyPetsCtrl - savePetInSystem');
            console.log('addMyPetsCtrl - savePetInSystem', $scope.mascotas);
            $scope.mascotas.push($scope.pet);
            saveDataInInternalPhoneMemory("mascotas", $scope.mascotas);
            return true;

        };

        function createActuacionesDeMascota() {
            //creo las actuaciones depende de si es perro o gatoIcon
            console.log("addMyPetsCtrl - createActuacionesDeMascota");

            $scope.act = {};

            if ($scope.pet.type = 'perro') {
                //10 de enero: desparasitación interna
                $scope.act.id = IDGenerator(); $scope.act.name = 'desparasitación interna'; $scope.act.date = new Date('2016-01-10T09:00:00'); $scope.act.idPet = $scope.pet.id; $scope.act.namePet = $scope.pet.name; $scope.act.datePet = $scope.pet.date; $scope.act.typePet = $scope.pet.type; $scope.act.isVisible = true;
                console.log("addMyPetsCtrl - createActuacionesDeMascota - perro", JSON.stringify($scope.act));
                $scope.actuacionesDeLasMascotas.push($scope.act);
                $scope.act = {};
                //01 de abril: ANALÍTICA DE FILARIA*
                $scope.act.id = IDGenerator(); $scope.act.name = 'ANALÍTICA DE FILARIA*'; $scope.act.date = new Date('2016-04-01T09:00:00'); $scope.act.idPet = $scope.pet.id; $scope.act.namePet = $scope.pet.name; $scope.act.datePet = $scope.pet.date; $scope.act.typePet = $scope.pet.type; $scope.act.isVisible = true;
                console.log("addMyPetsCtrl - createActuacionesDeMascota - perro", JSON.stringify($scope.act));
                $scope.actuacionesDeLasMascotas.push($scope.act);
                $scope.act = {};
                //10 de abril: desparasitación interna
                $scope.act.id = IDGenerator(); $scope.act.name = 'desparasitación interna'; $scope.act.date = new Date('2016-04-10T09:00:00'); $scope.act.idPet = $scope.pet.id; $scope.act.namePet = $scope.pet.name; $scope.act.datePet = $scope.pet.date; $scope.act.typePet = $scope.pet.type; $scope.act.isVisible = true;
                console.log("addMyPetsCtrl - createActuacionesDeMascota - perro", JSON.stringify($scope.act));
                $scope.actuacionesDeLasMascotas.push($scope.act);
                $scope.act = {};
                //15 de abril: prevención Filaria en pastilla
                $scope.act.id = IDGenerator(); $scope.act.name = 'prevención Filaria en pastilla'; $scope.act.date = new Date('2016-04-15T09:00:00'); $scope.act.idPet = $scope.pet.id; $scope.act.namePet = $scope.pet.name; $scope.act.datePet = $scope.pet.date; $scope.act.typePet = $scope.pet.type; $scope.act.isVisible = true;
                console.log("addMyPetsCtrl - createActuacionesDeMascota - perro", JSON.stringify($scope.act));
                $scope.actuacionesDeLasMascotas.push($scope.act);
                $scope.act = {};
                //15 de abril: PONER COLLAR PREVENCIÓN LEISHMANIA
                $scope.act.id = IDGenerator(); $scope.act.name = 'PONER COLLAR PREVENCIÓN LEISHMANIA'; $scope.act.date = new Date('2016-04-15T09:00:00'); $scope.act.idPet = $scope.pet.id; $scope.act.namePet = $scope.pet.name; $scope.act.datePet = $scope.pet.date; $scope.act.typePet = $scope.pet.type; $scope.act.isVisible = true;
                console.log("addMyPetsCtrl - createActuacionesDeMascota - perro", JSON.stringify($scope.act));
                $scope.actuacionesDeLasMascotas.push($scope.act);
                $scope.act = {};
                //1 de mayo: PREVENCIÓN ANUAL FILARIA GUARDIAN**
                $scope.act.id = IDGenerator(); $scope.act.name = 'PREVENCIÓN ANUAL FILARIA GUARDIAN**'; $scope.act.date = new Date('2016-05-01T09:00:00'); $scope.act.idPet = $scope.pet.id; $scope.act.namePet = $scope.pet.name; $scope.act.datePet = $scope.pet.date; $scope.act.typePet = $scope.pet.type; $scope.act.isVisible = true;
                console.log("addMyPetsCtrl - createActuacionesDeMascota - perro", JSON.stringify($scope.act));
                $scope.actuacionesDeLasMascotas.push($scope.act);
                $scope.act = {};
                //1 a 29 de mayo: LEISGUARD PREVENCIÓN LEISHMANIA
                $scope.act.id = IDGenerator(); $scope.act.name = 'LEISGUARD PREVENCIÓN LEISHMANIA'; $scope.act.date = new Date('2016-05-15T09:00:00'); $scope.act.idPet = $scope.pet.id; $scope.act.namePet = $scope.pet.name; $scope.act.datePet = $scope.pet.date; $scope.act.typePet = $scope.pet.type; $scope.act.isVisible = true;
                console.log("addMyPetsCtrl - createActuacionesDeMascota - perro", JSON.stringify($scope.act));
                $scope.actuacionesDeLasMascotas.push($scope.act);
                $scope.act = {};
                //15 de mayo: prevención Filaria en pastilla
                $scope.act.id = IDGenerator(); $scope.act.name = 'prevención Filaria en pastilla'; $scope.act.date = new Date('2016-05-15T09:00:00'); $scope.act.idPet = $scope.pet.id; $scope.act.namePet = $scope.pet.name; $scope.act.datePet = $scope.pet.date; $scope.act.typePet = $scope.pet.type; $scope.act.isVisible = true;
                console.log("addMyPetsCtrl - createActuacionesDeMascota - perro", JSON.stringify($scope.act));
                $scope.actuacionesDeLasMascotas.push($scope.act);
                $scope.act = {};
                //15 de junio: prevención Filaria en pastilla
                $scope.act.id = IDGenerator(); $scope.act.name = 'prevención Filaria en pastilla'; $scope.act.date = new Date('2016-06-15T09:00:00'); $scope.act.idPet = $scope.pet.id; $scope.act.namePet = $scope.pet.name; $scope.act.datePet = $scope.pet.date; $scope.act.typePet = $scope.pet.type; $scope.act.isVisible = true;
                console.log("addMyPetsCtrl - createActuacionesDeMascota - perro", JSON.stringify($scope.act));
                $scope.actuacionesDeLasMascotas.push($scope.act);
                $scope.act = {};
                //1 a 29 de julio: LEISGUARD PREVENCIÓN LEISHMANIA
                $scope.act.id = IDGenerator(); $scope.act.name = 'LEISGUARD PREVENCIÓN LEISHMANIA'; $scope.act.date = new Date('2016-07-10T09:00:00'); $scope.act.idPet = $scope.pet.id; $scope.act.namePet = $scope.pet.name; $scope.act.datePet = $scope.pet.date; $scope.act.typePet = $scope.pet.type; $scope.act.isVisible = true;
                console.log("addMyPetsCtrl - createActuacionesDeMascota - perro", JSON.stringify($scope.act));
                $scope.actuacionesDeLasMascotas.push($scope.act);
                $scope.act = {};
                //10 de julio: desparasitación interna
                $scope.act.id = IDGenerator(); $scope.act.name = 'desparasitación interna'; $scope.act.date = new Date('2016-07-10T09:00:00'); $scope.act.idPet = $scope.pet.id; $scope.act.namePet = $scope.pet.name; $scope.act.datePet = $scope.pet.date; $scope.act.typePet = $scope.pet.type; $scope.act.isVisible = true;
                console.log("addMyPetsCtrl - createActuacionesDeMascota - perro", JSON.stringify($scope.act));
                $scope.actuacionesDeLasMascotas.push($scope.act);
                $scope.act = {};
                //15 de julio: prevención Filaria en pastilla
                $scope.act.id = IDGenerator(); $scope.act.name = 'prevención Filaria en pastilla'; $scope.act.date = new Date('2016-07-15T09:00:00'); $scope.act.idPet = $scope.pet.id; $scope.act.namePet = $scope.pet.name; $scope.act.datePet = $scope.pet.date; $scope.act.typePet = $scope.pet.type; $scope.act.isVisible = true;
                console.log("addMyPetsCtrl - createActuacionesDeMascota - perro", JSON.stringify($scope.act));
                $scope.actuacionesDeLasMascotas.push($scope.act);
                $scope.act = {};
                //15 de agosto: prevención Filaria en pastilla
                $scope.act.id = IDGenerator(); $scope.act.name = 'prevención Filaria en pastilla'; $scope.act.date = new Date('2016-08-15T09:00:00'); $scope.act.idPet = $scope.pet.id; $scope.act.namePet = $scope.pet.name; $scope.act.datePet = $scope.pet.date; $scope.act.typePet = $scope.pet.type; $scope.act.isVisible = true;
                console.log("addMyPetsCtrl - createActuacionesDeMascota - perro", JSON.stringify($scope.act));
                $scope.actuacionesDeLasMascotas.push($scope.act);
                $scope.act = {};
                //1 a 29 de septiembre: LEISGUARD PREVENCIÓN LEISHMANIA
                $scope.act.id = IDGenerator(); $scope.act.name = 'LEISGUARD PREVENCIÓN LEISHMANIA'; $scope.act.date = new Date('2016-09-15T09:00:00'); $scope.act.idPet = $scope.pet.id; $scope.act.namePet = $scope.pet.name; $scope.act.datePet = $scope.pet.date; $scope.act.typePet = $scope.pet.type; $scope.act.isVisible = true;
                console.log("addMyPetsCtrl - createActuacionesDeMascota - perro", JSON.stringify($scope.act));
                $scope.actuacionesDeLasMascotas.push($scope.act);
                $scope.act = {};
                //15 de septiembre: prevención Filaria en pastilla
                $scope.act.id = IDGenerator(); $scope.act.name = 'prevención Filaria en pastilla'; $scope.act.date = new Date('2016-09-15T09:00:00'); $scope.act.idPet = $scope.pet.id; $scope.act.namePet = $scope.pet.name; $scope.act.datePet = $scope.pet.date; $scope.act.typePet = $scope.pet.type; $scope.act.isVisible = true;
                console.log("addMyPetsCtrl - createActuacionesDeMascota - perro", JSON.stringify($scope.act));
                $scope.actuacionesDeLasMascotas.push($scope.act);
                $scope.act = {};
                //10 de octubre: desparasitación interna
                $scope.act.id = IDGenerator(); $scope.act.name = 'desparasitación interna'; $scope.act.date = new Date('2016-10-10T09:00:00'); $scope.act.idPet = $scope.pet.id; $scope.act.namePet = $scope.pet.name; $scope.act.datePet = $scope.pet.date; $scope.act.typePet = $scope.pet.type; $scope.act.isVisible = true;
                console.log("addMyPetsCtrl - createActuacionesDeMascota - perro", JSON.stringify($scope.act));
                $scope.actuacionesDeLasMascotas.push($scope.act);
                $scope.act = {};
                //10 de diciembre: ANALÍTICA DE LEISHMANIA*
                $scope.act.id = IDGenerator(); $scope.act.name = 'ANALÍTICA DE LEISHMANIA'; $scope.act.date = new Date('2016-12-10T09:00:00'); $scope.act.idPet = $scope.pet.id; $scope.act.namePet = $scope.pet.name; $scope.act.datePet = $scope.pet.date; $scope.act.typePet = $scope.pet.type; $scope.act.isVisible = true;
                console.log("addMyPetsCtrl - createActuacionesDeMascota - perro", JSON.stringify($scope.act));
                $scope.actuacionesDeLasMascotas.push($scope.act);
                $scope.act = {};
            } else if ($scope.pet.type = 'gato') {

            }

            console.log("addMyPetsCtrl - createActuacionesDeMascota - actuaciones - ok");
            return true;
        }

        function saveActuacionesDeMascota() {
            console.log('addMyPetsCtrl - saveActuacionesDeMascota');
            saveDataInInternalPhoneMemory("actuacionesDeLasMascotas", $scope.actuacionesDeLasMascotas);
            initValuesFromMemory()
            return true;
        };

        function saveDataInInternalPhoneMemory(key, value) {
            console.log('addMyPetsCtrl -saveDataInInternalPhoneMemory');
            var antes = [];
            var despues = [];
            if (getDataFromInternalPhoneMemory(key) !== null) {
                antes = getDataFromInternalPhoneMemory(key);
            }
            saveDataEndInInternalPhoneMemory(key, value);
            if (getDataFromInternalPhoneMemory(key) !== null) {
                despues = getDataFromInternalPhoneMemory(key);
            }
            console.log('addMyPetsCtrl -saveDataInInternalPhoneMemory- antes ', antes.length);
            console.log('addMyPetsCtrl -saveDataInInternalPhoneMemory- despues ', despues.length);
        }

        function getDataFromInternalPhoneMemory(key) {
            var retrievedObject = localStorage.getItem(key);
            return JSON.parse(retrievedObject);
        }
        function saveDataEndInInternalPhoneMemory(key, value) {
            console.log('addMyPetsCtrl - saveDataEndInInternalPhoneMemory...');
            localStorage.setItem(key, JSON.stringify(value));
            console.log('addMyPetsCtrl - saveDataEndInInternalPhoneMemory ok --', JSON.stringify(value));
        }
        function clearData() {
            console.log('addMyPetsCtrl - clearData...');

            localStorage.clear();
        }

        $scope.addPet = function () {
            console.log('addMyPetsCtrl - addPet');
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
            console.log('addMyPetsCtrl - launchPhotoAlbum');
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
            console.log('addMyPetsCtrl - onPhotoURISuccess');
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
            console.log('addMyPetsCtrl - showPopupAddName');
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
            console.log('addMyPetsCtrl - showPopupAddDate');
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
            console.log('addMyPetsCtrl - showPopupAddType');
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

    .controller('homeCtrl', function ($scope, $ionicModal, $ionicFilterBar, $filter) {
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
        function IDGenerator() {

            this.length = 8;
            this.timestamp = +new Date;

            var _getRandomInt = function (min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            this.generate = function () {
                var ts = this.timestamp.toString();
                var parts = ts.split("").reverse();
                var id = "";

                for (var i = 0; i < this.length; ++i) {
                    var index = _getRandomInt(0, parts.length - 1);
                    id += parts[index];
                }

                return id;
            }


        }
        var sort_by = function (field, reverse, primer) {
            try {
                var key = primer ?
                    function (x) { return primer(x[field]) } :
                    function (x) { return x[field] };
                reverse = !reverse ? 1 : -1;
                return function (a, b) {
                    return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
                }
            } catch (err) {

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
            console.log('homeCtrl - holaaaaaaaaaa');
            testFilter();
        };


        function testFilter(filterText) {
            console.log("homeCtrl - testFilter ", filterText);
            var i = 0;
            var size = $scope.actuacionesDeLasMascotas.length;
            console.log("homeCtrl - actuaciones tamaño  ", size);

            console.log("homeCtrl - testFilter ", JSON.stringify($scope.actuacionesDeLasMascotas));

            for (i; i < $scope.actuacionesDeLasMascotas.length; i++) {
                //1 chequeo si es visible o no.
                var k = 0;
                for (k; k < $scope.elemes.length; k++) {
                    if ($scope.actuacionesDeLasMascotas[i] != undefined) {
                        if ($scope.actuacionesDeLasMascotas[i].namePet == $scope.elemes[k].subId) {
                            //establezco si es visible o no
                            $scope.actuacionesDeLasMascotas[i].isVisible = $scope.elemes[k].selected;
                            //ahora, si no es visible, me da igual. Pero si lo es, hay que ver si entra dentro del filtro.

                            //si es visible
                            if ($scope.elemes[k].selected) {
                                if (filterText == undefined | '') {
                                    $scope.actuacionesDeLasMascotas[i].isVisible = true;
                                } else if ((($scope.actuacionesDeLasMascotas[i].namePet)).indexOf(filterText) != -1) {
                                    //es visible y hay filtro
                                    $scope.actuacionesDeLasMascotas[i].isVisible = true;
                                } else if ((($scope.actuacionesDeLasMascotas[i].name)).indexOf(filterText) != -1) {
                                    //es visible y hay filtro
                                    $scope.actuacionesDeLasMascotas[i].isVisible = true;
                                } else {
                                    //ya es visible pero no coincide con filtro. la oculto
                                    $scope.actuacionesDeLasMascotas[i].isVisible = false;
                                }
                            }
                        }
                    } else {
                        console.log("homeCtrl - testFilter WTF");

                    }
                }
            }
        }

$scope.$on("$ionicView.enter", function (viewInfo, state) {
   // handle event
    console.log('homeCtrl - $ionicView.unloaded', viewInfo, state);
    getValuesFromMemory();
});
$scope.$on("$ionicView.leave", function (viewInfo, state) {
   // handle event
    console.log('homeCtrl - $ionicView.leave', viewInfo, state);
});
$scope.$on("$ionicView.beforeEnter", function (viewInfo, state) {
   // handle event
    console.log('homeCtrl - $ionicView.beforeEnter', viewInfo, state);
    getValuesFromMemory();
});
$scope.$on("$ionicView.beforeLeave", function (viewInfo, state) {
   // handle event
    console.log('homeCtrl - $ionicView.beforeLeave', viewInfo, state);
});
$scope.$on("$ionicView.afterEnter", function (viewInfo, state) {
   // handle event
    console.log('homeCtrl - $ionicView.afterEnter', viewInfo, state);
});
$scope.$on("$ionicView.afterLeave", function (viewInfo, state) {
   // handle event
    console.log('homeCtrl - $ionicView.afterLeave', viewInfo, state);
});
$scope.$on('$ionicView.unloaded', function (viewInfo, state) {
    console.log('homeCtrl - $ionicView.unloaded', viewInfo, state);
});







        function getDataFromInternalPhoneMemory(key) {
            var retrievedObject = localStorage.getItem(key);
            return JSON.parse(retrievedObject);
        }
        function saveDataEndInInternalPhoneMemory(key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        }
        function clearData() {
            localStorage.clearAll();
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
            // console.log("homeCtrl - reorderactuacionesDeLasMascotasByNameActuacion - antes", JSON.stringify($scope.actuacionesDeLasMascotas));
            $scope.actuacionesDeLasMascotas.sort(sort_by('name', false, function (a) { return a.toUpperCase() }));
            // console.log("homeCtrl - reorderactuacionesDeLasMascotasByNameActuacion - despues", JSON.stringify($scope.actuacionesDeLasMascotas));
        }
        function reorderactuacionesDeLasMascotasByDate() {
            // console.log("homeCtrl - reorderactuacionesDeLasMascotasByDate - antes", JSON.stringify($scope.actuacionesDeLasMascotas));
            $scope.actuacionesDeLasMascotas.sort(sort_by('date', false, function (a) { return a }));
            // console.log("homeCtrl - reorderactuacionesDeLasMascotasByDate - despues", JSON.stringify($scope.actuacionesDeLasMascotas));
        }
        function reorderactuacionesDeLasMascotasByNameMascota() {
            console.log("homeCtrl - reorderactuacionesDeLasMascotasByNameMascota - antes", JSON.stringify($scope.actuacionesDeLasMascotas));
            $scope.actuacionesDeLasMascotas.sort(sort_by('namePet', false, function (a) { return a }));
            console.log("homeCtrl - reorderactuacionesDeLasMascotasByNameMascota - despues", JSON.stringify($scope.actuacionesDeLasMascotas));
        }


        var filterBarInstance;

        function getItems() {
            $scope.items = $scope.actuacionesDeLasMascotas;
        }

        getItems();

        actuacionesDeLasMascotasFiltradas = [];

        $scope.showFilterBar = function ($filter) {
            filterBarInstance = $ionicFilterBar.show({
                items: $scope.items,
                update: function (filteredItems, filterText) {
                    $scope.items = filteredItems;
                    if (filterText) {
                        console.log("homeCtrl - filtrar por ", filterText);
                        testFilter(filterText);
                    }
                },
                cancel: function (filteredItems) {
                    console.log("homeCtrl - sin filtro ");
                    testFilter();
                }
            });
        };



        $scope.refreshItems = function () {
            if (filterBarInstance) {
                filterBarInstance();
                filterBarInstance = null;
            }

            $timeout(function () {
                getItems();
                $scope.$broadcast('scroll.refreshComplete');
            }, 1000);
        };


        $ionicModal.fromTemplateUrl('templates/my-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.openModal = function () {
            console.log("homeCtrl - openModalopenModalopenModalopenModalopenModal ");
            $scope.item = {};
            $scope.choice = '';
            $scope.item.checked = '';
            $scope.modal.show();
        };

        $scope.closeModal = function () {
            console.log("homeCtrl - closeModalcloseModalcloseModalcloseModalcloseModal ");
            $scope.modal.hide();
        };

        $scope.$on('$destroy', function () {
            console.log("homeCtrl - destroydestroydestroydestroy ");
            $scope.modal.remove();
        });

        $scope.$on('modal.hidden', function () {
            console.log("homeCtrl - hiddenhiddenhiddenhidden ");
        });

        $scope.$on('modal.removed', function () {
            console.log("homeCtrl - removedremovedremovedremovedremoved ");
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
    .controller('treatmentDetailCtrl', function ($scope) {
    })

    .controller('addTreatmentCtrl', function ($scope, $ionicPopup, $timeout) {
        $scope.$on('$ionicView.loaded', function (viewInfo, state) {
            console.log('addTreatmentCtrl - $ionicView.loaded', viewInfo, state);

            initValues();
            initValuesFromMemory()

            $scope.mascotasToShow = [];
            var i = 0;
            for (mascota in $scope.mascotas) {
                $scope.mascotasToShow.push(
                    {
                        subId: JSON.stringify($scope.mascotas[i].name).replace(/\"/g, ""),
                        id: i,
                        selected: true
                    }
                );
                i++;
            }


        });
        function initValuesFromMemory() {
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

            console.log('addTreatmentCtrl - mascotas length -', $scope.mascotas.length);
            console.log('addTreatmentCtrl - actuacionesDeLasMascotas length -', $scope.actuacionesDeLasMascotas.length);

        }
        function getDataFromInternalPhoneMemory(key) {
            var retrievedObject = localStorage.getItem(key);
            return JSON.parse(retrievedObject);
        }
        function saveDataEndInInternalPhoneMemory(key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        }
        function saveDataInInternalPhoneMemory(key, value) {
            console.log('addTreatmentCtrl -saveDataInInternalPhoneMemory');
            var antes = [];
            var despues = [];
            if (getDataFromInternalPhoneMemory(key) !== null) {
                antes = getDataFromInternalPhoneMemory(key);
            }
            saveDataEndInInternalPhoneMemory(key, value);
            if (getDataFromInternalPhoneMemory(key) !== null) {
                despues = getDataFromInternalPhoneMemory(key);
            }
            console.log('addTreatmentCtrl -saveDataInInternalPhoneMemory- antes ', antes.length);
            console.log('addTreatmentCtrl -saveDataInInternalPhoneMemory- despues ', despues.length);
        }

        $scope.addActuacion = function () {
            console.log('addMyPetsCtrl - addPet');
            if ((camposIntroducidosOk()) && (saveActuacionInSystem())) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Añadir actuacion',
                    template: 'Actuacion añadida correctamente'
                });
                alertPopup.then(function (res) {
                    initValues();
                    initValuesFromMemory()
                });
            }
        };
        function initValues() {
            console.log('addTreatmentCtrl - initValues');

            $scope.mascotas = [];
            $scope.actuacionesDeLasMascotas = [];

            $scope.interfaz = {};
            $scope.interfaz.nameAct = '';
            $scope.interfaz.dateAct = new Date;
            $scope.interfaz.petName = '';
            $scope.interfaz.alarmName = 'Nunca';

            $scope.alarmas = [
                { "name": "Nunca", "id": "0" },
                { "name": "12 horas antes", "id": "1" },
                { "name": "1 día antes", "id": "2" },
                { "name": "2 días antes", "id": "3" }];

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
            $scope.act.isVisible = true;
        }

        $scope.showPopupAddNameAct = function () {
            console.log('addTreatmentCtrl - showPopupAddName');
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
                console.log('Tapped!', res);
            });

            $timeout(function () {
                myPopup.close();
            }, 30000);
        };

        $scope.showPopupAddDateAct = function () {
            console.log('addTreatmentCtrl - showPopupAddDate');
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
                console.log('Tapped!', res);
            });

            $timeout(function () {
                myPopup.close();
            }, 30000);
        };


        $scope.showPopupAddMultiplePet = function () {
            console.log('addTreatmentCtrl - showPopupAddMultiplePet');

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
                            /*
                            if (!$scope.interfaz.namePet) {
                                e.preventDefault();
                            } else {
                                return $scope.interfaz.namePet;
                            }
                            */
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

        $scope.showPopupAddAlarm = function () {
            console.log('addTreatmentCtrl - showPopupAddAlarm');
            var myPopup = $ionicPopup.show({
                template: '<ion-list>                                ' +
                '  <ion-radio ng-repeat="alarm in alarmas" ng-model="interfaz.alarmName" ng-value="alarm.name">{{alarm.name}} ' +
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
                console.log('Tapped!', res);
            });

            $timeout(function () {
                myPopup.close();
            }, 30000);
        };

        function saveActuacionInSystem() {
            console.log('addTreatmentCtrl - saveActuacionInSystem');
            //guardar una actuacion por cada macota seleccionada
            var k = 0;
            for (k; k < $scope.mascotasToShow.length; k++) {
                if ($scope.mascotasToShow[k].selected) {
                    someSelected = true;
                    var pet = findPetbyName($scope.mascotasToShow[k].subId);
                    $scope.act.id = IDGenerator();
                    $scope.act.idPet = pet.id;
                    $scope.act.datePet = pet.date;
                    $scope.act.typePet = pet.type;
                    $scope.act.namePet = pet.name;
                    console.log('addTreatmentCtrl - saveActuacionInSystem - add in vector ', JSON.stringify($scope.act));
                    $scope.actuacionesDeLasMascotas.push($scope.act);
                }
            }


            saveDataInInternalPhoneMemory("actuacionesDeLasMascotas", $scope.actuacionesDeLasMascotas);

            return true;
        };
        function IDGenerator() {
            //console.log('addTreatmentCtrl - IDGenerator -  ');
            this.length = 8;
            this.timestamp = +new Date;

            var _getRandomInt = function (min, max) {
                //console.log('addTreatmentCtrl - IDGenerator -  _getRandomInt');
                return Math.floor(Math.random() * (max - min + 1)) + min;

            }

            //console.log('addTreatmentCtrl - IDGenerator -  function');
            var ts = this.timestamp.toString();
            var parts = ts.split("").reverse();
            var id = "";

            for (var i = 0; i < this.length; ++i) {
                var index = _getRandomInt(0, parts.length - 1);
                id += parts[index];
            }
            console.log('addTreatmentCtrl - IDGenerator - return id ', id);

            return id;



        }
        function findPetbyName(name) {
            var i = 0;
            for (i; i < $scope.mascotas.length; i++) {
                if ($scope.mascotas[i].name == name) {
                    return $scope.mascotas[i];
                }
            }
            return false;
        }

        function findAlarmbyName(name) {
            var i = 0;
            for (i; i < $scope.alarmas.length; i++) {
                if ($scope.alarmas[i].name == name) {
                    return $scope.alarmas[i];
                }
            }
            return false;
        }

        function camposIntroducidosOk() {

            console.log('addTreatmentCtrl - camposIntroducidosOk');

            $scope.act.name = $scope.interfaz.nameAct;
            $scope.act.date = $scope.interfaz.dateAct;
            $scope.act.nameAlarm = $scope.interfaz.alarmName;

            console.log('addTreatmentCtrl - camposIntroducidosOk - $scope.act.name=', $scope.act.name);
            console.log('addTreatmentCtrl - camposIntroducidosOk - $scope.act.date=', $scope.act.date);
            console.log('addTreatmentCtrl - camposIntroducidosOk - $scope.act.nameAlarm=', $scope.act.nameAlarm);

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
                            var alarm = findAlarmbyName($scope.act.nameAlarm);
                            if (alarm) {
                                $scope.act.alarmId = alarm.id;
                                return true;
                            } else {
                                console.log('addTreatmentCtrl - camposIntroducidosOk-Fallo por findAlarmbyName');
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
    ;
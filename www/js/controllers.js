/*
HOME: 

evento onview en cada ventana y así, 
        para cada una, reload the memory
        para home order inicial
        para home filtro inicial si se ha seleccionado
        
que la busqueda se la pele si son mayusculas o minusculaa
Navegabilidad?
     
Fotos/imagenes
	Añadir mascotas
	Añadir actuacion
	Modificar actuación
	Listado home
	Listado mascotas
	
Test añadirActuacion
Test movil

Asignar alarmas	
Investigar calendario
Estadisticas
Sistema de errores

Fase de pruebas con stephan
*/

angular.module('app.controllers', [])

    .controller('addMyPetsCtrl', function ($scope, $ionicPopup, $timeout, BlankService, $window, $state) {

        $scope.$on('$ionicView.afterEnter', function () {
            console.log("$ionicView.afterEnter");

            if (BlankService.reloadHome) {
                console.log("$ionicView.afterEnter - reload");
                $state.go($state.current, {}, { reload: true });
                BlankService.reloadHome = false;
            }

        });

        $scope.$on('$ionicView.loaded', function () {
            console.log("$ionicView.loaded");
            BlankService.reloadHome = true;
            BlankService.initValuesFromMemory();
        });

        $scope.$on('$ionicView.loaded', function (viewInfo, state) {
            initValues();
            BlankService.initValuesFromMemory();
        });

        $scope.$on('$ionicView.beforeLeave', function () {
            console.log("addMyPetsCtrl--$ionicView.beforeLeave");
            BlankService.initValuesFromMemory();
        });
        $scope.$on('$ionicView.leave', function () {
            console.log("addMyPetsCtrl--$ionicView.leave");
            BlankService.initValuesFromMemory();

        });
        BlankService.initValuesFromMemory();
        function initValues() {
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

            $scope.interfaz.ocultarFinish = false;

            if (BlankService.mascotas.length == 0) {
                $scope.interfaz.ocultarFinish = true;
            }

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
            if ($scope.imagestring == "img/perroIcon.jpg" || $scope.imagestring == "img/gatoIcon.jpg") {
                $scope.imagestring = "img/perroIcon.jpg";
                if ($scope.interfaz.typePet == 'Gato') {
                    $scope.imagestring = "img/gatoIcon.jpg";
                }
            }
        }
        function camposIntroducidosOk() {
            $scope.pet.name = $scope.interfaz.namePet;
            $scope.pet.date = $scope.interfaz.datePet;
            $scope.pet.type = $scope.interfaz.typePet;
            $scope.pet.id = BlankService.IDGenerator();

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

        function createActuacion(nombre, fecha) {
            $scope.act = {};
            $scope.act.id = BlankService.IDGenerator();
            $scope.act.name = nombre;
            $scope.act.date = fecha;
            $scope.act.idPet = $scope.pet.id;
            $scope.act.namePet = $scope.pet.name;
            $scope.act.datePet = $scope.pet.date;
            $scope.act.typePet = $scope.pet.type;
            $scope.act.isVisible = true;
            $scope.act.nameAlarm = "Nunca";
            $scope.act.alarmId = "0";
            return $scope.act;
        }

        function createActuacionesDeMascota() {
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
                //console.log("addMyPetsCtrl - createActuacionesDeMascota - perro", JSON.stringify($scope.newact));
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
            BlankService.initValuesFromMemory();
            $state.go('menu.home');
        };

        $scope.addPet = function () {
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

        $scope.showPopupAddName = function () {
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

    .controller('homeCtrl', function ($scope, $ionicModal, $ionicFilterBar, $filter, BlankService, $state, $window) {
        $scope.service = BlankService;

        // BlankService.clearData();

        $scope.$on('$ionicView.afterEnter', function () {
            console.log("$ionicView.afterEnter");
            if (BlankService.reloadHome) {
                console.log("$ionicView.afterEnter - reload");
                $state.go($state.current, {}, { reload: true });
                BlankService.reloadHome = false;
            }
        });

        $scope.$on('$ionicView.loaded', function () {
            console.log("$ionicView.loaded");
            BlankService.reloadHome = true;
            BlankService.initValuesFromMemory();
        });

        $scope.$on('$ionicView.beforeEnter', function () {
            console.log("$ionicView.beforeEnter");

            BlankService.initValuesFromMemory();
        });
        $scope.$on('$ionicView.enter', function () {
            console.log("$ionicView.enter");
            BlankService.initValuesFromMemory();
        });

        BlankService.initValuesFromMemory();

        mascotas = [];
        var retrievedObject = localStorage.getItem("mascotas");
        mascotas = JSON.parse(retrievedObject);

        if ((mascotas == undefined) || (mascotas.length == 0)) {
            $state.go('menu.addMyPets');
        }

        $scope.$on('$ionicView.loaded', function (viewInfo, state) {

            BlankService.initValuesFromMemory();

            $scope.choice = '';
            $scope.elemes = [];
            var i = 0;
            var name = '';
            for (mascota in BlankService.mascotas) {
                $scope.elemes.push(
                    {
                        subName: 'SubGrup1',
                        subId: JSON.stringify(BlankService.mascotas[i].name).replace(/\"/g, ""),
                        id: i,
                        selected: true
                    });
                i++;
            }

            $scope.groups = [];
            $scope.groups.push({ name: 'Mostrar', id: 1, items: $scope.elemes });

        });

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

        $scope.redirectToaddTreatment = function () {
            $state.go('menu.addTreatment');
        };

        $scope.redirectToaddPet = function () {
            $state.go('menu.addMyPets');
        };

        $scope.borrarActuacion = function ($item) {
            BlankService.initValuesFromMemory();

            var i = 0;
            var indexToDelete = -1;
            for (i; i < BlankService.actuacionesDeLasMascotas.length; i++) {
                if (BlankService.actuacionesDeLasMascotas[i].id = $item.id) {
                    indexToDelete = i;
                    break;
                }
            }
            BlankService.actuacionesDeLasMascotas.splice(indexToDelete, 1);
            BlankService.saveDataInInternalPhoneMemory("actuacionesDeLasMascotas", BlankService.actuacionesDeLasMascotas);
        };

        $scope.processFilters = function () {
            BlankService.initValuesFromMemory();
            processOrder();

            testFilter();
        };

        function processOrder() {
            if (BlankService.orders[0].selected == true) {
                reorderactuacionesDeLasMascotasByDate();
            } else if (BlankService.orders[1].selected == true) {
                reorderactuacionesDeLasMascotasByNameMascota();
            } else if (BlankService.orders[2].selected == true) {
                reorderactuacionesDeLasMascotasByNameActuacion();
            }
        }

        function testFilter(filterText) {
            var i = 0;
            var size = BlankService.actuacionesDeLasMascotas.length;

            for (i; i < BlankService.actuacionesDeLasMascotas.length; i++) {
                //1 chequeo si es visible o no.
                var k = 0;
                for (k; k < $scope.elemes.length; k++) {
                    if (BlankService.actuacionesDeLasMascotas[i] != undefined) {
                        if (BlankService.actuacionesDeLasMascotas[i].namePet == $scope.elemes[k].subId) {
                            //establezco si es visible o no
                            BlankService.actuacionesDeLasMascotas[i].isVisible = $scope.elemes[k].selected;
                            //ahora, si no es visible, me da igual. Pero si lo es, hay que ver si entra dentro del filtro.

                            //si es visible
                            if ($scope.elemes[k].selected) {
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
                    } else {
                    }
                }
            }
        }

        function reorderactuacionesDeLasMascotasByNameActuacion() {
            BlankService.actuacionesDeLasMascotas.sort(sort_by('name', false, function (a) { return a }));
            console.log("reorderactuacionesDeLasMascotasByNameActuacion - reload");
            $state.go($state.current, {}, { reload: true });
            BlankService.reloadHome = false;
        }
        function reorderactuacionesDeLasMascotasByDate() {
            BlankService.actuacionesDeLasMascotas.sort(sort_by('date', false, function (a) { return a }));
            console.log("reorderactuacionesDeLasMascotasByNameActuacion - reload");
            $state.go($state.current, {}, { reload: true });
            BlankService.reloadHome = false;
        }
        function reorderactuacionesDeLasMascotasByNameMascota() {
            BlankService.actuacionesDeLasMascotas.sort(sort_by('namePet', false, function (a) { return a }));
            console.log("reorderactuacionesDeLasMascotasByNameActuacion - reload");
            $state.go($state.current, {}, { reload: true });
            BlankService.reloadHome = false;
        }


        var filterBarInstance;

        function getItems() {
            $scope.items = BlankService.actuacionesDeLasMascotas;
        }

        getItems();

        actuacionesDeLasMascotasFiltradas = [];

        $scope.showFilterBar = function ($filter) {
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
            if (filterBarInstance) {
                filterBarInstance();
                filterBarInstance = null;
            }

            $timeout(function () {
                getItems();
                $scope.$broadcast('scroll.refreshComplete');
            }, 1000);
        };

        $ionicModal.fromTemplateUrl('templates/ModalOrderAndGroupPets.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.openModal = function () {
            BlankService.initValuesFromMemory();
            $scope.item = {};
            $scope.choice = '';
            $scope.item.checked = '';
            $scope.modal.show();
        };

        $scope.closeModal = function () {
            BlankService.initValuesFromMemory();
            $scope.modal.hide();
        };

        $scope.$on('$destroy', function () {
            $scope.modal.remove();
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
        $scope.showDetail = function ($item) {
            BlankService.initValuesFromMemory();
            BlankService.detailTreatment = $item;
            $state.go('menu.detailTreatment');
        }
    })

    .controller('myPetsCtrl', function ($scope, $ionicPopup, $timeout, BlankService, $window, $state) {
        $scope.service = BlankService;
        BlankService.initValuesFromMemory();

        $scope.$on('$ionicView.afterEnter', function () {
            console.log("$ionicView.afterEnter");

            if (BlankService.reloadHome) {
                console.log("$ionicView.afterEnter - reload");
                $state.go($state.current, {}, { reload: true });
                BlankService.reloadHome = false;
            }

        });

        $scope.$on('$ionicView.loaded', function () {
            console.log("$ionicView.loaded");
            BlankService.reloadHome = true;
            BlankService.initValuesFromMemory();
        });

        $scope.addPet = function () {
            //console.log('myPetsCtrl -redirect');
            $state.go('menu.addMyPets');
        };

        $scope.showDetailPet = function (pet) {
            //console.log('myPetsCtrl - showDetailPet');
            BlankService.detailPet = pet;
            $state.go('menu.detailPet');
        };

        $scope.borrarMascota = function (pet) {
            //console.log('myPetsCtrl - borrarMascota');

            var confirmPopup = $ionicPopup.confirm({
                title: 'Borrar Mascota',
                template: 'Al borrar la mascota también se borrarán todas sus actuaciones. ¿Quieres continuar?'
            });

            confirmPopup.then(function (res) {
                if (res) {
                    //console.log('myPetsCtrl - borrarMascota', JSON.stringify(pet));
                    var i = 0;
                    var indexToDelete = -1;
                    for (i; i < BlankService.mascotas.length; i++) {
                        if (BlankService.mascotas[i].id = pet.id) {
                            indexToDelete = i;
                            break;
                        }
                    }
                    BlankService.mascotas.splice(indexToDelete, 1);
                    BlankService.saveDataInInternalPhoneMemory("mascotas", BlankService.mascotas);


                    var indexActuacionesToDelete = [];
                    i = 0;
                    //console.log('myPetsCtrl - borrarMascota con id', pet.id);

                    for (i; i < BlankService.actuacionesDeLasMascotas.length; i++) {
                        if (BlankService.actuacionesDeLasMascotas[i].idPet == pet.id) {
                            //console.log('myPetsCtrl - encontrada actuacion para esa mascota. Adding to vector.');
                            indexActuacionesToDelete.push(i);
                            //console.log('myPetsCtrl - posicines añadida.', i);
                        }
                    }

                    i = 0;
                    //console.log('myPetsCtrl - actuaciones a boprrar', indexActuacionesToDelete.length);
                    for (i; i < indexActuacionesToDelete.length; i++) {
                        if (indexActuacionesToDelete[i] != -1) {
                            //console.log('myPetsCtrl - delete - removing from vector ');
                            BlankService.actuacionesDeLasMascotas.splice(indexToDelete, 1);
                        }
                    }

                    BlankService.saveDataInInternalPhoneMemory("actuacionesDeLasMascotas", BlankService.actuacionesDeLasMascotas);
                    return true;

                } else {
                    //console.log('myPetsCtrl - no borrar');
                }
            });
        };
    })

    .controller('detailPetCtrl', function ($scope, $ionicPopup, $timeout, BlankService, $window, $state) {
        $scope.service = BlankService;

        $scope.$on('$ionicView.afterEnter', function () {
            console.log("$ionicView.afterEnter");

            if (BlankService.reloadHome) {
                console.log("$ionicView.afterEnter - reload");
                $state.go($state.current, {}, { reload: true });
                BlankService.reloadHome = false;
            }

        });

        $scope.$on('$ionicView.loaded', function () {
            console.log("$ionicView.loaded");
            initValues();
            BlankService.reloadHome = true;
            BlankService.initValuesFromMemory();
        });

        function initValues() {
            $scope.imagestring = {};
            $scope.lastPhoto = "init";
            $scope.imagestring = "img/perroIcon.jpg";
            $scope.typesPet = [{ "name": "Perro" }, { "name": "Gato" }];
            selectIfDefaultImage();
        }

        function selectIfDefaultImage() {
            if ($scope.imagestring == "img/perroIcon.jpg" || $scope.imagestring == "img/gatoIcon.jpg") {
                $scope.imagestring = "img/perroIcon.jpg";
                if (BlankService.type == 'Gato') {
                    $scope.imagestring = "img/gatoIcon.jpg";
                }
            }
        }

        function camposIntroducidosOk() {
            if (BlankService.detailPet.name != undefined && BlankService.detailPet.name != '' && BlankService.detailPet.name != 'nombre') {
                if (BlankService.detailPet.type != undefined && BlankService.detailPet.type != '') {
                    if (BlankService.detailPet.date != undefined && BlankService.detailPet.date != '') {
                        console.log('detailPetCtrl - camposIntroducidosOk-return true');
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
            if (camposIntroducidosOk()) {
                var i = 0;
                var petFound = {};
                for (i; i < BlankService.mascotas.length; i++) {
                    if (BlankService.mascotas[i].id == BlankService.detailPet.id) {
                        break;
                    }
                }
                BlankService.mascotas.splice(i, 1);
                BlankService.mascotas.push(BlankService.detailPet);

                var actuacionesFound = [];
                var actuacionesToDeleteIndexes = [];
                var actuacionFound = {};
                i = 0;
                for (i; i < BlankService.actuacionesDeLasMascotas.length; i++) {
                    if (BlankService.actuacionesDeLasMascotas[i].idPet == BlankService.detailPet.id) {

                        actuacionFound = BlankService.actuacionesDeLasMascotas[i];

                        actuacionFound.namePet = BlankService.detailPet.name;
                        actuacionFound.datePet = BlankService.detailPet.date;
                        actuacionFound.typePet = BlankService.detailPet.type;
                        actuacionesFound.push(actuacionFound);
                        actuacionesToDeleteIndexes.push(i);
                    }
                }

                i = 0;
                for (i; i < actuacionesToDeleteIndexes.length; i++) {
                    BlankService.actuacionesDeLasMascotas.splice(actuacionesToDeleteIndexes[i], 1);
                }
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
                    $state.go("menu.home")
                });

            }
        };

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

        $scope.viewTreatmentsPet = function () {
            //TODO: redirect to home filtrando por pet
        }

        $scope.showPopupAddName = function () {
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

    .controller('addTreatmentCtrl', function ($scope, $ionicPopup, $timeout, BlankService, $window, $state) {
        $scope.service = BlankService;

        $scope.$on('$ionicView.afterEnter', function () {
            console.log("$ionicView.afterEnter");

            if (BlankService.reloadHome) {
                console.log("$ionicView.afterEnter - reload");
                $state.go($state.current, {}, { reload: true });
                BlankService.reloadHome = false;
            }

        });

        $scope.$on('$ionicView.loaded', function () {
            console.log("$ionicView.loaded");
            initValues();
            BlankService.reloadHome = true;
            BlankService.initValuesFromMemory();
        });



        $scope.addActuacion = function () {
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
            //guardar una actuacion por cada mascota seleccionada
            var k = 0;
            for (k; k < $scope.mascotasToShow.length; k++) {
                if ($scope.mascotasToShow[k].selected) {
                    someSelected = true;
                    var pet = BlankService.findPetbyName($scope.mascotasToShow[k].subId);
                    $scope.act.id = BlankService.IDGenerator();
                    $scope.act.idPet = pet.id;
                    $scope.act.datePet = pet.date;
                    $scope.act.typePet = pet.type;
                    $scope.act.namePet = pet.name;
                    BlankService.actuacionesDeLasMascotas.push($scope.act);
                }
            }

            BlankService.saveDataInInternalPhoneMemory("actuacionesDeLasMascotas", BlankService.actuacionesDeLasMascotas);

            return true;
        };

        function camposIntroducidosOk() {
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

    .controller('detailTreatmentCtrl', function ($scope, $ionicPopup, $timeout, BlankService, $window, $state) {
        $scope.actuacion = BlankService.detailTreatment;
        $scope.service = BlankService;

        $scope.$on('$ionicView.afterEnter', function () {
            console.log("$ionicView.afterEnter");

            if (BlankService.reloadHome) {
                console.log("$ionicView.afterEnter - reload");
                $state.go($state.current, {}, { reload: true });
                BlankService.reloadHome = false;
            }

        });

        $scope.$on('$ionicView.loaded', function () {
            console.log("$ionicView.loaded");
            initValues();
            BlankService.reloadHome = true;
            BlankService.initValuesFromMemory();
        });


        $scope.solicitarConsulta = function () {
            $window.open('http:///tecuroencasa.com/consultas/', '_blank');
        };
        $scope.modifyTreatment = function () {
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

        function getActuacion(pet) {
            $scope.newact = {};
            $scope.newact.id = BlankService.IDGenerator();
            $scope.newact.name = $scope.act.name;
            $scope.newact.date = $scope.act.date;
            $scope.newact.idPet = pet.id;
            $scope.newact.namePet = pet.name;
            $scope.newact.datePet = pet.date;
            $scope.newact.typePet = pet.type;
            $scope.newact.isVisible = $scope.act.isVisible;
            $scope.newact.nameAlarm = $scope.act.nameAlarm;
            $scope.newact.alarmId = $scope.act.alarmId;
            return $scope.newact;
        }

        function saveActuacionInSystem() {
            //guardar una actuacion por cada mascota seleccionada
            var k = 0;
            for (k; k < $scope.mascotasToShow.length; k++) {
                if ($scope.mascotasToShow[k].selected) {
                    someSelected = true;
                    var act = getActuacion(BlankService.findPetbyName($scope.mascotasToShow[k].subId));
                    BlankService.actuacionesDeLasMascotas.push(act);
                }
            }

            //borro la antigua
            var i = 0;
            var indexToDelete = -1;
            for (i; i < BlankService.actuacionesDeLasMascotas.length; i++) {
                if (BlankService.actuacionesDeLasMascotas[i].id == BlankService.detailTreatment.id) {
                    indexToDelete = i;
                    break;
                }
            }
            if (indexToDelete != -1) {
                BlankService.actuacionesDeLasMascotas.splice(indexToDelete, 1);
            }

            BlankService.saveDataInInternalPhoneMemory("actuacionesDeLasMascotas", BlankService.actuacionesDeLasMascotas);
            return true;
        }

        function camposIntroducidosOk() {
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
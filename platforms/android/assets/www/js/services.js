angular.module('app.services', [])

    .factory('BlankFactory', [function () {
    }])

    .service('BlankService', [function () {

        this.treatmentId_notif;
        this.elemes = [];

        this.detailTreatment = {};
        this.detailPet = {};

        this.mascotas = [];
        this.actuacionesDeLasMascotas = [];

        this.reloadHome = true;

        this.alarmas = [
            { "name": "Nunca", "id": "0" },
            { "name": "12 horas antes", "id": "1" },
            { "name": "1 día antes", "id": "2" },
            { "name": "2 días antes", "id": "3" }];

        this.orders = [
            { "name": "Fecha", "id": "0", "seleccionado": "true" },
            { "name": "Mascota", "id": "1", "seleccionado": "false" },
            { "name": "Actuacion", "id": "2", "seleccionado": "false" }];

        var sort_by = function (field, reverse, primer) {
            var key = primer ?
                function (x) { return primer(x[field]) } :
                function (x) { return x[field] };
            reverse = !reverse ? 1 : -1;
            return function (a, b) {
                return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
            }
        }



        this.removeByAttr = function (arr, attr, value) {
            var i = arr.length;
            while (i--) {
                if (arr[i]
                    && arr[i].hasOwnProperty(attr)
                    && (arguments.length > 2 && arr[i][attr] === value)) {

                    arr.splice(i, 1);

                }
            }
            return arr;
        };

        this.comesFromNotification = function () {
            var treatmentId_notif_memory = localStorage.getItem("treatmentId_notif");
            if ((treatmentId_notif_memory != undefined) && (treatmentId_notif_memory != null) && (treatmentId_notif_memory != '')) {
                if ((this.detailTreatment.id != undefined) && (this.detailTreatment.id != null) && (this.detailTreatment.id != '')) {
                    if (this.treatmentId_notif == this.detailTreatment.id) {
                        return true;
                    }
                }
            }
            return false;
        }

        this.changeOrder = function (order) {
            if (order == 'ordernombremascota') {
                this.actuacionesDeLasMascotas.sort(sort_by('namePet', false, function (a) { return a }));
            } else if (order == 'orderfechamascota') {
                this.actuacionesDeLasMascotas.sort(sort_by('date', false, function (a) { return a }));
            } else if (order == 'ordernombreactuacion') {
                this.actuacionesDeLasMascotas.sort(sort_by('name', false, function (a) { return a }));
            } else {
            }
        };

        this.setViewGroupForDetailPet = function () {
            var i = 0;
            var nameDetailePet = JSON.stringify(this.detailPet.name).replace(/\"/g, "");

            for (i; i < this.elemes.lenght; i++) {
                if (this.elemes[i].subId == nameDetailePet) {
                    this.elemes[i].selected = true;
                } else {
                    this.elemes[i].selected = false;
                }
            }

        }
        this.initValuesFromMemory = function () {
            if (localStorage.getItem("mascotas") !== null) {
                this.mascotas = this.getDataFromInternalPhoneMemory("mascotas");
            }
            if (localStorage.getItem("actuacionesDeLasMascotas") !== null) {
                this.actuacionesDeLasMascotas = this.getDataFromInternalPhoneMemory("actuacionesDeLasMascotas");
            }

            this.elemes = [];
            var i = 0;
            var name = '';
            for (mascota in this.mascotas) {
                this.elemes.push(
                    {
                        subName: 'SubGrup1',
                        subId: JSON.stringify(this.mascotas[i].name).replace(/\"/g, ""),
                        id: i,
                        selected: true
                    });
                i++;
            }
        }


        this.initDetailTreatment = function () {
            this.initValuesFromMemory();
            if (this.getDataFromInternalPhoneMemory("detailTreatmentId") != null) {
                if (this.getDataFromInternalPhoneMemory("detailTreatmentId") != undefined) {
                    if (this.getDataFromInternalPhoneMemory("detailTreatmentId") != '') {
                        this.detailTreatment = this.findActbyId(this.getDataFromInternalPhoneMemory("detailTreatmentId"));
                        this.removeDataFromInternalPhoneMemory("detailTreatmentId");
                    }
                }
            }
        };

        this.saveActuacionesDeMascota = function () {
            this.saveDataInInternalPhoneMemory("actuacionesDeLasMascotas", this.actuacionesDeLasMascotas);
            this.initValuesFromMemory();
            return true;
        };


        this.saveMascotas = function () {
            this.saveDataInInternalPhoneMemory("mascotas", this.mascotas);
            this.initValuesFromMemory()
            return true;
        };

        this.saveDataInInternalPhoneMemory = function (key, value) {
            var antes = [];
            var despues = [];
            if (this.getDataFromInternalPhoneMemory(key) !== null) {
                antes = this.getDataFromInternalPhoneMemory(key);
            }
            this.saveDataEndInInternalPhoneMemory(key, value);
            if (this.getDataFromInternalPhoneMemory(key) !== null) {
                despues = this.getDataFromInternalPhoneMemory(key);
            }
        }

        this.existsDataFromInternalPhoneMemory = function (key) {
            var retrievedObject = localStorage.getItem(key);
            if (retrievedObject == null) {
                return false;
            } else {
                return true;
            }
        }
        this.getDataFromInternalPhoneMemory = function (key) {
            var retrievedObject = localStorage.getItem(key);
            return JSON.parse(retrievedObject);
        }
        this.removeDataFromInternalPhoneMemory = function (key) {
            localStorage.removeItem(key);
        }
        this.saveDataEndInInternalPhoneMemory = function (key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        }
        this.clearData = function () {
            localStorage.clear();
            this.initValuesFromMemory();
        }
        this.savePetInSystem = function (pet) {
            this.mascotas.push(pet);
            this.saveDataInInternalPhoneMemory("mascotas", this.mascotas);
            return true;
        };

        this.findPetbyName = function (name) {
            var i = 0;
            for (i; i < this.mascotas.length; i++) {
                if (this.mascotas[i].name == name) {
                    return this.mascotas[i];
                }
            }
            return false;
        }
        this.findActbyId = function (id) {
            var i = 0;
            for (i; i < this.actuacionesDeLasMascotas.length; i++) {
                if (this.actuacionesDeLasMascotas[i].id == id) {
                    return this.actuacionesDeLasMascotas[i];
                }
            }
            return false;
        }

        this.findAlarmbyName = function (name) {
            var i = 0;
            for (i; i < this.alarmas.length; i++) {
                if (this.alarmas[i].name == name) {
                    return this.alarmas[i];
                }
            }
            return false;
        }
        this.IDGenerator = function (length) {
            this.length = length;
            this.timestamp = +new Date;
            var _getRandomInt = function (min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
            var ts = this.timestamp.toString();
            var parts = ts.split("").reverse();
            var id = "";

            for (var i = 0; i < this.length; ++i) {
                var index = _getRandomInt(0, parts.length - 1);
                id += parts[index];
            }
            return id;
        }
    }]);
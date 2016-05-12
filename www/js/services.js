angular.module('app.services', [])

    .factory('BlankFactory', [function () {
    }])

    .service('BlankService', [function () {

        this.hayMascotas = false;
        this.noHayMascotas = false;
        this.hayActuaciones = false;
        this.noHayActuaciones = false;

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
            { "name": "Fecha", "id": "0", "selected": "true" },
            { "name": "Mascota", "id": "1", "selected": "false" },
            { "name": "Actuacion", "id": "2", "selected": "false" }];

        this.initValuesFromMemory = function () {
            if (localStorage.getItem("mascotas") !== null) {
                this.mascotas = this.getDataFromInternalPhoneMemory("mascotas");
            }
            if (localStorage.getItem("actuacionesDeLasMascotas") !== null) {
                this.actuacionesDeLasMascotas = this.getDataFromInternalPhoneMemory("actuacionesDeLasMascotas");
            }
            this.ocultarBotonera = true;
            if ((this.mascotas != undefined) && (this.mascotas.length > 0)) {
                this.hayMascotas = true; this.noHayMascotas = false;
                if ((this.actuacionesDeLasMascotas != undefined) && (this.actuacionesDeLasMascotas.length > 0)) {
                    this.hayActuaciones = true; this.noHayActuaciones = false;
                    this.ocultarBotonera = false;
                } else {
                    this.hayActuaciones = false; this.noHayActuaciones = true;
                }
            } else {
                this.hayMascotas = false; this.noHayMascotas = true; this.noHayActuaciones = false; this.hayActuaciones = true;
            }
        }

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
        this.getDataFromInternalPhoneMemory = function (key) {
            var retrievedObject = localStorage.getItem(key);
            return JSON.parse(retrievedObject);
        }
        this.saveDataEndInInternalPhoneMemory = function (key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        }
        this.clearData = function () {
            localStorage.clear();
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

        this.findAlarmbyName = function (name) {
            var i = 0;
            for (i; i < this.alarmas.length; i++) {
                if (this.alarmas[i].name == name) {
                    return this.alarmas[i];
                }
            }
            return false;
        }
        this.IDGenerator = function () {
            this.length = 8;
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
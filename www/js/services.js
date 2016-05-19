angular.module('app.services', [])

    .factory('BlankFactory', [function () {
    }])

    .service('BlankService', [function () {

        this.treatmentId_notif;

/*
        this.hayMascotas = false;
        this.noHayMascotas = false;
        this.hayActuaciones = false;
        this.noHayActuaciones = false;
*/
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

        this.changeOrder = function (order) {
            if (order == 'ordernombremascota') {
                console.log("service -- changeOrder--ordernombremascota ");
                this.actuacionesDeLasMascotas.sort(sort_by('namePet', false, function (a) { return a }));
            } else if (order == 'orderfechamascota') {
                console.log("service -- changeOrder--orderfechamascota ");
                this.actuacionesDeLasMascotas.sort(sort_by('date', false, function (a) { return a }));
            } else if (order == 'ordernombreactuacion') {
                console.log("service -- changeOrder--ordernombreactuacion ");
                this.actuacionesDeLasMascotas.sort(sort_by('name', false, function (a) { return a }));
            } else {
                console.log("service -- changeOrder--NOT FOUND ");
            }
        };

        this.initValuesFromMemory = function () {
            if (localStorage.getItem("mascotas") !== null) {
                this.mascotas = this.getDataFromInternalPhoneMemory("mascotas");
            }
            if (localStorage.getItem("actuacionesDeLasMascotas") !== null) {
                this.actuacionesDeLasMascotas = this.getDataFromInternalPhoneMemory("actuacionesDeLasMascotas");
            }
            /*
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
            */
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
        
        this.existsDataFromInternalPhoneMemory = function (key) {
            var retrievedObject = localStorage.getItem(key);
            if(retrievedObject==null){
                return false;
            }else{
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
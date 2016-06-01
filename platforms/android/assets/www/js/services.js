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
            console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -- setViewGroupForDetailPet");
            var i = 0;

            var nameDetailePet = JSON.stringify(this.detailPet.name).replace(/\"/g, "");
            console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -- this.elemes before", JSON.stringify(this.elemes));
            //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -- nameDetailePet", nameDetailePet);

            var i = this.elemes.length;
            while (i--) {
                // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -- this.elemes[i]", JSON.stringify(this.elemes[i]));
                //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -- this.elemes[i].hasOwnProperty('subId')", this.elemes[i].hasOwnProperty('subId'));
                //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -- arguments.length > 2", arguments.length > 2);
                console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -- this.elemes[i]['subId']", this.elemes[i]['subId']);
                if (this.elemes[i] && this.elemes[i].hasOwnProperty('subId')
                    && (this.elemes[i]['subId'] == nameDetailePet)) {
                    // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -- cambiando a true");

                    this.elemes[i]['selected'] = true;
                } else {
                    // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -- cambiando a false");
                    this.elemes[i]['selected'] = false;
                }
            }
            console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -- this.elemes after", JSON.stringify(this.elemes));

            /*
                    for (eleme in this.elemes) {
                        console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -- iteracion", i);
                        console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -- eleme", JSON.stringify(eleme));
                        console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -- eleme.subId", eleme.subId);
                        if (eleme.subId == nameDetailePet) {
                            eleme.selected = true;
                            console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -- cambiando a ", this.elemes[i].selected);
                        } else {
                            eleme.selected = false;
                            console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -- cambiando a ", this.elemes[i].selected);
                        }
                        i++;
                    }
            */
            /*
                        for (i; i < this.elemes.lenght; i++) {
                            console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -- iteracion", i);
                            
                            if (this.elemes[i].subId == nameDetailePet) {
                                this.elemes[i].selected = true;
                                console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -- cambiando a ", this.elemes[i].selected);
                            } else {
                                this.elemes[i].selected = false;
                                console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -- cambiando a ", this.elemes[i].selected);
                            }
                        }
                        */
        }

        this.initValuesFromMemory = function () {
            if (localStorage.getItem("mascotas") !== null) {
                this.mascotas = this.getDataFromInternalPhoneMemory("mascotas");
            }
            if (localStorage.getItem("actuacionesDeLasMascotas") !== null) {
                this.actuacionesDeLasMascotas = this.getDataFromInternalPhoneMemory("actuacionesDeLasMascotas");
            }


            //TODO: Esto me jode el filtro si esta marcada alkgna. hay dos opciones. o guardo el filtro en memoria con un campo del objeto mascota en selected=true/false, o bien tengo en cuenta cuando inicializo si ya e4xiste elemes. Me gusta mas lo segundo. No lo, segundo no mola porque cuando añadas una nueva mascota no se actualizara la lista. hay que guardar en memoria los valores de las mascotas.
            
/*
            if 
            (this.elemes != undefined)
            (this.elemes != null)
            (this.elemes.length>0)
            

                
            }
            */
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
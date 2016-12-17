angular.module('starter.services', [])

    .factory('BlankFactory', [function () {
    }])

    .service('FileService', function() {
        var images = [];
        var IMAGE_STORAGE_KEY = 'images';
        
        function getImages() {
            console.log("FileService - getImages");
            var img = window.localStorage.getItem(IMAGE_STORAGE_KEY);
            console.log("FileService - getImages img",img);

            if (img) {
                images = JSON.parse(img);
            } 
            return images;
        };

        function addImage(img) {
            console.log("FileService - addImage ",img);
            images.push(img);
            window.localStorage.setItem(IMAGE_STORAGE_KEY, JSON.stringify(images));
            console.log("FileService - addImage img push done");
        };
        
        return {
            storeImage: addImage,
            restoreImage: getImages
        }
    })
    .service('ImageService', function($cordovaCamera, FileService, $q, $cordovaFile) {


        function makeid() {
            console.log("ImageService - makeid type ");
            var text = '';
            var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for (var i = 0; i < 5; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        };

        function optionsForType(type) {
            console.log("ImageService - optionsForType ", type);
            var source;
            switch (type) {
                case 0:
                source = Camera.PictureSourceType.CAMERA;
                break;

                case 1:
                source = Camera.PictureSourceType.PHOTOLIBRARY;
                break;
            }
            return {
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: source,
                allowEdit: false,
                encodingType: Camera.EncodingType.JPEG,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false,
                targetWidth: 100,
                targetHeight:100
            };
        }
/*
//si desde camara sale esto
ImagePickerController - addImage type  0
services.js:91 ImageService - saveMedia type 
services.js:47 ImageService - optionsForType type 
services.js:94 saveMedia
services.js:96 ImageService - saveMedia-- recieved  file:///storage/emulated/0/Android/data/com.ionicframework.todo610847/cache/1481891011589.jpg
services.js:37 ImageService - makeid type 
services.js:102 ImageService - saveMedia with name  1481891011589.jpg
services.js:103 ImageService - saveMedia with namePath  file:///storage/emulated/0/Android/data/com.ionicframework.todo610847/cache/
services.js:104 ImageService - saveMedia with newName  NNxAW1481891011589.jpg
services.js:108 ImageService - saveMedia copyFile 
services.js:22 FileService - addImage  156416541.jpg
services.js:25 FileService - addImage img push done
services.js:110 ImageService - saveMedia ret  156416541.jpg
ionic.bundle.js:29132 ImagePickerController - addImage then function  156416541.jpg
ionic.bundle.js:29132 ImagePickerController -- assignImageToView  156416541.jpg
ionic.bundle.js:26799 TypeError: Cannot set property 'imagePet' of undefined
    at assignImageToView (controllers.js:778)
    at controllers.js:770
    at processQueue (ionic.bundle.js:29132)
    at ionic.bundle.js:29148
    at Scope.$eval (ionic.bundle.js:30400)
    at Scope.$digest (ionic.bundle.js:30216)
    at ionic.bundle.js:30439
    at completeOutstandingRequest (ionic.bundle.js:19199)
    at ionic.bundle.js:19475
(anonymous) @ ionic.bundle.js:26799
(anonymous) @ ionic.bundle.js:23512
processQueue @ ionic.bundle.js:29140
(anonymous) @ ionic.bundle.js:29148
$eval @ ionic.bundle.js:30400
$digest @ ionic.bundle.js:30216
(anonymous) @ ionic.bundle.js:30439
completeOutstandingRequest @ ionic.bundle.js:19199
(anonymous) @ ionic.bundle.js:19475



//si desde galeria, sale esto
ImagePickerController - addImage type  1
services.js:91 ImageService - saveMedia type 
services.js:47 ImageService - optionsForType type 
services.js:94 saveMedia
services.js:96 ImageService - saveMedia-- recieved  file:///storage/emulated/0/Android/data/com.ionicframework.todo610847/cache/IMG_20161216_132351.jpg?1481891031691
services.js:37 ImageService - makeid type 
services.js:102 ImageService - saveMedia with name  IMG_20161216_132351.jpg?1481891031691
services.js:103 ImageService - saveMedia with namePath  file:///storage/emulated/0/Android/data/com.ionicframework.todo610847/cache/
services.js:104 ImageService - saveMedia with newName  f16iCIMG_20161216_132351.jpg?1481891031691
services.js:113 ImageService - saveMedia reject  
FileError {code: 1, message: "NOT_FOUND_ERR"}
*/
        function saveMedia(type) {
            console.log("ImageService - saveMedia type ");
            return $q(function(resolve, reject) {
                var options = optionsForType(type);
                console.log("saveMedia");
                $cordovaCamera.getPicture(options).then(function(imageUrl) {
                    console.log("ImageService - saveMedia-- recieved ", imageUrl);

                    var name = imageUrl.substr(imageUrl.lastIndexOf('/') + 1);
                    var namePath = imageUrl.substr(0, imageUrl.lastIndexOf('/') + 1);
                    var newName = makeid() + name;
                    
                    console.log("ImageService - saveMedia with name ", name);
                    console.log("ImageService - saveMedia with namePath ", namePath);
                    console.log("ImageService - saveMedia with newName ", newName);
                    
                    $cordovaFile.copyFile(namePath, name, cordova.file.dataDirectory, newName).then(function(info) {
                        //newName="156416541.jpg";
                        console.log("ImageService - saveMedia copyFile ");
                        var ret=FileService.storeImage(newName);
                        console.log("ImageService - saveMedia ret ", newName);
                        resolve(newName);
                    }, function(e) {
                        console.log("ImageService - saveMedia reject ", e);
                        reject(e);
                    });
                    
                });
            })
        }

        function saveImageFromPathMedia(imageUrl) {
            console.log("ImageService - saveMedia type ");
            return $q(function(resolve, reject) {

                    var name = imageUrl.substr(imageUrl.lastIndexOf('/') + 1);
                    var namePath = imageUrl.substr(0, imageUrl.lastIndexOf('/') + 1);
                    var newName = makeid() + name;
                    console.log("ImageService - saveMedia with ", newName);
                    
                    $cordovaFile.copyFile(namePath, name, cordova.file.dataDirectory, newName).then(function(info) {
                        console.log("ImageService - saveMedia copyFile ");
                        var ret=FileService.storeImage(newName);
                        console.log("ImageService - saveMedia ret ", newName);
                        resolve(newName);
                    }, function(e) {
                        console.log("ImageService - saveMedia reject ", ret);
                        reject(ret);
                    });
                    
                
            })
        }
        return {
            handleMediaDialog: saveMedia,
            handleSaveInitImage: saveImageFromPathMedia        }
    })
    .service('BlankService', [function () {

        this.treatmentId_notif;

        this.detailTreatment = {};
        this.detailPet = {};

        this.mascotas = [];
        this.actuacionesDeLasMascotas = [];

        this.reloadHome = true;

        this.alarmas = [
            { "name": "Nunca", "id": "0" },
            { "name": "12 horas antes", "id": "1" },
            { "name": "1 día antes", "id": "2" },
            { "name": "2 días antes", "id": "3" },
            { "name": "En breves", "id": "4" }];

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
            console.log("services -- setViewGroupForDetailPet");
            var i = 0;
            var nameDetailePet = JSON.stringify(this.detailPet.name).replace(/\"/g, "");
           
            var i = this.mascotas.length;
            while (i--) {
                if (this.mascotas[i] && this.mascotas[i].hasOwnProperty('name')
                    && (this.mascotas[i]['name'] == nameDetailePet)) {
                    this.mascotas[i]['selected'] = true;
                } else {
                    this.mascotas[i]['selected'] = false;
                }
            }
            this.saveMascotas();
        }

        this.initValuesFromMemory = function () {
            if (localStorage.getItem("mascotas") !== null) {
                this.mascotas = this.getDataFromInternalPhoneMemory("mascotas");
            }
            if (localStorage.getItem("actuacionesDeLasMascotas") !== null) {
                this.actuacionesDeLasMascotas = this.getDataFromInternalPhoneMemory("actuacionesDeLasMascotas");
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
       
        this.orderSelected="Fecha";

        this.saveOrderSelected = function () {
            console.log("Services -- saveOrderSelected", JSON.stringify(this.orderSelected));
            this.saveDataInInternalPhoneMemory("orderSelected", this.orderSelected);
            return true;
        };
        
        this.saveActuacionesDeMascota = function () {
            console.log("Services -- saveActuacionesDeMascota", JSON.stringify(this.actuacionesDeLasMascotas));
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
         this.processImageFromType=function(tipo) {
            console.log('services -- processImageFromType');
            if(tipo=="desparasitacion"){
                return "img/desparasitacionIcon.jpg"
            }else if(tipo=="filaria"){
                return "img/filariaIcon.jpg"
            }else if(tipo=="analisis"){
                return "img/analisisIcon.jpg"
            }else if(tipo=="medicacion"){
                return "img/medicacionIcon.jpg"
            }else if(tipo=="collar"){
                return "img/collarIcon.jpg"
            }
            return "img/otraIcon.jpg"            
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
    }])
    ;
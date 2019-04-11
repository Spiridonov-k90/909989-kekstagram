'use strict';
(function (){
    
    var URL_LOAD = 'https://js.dump.academy/kekstagram'; /*куда загружаем*/
    var URL_DATA = 'https://js.dump.academy/kekstagram/data'; /*откуда получаем*/
    var SUCCESS_CODE = 200;
    var TIMEOUT = 10000;
    
    /*функция для получения информации об ответе с сервера*/
    var getResponse = function (xhr, onLoad, onError) {
        xhr.addEventListener('load', function () {
            if (xhr.status === SUCCESS_CODE) {
                onLoad(xhr.response);
            } else {
                onError('Ошибка загрузки файла');
              };
        });
        
        xhr.addEventListener('error', function () {
            onError('Произошла ошибка соединения');
        });
        
        xhr.addEventListener('timeout', function () {
            onError('Долгий ответ сервера');
        });

        xhr.timeout = TIMEOUT;
    };
    
    /*функция отправления данных на сервер*/
    var upload = function (data, onLoad, onError) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        
        getResponse(xhr, onLoad, onError);
        
        xhr.open('POST', URL_LOAD);
        xhr.send(data);
    };
    
    /*функция получения данных*/
    var loadData = function (onLoad, onError) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        
        getResponse(xhr, onLoad, onError);
        
        xhr.open('GET', URL_DATA);
        xhr.send();
    };
    
    window.exp_backend = {
        upload: upload,
        loadData: loadData
    };
}());
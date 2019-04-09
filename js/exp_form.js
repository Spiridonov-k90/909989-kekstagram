'use strict';
(function () {
    
    var ESC_CODE = 27;
    var MAX_HASHTAG_LENGTH = 20;
    var MIN_HASHTAG_LENGTH = 2;
    var MARKER = '#';
    var ERROR_COLOR = 'red';
    
    /*Массив со стилями окна редактирования*/
    var EFFECTS = [
        'effects__preview--none',
        'effects__preview--chrome',
        'effects__preview--sepia',
        'effects__preview--marvin',
        'effects__preview--phobos',
        'effects__preview--heat'
    ];
    
    /*Регулирование насыщенности эффектов загружаемой фотографии*/
    var sliderHandle = document.querySelector('.effect-level__pin');
    var sliderHandleParent = document.querySelector('.effect-level__line');
    var depth = document.querySelector('.effect-level__depth');
    var effectLevel = document.querySelector('.effect-level');
    var effectBox = document.querySelector('.effects__list');

    
    /*Редактирование загруженного изображения*/
    var downloadPhotoUser = document.querySelector('.img-upload__preview img');
    var effectsList = document.querySelectorAll('.effects__radio');
    var myClass = downloadPhotoUser.classList;
    
    /*Наложение эффекта на изображение*/
    var setEffectPhoto = function (icon, effect, listEffects) {
        icon.addEventListener('click', function() {
            for (var j = 0; j < listEffects.length; j++) {
                if (myClass.contains(listEffects[j])) {
                    myClass.remove(listEffects[j]);
                };
            };
            downloadPhotoUser.classList.add(effect);
        });
    };
    for (var i = 0; i < effectsList.length; i++) {
        setEffectPhoto(effectsList[i], EFFECTS[i], EFFECTS);
    };
    
    /*Код для заполнения поля Хэштегов и комментариев*/
    var hashtags = document.querySelector('.text__hashtags');
    var textDescription = document.querySelector('.text__description');
    
    /*Закрытие поля ввода Хэш-тегов через ESC*/
    hashtags.addEventListener('keydown', function (evt) {
        if (evt.keyCode === ESC_CODE) {
            evt.stopPropagation();
            hashtags.blur();
        }
    });
    
    /*Проверка на валидность поля с комментариями*/
    textDescription.addEventListener('input', function (evt) {
        var target = evt.target;
        if (target.value.length > 140) {
            target.setCustomValidity('Длина комментария не может составлять больше 140 символов');
            textDescription.style.outlineColor = ERROR_COLOR;
          } else {
            target.setCustomValidity('');
          }
    });

    /*Проверка фокуса на поле ввода комментариев и его закрытие*/
    textDescription.addEventListener('keydown', function (evt) {
        if (evt.keyCode === ESC_CODE) {
            evt.stopPropagation();
            textDescription.blur();
        }
    });

    /*проверка на Хэш-тег*/
    var checkStartHashtag = function (hashtag) {
        return hashtag !== MARKER;
    };
    
    /*проверка на минимальное количество символов*/
    var checkHashtagMinLength = function (hashtag) {
        return hashtag.length < MIN_HASHTAG_LENGTH;
    };
    
    /*проверка на максимальное количество символов*/
    var checkHashtagMaxLength = function (hashtag) {
        return hashtag.length > MAX_HASHTAG_LENGTH;
    };
    
    /*Проверка тегов на повторение*/
    var checkDoubleHashtag = function (hashtagsArray) {
        var toOneType = function () {
            var newTextDescription = [];
            for (var i = 0; i < hashtagsArray.length; i++) {
                var index = hashtagsArray[i].toUpperCase();
                newTextDescription.push(index);
            };
            return newTextDescription;
        };
        var firstExp = toOneType();
        for (var j = 0; j < firstExp.length; j++) {
            for (var k = j + 1; k < firstExp.length; k++) {
                if (firstExp[j] == firstExp[k]) {
                    return true;
                };
            };
        };
    };
    
    /*Проверка тегов на повторение MARKER*/
    var checkDoubleMarker = function (hashtagsArrayElement) {
        for (var j = 0; j < hashtagsArrayElement.length; j++) {
            for (var k = j + 1; k < hashtagsArrayElement.length; k++) {
                if (hashtagsArrayElement[0] == hashtagsArrayElement[k]) {
                    return true;
                };
            };
        };
    };
    
    /*загрузка формы на сервер*/
    var tagBody = document.querySelector('body');
    var formUploadPhoto = document.querySelector('.img-upload__form');
    var buttonUploadPhoto = document.querySelector('.img-upload__submit');
    var imgUpload = document.querySelector('.img-upload__overlay');
    var mainElement = document.querySelector('main');

    formUploadPhoto.addEventListener('submit', function (evt){
        window.exp_backend.upload(new FormData(formUploadPhoto), function (){
            imgUpload.classList.add('hidden');
            openSuccesMessage();
            tagBody.classList.remove('modal-open')
//            window.exp_backend.loadData(onSaccesHandler, onErrorHandler);
        }, function (){
            imgUpload.classList.add('hidden');
            openErrorUpload();
        });
        evt.preventDefault();
    });

    var successTemplateElement = document.querySelector('#success').content;
    var errorTemplateElement = document.querySelector('#error').content;

    /*функуция открытия окна с успешной загрузкой на сервер*/
    var openSuccesMessage = function (){
        //imgUpload.reset();/*выдает ошибку*/

        var successTemplateCloneElement = successTemplateElement.cloneNode(true);
        var successButtonElement = successTemplateElement.querySelector('.success__button');

        mainElement.appendChild(successTemplateCloneElement);
        successButtonElement.addEventListener('click', onSuccessButtonClick);
        document.addEventListener('click', onMessageSuccessClick);
        document.addEventListener('keydown', onMessageSuccessKeydown);
    };

    var onSuccessButtonClick = function (){
        closeSuccesMessage();
    };

    var closeSuccesMessage = function () {
        var popupSuccesElement = mainElement.querySelector('.success');

        popupSuccesElement.remove();
        document.removeEventListener('click', onMessageSuccessClick);
        document.removeEventListener('keydown', onMessageSuccessKeydown);
    };

    var onMessageSuccessClick = function () {
        closeSuccesMessage();
    };

    var onMessageSuccessKeydown = function (evt) {
        if (evt.keyCode === window.exp_form.ESC_CODE) {
            closeSuccesMessage();
        };
    };

    /*функция сообщения о ошибке загрузки на сервер*/
    var openErrorUpload = function () {
//        imgUpload.reset();

        var errorTemplateCloneElement = errorTemplateElement.cloneNode(true);
        var buttonTryAgainElement = errorTemplateCloneElement.querySelector('.error__button:nth-child(1)');
        var buttonOtherFilesElement = errorTemplateCloneElement.querySelector('.error__button:nth-child(2)');

        mainElement.appendChild(errorTemplateCloneElement);
        buttonTryAgainElement.addEventListener('click', onButtonTryAgainClick);
        buttonOtherFilesElement.addEventListener('click', onButtonOtherFilesElement);
        document.addEventListener('click', onErrorUploadClick);
        document.addEventListener('keydown', onErrorUploadKeydown);
    };

    var closeErrorUpload = function () {
        var errorUploadElement = mainElement.querySelector('.error');

        errorUploadElement.remove();
        document.removeEventListener('keydown', onErrorUploadKeydown);
        document.removeEventListener('click', onErrorUploadClick);
    };

    var onButtonTryAgainClick = function () {
        closeErrorUpload();
    };

    var onButtonOtherFilesElement = function () {
        closeErrorUpload();
    };

    var onErrorUploadClick = function () {
        closeErrorUpload();
    };

    var onErrorUploadKeydown = function () {
        if (evt.keyCode === window.exp_form.ESC_CODE) {
            closeErrorUpload();
        };
    };
    
    window.exp_form = {
        /*переменные*/
        ESC_CODE: ESC_CODE,
        MAX_HASHTAG_LENGTH: MAX_HASHTAG_LENGTH,
        MIN_HASHTAG_LENGTH: MIN_HASHTAG_LENGTH,
        MARKER: MARKER,
        ERROR_COLOR: ERROR_COLOR,
        EFFECTS: EFFECTS,
        sliderHandle: sliderHandle,
        sliderHandleParent: sliderHandleParent,
        depth: depth,
        effectLevel: effectLevel,
        effectBox: effectBox,
        downloadPhotoUser: downloadPhotoUser,
        hashtags: hashtags,
        textDescription: textDescription,
        /*функции*/
        checkStartHashtag: checkStartHashtag,
        checkHashtagMinLength: checkHashtagMinLength,
        checkHashtagMaxLength: checkHashtagMaxLength,
        checkDoubleHashtag: checkDoubleHashtag,
        checkDoubleMarker: checkDoubleMarker
    };
}());


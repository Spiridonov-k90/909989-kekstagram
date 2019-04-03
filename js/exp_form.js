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


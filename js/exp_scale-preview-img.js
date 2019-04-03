'use strict';
(function () {
    
    var scaleControlBigger = document.querySelector('.scale__control--bigger');
    var scaleControlSmaller = document.querySelector('.scale__control--smaller');
    var scaleControlValue = document.querySelector('.scale__control--value');
    
    var CONFIG_SCALE = {
        stepScale: 25,
        maxScale: 100,
        minScale: 25
    };
    
    scaleControlValue.value = '100%';
    window.exp_form.downloadPhotoUser.style.transform = 'scale(1)';
    var defaultScale = CONFIG_SCALE.maxScale;
    
    /*Уменьшение масштаба на 1 шаг*/
    var onbuttonMinClick = function () {
        if (defaultScale > CONFIG_SCALE.minScale) {
            defaultScale -= CONFIG_SCALE.stepScale;
            window.exp_form.downloadPhotoUser.style.transform = 'scale(' + (defaultScale / 100) + ')';
            scaleControlValue.value = defaultScale + '%';
        }
    };
    
    /*Увеличение масштаба на 1 шаг*/
    var onbuttonMaxClick = function () {
        if (defaultScale < CONFIG_SCALE.maxScale) {
            defaultScale += CONFIG_SCALE.stepScale;
            window.exp_form.downloadPhotoUser.style.transform = 'scale(' + (defaultScale / 100) + ')';
            scaleControlValue.value = defaultScale + '%';
        }
    };
    
    scaleControlSmaller.addEventListener('click', onbuttonMinClick);
    scaleControlBigger.addEventListener('click', onbuttonMaxClick);
    
}());
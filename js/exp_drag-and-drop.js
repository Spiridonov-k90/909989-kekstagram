'use strict';
(function (){
    
    window.exp_form.effectLevel.classList.add('hidden');
    
    window.exp_form.effectBox.addEventListener('click', function(evt) {
        var target = evt.target;
        window.exp_form.sliderHandle.style.left = window.exp_form.sliderHandleParent.offsetWidth + 'px';
        window.exp_form.depth.style.width = window.exp_form.sliderHandleParent.offsetWidth + 'px';
        
        /*начальное состояние фильтров при клике на миниатюру выбора фильтра*/
        var MAX_SCALE_EFFECT = [
            'none',
            'grayscale(1.0)',
            'sepia(1.0)',
            'invert(100%)',
            'blur(3px)',
            'brightness(100%)'
        ];
        
        var effectLength = window.exp_form.effectBox.children
        /*добавление изображению фильтра*/
        for (var i = 1; i < effectLength.length; i++) {
            if (target.classList.contains(window.exp_form.EFFECTS[0])) {
                window.exp_form.effectLevel.classList.add('hidden');
                window.exp_form.downloadPhotoUser.style.filter = MAX_SCALE_EFFECT[0];
            } else if (target.classList.contains(window.exp_form.EFFECTS[i])) {
                window.exp_form.effectLevel.classList.remove('hidden');
                window.exp_form.downloadPhotoUser.style.filter = MAX_SCALE_EFFECT[i];
            };
        };
    });
    
    /*обработчик перемещения маркера*/
    window.exp_form.sliderHandle.addEventListener ('mousedown', function (evt) {
        evt.preventDefault();
        
        /*начальные координаты маркера*/
        var startCoords = {
            x: evt.clientX,
            y: evt.clientY
        };
        
        /*функция движения мыши с маркером*/
        var onMouseMove = function (moveEvt) {
            moveEvt.preventDefault();
            
            /*новое расположение маркера*/
            var newLocation = {
                x: startCoords.x - moveEvt.clientX,
                y: startCoords.y - moveEvt.clientY
            };
            
            /*перезаписываем начальные координаты маркера*/
            startCoords = {
                x: moveEvt.clientX,
                y: moveEvt.clientY
            };
            
            /*позиция маркера относительно шкалы эффекта*/
            var positionMarker = (window.exp_form.sliderHandle.offsetLeft - newLocation.x);
            /*атрибут позиционирования*/
            window.exp_form.sliderHandle.style.left = positionMarker + 'px';
            /*шкала заполнения эффекта по маркеру*/
            window.exp_form.depth.style.width = positionMarker + 'px';
            
            /*соотношения для фильтров*/
            var valueChromeSepia = (positionMarker/window.exp_form.sliderHandleParent.offsetWidth).toFixed(1);
            var valuePhobos = (3 * (positionMarker/window.exp_form.sliderHandleParent.offsetWidth)).toFixed(1);
            var depthWidth = window.exp_form.sliderHandle.style.left;
            var valueMarvinHeat = Math.round(parseInt(depthWidth)/(window.exp_form.sliderHandleParent.offsetWidth / 100));
            
            /*значения фильтров при перетаскивании маркера*/
            var scaleEffect = [
                'none',
                'grayscale(' + valueChromeSepia + ')',
                'sepia(' + valueChromeSepia + ')',
                'invert(' + valueMarvinHeat + '%)',
                'blur(' + valuePhobos + 'px)',
                'brightness(' + valueMarvinHeat + '%)'
            ];
            
            /*цикл для присваивания фильтра изображению*/
            for (var j = 0; j < window.exp_form.effectBox.children.length; j++) {
                if (window.exp_form.downloadPhotoUser.classList.contains(window.exp_form.EFFECTS[j])){
                    window.exp_form.downloadPhotoUser.style.filter = scaleEffect[j];
                }
            };
            
            /*проверка на границы передвижения маркера*/
            if (positionMarker <= 0) {
                window.exp_form.sliderHandle.style.left = 0;
            } else if (positionMarker >= window.exp_form.sliderHandleParent.offsetWidth) {
                window.exp_form.sliderHandle.style.left = window.exp_form.sliderHandleParent.offsetWidth + 'px';
            };
        };
        
        /*функция бросания маркера*/
        var onMouseUp = function (upEvt) {
            upEvt.preventDefault();
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };
        
        /*запускают обработчики движения и бросания маркера*/
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
}());
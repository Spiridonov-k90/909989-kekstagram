'use strict';
(function (){
    
    var ERROR_COLOR = 'red';
    var MAX_NUMBER_HASHTAG = 5;
    
    /*Проверка поля ввода Хэштегов*/
    window.exp_form.hashtags.addEventListener('change', function (){
        if (window.exp_form.hashtags.value) {
            var hashtagsValue = window.exp_form.hashtags.value.toLowerCase().trim();
            var hashtagsArray = hashtagsValue.split(' ');
            var hashtagsArrayElement;
            
            if (hashtagsArray.length > MAX_NUMBER_HASHTAG) {
                window.exp_form.hashtags.setCustomValidity('Максимальное кол-во хэштегов не больше 5');
                window.exp_form.hashtags.style.outlineColor = window.exp_form.ERROR_COLOR;
                return;
            } else if (window.exp_form.checkDoubleHashtag(hashtagsArray)) {
                window.exp_form.hashtags.setCustomValidity('Хэштеги не могут повторятся');
                window.exp_form.hashtags.style.outlineColor = window.exp_form.ERROR_COLOR;
                return;
            };
            
            for (var i = 0; i < hashtagsArray.length; i++) {
                hashtagsArrayElement = hashtagsArray[i].split('');
                
                if (window.exp_form.checkStartHashtag(hashtagsArrayElement[0])){
                    window.exp_form.hashtags.setCustomValidity('Хэштеги должны начинаться с #');
                    window.exp_form.hashtags.style.outlineColor = window.exp_form.ERROR_COLOR;
                    return;
                } else if (window.exp_form.checkHashtagMaxLength(hashtagsArrayElement)) {
                    window.exp_form.hashtags.setCustomValidity('Длина хэштега не может быть более 20 символов, включая #');
                    window.exp_form.hashtags.style.outlineColor = window.exp_form.ERROR_COLOR;
                    return;
                } else if (window.exp_form.checkHashtagMinLength(hashtagsArrayElement)) {
                    window.exp_form.hashtags.setCustomValidity('Хэштег не может состоять только из #');
                    window.exp_form.hashtags.style.outlineColor = window.exp_form.ERROR_COLOR;
                    return;
                } else if (window.exp_form.checkDoubleMarker(hashtagsArrayElement)) {
                    window.exp_form.hashtags.setCustomValidity('Хэштеги содержат 2 символа - #');
                    window.exp_form.hashtags.style.outlineColor = window.exp_form.ERROR_COLOR;
                    return;
                } else if (!hashtagsArrayElement) {
                    window.exp_form.hashtags.setCustomValidity('');
                };
            };
            
            window.exp_form.hashtags.setCustomValidity('');
        };
    });
}());
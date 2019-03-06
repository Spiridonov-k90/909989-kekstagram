var textHashtags = '#Слон Кот #СлонТефтеля#Свинья # #слон #Солнце';

/*Функция проверки Хэш-тегов*/
var checkHashtag = function (place) {
    var allHashtags = place.value.split(' ');
    var marker = '#';
    var gap = '';
    var lengthWord = 2;
    var maxNum = 5;
    var maxLengthTag = 20;
    var errorMessage = 'Не соответствует требованиям: начинается с символа #; не может состоять только из #; разделяются пробелами; длина одного хэш-тега 20';
    
    if (allHashtags) {
        /*Проверка тегов на заданные параметры*/
        var checkErrorsHashtag = ( function () {
            if (allHashtags.length <= maxNum) {
                 var checkOptions = ( function () {
                     for (var i = 0; i < allHashtags.length; i++) {
                        if (allHashtags[i].length >= lengthWord && allHashtags[i].charAt('0') == marker && allHashtags[i].indexOf('#') == allHashtags[i].lastIndexOf('#') && allHashtags[i].length <= maxLengthTag) {
                            place.setCustomValidity('');
                        } else if (allHashtags[i] == gap) {
                            allHashtags = false;
                            break;
                        } else {
                            place.setCustomValidity(errorMessage);
                            break;
                        };
                    };
                 }());
            } else {
                place.setCustomValidity('Превышино кол-во Хэш-тегов: допускается не более ' + maxNum);
            };
            /*Проверка тегов на повторение*/
            var checkDoubleHashtag = ( function () {
                var toOneType = function () {
                    var newTextDescription = [];
                    for (var i = 0; i < allHashtags.length; i++) {
                        var index = allHashtags[i].toUpperCase();
                        newTextDescription.push(index);
                    };
                    return newTextDescription;
                };
                var firstExp = toOneType();
                for (var j = 0; j < firstExp.length; j++) {
                    for (var k = j + 1; k < firstExp.length; k++) {
                        if (firstExp[j] == firstExp[k]) {
                            place.setCustomValidity('Используются одинаковые Хэш-теги');
                            break;
                        }
                    };
                };
            }());
        }());
    } else {
        place.setCustomValidity('');
    }
};

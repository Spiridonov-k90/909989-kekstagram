'use strict';
(function () {
    var pictureBig = document.querySelector('.big-picture');
    var tagBody = document.querySelector('body');
    var bigPictureCancel = document.querySelector('.big-picture__cancel');
    var pictures = document.querySelector('.pictures');
    var minPhoto = document.querySelectorAll('.picture__img');
    var uploadFile = document.querySelector('#upload-file');
    var imgUpload = document.querySelector('.img-upload__overlay');
    var uploadFileCancel = document.querySelector('#upload-cancel');
    var socialComments = document.querySelector('.social__comments');
    
    var ESC_CODE = 27; /*кнопка Esc*/
    var ENTER_CODE = 13; /*кнопка Enter*/
    
    var removeCommentsUserstoBigPhoto = function () {
        while(socialComments.lastChild) {
            socialComments.removeChild(socialComments.lastChild);
        };
    };
    removeCommentsUserstoBigPhoto();
    
    /*Клик на миниатюру для открытия большого изображения*/
    pictures.addEventListener('click', function(evt) {
        var target = evt.target; /*нижний элемент где произойдет событие*/
        var elementParent = target.parentNode; /* элемент <a>, родитель target*/
        var pictureBigImg = document.querySelector('.big-picture__img img');

        if (target.tagName != 'IMG' || elementParent.nodeName != 'A') {
            return;
        };
        
        evt.preventDefault();
        pictureBigImg.src = target.src;
        pictureBig.classList.remove('hidden');
        tagBody.classList.add('modal-open');
        
        var addCommentsUserstoBigPhoto = function () {
    
            var getElement = function (tagName, className, text) {
                var element = document.createElement(tagName);
                element.classList.add(className);
                if (text) {
                    element.textContent = text;
                };
                return element;
            };

            var userItem, userPhoto, userText;

            for (var i = 0; i < window.exp_gallery.allPhoto.length; i++) {
                if (target.src.indexOf(window.exp_gallery.allPhoto[i].url) > 0) {
                    for (var j = 0; j < window.exp_gallery.allPhoto[i].comments.length; j++) {
                        userItem = getElement('li', 'social__comment');
                        userPhoto = getElement('img', 'social__picture');
                        userPhoto.src = window.exp_gallery.allPhoto[i].comments[j].avatar;
                        userPhoto.alt = 'Аватар комментатора фотографии';
                        userPhoto.width = 35;
                        userPhoto.height = 35;
                        userItem.appendChild(userPhoto);
                        userText = getElement('p', 'social__text', window.exp_gallery.allPhoto[i].comments[j].message);
                        userItem.appendChild(userText);
                        socialComments.appendChild(userItem);
                    };
                };
            };
        };
        addCommentsUserstoBigPhoto();
    });
    
    /*Закрытие большого изображения при помощи кнопки "Х"*/
    bigPictureCancel.addEventListener('click', function (){
        pictureBig.classList.add('hidden');
        tagBody.classList.remove('modal-open');
        removeCommentsUserstoBigPhoto();
    });
    
    /*Закрытие большого изображения и форма редактирования изображения при помощи "ESC"*/
    document.addEventListener('keydown', function (evt){
        if(evt.keyCode === ESC_CODE){
            pictureBig.classList.add('hidden');
            tagBody.classList.remove('modal-open');
            imgUpload.classList.add('hidden');
            removeCommentsUserstoBigPhoto();
        }
    });
    
    /*Событие: отображение формы редактирования*/
    uploadFile.addEventListener('change', function(){
        imgUpload.classList.remove('hidden');
        tagBody.classList.add('modal-open');
    });
    
    /*Событие: клик на кнопку закрытия формы редактирования*/
    uploadFileCancel.addEventListener('click', function (){
        imgUpload.classList.add('hidden');
        tagBody.classList.remove('modal-open');
    });
}());

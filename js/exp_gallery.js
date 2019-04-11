'use strict';
(function () {
    var AVATAR_SIZE = '35';
    var MAX_SLIDER_VALUE = 100;
    var FIRST_NUMBER_ARRAY = 0;
    var AMOUNT_PHOTOS = 10;
    var DEBOUNCE_INTERVAL = 500;
    
    var pictures = document.querySelector('.pictures');
    var template = document.querySelector('#picture').content
    
    var photosList;
    
    /*cоздание создание фотографий*/
    var renderPhoto = function (generatedPhoto, number) {
        var photoElement = template.cloneNode(true);
        var pictures = document.querySelector('.picture');    
//        picture.dataset.id = number;

        photoElement.querySelector('.picture__img').src = generatedPhoto.url;
        photoElement.querySelector('.picture__comments').textContent = generatedPhoto.comments.length;
        photoElement.querySelector('.picture__likes').textContent = generatedPhoto.likes;

        return photoElement;
    };

    /*функция удачной загрузки*/
    var onSaccesHandler = function (photos) {
        var fragment = document.createDocumentFragment();
        
        window.exp_gallery.allPhoto = photos;
        
        photosList = photos;
        
        photos.forEach(function (photo, j) {        
          fragment.appendChild(renderPhoto(photo, j));
        });

        pictures.appendChild(fragment);
        imgFiltersElement.classList.remove('img-filters--inactive');
    };
    
    /*функция вывода ошибки*/
    var onErrorHandler = function (errorMessage) {
        var nodeElement = document.createElement('div');
        nodeElement.style = 'z-index: 100; margin: 100px auto; text-align: center; min-height: 45px; background-color: #3c3614;';
        nodeElement.style.position = 'absolute';
        nodeElement.style.left = 0;
        nodeElement.style.right = 0;
        nodeElement.style.fontSize = '40px';
        nodeElement.style.lineHeight = '40px';

        nodeElement.textContent = errorMessage;
        document.body.insertAdjacentElement('afterbegin', nodeElement);
    };
    
    /*запрос с сервера информации*/
    window.exp_backend.loadData(onSaccesHandler, onErrorHandler);
    
    /*работа с выборками: популярные, новые, обсуждаемые*/
    var imgFiltersElement = document.querySelector('.img-filters');
    var uploadFormElement = document.querySelector('.img-upload');
    
    var buttonPopularElement = imgFiltersElement.querySelector('#filter-popular');  
    var buttonNewElement = imgFiltersElement.querySelector('#filter-new');
    var buttonDiscussedElement = imgFiltersElement.querySelector('#filter-discussed');
    
    /*активная кнопка - отражает выбранный фильтр*/
    var buttonActiveElement = buttonPopularElement;
    
    var createPosts = function (arrayName) {
        pictures.innerHTML = '';

        var fragment = document.createDocumentFragment();
        arrayName.forEach(function (element, j) {
          fragment.appendChild(renderPhoto(element, j));
        });

        pictures.appendChild(uploadFormElement);
        pictures.appendChild(fragment);
    };
    
    var getRandomNewArray = function (arrayName) {
        var randomNewArray = arrayName
        .sort(function () {
          return 0.5 - Math.random();
        })
        .slice(FIRST_NUMBER_ARRAY, AMOUNT_PHOTOS);

        window.exp_gallery.allPhoto = randomNewArray;
        return randomNewArray;
    };
    
    var getDiscussedArray = function (arrayName) {
        var discussedArray = arrayName.sort(function (first, second) {
        return second.comments.length - first.comments.length;
        });

        window.exp_gallery.allPhoto = discussedArray;
        return discussedArray;
    };
    
    var debounce = function (cb) {
    var lastTimeout;

    return function () {
        var args = arguments;

        if (lastTimeout) {
            window.clearTimeout(lastTimeout);
        };

        lastTimeout = window.setTimeout(function () {
            cb.apply(cb, args);
        }, DEBOUNCE_INTERVAL);
        };
    };
    
    var activationCommentsList = function (target) {
        buttonActiveElement.classList.remove('img-filters__button--active');
        buttonActiveElement = target;
        buttonActiveElement.classList.add('img-filters__button--active');
    };
    
    var debouncedCreatePosts = debounce(createPosts);
    
    imgFiltersElement.addEventListener('click', function (evt) {
        var target = evt.target;

        var popularArray = photosList.slice(0);
        window.exp_gallery.allPhoto = popularArray;

        if (target === 'BUTTON') {
          return;
        }

        if (target === buttonPopularElement) {
          activationCommentsList(target);
          debouncedCreatePosts(popularArray);
        } else if (target === buttonNewElement) {
          activationCommentsList(target);
          debouncedCreatePosts(getRandomNewArray(popularArray));
        } else if (target === buttonDiscussedElement) {
          activationCommentsList(target);
          debouncedCreatePosts(getDiscussedArray(popularArray));
        }
      });
    
    /*Счетчик комментариев скрыт*/
    var socialComments = document.querySelector('.social__comments');
    var socialCommentCount = document.querySelector('.social__comment-count');
    var commentLoader = document.querySelector('.comments-loader');
    socialCommentCount.classList.add('visually-hidden');
    commentLoader.classList.add('visually-hidden');
    
    window.exp_gallery = {
        allPhoto: [],
        socialComments: socialComments
    };
}());
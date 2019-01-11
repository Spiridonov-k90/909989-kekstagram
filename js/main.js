/*Массив комментариев пользователей*/
var NAMES = ['Олька', 'Александра', 'Евгений', 'Борис', 'Коля', 'Ирина'];
/*Массив комментариев пользователей*/
var USERS_COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

/*ПУНКТ №1 - Массив комментариев к фотографии*/
var getCommentsItem = function (name, comment) {
    'use strict';
    var commentsItem = [], randomAvatar;
    for (var i = 0; i < name.length; i++) {
        randomAvatar = Math.ceil(Math.random() * comment.length);
        commentsItem[i] = {
            avatar: 'img/avatar-' + randomAvatar + '.svg',
            message: comment[Math.floor(Math.random() * comment.length)],
            name: name[i]
        };
    }
    return commentsItem;
};
var fullCommentsItem = getCommentsItem(NAMES, USERS_COMMENTS);

/*ПУНКТ №1 - Создание массива фото пользователей*/
var photoInfo = {
    totalPhoto: 25,
    minLikes: 15,
    maxLikes: 200,
    maxComments: 2
};
var getAllPhoto = function (content) {
    'use strict';
    var Photos = [], numberLikes, commentsList;
    for (var i = 0; i < content.totalPhoto; i++) {
        numberLikes = Math.floor(Math.random() * (content.maxLikes - content.minLikes + 1)) + content.minLikes;
        commentsList = [];
        for (var j = 0; j < content.maxComments; j++) {
            var indexComment = Math.floor(Math.random() * fullCommentsItem.length);
            commentsList.push(fullCommentsItem[indexComment]);
        }
        Photos[i] = {
            url: 'photos/' + (i + 1) + '.jpg',
            likes: numberLikes,
            comments: commentsList
        };
    }
    return Photos;
};
var allPhoto = getAllPhoto(photoInfo);

/*ПУНКТ №2,3 - Создание DOM-элемента (самовызывающаяся функция)*/
var getDomElement = function () {
    'use strict';
    var pictures = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();
    var template = document.querySelector('#picture').content.querySelector('a');
    var element, img, pictureInfo, pictureComments, pictureLikes, newDomElement;
    for (var i = 0; i < allPhoto.length; i++) {
        element = template.cloneNode(true);
        img = element.children[0];
        img.src = allPhoto[i].url;
        pictureInfo = element.children[1];
        pictureComments = pictureInfo.children[0];
        pictureComments.textContent = allPhoto[i].comments.length;
        pictureLikes = pictureInfo.children[1];
        pictureLikes.textContent = allPhoto[i].likes;
        fragment = pictures.appendChild(element);
    }
    newDomElement = fragment;
    return newDomElement;
};
getDomElement();

/*ПУНКТ №4 - Показал элемент big-picture первого элемента*/
var pictureBig = document.querySelector('.big-picture');
pictureBig.classList.remove('hidden');
/*Показал первую picture*/
var pictureBigImg = document.querySelector('.big-picture__img');
pictureBigImg.children[0].src = allPhoto[0].url;
/*Показал количество likes*/
var pictureLikeCount = document.querySelector('.likes-count');
pictureLikeCount.textContent = allPhoto[0].likes;
/*Показал количество comments*/
var pictureCommentCount = document.querySelector('.comments-count');
pictureCommentCount.textContent = allPhoto[0].comments.length;

var getSocialComments = function () {
    'use strict';
    var socialComments = document.querySelector('.social__comments');
    var fragment = document.createDocumentFragment();
/*Создаю элемент*/
    var makeElement = function (tagName, className, text) {
        var element = document.createElement(tagName);
        element.classList.add(className);
        if (text) {
            element.textContent = text;
        }
        return element;
    };

/*Создаю комментарии к большой фотографии*/
    var createCard = function (product) {
        var listItem = makeElement('li', 'social__comment');
        var picture = makeElement('img', 'social__picture');
        picture.src = product.avatar;
        picture.alt = 'Аватар комментатора фотографии';
        picture.width = 35;
        picture.height = 35;
        listItem.appendChild(picture);
        var text = makeElement('p', 'social__text', product.message);
        listItem.appendChild(text);

        return listItem;
    };

/*Заполняю фотографии комментариями*/
    var cardItem;
    for (var i = 0; i < allPhoto[i].comments.length; i++) {
        cardItem = createCard(fullCommentsItem[i]);
        fragment.appendChild(cardItem);
    }
    return socialComments.appendChild(fragment);
};
getSocialComments();

/*ПУНКТ №5 - Спрятал счетчик комментариев*/
var socialCommentCount = document.querySelector('.social__comment-count');
var commentLoader = document.querySelector('.comments-loader');
socialCommentCount.classList.add('visually-hidden');
commentLoader.classList.add('visually-hidden');

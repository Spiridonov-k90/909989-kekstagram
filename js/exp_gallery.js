'use strict';
(function () {
    
    var NAMES = ['Олька', 'Александра', 'Евгений', 'Борис', 'Коля', 'Ирина'];

    var USERS_COMMENTS = [
        'Всё отлично!',
        'В целом всё неплохо. Но не всё.',
        'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
        'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
        'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
        'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
    ];
    
    var userComment = function (name, comment) {
        var commentsItem = [];
        var randomAvatar;

        for (var i = 0; i < name.length; i++) {
            randomAvatar = Math.ceil(Math.random() * comment.length);
            commentsItem[i] = {
                avatar: 'img/avatar-' + randomAvatar + '.svg',
                message: comment[Math.floor(Math.random() * comment.length)],
                name: name[i]
            };
        };
        return commentsItem;
    };
    var allUserComment = userComment(NAMES, USERS_COMMENTS);
    
    /*Массив фотографий*/
    var photoInfo = {
        totalPhoto: 25,
        minLikes: 15,
        maxLikes: 200,
        maxComments: 2
    };
    
    var getAllPhoto = function () {
        var photos = [];
        var totalLikes; 
        var commentsList = [];
        var indexComment;

        for (var i = 0; i < photoInfo.totalPhoto; i++) {
            totalLikes = Math.floor(Math.random() * (photoInfo.maxLikes - photoInfo.minLikes + 1)) + photoInfo.minLikes;
            var commentsList = [];

            for (var j = 0; j < photoInfo.maxComments; j++) {
                indexComment = Math.floor(Math.random() * allUserComment.length);
                commentsList.push(allUserComment[indexComment]);
            };
            photos[i] = {
                url: 'photos/' + (i + 1) + '.jpg',
                likes: totalLikes,
                comments: commentsList
            };
        };
        return photos;
    };
    var allPhoto = getAllPhoto();
    
    /*Создание DOM-элемента*/
    var getPhotoBlock = function () {
        var pictures = document.querySelector('.pictures');
        var fragment = document.createDocumentFragment();
        var template = document.querySelector('#picture').content.querySelector('a');
        var element, img, pictureInfo, pictureComments, pictureLikes, PhotoBlock;

        for (var i = 0; i < allPhoto.length; i++) {
            element = template.cloneNode(true);
            img = element.querySelector('img');
            img.src = allPhoto[i].url;
            pictureInfo = element.querySelector('.picture__info');
            pictureComments = pictureInfo.children[0];
            pictureComments.textContent = allPhoto[i].comments.length;
            pictureLikes = pictureInfo.children[1];
            pictureLikes.textContent = allPhoto[i].likes;
            fragment = pictures.appendChild(element);
        };
        PhotoBlock = fragment;
        return PhotoBlock;
    };
    getPhotoBlock();

    /*Счетчик комментариев скрыт*/
    var socialComments = document.querySelector('.social__comments');
    var socialCommentCount = document.querySelector('.social__comment-count');
    var commentLoader = document.querySelector('.comments-loader');
    socialCommentCount.classList.add('visually-hidden');
    commentLoader.classList.add('visually-hidden');
    
    window.exp_gallery = {
        allPhoto: allPhoto,
        socialComments: socialComments
    };
}());
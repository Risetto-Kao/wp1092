let displayJson = {
    'version': '0.0.1',
    'entity': [{
            'id': '1-1',
            'source': 'https://imgur.com/pxx72Dgl.jpg',
            'image': 'images/page1.jpeg',
            'backId': 'start',
            'nextId': '1-2'
        },
        {
            'id': '1-2',
            'source': 'https://imgur.com/sLQwTJPl.jpg',
            'image': 'images/page2.jpeg',
            'backId': '1-1',
            'nextId': '1-3'
        },
        {
            'id': '1-3',
            'source': 'https://imgur.com/ufc4PpRl.jpg',
            'image': 'images/page3.jpeg',
            'backId': '1-2',
            'nextId': '1-4'
        },
        {
            'id': '1-4',
            'source': 'https://imgur.com/yo0R5my.jpg',
            'image': 'images/page4.jpeg',
            'backId': '1-3',
            'nextId': '1-5'
        },
        {
            'id': '1-5',
            'source': 'https://imgur.com/zDv9siR.jpg',
            'backId': '1-4',
            'image': 'images/page5.jpeg',
            'nextId': '1-6'
        },

        {
            'id': '2-1',
            'source': 'https://imgur.com/KxsQube.png',
            'image': 'images/page2_1.jpeg',
            'backId': '1-6',
            'nextId': '2-2'
        },
        {
            'id': '2-2',
            'source': 'https://imgur.com/lI05jUd.png',
            'image': 'images/page2_2.jpeg',
            'backId': '2-1',
            'nextId': '2-3'
        },
        {
            'id': '2-3',
            'source': 'https://imgur.com/8PFiQZ1.png',
            'backId': '2-2',
            'image': 'images/page2_3.jpeg',
            'nextId': '2-4'
        },
        {
            'id': '2-4',
            'source': 'https://i.imgur.com/BK1up9W.png',
            'backId': '2-3',
            'image': 'images/page2_4.png',
            'nextId': '2-5'
        },
        {
            'id': '2-5',
            'source': 'https://imgur.com/UkEvcIB.png',
            'backId': '2-4',
            'image': 'images/page2_5.jpeg',
            'nextId': '2-6'
        },
        {
            'id': '2-6',
            'source': 'https://imgur.com/iQpqv5T.png',
            'backId': '2-5',
            'image': 'images/page2_6.jpeg',
            'nextId': '2-7'
        },
        {
            'id': '2-7',
            'source': 'https://i.imgur.com/EbPsDLX.png',
            'backId': '2-6',
            'image': 'images/page2_7.png',
            'nextId': '2-8'
        },

        {
            'id': '2-8',
            'source': 'https://i.imgur.com/y3lImlx.jpg',
            'backId': '2-7',
            'image': 'images/page2_8.jpeg',
            'nextId': 'end'
        },

    ]
}

let displayImage = document.getElementById('display');
let source = document.getElementById('source');
let toBackImage = document.getElementById('backImage');
let toNextImage = document.getElementById('nextImage');
let tmp = -1;

toBackImage.addEventListener(
    'click',
    () => changeImage('back')
)
toNextImage.addEventListener(
    'click',
    () => changeImage('next')
)

let changeImage = function(action) {
    displayImage.style.background = 'images/loading.gif';
    this.action = action;
    if (action == 'next') { tmp += 1; } else if (action == 'back') { tmp -= 1; } else { console.log('something got wrong!') }
    displayImage.src = displayJson['entity'][tmp]['image'];
    source.href = displayJson['entity'][tmp]['source'];
    source.innerHTML = displayJson['entity'][tmp]['source'];
    if (tmp == displayJson['entity'].length - 1) {
        toNextImage.style.visibility = 'hidden';
    } else if (tmp == 0) {
        toBackImage.style.visibility = 'hidden';
    } else {
        toNextImage.style.visibility = 'visible';
        toBackImage.style.visibility = 'visible';
    }
    console.log(tmp);
}
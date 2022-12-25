
const APIkeyNASA = "MozyPWsgu67qpyKIZDXEfdBVVXW9CLn95HO9GJN4"
let curSliderPos = 0
let curModeShow = 'asset' // asset | nasa

const imgList = [
    'gory_sneg_sumerki_194740_1920x1080.jpg',
    'lanscape-snow-winter-mountain.jpg',
    'molniia_groza_noch_143598_1920x1080.jpg',
    'more_zakat_gorizont_131804_1920x1080.jpg',
    'ozero_zakat_gorizont_126424_1920x1080.jpg',
    'peizazh-kamni-pustynia-pesok.jpg',
    'solntse_zakat_okean_204642_1280x1024.jpg',
    'zakat-zima-sneg-2.jpg'
]

let nasaImgList = [];

function validPosition(direction, pictList) {
    if (direction === 'forward') {
        curSliderPos++
    } else if (direction === 'back') {
        curSliderPos--
    }
    if (curSliderPos < 0) {
        curSliderPos = pictList.length + curSliderPos
    } else if (curSliderPos > pictList.length - 1) {
        curSliderPos = 0
    }
    console.log(curSliderPos)
}
// let imgTag = document.getElementsByClassName("image-wrapper")[0].children[0];

function stepHandler(direction) {
    let imgTag = document.getElementsByClassName("image-wrapper")[0].children[0];

    if (curModeShow === 'asset') {
        animation_fade = imgTag.animate([
            {opacity: 1},
            {opacity: 0}
        ], {
            duration: 500,
            iterations: 1,
        })
        animation_fade.play()
        // console.log('fade!')
        setTimeout(function () {
            validPosition(direction, imgList)
            imgTag.setAttribute("src", `./asset/${imgList[curSliderPos]}`)
        }, 450)
        animation_show = imgTag.animate([
            {opacity: 0},
            {opacity: 1}
        ], {
            duration: 500,
            iterations: 1,
            delay: 500
        })
        animation_show.play()  
        return
    } else if (curModeShow === 'nasa') {
        animation_fade = imgTag.animate([
            {opacity: 1},
            {opacity: 0}
        ], {
            duration: 1000,
            iterations: 1,
        })
        setTimeout(function () {
            validPosition(direction, nasaImgList)
            imgTag.setAttribute("src", nasaImgList[curSliderPos])
    
        }, 600)
        return
    }
}

// input.addEventListener('click', logKey);

// function logKey(e) {
//   log.textContent += ` ${e.code}`;
// }


document.getElementsByClassName("slider-btn-forward")[0].addEventListener('click', function (e) {
        stepHandler('forward')
}, false);

document.addEventListener('keydown', function (e) {
    if (e.code === "ArrowRight") {
    stepHandler('forward')
    }
}, false);

document.getElementsByClassName("slider-btn-back")[0].addEventListener('click', function(e) {
        stepHandler('back')
}, false);

document.addEventListener('keydown', function (e) {
    if (e.code === "ArrowLeft") {
    stepHandler('forward')
    }
}, false);

document.getElementsByClassName("slider-btn-forward")[1].addEventListener('click', function(e) {
        stepHandler('forward')
}, false);

document.getElementsByClassName("slider-btn-back")[1].addEventListener('click', function(e) {
        stepHandler('back')
}, false);


// change mode to 'nasa'
btnNasa.addEventListener('click', function(e) {
    let imgTag = document.getElementsByClassName("image-wrapper")[0].children[0];
    // Убрать тэг изображения
    imgTag.style.display = "none"
    imgTag.setAttribute("src", null)
    // Добавить анимашку загрузки, пока не дойдут изображения наса
    let loaderContainer = document.getElementsByClassName("hide-div")[0]
    loaderContainer.style.display = 'flex'

}, false);

btnNasa.addEventListener('click', function(e) {
    nasaImgList = [];
    let loaderContainer = document.getElementsByClassName("hide-div")[0];
    let imgTag = document.getElementsByClassName("image-wrapper")[0].children[0];
    let json = fetch(`https://api.nasa.gov/planetary/apod?api_key=${APIkeyNASA}&count=20`).then(response => response.json()).then(data => {
        console.log(data);
        // curModeShow = 'nasa'
        for (let obj of data) {
            console.log(obj.url)
            nasaImgList.push(obj.url)
        }
    }).then( () => {
        curSliderPos = 0
        curModeShow = 'nasa'
        imgTag.setAttribute("src", nasaImgList[0])
        loaderContainer.style.display = 'none'
        imgTag.style.display = "block"
    })
}, false)

// change mode to asset
btnAsset.addEventListener('click', function(e) {
    let imgTag = document.getElementsByClassName("image-wrapper")[0].children[0];
    let loaderContainer = document.getElementsByClassName("hide-div")[0]
    imgTag.style.display = "block";
    loaderContainer.style.display = 'none';
    curSliderPos = 0
    curModeShow = 'asset'
    imgTag.setAttribute("src", `./asset/${imgList[0]}`)
}, false);
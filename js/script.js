
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

let json = fetch(`https://api.nasa.gov/planetary/apod?api_key=${APIkeyNASA}&count=20`).then(response => response.json()).then(data => {
    // console.log(data);
    for (let obj of data) {
        // console.log(obj.url)
        nasaImgList.push(obj.url)
    }
})

// console.log(nasaImgList)

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


function stepHandler(direction) {
    let imgTag = document.getElementsByClassName("image-wrapper")[0].children[0];
    if (curModeShow === 'asset') {
        validPosition(direction, imgList)
        imgTag.setAttribute("src", `./asset/${imgList[curSliderPos]}`)
        return
    } else if (curModeShow === 'nasa') {
        validPosition(direction, nasaImgList)
        console.log(nasaImgList[curSliderPos])
        imgTag.setAttribute("src", nasaImgList[curSliderPos])
        return
    }
    
}

document.getElementsByClassName("slider-btn-forward")[0].addEventListener('click', function (e) {
        stepHandler('forward')
}, false);

document.getElementsByClassName("slider-btn-back")[0].addEventListener('click', function(e) {
        stepHandler('back')
}, false);


stepForwardDop.addEventListener('click', function(e) {
        stepHandler('forward')
}, false);

stepBackDop.addEventListener('click', function(e) {
        stepHandler('back')
}, false);


// change mode to 'nasa'
btnNasa.addEventListener('click', function(e) {
    let imgTag = document.getElementsByClassName("image-wrapper")[0].children[0];
    curSliderPos = 0
    curModeShow = 'nasa'
    imgTag.setAttribute("src", nasaImgList[0])
}, false);

// change mode to asset
btnAsset.addEventListener('click', function(e) {
    let imgTag = document.getElementsByClassName("image-wrapper")[0].children[0];
    curSliderPos = 0
    curModeShow = 'asset'
    imgTag.setAttribute("src", `./asset/${imgList[0]}`)
}, false);
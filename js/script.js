
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

//init asset
let imgTag = document.getElementsByClassName("image-wrapper")[0].children[0];
preLoadImg(imgList)

let nasaImgList = [];

function validPosition(direction, pictList) {
    let imgTag = document.getElementsByClassName("image-wrapper")[0].children[curSliderPos]
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
    let previosImgTag = imgTag;
    imgTag = document.getElementsByClassName("image-wrapper")[0].children[curSliderPos]
    return [imgTag, previosImgTag]
}

function stepHandler(direction) {
    if (curModeShow === 'asset') {
        let [imgTag, previosImgTag] = validPosition(direction, imgList)
        previosImgTag.style.display = 'none'
        imgTag.style.display = 'block'
        return
        
    } else if (curModeShow === 'nasa') {
        let [imgTag, previosImgTag] = validPosition(direction, nasaImgList)
        previosImgTag.style.display = 'none'
        imgTag.style.display = 'block'
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

function deletePreviousModeImg() {
    let imgWrapTag = document.getElementsByClassName("image-wrapper")[0];
    console.log(imgWrapTag.children)
    while (imgWrapTag.firstChild) {
        imgWrapTag.removeChild(imgWrapTag.firstChild);
      }

}

function preLoadImg(pictList) {
    const parentImgTag = document.getElementsByClassName("image-wrapper")[0]
    console.log(pictList)
    for (let img in pictList) {
        let newImgTag = document.createElement("img")
        parentImgTag.appendChild(newImgTag)
        console.log(pictList[img])
        if (curModeShow === 'asset') {
            newImgTag.setAttribute("src", `./asset/${imgList[img]}`)
        } else if (curModeShow === 'nasa') {
            newImgTag.setAttribute("src", pictList[img])
        }
        newImgTag.style.display = img !== "0" ? 'none' : 'block'
    }
}

btnNasa.addEventListener('click', function(e) {
    nasaImgList = [];
    let loaderContainer = document.getElementsByClassName("hide-div")[0];
    let imgTag = document.getElementsByClassName("image-wrapper")[0].children[0];
    deletePreviousModeImg();
    let json = fetch(`https://api.nasa.gov/planetary/apod?api_key=${APIkeyNASA}&count=20`).then(response => response.json()).then(data => {
        for (let obj of data) {
            nasaImgList.push(obj.url)
            imgTag.setAttribute("src", nasaImgList[0])
        }
    }).then( () => {
        curSliderPos = 0
        curModeShow = 'nasa'
        
        preLoadImg(nasaImgList)
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
    deletePreviousModeImg()
    preLoadImg(imgList)

}, false);
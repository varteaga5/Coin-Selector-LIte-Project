// Welcome to the Coin Selector Lite! 
// My first project on the way to becoming a Software Engineer!
// init function that is called when DOM content is loaded
function init() {
    coinListener();
    subListener();
    heartClickEvent();
}
// global variable: select existing coin-name div  
const existingDiv = document.querySelector('#coin-display');

function coinListener() {
    // assign variable value of the option from select dropdown
    const selectedCoin = document.querySelector("#coin-choices")
    selectedCoin.addEventListener('change', coinChosen)
}
function coinChosen(e) {
    if (!e.target.value) {
        //clear out div
        existingDiv.style.display = 'none';
    }
    if (e.target.value === 'Bitcoin') {
        // clears display
        document.querySelector('#coin-display').innerHTML = ''
        // use if statements to name out each
        existingDiv.style.display = 'block';
        // display coin image
        renderCoinImg(e.target.value);
        // display coin price
        displayPrice(e.target.value);
    }
    if (e.target.value === 'Litecoin') {
        // clears display
        document.querySelector('#coin-display').innerHTML = ''
        // use if statements to name out each
        existingDiv.style.display = 'block';
        // display coin image
        renderCoinImg(e.target.value);
        // display coin price
        displayPrice(e.target.value);
    }
    if (e.target.value === 'Ethereum') {
        // clears display
        document.querySelector('#coin-display').innerHTML = ''
        // use if statements to name out each
        existingDiv.style.display = 'block';
        // display coin image
        renderCoinImg(e.target.value);
        // display coin price
        displayPrice(e.target.value);
    }
}
// submit button event listener
function subListener() {
    const submitBtn = document.querySelector('#sub-btn')
    submitBtn.addEventListener('click', clickedSubmit)
}
function clickedSubmit(e) {
    e.preventDefault();
    // grab text inside the comment box
    const textBox = document.querySelector('#text-box')
    // create p element
    const pElement = document.createElement('p')
    pElement.innerHTML = textBox.value;
    // grab ul element
    const ul = document.querySelector('ul')
    // attach li
    ul.append(pElement)
    textBox.value = ''
}
// global hearts 
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// user clicks on empty heart
function heartClickEvent() {
    heart = document.querySelector('.like-btn')
    heart.addEventListener('click', heartClick)
}
function heartClick(e) {
    // theres a full heart change to empty heart 
    if (e.target.innerHTML === FULL_HEART) {
        emptyHeart(e);
        return;
    } else {
        // fill in empty heart
        fillInHeart(e)
    }
}
// sets innerHTML
function fillInHeart(e) {
    e.target.innerHTML = FULL_HEART;
}
// sets innerHTML
function emptyHeart(e) {
    e.target.innerHTML = EMPTY_HEART;
}

// display coin image
function renderCoinImg(coinName) {
    // create element
    const coinImg = document.createElement('img')
    // insert src att into coin img 
    coinImg.src = returnImgFilePath(coinName);
    // add created div to html
    existingDiv.append(coinImg);
}
// returns relative file path for chosen coin
function returnImgFilePath(coinName) {
    if (coinName === 'Bitcoin') {
        return './Bitcoin_logo.svg'
    }
    if (coinName === 'Litecoin') {
        return './litecoin logo.png'
    }
    if (coinName === 'Ethereum') {
        return './220px-Ethereum-icon-purple.svg.png'
    }
}
// display coin price
function displayPrice(name) {
    // create element 
    const pPrice = document.createElement('p');
    pPrice.setAttribute('id', 'coin-price')
    pPrice.innerHTML = 'Current Price: $$';
    // append to existing div
    existingDiv.append(pPrice);
    priceFetch(name);
}
// fetch data from coinbase
async function priceFetch(coinName) {
    // pass in a coin name and display appropriate price
    // fetchs with code name inserted into url string from coin gecko API
    await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinName}&vs_currencies=usd`)
        .then(resp => resp.json())
        .then(data => renderPrices(data, coinName))
}
// formats data from coin gecko
function renderPrices(dataObj, coinName) {
    // get raw price
    let rawPrice = dataObj[coinName.toLowerCase()]['usd']
    // number formatter that adds in appropriate comments
    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    // format raw price
    const price = formatNumber(rawPrice)
    // grab price p element
    const priceElement = document.querySelector('#coin-price')
    priceElement.innerHTML = 'Current Price: $' + price;

}

document.addEventListener('DOMContentLoaded', init);

// // display heart like icon
// function heartLike(newSpan) {
//     // create element
//     const aLike = document.createElement('a');
//     // assign class
//     aLike.classList.add('like-btn')
//     // add heart
//     aLike.innerHTML = ' &#x2661; '
//     // insert into span
//     newSpan.append(aLike);
// }
// // display comment box
// function commentBox(newSpan) {
//     // create element
//     const box = document.createElement('INPUT')
//     // set type
//     box.setAttribute('type', 'text');
//     // set place holder
//     box.setAttribute('placeholder', 'comment here')
//     // insert into span
//     newSpan.append(box);
// }
// // display submit button
// function submitBtn(newSpan) {
//     // create element
//     const subBtn = document.createElement('INPUT');
//     // set type to submit
//     subBtn.setAttribute('type', 'submit');
//     // insert into span
//     newSpan.append(subBtn);
// }

// // like and unlike functionality
// function likeBtn() {

// }

// submit comment functionality

// need to show one coin div at a time, 
// // append these to a span, then append to existing div
// function createSpan() {
//     const newSpan = document.createElement('span')
//     existingDiv.append(newSpan);
//     // add created div to html
//     heartLike(newSpan);
//     commentBox(newSpan);
//     submitBtn(newSpan);
// }
// // create coin label
// function coinLabel(coinName){
//     // create coin div
//     const coinDiv = document.createElement('div')
//     // add id
//     coinDiv.setAttribute('id', `${coinName}`)
//     // create label div element
//     const labelDiv = document.createElement('div');
//     // insert coin name to new div
//     labelDiv.innerHTML = coinName;
//     // add created div to html
//     coinDiv.append(labelDiv);
//     existingDiv.append(coinDiv);
// }
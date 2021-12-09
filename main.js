(function () { /* snowflakes */
    const SELECTORS = {
        container: '.snowflakes-container'
    }
    const TEMPLATES = {
        snowflake: '<div class="snowflake"></div>',
        snowflakeEffect: '<div class="snowflake-effect">${text}</div>',
    };
    const ELEMENTS = {
        container: null
    }
    const IMAGES = ['krutki.png', 'mandarin1.png', 'snowflake1.png', 'snowflake2.png', 'snowflake3.png', 'snowflake4.png', 'snowflake5.png']
    const clickableImages = ['krutki.png', 'mandarin1.png'];
    let snowflakes = [];

    function randomMinMax(min, max) {
        return (Math.random() * (max - min)) + min;
    }

    function snowflakesInitialization() {
        ELEMENTS.container = document.querySelector(SELECTORS.container);

        snowflakeGenerationInterval();
        snowflakeFallInterval();
        snowflakeClicks();
        generateFewSnowflakes();
    }

    function generateFewSnowflakes() {
        const count = 3;
        Array(count).fill(0).forEach(function (el, index) {
            setTimeout(function () {
                createSnowflake(100 * ((index)/count) + '%');
            }, index * 55)
        });
    }

    function snowflakeClicks() {
        document.addEventListener('click', function (e) {
            let target = e.target;
            if (target.classList.contains('snowflake')) {
                let text = '';
                let rect = target.getBoundingClientRect();
                if (target.classList.contains('krutki')) {
                    Naggetsovna.addKrutki(1);
                    text = 'КРУТОЧКА';
                } else if (target.classList.contains('mandarin1')) {
                    text = 'НЯМНЯМ';
                }
                let template = MIXINS.buildTemplate(TEMPLATES.snowflakeEffect, {text: text});
                let el = MIXINS.appendTemplate(ELEMENTS.container, template)[0];
                el.style.top = rect.top + 'px';
                el.style.left = rect.left + 'px';
                target.remove();
                setTimeout(function () {
                    el.remove();
                }, 3000)
            }
        })
    }

    function snowflakeFallInterval() {
        let timeToMove = 7000;
        let interval = 5;
        let snowflakeMovementSpeed = 100 / (timeToMove / interval);
        setInterval(function () {
            snowflakes.forEach(function (el) {
                let currentTop = el.style.top ? parseFloat(el.style.top) : 0;
                if (currentTop >= 105) {
                    el.remove();
                }
                el.style.top = currentTop + snowflakeMovementSpeed + '%';
            });

            snowflakes = snowflakes.filter(function (el) {
                return el.parentElement
            });
        }, interval)


    }

    function snowflakeGenerationInterval() {
        let interval = 50;
        const timeToCreateMin = 500;
        const timeToCreateMax = 2000;
        let currentTime = 0;
        let timeToCreate = randomMinMax(timeToCreateMin, timeToCreateMax);
        setInterval(function () {
            currentTime += interval;
            if (currentTime >= timeToCreate) {
                currentTime = 0;
                createSnowflake();
                timeToCreate = randomMinMax(timeToCreateMin, timeToCreateMax);
            }
        }, interval);
    }

    function createSnowflake(top) {
        let template = MIXINS.buildTemplate(TEMPLATES.snowflake, {})
        let snowflakeElement = MIXINS.appendTemplate(ELEMENTS.container, template)[0];
        let image = IMAGES[Math.floor(Math.random() * IMAGES.length)];
        let imagePath = 'assets/' + image;
        if (clickableImages.includes(image)) {
            snowflakeElement.classList.add('clickable');
            snowflakeElement.classList.add(image.replace('.png', ''));
        }
        snowflakeElement.style.backgroundImage = `url("${imagePath}")`;
        snowflakeElement.style.left = `${randomMinMax(0, 100)}%`;
        snowflakeElement.style.top = top || `-5%`;

        snowflakes.push(snowflakeElement);
    }


    window.snowflakesInitialization = snowflakesInitialization;
})();

function initializeFourthPageButton(){
    let buttonEl = document.querySelector('.fourth-page .button');
    let elementToShow = document.querySelector('.fourth-page .anya');
    buttonEl.addEventListener('click',function () {
        elementToShow.classList.add('show');
    })
}

let lastPageInterval = 0;
function resetLastPage(){
    let screens = document.querySelectorAll('.sixth-page .screen');
    let counter = 5;
    let counterElement = document.querySelector('.sixth-page span')
    screens[0].classList.add('show');
    screens[1].classList.remove('show');
    counterElement.innerHTML = ''+counter;
    clearInterval(lastPageInterval);
    lastPageInterval = setInterval(function () {
        counter--;
        if(!counter){
            screens[1].classList.add('show');
            screens[0].classList.remove('show');
            clearInterval(lastPageInterval);
        }else{
            counterElement.innerHTML = ''+counter;
        }
    },1000)
}

document.addEventListener('DOMContentLoaded', function () {
    window.snowflakesInitialization();

    initializeFourthPageButton();

    new fullScroll({
        mainElement : 'main',
        sections : 'section',
        animateTime : 0.7,
        animateFunction : 'ease',
        currentPosition: 0,
        displayDots: true
    });


    window.addEventListener("hashchange", function () {
        let position = +location.hash.replace('#', '').split('/')[0];
        if(position == 5){
            resetLastPage();
        }
    }, false);
})
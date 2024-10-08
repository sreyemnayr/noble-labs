/* Template Name: Upwind - Tailwind CSS Landing Page Template
   Author: Shreethemes
   Email: support@shreethemes.in
   Website: https://shreethemes.in
   Version: 1.7.0
   Created: March 2022
   File Description: Common JS file of the template(plugins.init.js)
*/


/***********************************/
/*         INDEX                   */
/*==================================
 *     01.  Tobii lightbox         * (For Portfolio pages)
 *     02.  Data Counter           *
 *     03.  Typed Text animation   *
 *     04.  Back Button            *
 ==================================*/

//=========================================//
/*/*            01) Tobii lightbox         */
//=========================================//

try {
    const tobii = new Tobii()
} catch (err) {

}

//=========================================//
/*/*            03) Data Counter           */
//=========================================//

function doCounter() {
try {
    const counter = document.querySelectorAll('.counter-value');
    const speed = 10; // The lower the slower

    counter.forEach(counter_value => {
        const updateCount = () => {
            const target = +parseInt(counter_value.getAttribute('data-target'));
            const count = +parseInt(counter_value.innerText);

            // Lower inc to slow and higher to slow
            var inc = (target-count) / speed;

            if (inc < 1) {
                inc = 1;
            }
            console.log(count);
            console.log(target);
            console.log(inc);

            // Check if target is reached
            if (count < target) {
                
                // Add inc to count and output in counter_value
                counter_value.innerText = (count + inc).toFixed(0);
                // Call function every ms
                setTimeout(updateCount, 100);
            } else {
                counter_value.innerText = target;
            }
        };

        updateCount();
    });
} catch (err) {

}
}


//=========================================//
/*/* 03) Typed Text animation (animation) */
//=========================================//

try {
    var TxtType = function (el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function () {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];
        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
        this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';
        var that = this;
        var delta = 200 - Math.random() * 100;
        if (this.isDeleting) { delta /= 2; }
        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }
        setTimeout(function () {
            that.tick();
        }, delta);
    };

    function typewrite() {
        if (toRotate === 'undefined') {
            changeText()
        }
        else
            var elements = document.getElementsByClassName('typewrite');
        for (var i = 0; i < elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
                new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid transparent}";
        document.body.appendChild(css);
    };
    window.onload(typewrite());
} catch(err) {

}

//=========================================//
/*/*            04) Back Button            */
//=========================================//
document.getElementsByClassName("back-button")[0]?.addEventListener("click", (e)=>{
    if (document.referrer !== "") {
        e.preventDefault();
        window.location.href = document.referrer;
      }
})


if(document.getElementsByClassName('tiny-two-item').length > 0) {
    var slider = tns({
        container: '.tiny-two-item',
        controls: true,
        mouseDrag: true,
        loop: true,
        rewind: true,
        autoplay: true,
        autoplayButtonOutput: false,
        autoplayTimeout: 3000,
        navPosition: "bottom",
        controlsText: ['<i class="mdi mdi-chevron-left "></i>', '<i class="mdi mdi-chevron-right"></i>'],
        nav: false,
        speed: 400,
        gutter: 0,
        responsive: {
            768: {
                items: 2
            },
        },
    });
};

if(document.getElementsByClassName('tiny-three-item').length > 0) {
    var slider = tns({
        container: '.tiny-three-item',
        controls: true,
        mouseDrag: true,
        loop: true,
        rewind: true,
        autoplay: true,
        autoplayButtonOutput: false,
        autoplayTimeout: 3000,
        navPosition: "bottom",
        controlsText: ['<i class="mdi mdi-chevron-left "></i>', '<i class="mdi mdi-chevron-right"></i>'],
        nav: false,
        speed: 400,
        gutter: 0,
        responsive: {
            768: {
                items: 3
            },
        },
    });
};

function observeHandler(ob) {
    ob.forEach((el) => {
      el.target.style.opacity = ob[0].intersectionRatio;
    });
  };

  let counterStarted = false;

  function counterObserveHandler(ob) {
    if(ob[0].intersectionRatio > 0){
        if(!counterStarted){
            doCounter();
        }
        counterStarted = true;
    }
    
  }

  let options = {
    root: document,
    rootMargin: '0px',
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
  }

  counterOptions = {
    root: document,
    rootMargin: '0px',
    threshold: [1]
  }
  
  let observer = new IntersectionObserver(observeHandler, options);

  let counterObserver = new IntersectionObserver(counterObserveHandler, counterOptions);
  
  counterObserver.observe(document.getElementById('counterDiv'));
  
  let els = document.querySelectorAll('[data-observe]');
  
  els.forEach((el) => {
    observer.observe(el);
  });
// 1) Burger menu  		-----------------------------------------------
// 2) Anchores 			-----------------------------------------------
// 3) Animate cube  	-----------------------------------------------
// 4) Counter 			-----------------------------------------------
// 5) Animate holo		-----------------------------------------------
// 6) Slider			-----------------------------------------------
// 7) Product Buy		-----------------------------------------------
// 8) Parallax effect 	-----------------------------------------------


// 1)
// Burger menu START
const header = document.querySelector('.top__header');
const nav = document.querySelector('.nav');

header.addEventListener('click', function (e) {
	let target = e.target;
	while(this) {
		if(target.classList.contains('burger')) {
			nav.classList.add('nav-active');
			return;
		} else if(target.classList.contains('close')) {
			nav.classList.remove('nav-active');
			return;
		} else {
			target = target.parentNode;
		}
	}
});
// Burger menu END

// --------------------------------------------------------------

// 2)
// Anchores START
const anchors = document.querySelectorAll('a[href*="#"]');

for (let anchor of anchors) {
	const blockID = anchor.getAttribute('href');

	anchor.addEventListener('click', function (e) {
    	e.preventDefault();
    	let target = e.target;
    

		for(let anchor of anchors) {
			if(anchor === target) {
				target.parentNode.classList.add('active');
			} else {
				anchor.parentNode.classList.remove('active');
			}
		}
	    
	    window.scrollTo({
			top: document.querySelector('' + blockID).offsetTop - 100,
			behavior: "smooth"
		});
	});
}
// Anchores END

// --------------------------------------------------------------

// 3)
// Animate cube START
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = Math.max(
	document.body.scrollHeight, document.documentElement.scrollHeight,
	document.body.offsetHeight, document.documentElement.offsetHeight,
	document.body.clientHeight, document.documentElement.clientHeight
);

let particleCount = 100;
let particles = [];

function init() {
	for (let i = 0; i < particleCount; i++) {
	  createParticle();
	}
}

function createParticle() {
	let newParticle = new Particle();
	newParticle.initialize();
	particles.push(newParticle);
}

function Particle() {
	this.initialize = function() {
	  this.x = Math.random() * width;
	  this.y = Math.random() * height + height;
	  this.v = 5 + Math.random() * 5;
	  this.s = 5 + Math.random() * 5;
	}

	this.update = function () {
	  this.x += Math.sin(this.s);
	  this.s -= 0.1;
	  this.y -= this.v * 0.5;
	  if (this.isOutOfBounds()) {
	    this.initialize();
	  }
	}

	this.draw = function () {
	  ctx.fillRect(this.x, this.y, 6, 6);
	  ctx.fillStyle = "#FFF";
	  ctx.fill();
	}

	this.isOutOfBounds = function () {
	  return ((this.x < 0) || (this.x > width) || (this.y < 0) || (this.y > height));
	}
}

function render() {
	ctx.clearRect(0, 0, width, height);
	for (let i = 0; i < particles.length; i++) {
	  particles[i].update();
	  particles[i].draw();
	}
	requestAnimationFrame(render);
}

window.addEventListener('resize', resize);

function resize() {
	width = canvas.width = window.innerWidth;
	height = canvas.height = window.innerHeight;
}

init();
render();
// Animate cube END

// --------------------------------------------------------------

// 4)
// Counter START
/*var clearFunc = 1;
$(window).on('scroll', function(){
	$('#counter').each(function(){
		var ePosition = $(this).offset().top,
			topWindow = $(window).scrollTop();
		if(ePosition < topWindow + 400){
			if(clearFunc < 2){
				$('.count').each(function(){
					var i = 1,
						that = $(this),
						num = that.data('num');
					var int = setInterval(function(){
						if(i <= num){
							that.html(`${i}<span>%</span>`);
						} else {
							clearFunc = clearFunc + 2;
							clearInterval(int);
						};

						i += 1;
					}, 1000);
				});
			};
		};
	});
});*/
// Counter END

// --------------------------------------------------------------

// 5)
// Animate holo START
const svgEl = document.querySelector('#holoone');
let myAnimation = new LazyLinePainter(svgEl, {
	"ease": "easeLinear",
	"strokeWidth": 1,
	"strokeOpacity": 1,
	"strokeColor": "#5b5aec"
});
myAnimation.paint(); 
// Animate holo END

// --------------------------------------------------------------

// 6)
// Slider START
const blockSlider = document.querySelector('.product__list');
const elemSlider = blockSlider.querySelectorAll('.product_item');

let elemWidth = elemSlider[0].offsetWidth;
let elemCount = elemSlider.length;

let scroll = 1;

blockSlider.ontouchstart = function (e) {
	let target = e.target;

	while(true) {
		if(target.tagName === 'UL') {
			let swipeStart = e.changedTouches[0].clientX;
			console.log(swipeStart);

			blockSlider.ontouchend = function(ev) {
				let swipeEnd = ev.changedTouches[0].clientX;
				console.log(swipeEnd);
				if(-(elemWidth * (elemCount - 1)) < -target.style.transform.replace(/\D+/g,"")) {
					if(swipeStart > swipeEnd) {
						console.log(target);
						target.style.transform = `translateX(-${scroll += elemWidth}px)`;
					}
				}
				
				if(swipeStart < swipeEnd) {
					console.log(target);
					target.style.transform = `translateX(-${scroll -= elemWidth}px)`;
				}
			}
			return;
		} else {
			target = target.parentNode;
		}
	}

	/*while(this) {
		if(target.tagName === 'UL') {
			let swipeStart = e.changedTouches[0].clientX;

			blockSlider.ontouchmove = function (e) {
				moveAt(e, swipeStart);
			};

			blockSlider.ontouchend = function() {
				blockSlider.ontouchmove = null;
				blockSlider.ontouchup = null;
			}
			return;
		} else {
			target = target.parentNode;
		}
	}
	
	

	function moveAt(e, swipeStart) {
		let target = e.target;
		let swipeMove = e.changedTouches[0].clientX;

		while(true) {
			if(target.tagName === 'UL') 
				break;
			else
				target = target.parentNode;
			
		}

		if(-(elemWidth * (elemCount - 1)) < -target.style.transform.replace(/\D+/g,"")) {
			if(e.changedTouches[0].clientX < swipeStart) {
				if(e.changedTouches[0].clientX > swipeMove) 
					target.style.transform = `translateX(-${scroll -= 15}px)`;
				else if(e.changedTouches[0].clientX < swipeMove) 
					target.style.transform = `translateX(-${scroll += 15}px)`;
				else 
					target.style.transform = `translateX(-${scroll += 15}px)`;
			}
		}

		if(e.changedTouches[0].clientX > swipeStart) {
			if(e.changedTouches[0].clientX > swipeMove) 
				target.style.transform = `translateX(-${scroll -= 15}px)`;
			else if(e.changedTouches[0].clientX < swipeMove) 
				target.style.transform = `translateX(-${scroll += 15}px)`;
			else 
				target.style.transform = `translateX(-${scroll -= 15}px)`;
		}
		
	}*/

};
// Slider END

// --------------------------------------------------------------

// 7)
// Product Buy START
const product = document.querySelector('.product');
product.onclick = function (e) {
	let target = e.target; 

	while(target != product) {
		if(target.classList.contains('buy_close')) {
			let block = target.parentNode.parentNode;
			product.removeChild(block);
		} else if(target.tagName === 'BUTTON') {

			let block = target.parentNode.parentNode;
			let data = {
				src: block.querySelector('.product_img').src,
				name: block.querySelector('.product_name').innerHTML,
				price: target.innerHTML
			}

			open(data);

			return;
		} else {
			target = target.parentNode;
		}
	}

	function open({src, name, price}) {
		let template = document.createElement('div');
		template.classList.add('buy');
		template.innerHTML = `
            <div class="buy__header">
                <span class="buy_close">
                    <svg version="1.1" class="close" id="close" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 47.971 47.971" xml:space="preserve">
                        <g>
                            <path d="M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,19.744L5.121,0.88
                                c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,18.864L0.879,42.85c-1.172,1.171-1.172,3.071,0,4.242
                                C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,47.091c0.586,0.586,1.354,0.879,2.121,0.879
                                s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242L28.228,23.986z"/>
                        </g>
                    </svg>
                </span>
                <h2 class="buy_title">Покупка</h2>
            </div>
            <div class="buy__article">
                <img class="buy_img" src="${src}" alt="">
                <div class="buy__desc">
                    <div>
                        <p><span>Товар:</span>${name}</p>
                    </div>
                    <div >
                        <p><span>Цена:</span>${price}</p>
                    </div>
                </div>
            </div>
            <form class="buy__form" name="buy">
                <div class="buy__block">
                    <div class="buy__row">
                        <label for="name">Имя и Фамилия:</label>
                        <input type="text" id="name">
                    </div>
                    <div class="buy__row">
                        <label for="phone">Контактный номер:</label>
                        <input type="phone" id="phone">
                    </div>
                    <div class="buy__row">
                        <label for="email">Электронная почта:</label>
                        <input type="email" id="email">
                    </div>
                </div>
                <input class="buy_submit" name="sub" type="submit" value="Купить">
            </form>
		`;

		product.appendChild(template);

		let btn = document.forms.buy.elements.sub;

		let form = document.forms.buy;

		form.onsubmit = function (e) {
			e.preventDefault();
			let formData = new FormData(form);
			formData.append('name', name);
			formData.append('price', price);

			fetch('./php/mail.php', {
			  method: 'POST',
			  body: formData
			});
			alert('Спасибо за покупку! Мы с вами свяжемся в ближайшее время!');
		}
		
	}


}
// Product Buy END

// --------------------------------------------------------------

// 8)
// Parallax effect START
$('.desc').on('mousemove', function(e){
	let width = $('.desc').width();
	let height = $('.desc').height();

	let offsetX = 2 - e.pageX / width;
	let offsetY = 1.5 - e.pageY / height;

	$('.parallax').each(function(i, el){
		var offset = parseInt($(el).data('offset'));

		var position = Math.round(offsetX * offset) + 'px, ' + Math.round(offsetY * offset) + 'px';

		$(el).css({'transform': `translate(${position})`});
	});
});
// Parallax effect END
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIDEpIEJ1cmdlciBtZW51ICBcdFx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gMikgQW5jaG9yZXMgXHRcdFx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gMykgQW5pbWF0ZSBjdWJlICBcdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIDQpIENvdW50ZXIgXHRcdFx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gNSkgQW5pbWF0ZSBob2xvXHRcdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIDYpIFNsaWRlclx0XHRcdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIDcpIFByb2R1Y3QgQnV5XHRcdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIDgpIFBhcmFsbGF4IGVmZmVjdCBcdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5cclxuLy8gMSlcclxuLy8gQnVyZ2VyIG1lbnUgU1RBUlRcclxuY29uc3QgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvcF9faGVhZGVyJyk7XHJcbmNvbnN0IG5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXYnKTtcclxuXHJcbmhlYWRlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcblx0bGV0IHRhcmdldCA9IGUudGFyZ2V0O1xyXG5cdHdoaWxlKHRoaXMpIHtcclxuXHRcdGlmKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2J1cmdlcicpKSB7XHJcblx0XHRcdG5hdi5jbGFzc0xpc3QuYWRkKCduYXYtYWN0aXZlJyk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH0gZWxzZSBpZih0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjbG9zZScpKSB7XHJcblx0XHRcdG5hdi5jbGFzc0xpc3QucmVtb3ZlKCduYXYtYWN0aXZlJyk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRhcmdldCA9IHRhcmdldC5wYXJlbnROb2RlO1xyXG5cdFx0fVxyXG5cdH1cclxufSk7XHJcbi8vIEJ1cmdlciBtZW51IEVORFxyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbi8vIDIpXHJcbi8vIEFuY2hvcmVzIFNUQVJUXHJcbmNvbnN0IGFuY2hvcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdhW2hyZWYqPVwiI1wiXScpO1xyXG5cclxuZm9yIChsZXQgYW5jaG9yIG9mIGFuY2hvcnMpIHtcclxuXHRjb25zdCBibG9ja0lEID0gYW5jaG9yLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xyXG5cclxuXHRhbmNob3IuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgXHRlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBcdGxldCB0YXJnZXQgPSBlLnRhcmdldDtcclxuICAgIFxyXG5cclxuXHRcdGZvcihsZXQgYW5jaG9yIG9mIGFuY2hvcnMpIHtcclxuXHRcdFx0aWYoYW5jaG9yID09PSB0YXJnZXQpIHtcclxuXHRcdFx0XHR0YXJnZXQucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRhbmNob3IucGFyZW50Tm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdCAgICBcclxuXHQgICAgd2luZG93LnNjcm9sbFRvKHtcclxuXHRcdFx0dG9wOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcnICsgYmxvY2tJRCkub2Zmc2V0VG9wIC0gMTAwLFxyXG5cdFx0XHRiZWhhdmlvcjogXCJzbW9vdGhcIlxyXG5cdFx0fSk7XHJcblx0fSk7XHJcbn1cclxuLy8gQW5jaG9yZXMgRU5EXHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuLy8gMylcclxuLy8gQW5pbWF0ZSBjdWJlIFNUQVJUXHJcbmxldCBjYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdjYW52YXMnKTtcclxubGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG5cclxubGV0IHdpZHRoID0gY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbmxldCBoZWlnaHQgPSBjYW52YXMuaGVpZ2h0ID0gTWF0aC5tYXgoXHJcblx0ZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQsIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxIZWlnaHQsXHJcblx0ZG9jdW1lbnQuYm9keS5vZmZzZXRIZWlnaHQsIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5vZmZzZXRIZWlnaHQsXHJcblx0ZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQsIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHRcclxuKTtcclxuXHJcbmxldCBwYXJ0aWNsZUNvdW50ID0gMTAwO1xyXG5sZXQgcGFydGljbGVzID0gW107XHJcblxyXG5mdW5jdGlvbiBpbml0KCkge1xyXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgcGFydGljbGVDb3VudDsgaSsrKSB7XHJcblx0ICBjcmVhdGVQYXJ0aWNsZSgpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlUGFydGljbGUoKSB7XHJcblx0bGV0IG5ld1BhcnRpY2xlID0gbmV3IFBhcnRpY2xlKCk7XHJcblx0bmV3UGFydGljbGUuaW5pdGlhbGl6ZSgpO1xyXG5cdHBhcnRpY2xlcy5wdXNoKG5ld1BhcnRpY2xlKTtcclxufVxyXG5cclxuZnVuY3Rpb24gUGFydGljbGUoKSB7XHJcblx0dGhpcy5pbml0aWFsaXplID0gZnVuY3Rpb24oKSB7XHJcblx0ICB0aGlzLnggPSBNYXRoLnJhbmRvbSgpICogd2lkdGg7XHJcblx0ICB0aGlzLnkgPSBNYXRoLnJhbmRvbSgpICogaGVpZ2h0ICsgaGVpZ2h0O1xyXG5cdCAgdGhpcy52ID0gNSArIE1hdGgucmFuZG9tKCkgKiA1O1xyXG5cdCAgdGhpcy5zID0gNSArIE1hdGgucmFuZG9tKCkgKiA1O1xyXG5cdH1cclxuXHJcblx0dGhpcy51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XHJcblx0ICB0aGlzLnggKz0gTWF0aC5zaW4odGhpcy5zKTtcclxuXHQgIHRoaXMucyAtPSAwLjE7XHJcblx0ICB0aGlzLnkgLT0gdGhpcy52ICogMC41O1xyXG5cdCAgaWYgKHRoaXMuaXNPdXRPZkJvdW5kcygpKSB7XHJcblx0ICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xyXG5cdCAgfVxyXG5cdH1cclxuXHJcblx0dGhpcy5kcmF3ID0gZnVuY3Rpb24gKCkge1xyXG5cdCAgY3R4LmZpbGxSZWN0KHRoaXMueCwgdGhpcy55LCA2LCA2KTtcclxuXHQgIGN0eC5maWxsU3R5bGUgPSBcIiNGRkZcIjtcclxuXHQgIGN0eC5maWxsKCk7XHJcblx0fVxyXG5cclxuXHR0aGlzLmlzT3V0T2ZCb3VuZHMgPSBmdW5jdGlvbiAoKSB7XHJcblx0ICByZXR1cm4gKCh0aGlzLnggPCAwKSB8fCAodGhpcy54ID4gd2lkdGgpIHx8ICh0aGlzLnkgPCAwKSB8fCAodGhpcy55ID4gaGVpZ2h0KSk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW5kZXIoKSB7XHJcblx0Y3R4LmNsZWFyUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcclxuXHRmb3IgKGxldCBpID0gMDsgaSA8IHBhcnRpY2xlcy5sZW5ndGg7IGkrKykge1xyXG5cdCAgcGFydGljbGVzW2ldLnVwZGF0ZSgpO1xyXG5cdCAgcGFydGljbGVzW2ldLmRyYXcoKTtcclxuXHR9XHJcblx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcik7XHJcbn1cclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCByZXNpemUpO1xyXG5cclxuZnVuY3Rpb24gcmVzaXplKCkge1xyXG5cdHdpZHRoID0gY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcblx0aGVpZ2h0ID0gY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxufVxyXG5cclxuaW5pdCgpO1xyXG5yZW5kZXIoKTtcclxuLy8gQW5pbWF0ZSBjdWJlIEVORFxyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbi8vIDQpXHJcbi8vIENvdW50ZXIgU1RBUlRcclxuLyp2YXIgY2xlYXJGdW5jID0gMTtcclxuJCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbigpe1xyXG5cdCQoJyNjb3VudGVyJykuZWFjaChmdW5jdGlvbigpe1xyXG5cdFx0dmFyIGVQb3NpdGlvbiA9ICQodGhpcykub2Zmc2V0KCkudG9wLFxyXG5cdFx0XHR0b3BXaW5kb3cgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XHJcblx0XHRpZihlUG9zaXRpb24gPCB0b3BXaW5kb3cgKyA0MDApe1xyXG5cdFx0XHRpZihjbGVhckZ1bmMgPCAyKXtcclxuXHRcdFx0XHQkKCcuY291bnQnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHR2YXIgaSA9IDEsXHJcblx0XHRcdFx0XHRcdHRoYXQgPSAkKHRoaXMpLFxyXG5cdFx0XHRcdFx0XHRudW0gPSB0aGF0LmRhdGEoJ251bScpO1xyXG5cdFx0XHRcdFx0dmFyIGludCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdGlmKGkgPD0gbnVtKXtcclxuXHRcdFx0XHRcdFx0XHR0aGF0Lmh0bWwoYCR7aX08c3Bhbj4lPC9zcGFuPmApO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdGNsZWFyRnVuYyA9IGNsZWFyRnVuYyArIDI7XHJcblx0XHRcdFx0XHRcdFx0Y2xlYXJJbnRlcnZhbChpbnQpO1xyXG5cdFx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdFx0aSArPSAxO1xyXG5cdFx0XHRcdFx0fSwgMTAwMCk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH07XHJcblx0XHR9O1xyXG5cdH0pO1xyXG59KTsqL1xyXG4vLyBDb3VudGVyIEVORFxyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbi8vIDUpXHJcbi8vIEFuaW1hdGUgaG9sbyBTVEFSVFxyXG5jb25zdCBzdmdFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNob2xvb25lJyk7XHJcbmxldCBteUFuaW1hdGlvbiA9IG5ldyBMYXp5TGluZVBhaW50ZXIoc3ZnRWwsIHtcclxuXHRcImVhc2VcIjogXCJlYXNlTGluZWFyXCIsXHJcblx0XCJzdHJva2VXaWR0aFwiOiAxLFxyXG5cdFwic3Ryb2tlT3BhY2l0eVwiOiAxLFxyXG5cdFwic3Ryb2tlQ29sb3JcIjogXCIjNWI1YWVjXCJcclxufSk7XHJcbm15QW5pbWF0aW9uLnBhaW50KCk7IFxyXG4vLyBBbmltYXRlIGhvbG8gRU5EXHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuLy8gNilcclxuLy8gU2xpZGVyIFNUQVJUXHJcbmNvbnN0IGJsb2NrU2xpZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2R1Y3RfX2xpc3QnKTtcclxuY29uc3QgZWxlbVNsaWRlciA9IGJsb2NrU2xpZGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9kdWN0X2l0ZW0nKTtcclxuXHJcbmxldCBlbGVtV2lkdGggPSBlbGVtU2xpZGVyWzBdLm9mZnNldFdpZHRoO1xyXG5sZXQgZWxlbUNvdW50ID0gZWxlbVNsaWRlci5sZW5ndGg7XHJcblxyXG5sZXQgc2Nyb2xsID0gMTtcclxuXHJcbmJsb2NrU2xpZGVyLm9udG91Y2hzdGFydCA9IGZ1bmN0aW9uIChlKSB7XHJcblx0bGV0IHRhcmdldCA9IGUudGFyZ2V0O1xyXG5cclxuXHR3aGlsZSh0cnVlKSB7XHJcblx0XHRpZih0YXJnZXQudGFnTmFtZSA9PT0gJ1VMJykge1xyXG5cdFx0XHRsZXQgc3dpcGVTdGFydCA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WDtcclxuXHRcdFx0Y29uc29sZS5sb2coc3dpcGVTdGFydCk7XHJcblxyXG5cdFx0XHRibG9ja1NsaWRlci5vbnRvdWNoZW5kID0gZnVuY3Rpb24oZXYpIHtcclxuXHRcdFx0XHRsZXQgc3dpcGVFbmQgPSBldi5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYO1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKHN3aXBlRW5kKTtcclxuXHRcdFx0XHRpZigtKGVsZW1XaWR0aCAqIChlbGVtQ291bnQgLSAxKSkgPCAtdGFyZ2V0LnN0eWxlLnRyYW5zZm9ybS5yZXBsYWNlKC9cXEQrL2csXCJcIikpIHtcclxuXHRcdFx0XHRcdGlmKHN3aXBlU3RhcnQgPiBzd2lwZUVuZCkge1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyh0YXJnZXQpO1xyXG5cdFx0XHRcdFx0XHR0YXJnZXQuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoLSR7c2Nyb2xsICs9IGVsZW1XaWR0aH1weClgO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRcclxuXHRcdFx0XHRpZihzd2lwZVN0YXJ0IDwgc3dpcGVFbmQpIHtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKHRhcmdldCk7XHJcblx0XHRcdFx0XHR0YXJnZXQuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoLSR7c2Nyb2xsIC09IGVsZW1XaWR0aH1weClgO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0YXJnZXQgPSB0YXJnZXQucGFyZW50Tm9kZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qd2hpbGUodGhpcykge1xyXG5cdFx0aWYodGFyZ2V0LnRhZ05hbWUgPT09ICdVTCcpIHtcclxuXHRcdFx0bGV0IHN3aXBlU3RhcnQgPSBlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFg7XHJcblxyXG5cdFx0XHRibG9ja1NsaWRlci5vbnRvdWNobW92ZSA9IGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdFx0bW92ZUF0KGUsIHN3aXBlU3RhcnQpO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0YmxvY2tTbGlkZXIub250b3VjaGVuZCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdGJsb2NrU2xpZGVyLm9udG91Y2htb3ZlID0gbnVsbDtcclxuXHRcdFx0XHRibG9ja1NsaWRlci5vbnRvdWNodXAgPSBudWxsO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRhcmdldCA9IHRhcmdldC5wYXJlbnROb2RlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHRcclxuXHJcblx0ZnVuY3Rpb24gbW92ZUF0KGUsIHN3aXBlU3RhcnQpIHtcclxuXHRcdGxldCB0YXJnZXQgPSBlLnRhcmdldDtcclxuXHRcdGxldCBzd2lwZU1vdmUgPSBlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFg7XHJcblxyXG5cdFx0d2hpbGUodHJ1ZSkge1xyXG5cdFx0XHRpZih0YXJnZXQudGFnTmFtZSA9PT0gJ1VMJykgXHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHR0YXJnZXQgPSB0YXJnZXQucGFyZW50Tm9kZTtcclxuXHRcdFx0XHJcblx0XHR9XHJcblxyXG5cdFx0aWYoLShlbGVtV2lkdGggKiAoZWxlbUNvdW50IC0gMSkpIDwgLXRhcmdldC5zdHlsZS50cmFuc2Zvcm0ucmVwbGFjZSgvXFxEKy9nLFwiXCIpKSB7XHJcblx0XHRcdGlmKGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WCA8IHN3aXBlU3RhcnQpIHtcclxuXHRcdFx0XHRpZihlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFggPiBzd2lwZU1vdmUpIFxyXG5cdFx0XHRcdFx0dGFyZ2V0LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKC0ke3Njcm9sbCAtPSAxNX1weClgO1xyXG5cdFx0XHRcdGVsc2UgaWYoZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYIDwgc3dpcGVNb3ZlKSBcclxuXHRcdFx0XHRcdHRhcmdldC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgtJHtzY3JvbGwgKz0gMTV9cHgpYDtcclxuXHRcdFx0XHRlbHNlIFxyXG5cdFx0XHRcdFx0dGFyZ2V0LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKC0ke3Njcm9sbCArPSAxNX1weClgO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYoZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYID4gc3dpcGVTdGFydCkge1xyXG5cdFx0XHRpZihlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFggPiBzd2lwZU1vdmUpIFxyXG5cdFx0XHRcdHRhcmdldC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgtJHtzY3JvbGwgLT0gMTV9cHgpYDtcclxuXHRcdFx0ZWxzZSBpZihlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFggPCBzd2lwZU1vdmUpIFxyXG5cdFx0XHRcdHRhcmdldC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgtJHtzY3JvbGwgKz0gMTV9cHgpYDtcclxuXHRcdFx0ZWxzZSBcclxuXHRcdFx0XHR0YXJnZXQuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoLSR7c2Nyb2xsIC09IDE1fXB4KWA7XHJcblx0XHR9XHJcblx0XHRcclxuXHR9Ki9cclxuXHJcbn07XHJcbi8vIFNsaWRlciBFTkRcclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4vLyA3KVxyXG4vLyBQcm9kdWN0IEJ1eSBTVEFSVFxyXG5jb25zdCBwcm9kdWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2R1Y3QnKTtcclxucHJvZHVjdC5vbmNsaWNrID0gZnVuY3Rpb24gKGUpIHtcclxuXHRsZXQgdGFyZ2V0ID0gZS50YXJnZXQ7IFxyXG5cclxuXHR3aGlsZSh0YXJnZXQgIT0gcHJvZHVjdCkge1xyXG5cdFx0aWYodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYnV5X2Nsb3NlJykpIHtcclxuXHRcdFx0bGV0IGJsb2NrID0gdGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZTtcclxuXHRcdFx0cHJvZHVjdC5yZW1vdmVDaGlsZChibG9jayk7XHJcblx0XHR9IGVsc2UgaWYodGFyZ2V0LnRhZ05hbWUgPT09ICdCVVRUT04nKSB7XHJcblxyXG5cdFx0XHRsZXQgYmxvY2sgPSB0YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlO1xyXG5cdFx0XHRsZXQgZGF0YSA9IHtcclxuXHRcdFx0XHRzcmM6IGJsb2NrLnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0X2ltZycpLnNyYyxcclxuXHRcdFx0XHRuYW1lOiBibG9jay5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdF9uYW1lJykuaW5uZXJIVE1MLFxyXG5cdFx0XHRcdHByaWNlOiB0YXJnZXQuaW5uZXJIVE1MXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdG9wZW4oZGF0YSk7XHJcblxyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0YXJnZXQgPSB0YXJnZXQucGFyZW50Tm9kZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIG9wZW4oe3NyYywgbmFtZSwgcHJpY2V9KSB7XHJcblx0XHRsZXQgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHRcdHRlbXBsYXRlLmNsYXNzTGlzdC5hZGQoJ2J1eScpO1xyXG5cdFx0dGVtcGxhdGUuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnV5X19oZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYnV5X2Nsb3NlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHN2ZyB2ZXJzaW9uPVwiMS4xXCIgY2xhc3M9XCJjbG9zZVwiIGlkPVwiY2xvc2VcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgdmlld0JveD1cIjAgMCA0Ny45NzEgNDcuOTcxXCIgeG1sOnNwYWNlPVwicHJlc2VydmVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTI4LjIyOCwyMy45ODZMNDcuMDkyLDUuMTIyYzEuMTcyLTEuMTcxLDEuMTcyLTMuMDcxLDAtNC4yNDJjLTEuMTcyLTEuMTcyLTMuMDctMS4xNzItNC4yNDIsMEwyMy45ODYsMTkuNzQ0TDUuMTIxLDAuODhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjLTEuMTcyLTEuMTcyLTMuMDctMS4xNzItNC4yNDIsMGMtMS4xNzIsMS4xNzEtMS4xNzIsMy4wNzEsMCw0LjI0MmwxOC44NjUsMTguODY0TDAuODc5LDQyLjg1Yy0xLjE3MiwxLjE3MS0xLjE3MiwzLjA3MSwwLDQuMjQyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQzEuNDY1LDQ3LjY3NywyLjIzMyw0Ny45NywzLDQ3Ljk3czEuNTM1LTAuMjkzLDIuMTIxLTAuODc5bDE4Ljg2NS0xOC44NjRMNDIuODUsNDcuMDkxYzAuNTg2LDAuNTg2LDEuMzU0LDAuODc5LDIuMTIxLDAuODc5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgczEuNTM1LTAuMjkzLDIuMTIxLTAuODc5YzEuMTcyLTEuMTcxLDEuMTcyLTMuMDcxLDAtNC4yNDJMMjguMjI4LDIzLjk4NnpcIi8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZz5cclxuICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDxoMiBjbGFzcz1cImJ1eV90aXRsZVwiPtCf0L7QutGD0L/QutCwPC9oMj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidXlfX2FydGljbGVcIj5cclxuICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJidXlfaW1nXCIgc3JjPVwiJHtzcmN9XCIgYWx0PVwiXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnV5X19kZXNjXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+PHNwYW4+0KLQvtCy0LDRgDo8L3NwYW4+JHtuYW1lfTwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2ID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+PHNwYW4+0KbQtdC90LA6PC9zcGFuPiR7cHJpY2V9PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8Zm9ybSBjbGFzcz1cImJ1eV9fZm9ybVwiIG5hbWU9XCJidXlcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidXlfX2Jsb2NrXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ1eV9fcm93XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJuYW1lXCI+0JjQvNGPINC4INCk0LDQvNC40LvQuNGPOjwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwibmFtZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidXlfX3Jvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwicGhvbmVcIj7QmtC+0L3RgtCw0LrRgtC90YvQuSDQvdC+0LzQtdGAOjwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicGhvbmVcIiBpZD1cInBob25lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ1eV9fcm93XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJlbWFpbFwiPtCt0LvQtdC60YLRgNC+0L3QvdCw0Y8g0L/QvtGH0YLQsDo8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImVtYWlsXCIgaWQ9XCJlbWFpbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJidXlfc3VibWl0XCIgbmFtZT1cInN1YlwiIHR5cGU9XCJzdWJtaXRcIiB2YWx1ZT1cItCa0YPQv9C40YLRjFwiPlxyXG4gICAgICAgICAgICA8L2Zvcm0+XHJcblx0XHRgO1xyXG5cclxuXHRcdHByb2R1Y3QuYXBwZW5kQ2hpbGQodGVtcGxhdGUpO1xyXG5cclxuXHRcdGxldCBidG4gPSBkb2N1bWVudC5mb3Jtcy5idXkuZWxlbWVudHMuc3ViO1xyXG5cclxuXHRcdGxldCBmb3JtID0gZG9jdW1lbnQuZm9ybXMuYnV5O1xyXG5cclxuXHRcdGZvcm0ub25zdWJtaXQgPSBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdGxldCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShmb3JtKTtcclxuXHRcdFx0Zm9ybURhdGEuYXBwZW5kKCduYW1lJywgbmFtZSk7XHJcblx0XHRcdGZvcm1EYXRhLmFwcGVuZCgncHJpY2UnLCBwcmljZSk7XHJcblxyXG5cdFx0XHRmZXRjaCgnLi9waHAvbWFpbC5waHAnLCB7XHJcblx0XHRcdCAgbWV0aG9kOiAnUE9TVCcsXHJcblx0XHRcdCAgYm9keTogZm9ybURhdGFcclxuXHRcdFx0fSk7XHJcblx0XHRcdGFsZXJ0KCfQodC/0LDRgdC40LHQviDQt9CwINC/0L7QutGD0L/QutGDISDQnNGLINGBINCy0LDQvNC4INGB0LLRj9C20LXQvNGB0Y8g0LIg0LHQu9C40LbQsNC50YjQtdC1INCy0YDQtdC80Y8hJyk7XHJcblx0XHR9XHJcblx0XHRcclxuXHR9XHJcblxyXG5cclxufVxyXG4vLyBQcm9kdWN0IEJ1eSBFTkRcclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4vLyA4KVxyXG4vLyBQYXJhbGxheCBlZmZlY3QgU1RBUlRcclxuJCgnLmRlc2MnKS5vbignbW91c2Vtb3ZlJywgZnVuY3Rpb24oZSl7XHJcblx0bGV0IHdpZHRoID0gJCgnLmRlc2MnKS53aWR0aCgpO1xyXG5cdGxldCBoZWlnaHQgPSAkKCcuZGVzYycpLmhlaWdodCgpO1xyXG5cclxuXHRsZXQgb2Zmc2V0WCA9IDIgLSBlLnBhZ2VYIC8gd2lkdGg7XHJcblx0bGV0IG9mZnNldFkgPSAxLjUgLSBlLnBhZ2VZIC8gaGVpZ2h0O1xyXG5cclxuXHQkKCcucGFyYWxsYXgnKS5lYWNoKGZ1bmN0aW9uKGksIGVsKXtcclxuXHRcdHZhciBvZmZzZXQgPSBwYXJzZUludCgkKGVsKS5kYXRhKCdvZmZzZXQnKSk7XHJcblxyXG5cdFx0dmFyIHBvc2l0aW9uID0gTWF0aC5yb3VuZChvZmZzZXRYICogb2Zmc2V0KSArICdweCwgJyArIE1hdGgucm91bmQob2Zmc2V0WSAqIG9mZnNldCkgKyAncHgnO1xyXG5cclxuXHRcdCQoZWwpLmNzcyh7J3RyYW5zZm9ybSc6IGB0cmFuc2xhdGUoJHtwb3NpdGlvbn0pYH0pO1xyXG5cdH0pO1xyXG59KTtcclxuLy8gUGFyYWxsYXggZWZmZWN0IEVORCJdLCJmaWxlIjoibWFpbi5qcyJ9

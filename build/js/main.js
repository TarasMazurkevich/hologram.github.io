// 1) Burger menu  	-----------------------------------------------
// 2) Anchores 		-----------------------------------------------
// 3) Animate cube  -----------------------------------------------
// 4) Counter 		-----------------------------------------------
// 5) Animate holo	-----------------------------------------------
// 6) Slider		-----------------------------------------------
// 7) Product Buy	-----------------------------------------------


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

	while(this) {
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
		
	}

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIDEpIEJ1cmdlciBtZW51ICBcdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIDIpIEFuY2hvcmVzIFx0XHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAzKSBBbmltYXRlIGN1YmUgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIDQpIENvdW50ZXIgXHRcdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIDUpIEFuaW1hdGUgaG9sb1x0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gNikgU2xpZGVyXHRcdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIDcpIFByb2R1Y3QgQnV5XHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuXHJcbi8vIDEpXHJcbi8vIEJ1cmdlciBtZW51IFNUQVJUXHJcbmNvbnN0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b3BfX2hlYWRlcicpO1xyXG5jb25zdCBuYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2Jyk7XHJcblxyXG5oZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG5cdGxldCB0YXJnZXQgPSBlLnRhcmdldDtcclxuXHR3aGlsZSh0aGlzKSB7XHJcblx0XHRpZih0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdidXJnZXInKSkge1xyXG5cdFx0XHRuYXYuY2xhc3NMaXN0LmFkZCgnbmF2LWFjdGl2ZScpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9IGVsc2UgaWYodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY2xvc2UnKSkge1xyXG5cdFx0XHRuYXYuY2xhc3NMaXN0LnJlbW92ZSgnbmF2LWFjdGl2ZScpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0YXJnZXQgPSB0YXJnZXQucGFyZW50Tm9kZTtcclxuXHRcdH1cclxuXHR9XHJcbn0pO1xyXG4vLyBCdXJnZXIgbWVudSBFTkRcclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4vLyAyKVxyXG4vLyBBbmNob3JlcyBTVEFSVFxyXG5jb25zdCBhbmNob3JzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYVtocmVmKj1cIiNcIl0nKTtcclxuXHJcbmZvciAobGV0IGFuY2hvciBvZiBhbmNob3JzKSB7XHJcblx0Y29uc3QgYmxvY2tJRCA9IGFuY2hvci5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcclxuXHJcblx0YW5jaG9yLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgXHRsZXQgdGFyZ2V0ID0gZS50YXJnZXQ7XHJcbiAgICBcclxuXHJcblx0XHRmb3IobGV0IGFuY2hvciBvZiBhbmNob3JzKSB7XHJcblx0XHRcdGlmKGFuY2hvciA9PT0gdGFyZ2V0KSB7XHJcblx0XHRcdFx0dGFyZ2V0LnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0YW5jaG9yLnBhcmVudE5vZGUuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHQgICAgXHJcblx0ICAgIHdpbmRvdy5zY3JvbGxUbyh7XHJcblx0XHRcdHRvcDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignJyArIGJsb2NrSUQpLm9mZnNldFRvcCAtIDEwMCxcclxuXHRcdFx0YmVoYXZpb3I6IFwic21vb3RoXCJcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG59XHJcbi8vIEFuY2hvcmVzIEVORFxyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbi8vIDMpXHJcbi8vIEFuaW1hdGUgY3ViZSBTVEFSVFxyXG5sZXQgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignY2FudmFzJyk7XHJcbmxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuXHJcbmxldCB3aWR0aCA9IGNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG5sZXQgaGVpZ2h0ID0gY2FudmFzLmhlaWdodCA9IE1hdGgubWF4KFxyXG5cdGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0LCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0LFxyXG5cdGRvY3VtZW50LmJvZHkub2Zmc2V0SGVpZ2h0LCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQub2Zmc2V0SGVpZ2h0LFxyXG5cdGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0LCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0XHJcbik7XHJcblxyXG5sZXQgcGFydGljbGVDb3VudCA9IDEwMDtcclxubGV0IHBhcnRpY2xlcyA9IFtdO1xyXG5cclxuZnVuY3Rpb24gaW5pdCgpIHtcclxuXHRmb3IgKGxldCBpID0gMDsgaSA8IHBhcnRpY2xlQ291bnQ7IGkrKykge1xyXG5cdCAgY3JlYXRlUGFydGljbGUoKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVBhcnRpY2xlKCkge1xyXG5cdGxldCBuZXdQYXJ0aWNsZSA9IG5ldyBQYXJ0aWNsZSgpO1xyXG5cdG5ld1BhcnRpY2xlLmluaXRpYWxpemUoKTtcclxuXHRwYXJ0aWNsZXMucHVzaChuZXdQYXJ0aWNsZSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIFBhcnRpY2xlKCkge1xyXG5cdHRoaXMuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uKCkge1xyXG5cdCAgdGhpcy54ID0gTWF0aC5yYW5kb20oKSAqIHdpZHRoO1xyXG5cdCAgdGhpcy55ID0gTWF0aC5yYW5kb20oKSAqIGhlaWdodCArIGhlaWdodDtcclxuXHQgIHRoaXMudiA9IDUgKyBNYXRoLnJhbmRvbSgpICogNTtcclxuXHQgIHRoaXMucyA9IDUgKyBNYXRoLnJhbmRvbSgpICogNTtcclxuXHR9XHJcblxyXG5cdHRoaXMudXBkYXRlID0gZnVuY3Rpb24gKCkge1xyXG5cdCAgdGhpcy54ICs9IE1hdGguc2luKHRoaXMucyk7XHJcblx0ICB0aGlzLnMgLT0gMC4xO1xyXG5cdCAgdGhpcy55IC09IHRoaXMudiAqIDAuNTtcclxuXHQgIGlmICh0aGlzLmlzT3V0T2ZCb3VuZHMoKSkge1xyXG5cdCAgICB0aGlzLmluaXRpYWxpemUoKTtcclxuXHQgIH1cclxuXHR9XHJcblxyXG5cdHRoaXMuZHJhdyA9IGZ1bmN0aW9uICgpIHtcclxuXHQgIGN0eC5maWxsUmVjdCh0aGlzLngsIHRoaXMueSwgNiwgNik7XHJcblx0ICBjdHguZmlsbFN0eWxlID0gXCIjRkZGXCI7XHJcblx0ICBjdHguZmlsbCgpO1xyXG5cdH1cclxuXHJcblx0dGhpcy5pc091dE9mQm91bmRzID0gZnVuY3Rpb24gKCkge1xyXG5cdCAgcmV0dXJuICgodGhpcy54IDwgMCkgfHwgKHRoaXMueCA+IHdpZHRoKSB8fCAodGhpcy55IDwgMCkgfHwgKHRoaXMueSA+IGhlaWdodCkpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVuZGVyKCkge1xyXG5cdGN0eC5jbGVhclJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XHJcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBwYXJ0aWNsZXMubGVuZ3RoOyBpKyspIHtcclxuXHQgIHBhcnRpY2xlc1tpXS51cGRhdGUoKTtcclxuXHQgIHBhcnRpY2xlc1tpXS5kcmF3KCk7XHJcblx0fVxyXG5cdHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xyXG59XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgcmVzaXplKTtcclxuXHJcbmZ1bmN0aW9uIHJlc2l6ZSgpIHtcclxuXHR3aWR0aCA9IGNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG5cdGhlaWdodCA9IGNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcbn1cclxuXHJcbmluaXQoKTtcclxucmVuZGVyKCk7XHJcbi8vIEFuaW1hdGUgY3ViZSBFTkRcclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4vLyA0KVxyXG4vLyBDb3VudGVyIFNUQVJUXHJcbi8qdmFyIGNsZWFyRnVuYyA9IDE7XHJcbiQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24oKXtcclxuXHQkKCcjY291bnRlcicpLmVhY2goZnVuY3Rpb24oKXtcclxuXHRcdHZhciBlUG9zaXRpb24gPSAkKHRoaXMpLm9mZnNldCgpLnRvcCxcclxuXHRcdFx0dG9wV2luZG93ID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG5cdFx0aWYoZVBvc2l0aW9uIDwgdG9wV2luZG93ICsgNDAwKXtcclxuXHRcdFx0aWYoY2xlYXJGdW5jIDwgMil7XHJcblx0XHRcdFx0JCgnLmNvdW50JykuZWFjaChmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0dmFyIGkgPSAxLFxyXG5cdFx0XHRcdFx0XHR0aGF0ID0gJCh0aGlzKSxcclxuXHRcdFx0XHRcdFx0bnVtID0gdGhhdC5kYXRhKCdudW0nKTtcclxuXHRcdFx0XHRcdHZhciBpbnQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHRpZihpIDw9IG51bSl7XHJcblx0XHRcdFx0XHRcdFx0dGhhdC5odG1sKGAke2l9PHNwYW4+JTwvc3Bhbj5gKTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRjbGVhckZ1bmMgPSBjbGVhckZ1bmMgKyAyO1xyXG5cdFx0XHRcdFx0XHRcdGNsZWFySW50ZXJ2YWwoaW50KTtcclxuXHRcdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHRcdGkgKz0gMTtcclxuXHRcdFx0XHRcdH0sIDEwMDApO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9O1xyXG5cdFx0fTtcclxuXHR9KTtcclxufSk7Ki9cclxuLy8gQ291bnRlciBFTkRcclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4vLyA1KVxyXG4vLyBBbmltYXRlIGhvbG8gU1RBUlRcclxuY29uc3Qgc3ZnRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaG9sb29uZScpO1xyXG5sZXQgbXlBbmltYXRpb24gPSBuZXcgTGF6eUxpbmVQYWludGVyKHN2Z0VsLCB7XHJcblx0XCJlYXNlXCI6IFwiZWFzZUxpbmVhclwiLFxyXG5cdFwic3Ryb2tlV2lkdGhcIjogMSxcclxuXHRcInN0cm9rZU9wYWNpdHlcIjogMSxcclxuXHRcInN0cm9rZUNvbG9yXCI6IFwiIzViNWFlY1wiXHJcbn0pO1xyXG5teUFuaW1hdGlvbi5wYWludCgpOyBcclxuLy8gQW5pbWF0ZSBob2xvIEVORFxyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbi8vIDYpXHJcbi8vIFNsaWRlciBTVEFSVFxyXG5jb25zdCBibG9ja1NsaWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0X19saXN0Jyk7XHJcbmNvbnN0IGVsZW1TbGlkZXIgPSBibG9ja1NsaWRlci5xdWVyeVNlbGVjdG9yQWxsKCcucHJvZHVjdF9pdGVtJyk7XHJcblxyXG5sZXQgZWxlbVdpZHRoID0gZWxlbVNsaWRlclswXS5vZmZzZXRXaWR0aDtcclxubGV0IGVsZW1Db3VudCA9IGVsZW1TbGlkZXIubGVuZ3RoO1xyXG5cclxubGV0IHNjcm9sbCA9IDE7XHJcblxyXG5ibG9ja1NsaWRlci5vbnRvdWNoc3RhcnQgPSBmdW5jdGlvbiAoZSkge1xyXG5cdGxldCB0YXJnZXQgPSBlLnRhcmdldDtcclxuXHJcblx0d2hpbGUodGhpcykge1xyXG5cdFx0aWYodGFyZ2V0LnRhZ05hbWUgPT09ICdVTCcpIHtcclxuXHRcdFx0bGV0IHN3aXBlU3RhcnQgPSBlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFg7XHJcblxyXG5cdFx0XHRibG9ja1NsaWRlci5vbnRvdWNobW92ZSA9IGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdFx0bW92ZUF0KGUsIHN3aXBlU3RhcnQpO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0YmxvY2tTbGlkZXIub250b3VjaGVuZCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdGJsb2NrU2xpZGVyLm9udG91Y2htb3ZlID0gbnVsbDtcclxuXHRcdFx0XHRibG9ja1NsaWRlci5vbnRvdWNodXAgPSBudWxsO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRhcmdldCA9IHRhcmdldC5wYXJlbnROb2RlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHRcclxuXHJcblx0ZnVuY3Rpb24gbW92ZUF0KGUsIHN3aXBlU3RhcnQpIHtcclxuXHRcdGxldCB0YXJnZXQgPSBlLnRhcmdldDtcclxuXHRcdGxldCBzd2lwZU1vdmUgPSBlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFg7XHJcblxyXG5cdFx0d2hpbGUodHJ1ZSkge1xyXG5cdFx0XHRpZih0YXJnZXQudGFnTmFtZSA9PT0gJ1VMJykgXHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHR0YXJnZXQgPSB0YXJnZXQucGFyZW50Tm9kZTtcclxuXHRcdFx0XHJcblx0XHR9XHJcblxyXG5cdFx0aWYoLShlbGVtV2lkdGggKiAoZWxlbUNvdW50IC0gMSkpIDwgLXRhcmdldC5zdHlsZS50cmFuc2Zvcm0ucmVwbGFjZSgvXFxEKy9nLFwiXCIpKSB7XHJcblx0XHRcdGlmKGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WCA8IHN3aXBlU3RhcnQpIHtcclxuXHRcdFx0XHRpZihlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFggPiBzd2lwZU1vdmUpIFxyXG5cdFx0XHRcdFx0dGFyZ2V0LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKC0ke3Njcm9sbCAtPSAxNX1weClgO1xyXG5cdFx0XHRcdGVsc2UgaWYoZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYIDwgc3dpcGVNb3ZlKSBcclxuXHRcdFx0XHRcdHRhcmdldC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgtJHtzY3JvbGwgKz0gMTV9cHgpYDtcclxuXHRcdFx0XHRlbHNlIFxyXG5cdFx0XHRcdFx0dGFyZ2V0LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKC0ke3Njcm9sbCArPSAxNX1weClgO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYoZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYID4gc3dpcGVTdGFydCkge1xyXG5cdFx0XHRpZihlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFggPiBzd2lwZU1vdmUpIFxyXG5cdFx0XHRcdHRhcmdldC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgtJHtzY3JvbGwgLT0gMTV9cHgpYDtcclxuXHRcdFx0ZWxzZSBpZihlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFggPCBzd2lwZU1vdmUpIFxyXG5cdFx0XHRcdHRhcmdldC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgtJHtzY3JvbGwgKz0gMTV9cHgpYDtcclxuXHRcdFx0ZWxzZSBcclxuXHRcdFx0XHR0YXJnZXQuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoLSR7c2Nyb2xsIC09IDE1fXB4KWA7XHJcblx0XHR9XHJcblx0XHRcclxuXHR9XHJcblxyXG59O1xyXG4vLyBTbGlkZXIgRU5EXHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuLy8gNylcclxuLy8gUHJvZHVjdCBCdXkgU1RBUlRcclxuY29uc3QgcHJvZHVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0Jyk7XHJcbnByb2R1Y3Qub25jbGljayA9IGZ1bmN0aW9uIChlKSB7XHJcblx0bGV0IHRhcmdldCA9IGUudGFyZ2V0OyBcclxuXHJcblx0d2hpbGUodGFyZ2V0ICE9IHByb2R1Y3QpIHtcclxuXHRcdGlmKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2J1eV9jbG9zZScpKSB7XHJcblx0XHRcdGxldCBibG9jayA9IHRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGU7XHJcblx0XHRcdHByb2R1Y3QucmVtb3ZlQ2hpbGQoYmxvY2spO1xyXG5cdFx0fSBlbHNlIGlmKHRhcmdldC50YWdOYW1lID09PSAnQlVUVE9OJykge1xyXG5cclxuXHRcdFx0bGV0IGJsb2NrID0gdGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZTtcclxuXHRcdFx0bGV0IGRhdGEgPSB7XHJcblx0XHRcdFx0c3JjOiBibG9jay5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdF9pbWcnKS5zcmMsXHJcblx0XHRcdFx0bmFtZTogYmxvY2sucXVlcnlTZWxlY3RvcignLnByb2R1Y3RfbmFtZScpLmlubmVySFRNTCxcclxuXHRcdFx0XHRwcmljZTogdGFyZ2V0LmlubmVySFRNTFxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRvcGVuKGRhdGEpO1xyXG5cclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGFyZ2V0ID0gdGFyZ2V0LnBhcmVudE5vZGU7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBvcGVuKHtzcmMsIG5hbWUsIHByaWNlfSkge1xyXG5cdFx0bGV0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblx0XHR0ZW1wbGF0ZS5jbGFzc0xpc3QuYWRkKCdidXknKTtcclxuXHRcdHRlbXBsYXRlLmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ1eV9faGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJ1eV9jbG9zZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzdmcgdmVyc2lvbj1cIjEuMVwiIGNsYXNzPVwiY2xvc2VcIiBpZD1cImNsb3NlXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHZpZXdCb3g9XCIwIDAgNDcuOTcxIDQ3Ljk3MVwiIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0yOC4yMjgsMjMuOTg2TDQ3LjA5Miw1LjEyMmMxLjE3Mi0xLjE3MSwxLjE3Mi0zLjA3MSwwLTQuMjQyYy0xLjE3Mi0xLjE3Mi0zLjA3LTEuMTcyLTQuMjQyLDBMMjMuOTg2LDE5Ljc0NEw1LjEyMSwwLjg4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYy0xLjE3Mi0xLjE3Mi0zLjA3LTEuMTcyLTQuMjQyLDBjLTEuMTcyLDEuMTcxLTEuMTcyLDMuMDcxLDAsNC4yNDJsMTguODY1LDE4Ljg2NEwwLjg3OSw0Mi44NWMtMS4xNzIsMS4xNzEtMS4xNzIsMy4wNzEsMCw0LjI0MlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEMxLjQ2NSw0Ny42NzcsMi4yMzMsNDcuOTcsMyw0Ny45N3MxLjUzNS0wLjI5MywyLjEyMS0wLjg3OWwxOC44NjUtMTguODY0TDQyLjg1LDQ3LjA5MWMwLjU4NiwwLjU4NiwxLjM1NCwwLjg3OSwyLjEyMSwwLjg3OVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMxLjUzNS0wLjI5MywyLjEyMS0wLjg3OWMxLjE3Mi0xLjE3MSwxLjE3Mi0zLjA3MSwwLTQuMjQyTDI4LjIyOCwyMy45ODZ6XCIvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2c+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8aDIgY2xhc3M9XCJidXlfdGl0bGVcIj7Qn9C+0LrRg9C/0LrQsDwvaDI+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnV5X19hcnRpY2xlXCI+XHJcbiAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwiYnV5X2ltZ1wiIHNyYz1cIiR7c3JjfVwiIGFsdD1cIlwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ1eV9fZGVzY1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPjxzcGFuPtCi0L7QstCw0YA6PC9zcGFuPiR7bmFtZX08L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPjxzcGFuPtCm0LXQvdCwOjwvc3Bhbj4ke3ByaWNlfTwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGZvcm0gY2xhc3M9XCJidXlfX2Zvcm1cIiBuYW1lPVwiYnV5XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnV5X19ibG9ja1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidXlfX3Jvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwibmFtZVwiPtCY0LzRjyDQuCDQpNCw0LzQuNC70LjRjzo8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cIm5hbWVcIj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnV5X19yb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInBob25lXCI+0JrQvtC90YLQsNC60YLQvdGL0Lkg0L3QvtC80LXRgDo8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInBob25lXCIgaWQ9XCJwaG9uZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidXlfX3Jvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiZW1haWxcIj7QrdC70LXQutGC0YDQvtC90L3QsNGPINC/0L7Rh9GC0LA6PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJlbWFpbFwiIGlkPVwiZW1haWxcIj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiYnV5X3N1Ym1pdFwiIG5hbWU9XCJzdWJcIiB0eXBlPVwic3VibWl0XCIgdmFsdWU9XCLQmtGD0L/QuNGC0YxcIj5cclxuICAgICAgICAgICAgPC9mb3JtPlxyXG5cdFx0YDtcclxuXHJcblx0XHRwcm9kdWN0LmFwcGVuZENoaWxkKHRlbXBsYXRlKTtcclxuXHJcblx0XHRsZXQgYnRuID0gZG9jdW1lbnQuZm9ybXMuYnV5LmVsZW1lbnRzLnN1YjtcclxuXHJcblx0XHRsZXQgZm9ybSA9IGRvY3VtZW50LmZvcm1zLmJ1eTtcclxuXHJcblx0XHRmb3JtLm9uc3VibWl0ID0gZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRsZXQgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoZm9ybSk7XHJcblx0XHRcdGZvcm1EYXRhLmFwcGVuZCgnbmFtZScsIG5hbWUpO1xyXG5cdFx0XHRmb3JtRGF0YS5hcHBlbmQoJ3ByaWNlJywgcHJpY2UpO1xyXG5cclxuXHRcdFx0ZmV0Y2goJy4vcGhwL21haWwucGhwJywge1xyXG5cdFx0XHQgIG1ldGhvZDogJ1BPU1QnLFxyXG5cdFx0XHQgIGJvZHk6IGZvcm1EYXRhXHJcblx0XHRcdH0pO1xyXG5cdFx0XHRhbGVydCgn0KHQv9Cw0YHQuNCx0L4g0LfQsCDQv9C+0LrRg9C/0LrRgyEg0JzRiyDRgSDQstCw0LzQuCDRgdCy0Y/QttC10LzRgdGPINCyINCx0LvQuNC20LDQudGI0LXQtSDQstGA0LXQvNGPIScpO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0fVxyXG5cclxuXHJcbn1cclxuLy8gUHJvZHVjdCBCdXkgRU5EXHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuLy8gOClcclxuLy8gUGFyYWxsYXggZWZmZWN0IFNUQVJUXHJcbiQoJy5kZXNjJykub24oJ21vdXNlbW92ZScsIGZ1bmN0aW9uKGUpe1xyXG5cdGxldCB3aWR0aCA9ICQoJy5kZXNjJykud2lkdGgoKTtcclxuXHRsZXQgaGVpZ2h0ID0gJCgnLmRlc2MnKS5oZWlnaHQoKTtcclxuXHJcblx0bGV0IG9mZnNldFggPSAyIC0gZS5wYWdlWCAvIHdpZHRoO1xyXG5cdGxldCBvZmZzZXRZID0gMS41IC0gZS5wYWdlWSAvIGhlaWdodDtcclxuXHJcblx0JCgnLnBhcmFsbGF4JykuZWFjaChmdW5jdGlvbihpLCBlbCl7XHJcblx0XHR2YXIgb2Zmc2V0ID0gcGFyc2VJbnQoJChlbCkuZGF0YSgnb2Zmc2V0JykpO1xyXG5cclxuXHRcdHZhciBwb3NpdGlvbiA9IE1hdGgucm91bmQob2Zmc2V0WCAqIG9mZnNldCkgKyAncHgsICcgKyBNYXRoLnJvdW5kKG9mZnNldFkgKiBvZmZzZXQpICsgJ3B4JztcclxuXHJcblx0XHQkKGVsKS5jc3Moeyd0cmFuc2Zvcm0nOiBgdHJhbnNsYXRlKCR7cG9zaXRpb259KWB9KTtcclxuXHR9KTtcclxufSk7XHJcbi8vIFBhcmFsbGF4IGVmZmVjdCBFTkQiXSwiZmlsZSI6Im1haW4uanMifQ==

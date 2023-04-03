class slider{
    slideIndex = 1;

    constructor(options){
        this.options = options;

        this.initialStuff();

        this.createDots();

        this.showSlides(1);

        this.setInterval();
    }


    initialStuff(){
        let {el: sliderElement , sliderClass , auto} = this.options;

        if(! sliderElement) throw Error('slider element is not exist');
        if(! sliderClass) throw Error('slider class is not exist');
        Number.isInteger(auto) ? this.auto = auto : this.auto = 0;

        this.sliders = [...sliderElement.children].filter(ele => ele.classList.contains(sliderClass));
    }


    createDots(){
        let {el: sliderElement , sliderClass} = this.options;

        this.dotsElement = this.sliders.map((slide , index) => `<span class="dot" data-slide="${index+1}"></span>`);

        let dots = document.createElement('div');
        dots.classList.add('dots');
        dots.innerHTML = `${this.dotsElement.join('')}`;

        sliderElement.after(dots)
        

        this.dots = document.querySelectorAll('.dot');
        this.dots.forEach(dot => dot.addEventListener('click' , e => this.currentSlide(e.target.dataset.slide)))
    }


    currentSlide = n =>{
        this.resetInterval()
        this.showSlides(this.slideIndex = n)
    }


    showSlides(number){
        let {currentSlider} = this.options;

        if(number > this.sliders.length) this.slideIndex = 1;
        if(number < 1) this.slideIndex = this.sliders.length;
        

        this.sliders.forEach(slide => slide.classList.remove('active'));
        this.dots.forEach(dot => dot.classList.remove('active'));

        this.sliders[this.slideIndex - 1].classList.add('active');
        this.dots[this.slideIndex - 1].classList.add('active');

        
        if(currentSlider) currentSlider(this.sliders[this.slideIndex - 1]);

    }

    setInterval(){
        if(this.auto != 0){
            this.setIntevalID = setInterval(() => this.showSlides(++this.slideIndex), this.auto);
        }
    }

    resetInterval(){
        clearInterval(this.setIntevalID);
        this.setInterval();
    }

}
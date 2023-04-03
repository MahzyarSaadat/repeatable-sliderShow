
new slider({
    el: document.getElementById('sliders'),
    sliderClass: "slider",
    currentSlider: slider => {
        console.log(slider)
    },
    auto: 3000
})

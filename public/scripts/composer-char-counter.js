$(document).ready(function () {
    console.log('ready!');

    $(".form_text_area").on('input',function (event) {
        let currentText = $(this).val();
        let counterValue = 140 - currentText.length;
        let counter = $(this).siblings("span");

        counter.text(counterValue);
        if(counterValue<0){
            counter.css('color', 'red');
        }
    });
});



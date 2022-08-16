
(function couponShow() {

const message = document.querySelector('.message');
const showMessage = document.querySelector('.showMessage');

showMessage.style.display = "none";

message.addEventListener("click", function() {
    console.log('click')
    message.style.display = "none";
    showMessage.style.display = "initial";
})

})();


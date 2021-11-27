$(document).ready(function(){
	$('.header').height($(window).height());
})

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("GET", "https://localhost:44343/api/item");

xhr.send();


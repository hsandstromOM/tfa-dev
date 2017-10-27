$(document).ready(function() {
  $(".button a").click(function() {
    $(".overlay").fadeToggle(200);
    $(this).toggleClass('btn-open').toggleClass('btn-close');
  });
  $(".overlay").on('click', function() {
    $(".overlay").fadeToggle(200);
    $(".button a").toggleClass('btn-open').toggleClass('btn-close');
    open = false;
  });

// // Add smooth scrolling to all links
// $("a").on('click', function(event) {
//
//   // Make sure this.hash has a value before overriding default behavior
//   if (this.hash !== "") {
//     // Prevent default anchor click behavior
//     event.preventDefault();
//
//     // Store hash
//     var hash = this.hash;
//
//     // Using jQuery's animate() method to add smooth page scroll
//     // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
//     $('html, body').animate({
//       // scrollTop: $(hash).offset()
//     }, 1000, function(){
//
//       // Add hash (#) to URL when done scrolling (default click behavior)
//       window.location.hash = hash;
//     });
//   } // End if
// });

window.sr = ScrollReveal({ reset: true });
 sr.reveal('.top', { duration: 1 });
 sr.reveal('.cloud', { origin: 'left', duration: 1000 });
 // sr.reveal('.logo', { duration: 1000 });
 sr.reveal('.section', { duration: 1000 });
 sr.reveal('.quote', { duration: 1000 });


});

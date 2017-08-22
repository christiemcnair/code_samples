//should only be called when the second slide is available. This initializes the carousel 
function initCarousel(randomSlide) {	

  //Initialize carousel and set it to wrap back to first element
  //after hitting last element
  $('.jcarousel').jcarousel({
     wrap: 'last' 
  })    
  //Implement autostart
  .jcarouselAutoscroll({
          interval: 3000,
          target: '+=1',
          autostart: false
  }); 

  var scrollPos = randomSlide-1;

  $('.jcarousel').jcarousel('scroll', scrollPos); //this init is called after 2nd slide is loaded 

    //Add active class for current slide
  $('.jcarousel-pagination')
        .on('jcarouselpagination:active', 'a', function() {
         $(this).addClass('active');
           })
         .on('jcarouselpagination:inactive', 'a', function() {
         $(this).removeClass('active');
           })
         .on('click', function(e) {
           e.preventDefault();
           })
        .jcarouselPagination({
             item: function(page) { 
             return '<a href="#' + page + '" id=' + page + '  style="padding:5px;"></a>';
           }
          });   
         $('.jcarousel-prev').jcarouselControl({
            target: '-=1'
          });

        $('.jcarousel-next').jcarouselControl({
            target: '+=1'
          });   
    $('.jcarousel')
        .on('jcarousel:animateend', function(event, carousel) {
            var currentFirstItem = $(this).jcarousel('first');
            var currentLastItem  = $(this).jcarousel('last');   
            var target = $('.jcarousel').jcarousel('target');
            if(target.length == 0){
              target = currentFirstItem;
            }
    });  

    // Adding play/pause actions to multiple HTML element of promo module
    $( ".nbaFlexContent h3, .nbaFlexContent img, .nbaFlexContent h4, .nbaFlexContent p" ).mouseover(function() {
     	 $('.jcarousel').jcarouselAutoscroll('stop');
      		$('#play').css("display", "block");
        	$('#pause').css("display", "none");
    });
    $( ".nbaFlexContent h3, .nbaFlexContent img, .nbaFlexContent h4, .nbaFlexContent p" ).mouseout(function() {
      	$('.jcarousel').jcarouselAutoscroll('start');
      		$('#play').css("display", "none");
        	$('#pause').css("display", "block");
    });

    // Play/Pause actions
    $('#pause').click( function() {
        	$('.jcarousel').jcarouselAutoscroll('stop');
        	$('#play').css("display", "block");
        	$('#pause').css("display", "none");
        	$(".nbaFlexContent h3, .nbaFlexContent img, .nbaFlexContent h4, .nbaFlexContent p").unbind("mouseover mouseout");
    });
    $('#play').click( function() {
        $('.jcarousel').jcarouselAutoscroll('start');
        $('#play').css("display", "none");
        $('#pause').css("display", "block");
        $( ".nbaFlexContent h3, .nbaFlexContent img, .nbaFlexContent h4, .nbaFlexContent p" ).mouseover(function() {
     	  $('.jcarousel').jcarouselAutoscroll('stop');
      	$('#play').css("display", "block");
        $('#pause').css("display", "none");
        });
        $( ".nbaFlexContent h3, .nbaFlexContent img, .nbaFlexContent h4, .nbaFlexContent p" ).mouseout(function() {
          	$('.jcarousel').jcarouselAutoscroll('start');
          		$('#play').css("display", "none");
            	$('#pause').css("display", "block");
        });
    }); 
}

//Loads slides to carousel
function loadSlides(adsRenderedCnt, blankAdCnt, nextSlideNum){
    //Gather the number of slides
    var items = $('.jcarousel').jcarousel('items');

    $('.jcarousel').jcarousel('reload');
    if((adsRenderedCnt+blankAdCnt) < 6){
      $('.jcarousel').jcarousel('scroll', (nextSlideNum-1));
    }
    else{
       if(items.length == 1){
          $('.jcarousel').jcarousel('destroy');
          $('#pause').css("display", "none");
          $('.jcarousel-pagination').css("border-right", "none");
        }
        else{
          parent.finalizeCarousel();
          $('.jcarousel').jcarousel('scroll', (nextSlideNum-1));
          $('.jcarousel').jcarouselAutoscroll('start');
          $('.jcarousel').jcarouselAutoscroll({'interval': 3000});
         }
    }
    if(adsRenderedCnt < 6){
      if(nextSlideNum==6){
        nextSlideNum = 1;
      }
    }
}


//Click Analytics for focus and content
$( "#nbaSplitCarousel" ).click(function() {
  _nba.analytics.click({focus:"promo carousel",content:["carousel_click"]});
});
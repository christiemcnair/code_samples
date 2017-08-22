/** NBA Carousel Utilities
 **
 **  Initial        Date            Version                Change
 **      CM    02/06/14                1.0          1. Initial Code Per CSD-326
 **      CM    02/07/14                2.0          1. Fix for IE impression in position 0 not firing
 **                                                 2. Clean up of unnecessary lines of code
 **      CM    02/07/14                3.0          1. Changed div ID referenced from nbaFlexPanelParent to nbaSplitCarousel
 **      CM    02/11/14                4.0          1. Fix for safari versions older than 6.1.
 **      CM    09/23/14                5.0          1. Revamp for DPF
 **      CM    09/25/14                6.0          1. Update to work with latest adfuel
 **      CM    10/10/14                7.0          1. Update to use isEmpty() API call
 **/


var blankAdCnt = 0;
var adsRenderedCnt = 0;
var adunit = "";
var setSlotListenerSet = false;

//Calls DFP for creative matching slot div id
function renderAd(slideNum){
  AMPTManager.renderSingleSlot("ad_carousel_slide_0"+slideNum, [[145,250]], [["slide",[slideNum]],["pos",["carousel_slide_0"+slideNum]]], [], adunit, 0);
}


//Checks what is retrieved from DFP. If blank, change class to flag for elimination
function loadAd(slideNum){  

  if(!setSlotListenerSet){
    googletag.cmd.push(function() {
      googletag.pubads().addEventListener('slotRenderEnded', function(event) {
         var targetingPos = String(event.slot.getTargeting("pos"));

          if(targetingPos.indexOf("carousel_slide_0") > -1){
           if(event.isEmpty && (event.slot.getTargeting("pos") == "carousel_slide_0"+slideNum)){
              $("#slide"+slideNum).addClass( "blankNbaFlexContent" );
              $("#slide"+slideNum).removeClass( "nbaFlexContent" );
              blankAdCnt+=1;
           } 
           else{   
             adsRenderedCnt+=1;
             if(adsRenderedCnt == 2){
              initCarousel(slideNum);
             }
             else if(adsRenderedCnt > 2){
              loadSlides(adsRenderedCnt, blankAdCnt,slideNum);
             }
          }
          if((adsRenderedCnt+blankAdCnt) < 6){
            var nextSlideNum = slideNum+1;
            if(nextSlideNum==6){
              nextSlideNum = 1;
            }
            slideNum = nextSlideNum;
            setTimeout(function(){renderAd(nextSlideNum)},3000);  //3000
          }
          else{
            finalizeCarousel();
          } 
        } //targetingPos.indexOf if condition
      }); //googletag.pubads().addEventListener
    }); // googletag.cmd.push function
  } // setSlotListenerSet if condition
  setSlotListenerSet = true;
}


//Clears carousel of any blank slides
function finalizeCarousel(){
  $(".blankNbaFlexContent").remove();
  $('.jcarousel').jcarousel('reload');
  if(blankAdCnt == 4){
    $('.jcarousel').jcarousel('destroy');
    $('#pause').css("display", "none");
    $('.jcarousel-pagination').css("border-right", "none");
  }
  else{
    $('.jcarousel').jcarouselAutoscroll('start');
        $('.jcarousel').jcarouselAutoscroll({'interval': 3000});
  }
}


function getAdunit(){
  if(parent.AMPTManager){
    //Build adunit
    networkId = parent.AMPTManager.registry[0][0].gpt_id;
    adunit = parent.AMPTManager.registry[0][1].rktr_ad_id; 
    adunit = networkId + "/" + adunit;
  }
}

$(document).ready(function(){
  getAdunit();
  console.log("adunit: "+adunit);
  if(parent.sequentialLoad){
    var randomSlide = 1;
  }
  else{
    var randomSlide = (Math.floor(Math.random()*5)+1);  
  } 
  renderAd(randomSlide);    
  loadAd(randomSlide);
});


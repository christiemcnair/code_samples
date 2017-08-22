<script type="text/javascript">/* [%TICKET_NUM%] - V.1.0 */
	var creative ="[%IMAGE_URL%]"; 
	var creativeClick = "[%CLICKTHROUGH_URL%]"; 
    var TPImpressions = ["[%IMP_PIXEL1%]","[%IMP_PIXEL2%]","[%IMP_PIXEL3%]","[%IMP_PIXEL4%]","[%IMP_PIXEL5%]"];  
	var closeBtnHeight = [%CLOSE_BUTTON_HEIGHT%];
	var closeBtnWidth = [%CLOSE_BUTTON_WIDTH%];
	var closeBtnRightPos = [%CLOSE_BUTTON_RIGHT_POS%];
	var closeBtnBottomPos = [%CLOSE_BUTTON_BOTTOM_POS%];
	var testMode = [%BUTTON_TEST_MODE%]; 


	var creativeQAView = "%%VIEW_URL_UNESC%%";
	var creativeQAClick = "%%CLICK_URL_UNESC%%";


	var qaClickPixel = "http://i.cdn.turner.com/ttn/ttn_adspaces/1.0/creatives/2012/2/10/1529111x1.gif";

	//ALLOW JQUERY TO RUN INSIDE DFP IFRAME
	if (typeof(jQuery) == "undefined") {
	    var iframeBody = document.getElementsByTagName("body")[0];
	    var jQuery = function (selector) { return parent.jQuery(selector, iframeBody); };
	    var $ = jQuery;
	}

    //BUILD TWIG ELEMENTS AND SET ALIGNMENT
	var imgHTML = "<a style='width: 100%; text-align: center; position: absolute;' href="+creativeQAClick+creativeClick+" target='_blank'><img src="+creative+">";
  	$(parent.document.body).prepend($(document.createElement('div')).prop('id','twigDiv').html(imgHTML).css({
               'height' : "99px",
               'width' : "100%",
               'position' : 'fixed',
               'bottom' : '0px',
               'z-index' : "999998"
            }));

	//CREATE "CLOSE" BUTTON
  	$(parent.document.body).prepend($(document.createElement('button')).prop('id','closeDiv').css({
               'height' : closeBtnHeight+"px", //'20px',
               'background-color' : "transparent",
               'background-image' : "url("+qaClickPixel+")",
           	   'border' : ((testMode) ? "2px solid #32CD32" : "none"),
               'width' : closeBtnWidth+"px",   //'60px',
               'position' : 'fixed',
               'cursor' : 'pointer',
               'bottom' :  closeBtnBottomPos+"px",  //'75px',
               'right' : closeBtnRightPos+"px",   //'-500px',
               'margin-right' : '50%',
               'z-index' : "999999"
            }).click(function(){
				window.parent.$('#twigDiv').animate( {bottom:'-200px', opacity:'0'},  { duration: 200, easing:"linear", queue: false });
				window.parent.$(this).remove();
            }));

	//ADD IMPRESSION TRACKING
    var impImg = parent.document.createElement('img');
    var trkPixImg = parent.document.createElement('img');

    //BUILD THE IMPRESSION TRACKING TAG
    impImg.setAttribute('src',  creativeQAView+qaClickPixel);

    //BUILD THE 3RD PARTY IMPRESSION PIXELS
    for (var index = 0; index < TPImpressions.length; index++){
        if(TPImpressions[index].length > 10){
            trkPixImg = document.createElement('img');
            trkPixImg.setAttribute('src', TPImpressions[index]);
            trkPixImg.setAttribute('width', "1");
            trkPixImg.setAttribute('height', "1");
            trkPixImg.style.position = 'absolute';
            trkPixImg.style.visibility = 'hidden';
            window.parent.$('#twigDiv').append(trkPixImg);
        }
    }    
    window.parent.$('#twigDiv').append(impImg);
 </script>
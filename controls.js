var allSlides =  new Array();
var currentPage = 0;
var urlStack = new Array(); 

$(document).ready(function() {
	$.getJSON("../order.json", function (data) {
		var currentUrl = window.location.pathname;
		var currentFilename = currentUrl.substring(currentUrl.lastIndexOf('/') +1);

		currentFilename = currentFilename.slice(0,-5);
	
		$.each(data, function (counter, page) {
			if(page.page == currentFilename)
			{	
				currentPage = counter	
			}
			allSlides[counter] = page.page;

		});
		console.log(allSlides);
	
	});
});

function loadPage(url, history_search)
{
	console.log(currentPage);
	if(!history_search)
	{
		var stateObj = {url: url};
		history.pushState(stateObj, 'page', url);
	} else {
		var stackPosition = $.inArray(url, urlStack);
		var direction;
		if(currentPage > stackPosition)
		{
			direction = 'back';
			currentPage = currentPage -1;
		}
		else {
			direction = 'forward';
			currentPage = currentPage + 1;

		}


	}
		$('body').hide();
		
	    $('body').load(url , null, function( data ){
			
			$('body').show('fast');

		});


}


function slideBack()
{
	if(currentPage - 1 in allSlides)
	{
		currentPage--;
		
		var url = '../' + allSlides[currentPage] + '/' + allSlides[currentPage] + '.html';
		loadPage(url); 
	}
	else
	{
		console.log("ERROR, you are at start of presentation.");
	}
}

function slideForward()
{
	if(currentPage + 1 in allSlides)
	{
		currentPage++;
		var url = '../' + allSlides[currentPage] + '/' + allSlides[currentPage] + '.html';
		loadPage(url);
	}
	else
	{
		console.log("ERROR, you have reached the end of the presentation");
	}
}

$(document.documentElement).keyup(function (event) {
  // handle cursor keys
  if (event.keyCode == 37) {
    slideBack();
  } else if (event.keyCode == 39) {
    slideForward();
  }
});

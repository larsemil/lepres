var allSlides =  new Array();
var currentPage = 0;

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
});




function slideBack()
{
	if(currentPage - 1 in allSlides)
	{
		currentPage--;
		console.log("sliding backward to " + allSlides[currentPage]);
		
		var url = '../' + allSlides[currentPage] + '/' + allSlides[currentPage] + '.html #slide';
	    $("#slide").load(url, function( data ){
			console.log('Got slide from ' + url);

		});
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
		console.log("sliding forward to " + allSlides[currentPage]);
		var url = '../' + allSlides[currentPage] + '/' + allSlides[currentPage] + '.html #slide';
	    $("#slide").load(url, function( data ){
			console.log('Got slide from ' + url);

		});
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

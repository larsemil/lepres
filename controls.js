$.getJSON("../order.json", function (data) {
	//kolla vart i loopen vi är.
	//kolla vilken som är nästa
	//kolla vilken som är förra

	$.each(data, function (counter, page) {
		console.log(page)

	});

});




function slideBack()
{
	console.log("sliding backward");

}

function slideForward()
{
	console.log("sliding forward"); 
}

$(document.documentElement).keyup(function (event) {
  // handle cursor keys
  if (event.keyCode == 37) {
    slideBack();
  } else if (event.keyCode == 39) {
    slideForward();
  }
});

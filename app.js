function search( searchTerm, lat, lng) {

	var url = "http://demo.pbapi.places.public.devbln.europe.nokia.com/places/v1/discover/search?" + jQuery.param({q: searchTerm, app_id: 'BDjctzFoFSCLGaDpE82O', app_code: 'NS9%2FOwu97RZCPj3d38KGsg%3D%3D', at: lat + ',' + lng});

	$.ajax({ 
		     url: url,
		     dataType: 'jsonp',
		     success: function( data ) {
				 var cord = $("<div id='accordion' class='ui-accordion ui-widget ui-helper-reset'>");

				 $.each(data.results.items, function (index, item) {
					 var h3 = $("<h3 class='ui-accordion-header ui-helper-reset ui-state-default ui-corner-all'>");
					 var a = $("<a href='#'>");
					 h3.append(a);
					 a.text(item.title);
					 var content = $("<div class='ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom'>").attr('id', item.refId);
					 var contentPara = $("<p>");
					 contentPara.text('...');
					 content.append(contentPara);

					 a.click(function () {
						 $.ajax({
							 url: item.href,
							 dataType: 'jsonp',
							 success: function (details) {
								 $("#" + item.refId).html("<a>").find("a").attr("href", details.view).html(details.location.address.text);
								 console.log(details.placeId);
							 }
						 });
					 });
					 cord.append(h3);
					 cord.append(content);
				 });

				 $('.data').empty();
				 $('.data').append(cord);
				 $( "#accordion").accordion().find('a:first').click();
		}
	});
}

function findLocAndSearch(searchTerm) {

    navigator.geolocation.getCurrentPosition(function (position) {
		alert('wtf');
		search(searchTerm, position.coords.latitude, position.coords.longitude);
	}, function () { search(searchTerm, 37.785141,-122.4047775)});
}

$(document).ready(function(){
	findLocAndSearch("cupcakes");
	$("form").submit(function () { findLocAndSearch(this.q.value); return false;});
});


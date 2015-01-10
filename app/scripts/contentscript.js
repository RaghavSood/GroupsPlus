'use strict';

if (window.jQuery) {  
    console.log('We good');

	//$( document ).ready(function() {
		window.setInterval(tagger, 5000);
    //});

    console.log('Done');
} else {
    console.log('We not good');
}

function tagger() {
	$('p').each(function() {
    	console.log('Running');
    	var regExp = /\[(.*?)\]/g;
    	//var regExp =/(?!<=>)\[(.*?)\](?!=<)/
		var result = $(this).text().match(regExp);
		console.log(result);
		if(result != null && result.length > 0) {
			var link = groupLinkFinder($(this))
			var text = $(this).html().replace(/<[^>]*>/g, "");
			if($(location).attr('pathname').indexOf("/search/") != -1) {
    			$(this).html( text.replace( regExp, '<a class="tagtext" href="' + link + '?query=$1">$1</a>' ) );
    		} else {
    			$(this).html( text.replace( regExp, '<a class="tagtext" href="' + link + 'search/?query=$1">$1</a>' ) );
    		}
    	}
    });
}

function groupLinkFinder(startingNode) {
	//var linkexp = /\/groups(.*?)permalink\//g;
	var linkexp= /\/groups\/(.*?)\//;
	var postDiv = startingNode.parent().parent();
	var divHTML = postDiv.html();
	var link = linkexp.exec(divHTML);
	console.log("/groups" + link[1] + "/");

	return "/groups/" + link[1] + "/";

}
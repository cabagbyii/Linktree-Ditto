
var assetObj = {
	main_image:'https://static.tumblr.com/pygcwdn/zOupm4cwp/btp_cover-recovered.jpg',
	page_main_background:'https://static.tumblr.com/pygcwdn/zOupm4cwp/btp_cover-recovered.jpg',
	main_info:{
		container_header:'Cee - Black Truck Pimpin',
		container_prompt:'Choose music service'
	},
	links:{
		spotify:'https://open.spotify.com/track/4O29uXQaNEJgFK880XAxRm',
		apple_music:'https://itunes.apple.com/us/album/black-truck-pimpin/1451432835?uo=4&app=music&at=1001lry3&ct=dashboard',
		tidal:'https://tidal.com/browse/album/103416936',
		itunes:'https://itunes.apple.com/us/album/black-truck-pimpin/1451432835',
		soundcloud:'https://soundcloud.com/cee434/sets/black-truck-pimpin',
		google_play:'https://play.google.com/store/music/album/Cee_Black_Truck_Pimpin?id=B54xyngbb3ab4kpvwqt2oyreiaa',
		deezer:'https://www.deezer.com/us/album/86191112',
		amazon_music:'https://www.amazon.com/gp/product/B07NBQCVWM/'
	},
}

var isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
var isApple = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)/i);

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

var currSbscrbr = new Sbscrbr({
	'prompt':'Become one of the homies! Subscribe to the mailing list for news, exclusives, merch and more!'
});

// Check if page has loaded

if(document.readyState === 'complete') {
    console.log('has loaded quickly!');
}

// Polling for the sake of my intern tests
var interval = setInterval(function() {
    if(document.readyState === 'complete') {
        console.log('yes! page has loaded!');
        clearInterval(interval);
        $('.loading_screen').hide();
        if (getUrlParameter('subscribe') === 'true') {
        	currSbscrbr.show();
        } else{
        	$('html').css('overflow', 'auto');
			$('body').css('overflow', 'auto');
        }
    }    
}, 100);

//end checking if page loaded

function populate_main_info() {
	$('#main_image').attr("src", assetObj.main_image);
	
	$('#page_main_background').css("backgroundImage", 'url('+assetObj.page_main_background+')');

	for (var infoKey in assetObj.main_info) {
		var target_id = '#'+infoKey;
		$(target_id).text(assetObj.main_info[infoKey]);
	}
	for (var linkKey in assetObj.links) {
		var target_link_el = '#'+linkKey;
		var current_link = assetObj.links[linkKey];
		(function(el_ID, link_ref, el_name){
			$(el_ID).click(function(){
				window.open(link_ref);
				console.log("ga('send', 'event', 'streamLink', 'click', "+el_name+");");
				ga('send', 'event', 'streamLink', 'click', el_name);
			});
		})(target_link_el, current_link, linkKey);
	}
	//hide iTunes
	if (!isApple && isMobile) {
		$('#itunes').css('display', 'none');
		$('#service_container').css('height', '525px');
		$('#linkfire_outer_container').css('height', '927px');
	}
}
// When the user scrolls the page, execute myFunction 
window.onscroll = function() {if(isMobile){ }else{myFunction()}};

// Get the navbar
var navbar_position = document.getElementById("main_info_outer_container");
var navbar = document.getElementById("main_info_container");

// Get the offset position of the navbar
var sticky = navbar_position.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

populate_main_info();
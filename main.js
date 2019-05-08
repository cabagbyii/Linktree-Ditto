
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

var load_checkpoints = 0;
var loading_screen_catch = setTimeout(function(){
	$('.loading_screen').hide();
	$('html').css('overflow', 'auto');
	$('body').css('overflow', 'auto');
}, 10000);
function load_checkpoint(trigger){
	load_checkpoints+=1;
	if (load_checkpoints >= 3 || (load_checkpoints >= 2 && isMobile)) {
		$('.loading_screen').hide();
		$('html').css('overflow', 'auto');
		$('body').css('overflow', 'auto');
		console.log('clearing loading_screen_catch timeout')
		clearTimeout(loading_screen_catch);
	}
}
function populate_main_info() {
	var main_image_to_load = assetObj.main_image;
	$('#main_image').attr("src", main_image_to_load);
	$('#main_image').on('load', load_checkpoint('main_image'));
	
	var page_main_bg_image_to_load = assetObj.page_main_background;
	$('<img/>').attr('src', page_main_bg_image_to_load).on('load', function() {
		$(this).remove();
		$('#page_main_background').css("backgroundImage", 'url('+page_main_bg_image_to_load+')');
		load_checkpoint('bg');
	});
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

$('.service_image').on('load', function(){
	if(this.alt === 'amazon_music'){
		load_checkpoint();
	};
});

/*var Subctrl = (function () {

          // Instance stores a reference to the Singleton
          var subctrlr;
        
          function init() {
        
            // Singleton
        
            // Private methods and variables
            function privateMethod(){
                console.log( "I am private" );
            }
        
            var subscribeContainer = $('#signup_container');
        
            return {
        
              // Public methods and variables
              isVisible: false,
              fadeIn: function () {
                if(!this.isVisible){
                    this.isVisible = true;
                    $('body').css('overflow', 'hidden');
                    subscribeContainer.css('display', 'flex');
                    subscribeContainer.animate({opacity: 1}, 600);
                }
              },
              fadeOut: function () {
                if(this.isVisible){
                    this.isVisible = false;
                    subscribeContainer.animate({opacity: 0}, 600, function(){
                       subscribeContainer.css('display', 'none');
                       $('body').css('overflow', 'auto'); 
                    });
                }
              }
        
              
            };
        
          };
        
          return {
        
            // Get the Singleton instance if one exists
            // or create one if it doesn't
            getSubctrlr: function () {
        
              if ( !subctrlr ) {
                subctrlr = init();
              }
        
              return subctrlr;
            }
        
          };
        
        })();*/

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
	  
var currSbscrbr = new Sbscrbr({
	'prompt':'Become one of the homies! Subscribe to the mailing list for news, exclusives, merch and more!'
});

if (getUrlParameter('subscribe') === 'true') {
	currSbscrbr.show();
}
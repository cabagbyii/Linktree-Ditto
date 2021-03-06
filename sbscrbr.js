(function(){
	
	//constructor
	this.Sbscrbr = function(){

		// global element references
		this.closeButton = null;
		this.popupContainer = null;
		this.popup = null;
		this.bgOverlay = null;
		this.state = {
			showing:false
		};

		//option defaults

		var defaults = {
			actionLink:'https://cee434.us20.list-manage.com/subscribe/post?u=367bd932af3cffb2c50abb080&amp;id=868c254e81',
			closeButton:true, // button to close popup
			bgOverlay:true, // backaground overlay
			continuePrompt:true, // continue prompt to close overlay
			popupClass:'sbscrbr-popup', // popup element class name
			prompt:'', // subscribe prompt text
			submitButtonText:'Subscribe', // submit button text
			minWidth:300, // minimum width of popup element
			color:'#ffffff', // color of popup element background
			bgColor:'rgba(0,0,0,.7)', // color of background overlay
			autoShow:false // show popup on load 
		}

		// Create options by extending defaults with the passed in arugments
		if (arguments[0] && typeof arguments[0] === "object") {
			this.options = extendDefaults(defaults, arguments[0]);
		}
	}

	//Public Methods

	Sbscrbr.prototype.isPageScrollable = function() {
		if($('html').css('overflow') === 'auto' && $('body').css('overflow') === 'auto'){
			return true
		}
		return false;
	}
	Sbscrbr.prototype.show = function() {
		if(!this.state.showing){
			// Build popup
			buildPopup.call(this);
			initializeEvents.call(this);
			this.state.showing = true;
		}
	};

	Sbscrbr.prototype.hide = function(e) {
		if(this.state.showing){
			$('.'+this.popupContainer.className).animate({opacity:0}, 600, function(){
				$(this).css('display', 'none');
			});
			this.state.showing = false;
			if(!this.isPageScrollable()){
				$('html').css('overflow', 'auto');
				$('body').css('overflow', 'auto');
			}
			var elName = e.target.className.split(this.options.popupClass+'-')[1];
			console.log("ga('send', 'event', 'subscribe-prompt-closed', 'click', '"+elName+"');");
			ga('send', 'event', 'subscribe-prompt-closed', 'click', elName);
		}
	};

	//Private Methods

	function extendDefaults(source, props){
		var prop;
		for(prop in props){
			if (props.hasOwnProperty(prop)) {
				source[prop] = props[prop];
			}
		}
		return source;
	}

	function buildPopup(){
		//create popup container
		this.popupContainer = document.createElement("div");
		this.popupContainer.className = this.options.popupClass+'-container';
		
		//create bg overlay
		if (this.options.bgOverlay === true) {
			this.bgOverlay = document.createElement("div");
			this.bgOverlay.className = this.options.popupClass+"-bg-overlay";
			this.bgOverlay.style.backgroundColor = this.options.bgColor;
			this.popupContainer.appendChild(this.bgOverlay);
		}

		//create close button
		if (this.options.closeButton === true) {
			this.closeButton = document.createElement("div");
			this.closeButton.className = this.options.popupClass+"-close-button";
			this.popupContainer.appendChild(this.closeButton);
		}

		//create popup
		this.popup = document.createElement("div");
		this.popup.className = this.options.popupClass;
		this.popup.id = 'mc_embed_signup';
		this.popup.style.backgroundColor = this.options.color;
		this.popup.innerHTML = 
			'<form action="'+this.options.actionLink+'" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>' +
	            '<div id="mc_embed_signup_scroll">' +
	        		'<h2>'+this.options.prompt+'</h2>' +
	        		'<div class="indicates-required"><span class="asterisk">*</span> indicates required</div>' +
	        		'<div class="sbscrbr-name-container">'+
		        		'<div class="mc-field-group sbscrbr-name-field sbscrbr-first-name">' +
		        		    '<label for="mce-FNAME">First Name  <span class="asterisk">*</span></label>' +
		        		    '<input type="text" value="" name="FNAME" class="required" id="mce-FNAME" aria-invalid="false">' +
		        		'</div>' +
		        		'<div class="mc-field-group sbscrbr-name-field sbscrbr-last-name">' +
		        		    '<label for="mce-LNAME">Last Name  <span class="asterisk">*</span></label>' +
		        		    '<input type="text" value="" name="LNAME" class="required" id="mce-LNAME" aria-invalid="false">'+
		        		'</div>'+
	        		'</div>'+
	        		'<div class="mc-field-group">' +
	        			'<label for="mce-EMAIL">Email Address  <span class="asterisk">*</span></label>' +
	        			'<input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL">' + 
	        		'</div>' +
	        		'<div id="mce-responses" class="clear">' +
	        			'<div class="response" id="mce-error-response" style="display:none"></div>' +
	        			'<div class="response" id="mce-success-response" style="display:none"></div>' +
	        		'</div>' +
	            	'<div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_367bd932af3cffb2c50abb080_868c254e81" tabindex="-1" value=""></div>' +
	            	'<div class="clear submit-btn-container"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></div>' + 
	            '</div>' +
	        '</form>';
	    this.popupContainer.appendChild(this.popup);

	    document.body.appendChild(this.popupContainer);

	    if (this.options.continuePrompt === true) {
	    	this.continuePrompt = document.createElement("div");
	    	this.continuePrompt.className = this.options.popupClass+"-continue-prompt";
	    	this.continuePrompt.innerHTML = "or continue to website";
	    	this.popupContainer.getElementsByClassName('submit-btn-container')[0].appendChild(this.continuePrompt);
	    }

	    $('.'+this.popupContainer.className).animate({opacity:1}, 600);
	}

	function initializeEvents(){
		if (this.closeButton) {
			this.closeButton.addEventListener('click', this.hide.bind(this));
		}
		if (this.bgOverlay) {
			this.bgOverlay.addEventListener('click', this.hide.bind(this));
		}
		if (this.continuePrompt) {
			this.continuePrompt.addEventListener('click', this.hide.bind(this));
		}
	}


}());
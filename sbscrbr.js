(function(){
	
	//constructor
	this.Sbscrbr = function(){

		// global element references
		this.closeButton = null;
		this.popupContainer = null;
		this.popup = null;
		this.bgOverlay = null;

		//option defaults

		var defaults = {
			actionLink:'https://cee434.us20.list-manage.com/subscribe/post?u=367bd932af3cffb2c50abb080&amp;id=868c254e81',
			closeButton:true, // button to close popup
			bgOverlay:true, // backaground overlay
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

	Sbscrbr.prototype.show = function() {
		// Build popup
		buildPopup.call(this);
	};

	Sbscrbr.prototype.hide = function() {
		
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
	        			'<div class="mc-field-group">' +
	        			'<label for="mce-EMAIL">Email Address  <span class="asterisk">*</span></label>' +
	        			'<input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL">' + 
	        		'</div>' +
	        		'<div id="mce-responses" class="clear">' +
	        			'<div class="response" id="mce-error-response" style="display:none"></div>' +
	        			'<div class="response" id="mce-success-response" style="display:none"></div>' +
	        		'</div>' +
	            	'<div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_367bd932af3cffb2c50abb080_868c254e81" tabindex="-1" value=""></div>' +
	            	'<div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></div>' + 
	            '</div>' +
	        '</form>';
	    this.popupContainer.appendChild(this.popup);

	    document.body.appendChild(this.popupContainer);
	}

}());
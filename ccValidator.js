(function($){
	$.fn.validCC = function(options){
		options = options || {};
		var separator = options.separator || undefined;
		var $input = $(this);

		function check($input){
			var ccNumber = removeSeparator($input.val());
			var lengthCheck = withinLengthParameters(ccNumber, 13, 16);

			return lengthCheck;
		}

		function withinLengthParameters(ccNumber, min, max){
			return ccNumber.length >= min && ccNumber.length <= max;
		}

		function removeSeparator(ccNumber){
			if(separator != undefined ){
				ccNumber = ccNumber.trim().split(separator).join();
			}
			return ccNumber;
		}
		return check($input);
	};
})(jQuery);
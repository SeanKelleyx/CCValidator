(function($){
	$.fn.validCC = function(options){
		options = options || {};
		var separator = options.separator || undefined;
		var min = 13;
		var max = 19
		var $input = $(this);

		function check($input){
			var ccNumber = removeSeparator($input.val());
			if($.isNumeric(ccNumber)){
				var lengthCheck = withinLengthParameters(ccNumber, min, max);

				return lengthCheck;
			}
			return false;
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

		function luhnCheck(ccNumber){

		}
		return check($input);
	};
})(jQuery);
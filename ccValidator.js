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
				return withinLengthParameters(ccNumber, min, max) && 
				       luhnCheck(ccNumber);
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
			var ccNumberArray = ccNumber.split('').map(Number);
			var lastDigit = ccNumberArray.pop();
			ccNumberArray.reverse();
			for (var i=0; i < ccNumberArray.length; i++){
				if (i%2 === 0){
					ccNumberArray[i] = ccNumberArray[i] * 2;
					if (ccNumberArray[i] > 9){
						ccNumberArray[i] = ccNumberArray[i] - 9;
					}
				}
			}
			var total = 0;
			for (var digit in ccNumberArray){
				total += ccNumberArray[digit];
			}
			return (total + lastDigit) % 10 === 0;
		}
		return check($input);
	};
})(jQuery);
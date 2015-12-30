(function($){
	$.fn.validCC = function(options){
		//create object of card names and patterns
		var cardPrefixesAndLengths = $.parseJSON('{"amex":{"startsWith":["34","37"],"min":15,"max":15},"dinersCart":{"startsWith":["300", "301", "302", "303", "304", "305"],"min":14,"max":14},"dinersInt":{"startsWith":["36"],"min":14,"max":14},"dinersUS":{"startsWith":["54"],"min":16,"max":16},"discover":{"startsWith":["6011", "6221", "6222", "6223", "6224", "6225", "6226", "6227", "6228", "6229", "644", "645", "646", "647", "648", "649", "65"],"min":16,"max":16},"insta":{"startsWith":["637", "638", "639"],"min":16,"max":16},"jcb":{"startsWith":["352","353", "354", "355", "356", "357", "358"],"min":16,"max":16},"laser":{"startsWith":["6304", "6706", "6771", "6709"],"min":16,"max":19},"maestro":{"startsWith":["5018", "5020", "5038", "5893", "6759", "6761", "6762", "6763"],"min":16,"max":19},"master":{"startsWith":["51", "52", "53", "54", "55"],"min":16,"max":19},"visae":{"startsWith":["4026", "417500", "4508", "4844", "4913", "4917"],"min":16,"max":16},"visa":{"startsWith":["4"],"min":13,"max":16}}');
		
		//set options to {} if none are passed in 
		options = options || {};
		var on = options.on;
		var allowedCards = options.separator || Object.keys(cardPrefixesAndLengths);
		var success = options.success || (function(){});
  		var failure = options.failure || (function(){});
  		var getCardType = options.getCardType || false;
		var cardType = "unknown";
		var minLength, maxLength;
		var allPrefixes = [];
		setCardParameters();
		
		var $input = $(this);


		//set parameters to fit allowed patterns and remove bad card names
		function setCardParameters(){
			var allKeys = Object.keys(cardPrefixesAndLengths);
			var remove = [];
			for(var i in allowedCards){
				if (allKeys.indexOf(allowedCards[i]) === -1 ){
					remove.push(i);
				}
			}
			remove.reverse();
			for(var i in remove){
				allowedCards.splice(remove[i], 1);
			}
			$.each(cardPrefixesAndLengths, function(key, value){
				allPrefixes = allPrefixes.concat(value.startsWith);
			});
		}
		
		function checkCard($input){
			var ccNumber = $input.val();
			if($.isNumeric(ccNumber)){
				var cType = populateCardTypeFromCardNumber(ccNumber);
				if (allowedCards.indexOf(cType) > -1 && withinLengthParameters(ccNumber)){
					return luhnCheck(ccNumber);
				}
			}
			return false;
		}

		//make sure card number fits the length profile for an accepted card
		function withinLengthParameters(ccNumber){
			return ccNumber.length >= min && ccNumber.length <= max;
		}

		//get card type from prefix
		function getCardType(prefix){
			$.each(cardPrefixesAndLengths, function(key, value){
				if(value.startsWith.indexOf(prefix) > -1){
					cardType = key;
				}
			});
			return cardType;
		}

		//get card type from card number
		function populateCardTypeFromCardNumber(ccNumber){
			for(var i in allPrefixes){
				if(ccNumber.indexOf(allPrefixes[i]) === 0){
					return getCardType(allPrefixes[i]);
				}
			}
			return cardType;
		} 

		//run card through the Luhn algorithm to verify authenticity
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

		function callbacks($input){
			checkCard($input) ? success.call($input.get(0)) : failure.call($input.get(0));
		}

		if(typeof on === "string"){
			$input.bind(on, function(){
				callbacks($(this));
			});
		}

		if(getCardType){
			checkCard($input);
			return cardType;
		}
		return checkCard($input);
	};
})(jQuery);



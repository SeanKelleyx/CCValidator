(function($){
	$.fn.validCC = function(options){
		options = options || {};
		var cardPrefixesAndLengths = $.parseJSON('{"amex":{"startsWith":["34","37"],"min":15,"max":15},"dinersCart":{"startsWith":["300", "301", "302", "303", "304", "305"],"min":14,"max":14},"dinersInt":{"startsWith":["36"],"min":14,"max":14},"dinersUS":{"startsWith":["54"],"min":16,"max":16},"discover":{"startsWith":["6011", "6221", "6222", "6223", "6224", "6225", "6226", "6227", "6228", "6229", "644", "645", "646", "647", "648", "649", "65"],"min":16,"max":16},"insta":{"startsWith":["637", "638", "639"],"min":16,"max":16},"jcb":{"startsWith":["352","353", "354", "355", "356", "357", "358"],"min":16,"max":16},"laser":{"startsWith":["6304", "6706", "6771", "6709"],"min":16,"max":19},"maestro":{"startsWith":["5018", "5020", "5038", "5893", "6304", "6759", "6761", "6762", "6763"],"min":16,"max":19},"master":{"startsWith":["51", "52", "53", "54", "55"],"min":16,"max":19},"visa":{"startsWith":["4"],"min":13,"max":16},"visae":{"startsWith":["4026", "417500", "4508", "4844", "4913", "4917"],"min":16,"max":16}}');
		var separator = options.separator ? "-" : undefined;
		var allowedCards = options.separator || Object.keys(cardPrefixesAndLengths);
		var min, max;
		var prefixes = [];
		setCardParameters();
		var $input = $(this);
		var cardType = "unknown";

		function check($input){
			var ccNumber = removeSeparator($input.val());
			if($.isNumeric(ccNumber)){
				return withinLengthParameters(ccNumber) && 
					   checkPrefixes(ccNumber);
				       luhnCheck(ccNumber);
			}
			return false;
		}

		function withinLengthParameters(ccNumber){
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
			var mins = [];
			var maxs = [];
			for(var i in allowedCards){
				var card = cardPrefixesAndLengths[allowedCards[i]];
				mins.push(card.min);
				maxs.push(card.max);
				prefixes = prefixes.concat(card.startsWith);
			}
			min = Math.min.apply(Math, mins);
			max = Math.max.apply(Math, maxs);
		}

		function getCardType(prefix){
			$.each(cardPrefixesAndLengths, function(key, value){
				if(value.startsWith.indexOf(prefix) > -1){
					cardType = key;
				}
			});
		}

		function checkPrefixes(ccNumber){
			for(var i in prefixes){
				if(ccNumber.indexOf(prefixes[i]) === 0){
					getCardType(prefixes[i])
					return true;
				}
			}
			return false;
		}

		return check($input);
	};
})(jQuery);



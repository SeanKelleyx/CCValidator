(function($, window, undefined){
	'use strict';
	var cardPrefixesAndLengths = { 
		amex:{
			ccvLen:4,
			startsWith:["34","37"],
			min:15,
			max:15
		},
		dinersCart:{
			ccvLen:4,
			startsWith:["300", "301", "302", "303", "304", "305"],
			min:14,
			max:14
		},
		dinersInt:{
			ccvLen:4,
			startsWith:["36"],
			min:14,
			max:14
		},
		dinersUS:{
			ccvLen:4,
			startsWith:["54"],
			min:16,
			max:16
		},
		discover:{
			ccvLen:3,
			startsWith:['6011', '622126', '622127', '622128', '622129', '62213', '62214', '62215', '62216', '62217', '62218', '62219', '6222', '6223', '6224', '6225', '6226', '6227', '6228', '62290', '62291', '622920', '622921', '622922', '622923', '622924', '622925', '644', '645', '646', '647', '648', '649', '65'],
			min:16,
			max:16
		},
		insta:{
			ccvLen:3,
			startsWith:["637", "638", "639"],
			min:16,
			max:16
		},
		jcb:{
			ccvLen:3,
			startsWith:["352","353", "354", "355", "356", "357", "358"],
			min:16,
			max:16
		},
		laser:{
			ccvLen:3,
			startsWith:["6304", "6706", "6771", "6709"],
			min:16,
			max:19
		},
		maestro:{
			ccvLen:3,
			startsWith:['5018', '5020', '5038', '6304', '6759', '6761', '6762', '6763', '6764', '6765', '6766'],
			min:16,
			max:19
		},
		master:{
			ccvLen:3,
			startsWith:["51", "52", "53", "54", "55"],
			min:16,
			max:19
		},
		solo: {
			ccvLen:3,
            startsWith: ['6334', '6767'],
            min:16,
			max:19
        },
        UNIONPAY: {
			ccvLen:3,
            startsWith: ['622126', '622127', '622128', '622129', '62213', '62214', '62215', '62216', '62217', '62218', '62219', '6222', '6223', '6224', '6225', '6226', '6227', '6228', '62290', '62291', '622920', '622921', '622922', '622923', '622924', '622925'],
            min:16,
			max:19
        },
		visae:{
			ccvLen:3,
			startsWith:["4026", "417500", "4508", "4844", "4913", "4917"],
			min:16,
			max:16
		},
		visa:{
			ccvLen:3,
			startsWith:["4"],
			min:13,
			max:16
		}
	};
	var unknownCardType = "unknown";
	var minLength, maxLength;
	var allPrefixes = [];
	$.each(cardPrefixesAndLengths, function(key, value){
		allPrefixes = allPrefixes.concat(value.startsWith);
	});

	//get card type from prefix
	function _getCardTypeFromPrefix(prefix){
		var cType = unknownCardType;
		$.each(cardPrefixesAndLengths, function(key, value){
			if(value.startsWith.indexOf(prefix) > -1){
				cType = key;
			}
		});
		return cType;
	}

	//get card type from card number
	function _populateCardTypeFromCardNumber(ccNumber){
		var cType = unknownCardType;
		for(var i in allPrefixes){
			if(ccNumber.indexOf(allPrefixes[i]) === 0){
				return _getCardTypeFromPrefix(allPrefixes[i]);
			}
		}
		return cType;
	} 

	//run card through the Luhn algorithm to verify authenticity
	function _luhnCheck(ccNumber){
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

	//make sure card number fits the length profile for an accepted card
	function _withinLengthParameters(ccNumber, cType){
		return ccNumber.length >= cardPrefixesAndLengths[cType].min && ccNumber.length <= cardPrefixesAndLengths[cType].max;
	}

	//remove bad card names
	function _cleanAllowedCards(allowedCards){
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
		return allowedCards;
	}

	$.fn.validCC = function(opts){
		var defaults = {
			on: false,
			acceptedCards: Object.keys(cardPrefixesAndLengths),
			success: (function(){}),
			failure: (function(){}),
		}
		var options = $.extend(defaults, opts || {});
		var allowedCards = _cleanAllowedCards(options.acceptedCards);
		
		var $input = $(this);
		
		function checkCard($input){
			var ccNumber = $input.val();
			if($.isNumeric(ccNumber)){
				var cType = _populateCardTypeFromCardNumber(ccNumber);
				if (allowedCards.indexOf(cType) > -1 && _withinLengthParameters(ccNumber, cType)){
					return _luhnCheck(ccNumber);
				}
			}
			return false;
		}

		function callbacks($input){
			checkCard($input) ? options.success.call($input.get(0)) : options.failure.call($input.get(0));
		}

		if(typeof options.on === "string"){
			$input.bind(options.on, function(){
				callbacks($(this));
			});
		}

		return checkCard($input);
	};

	$.fn.validCvv = function(opts){
		var defaults = {
			cardType: "",
			cardInput: ""
		}
		var options = $.extend(defaults, opts || {});
		var $input = $(this);
		var cvv = $input.val();
		var validLength;
		var hasCardInput = options.cardInput != "";
		var hasCardType = options.cardType != "";

		if($.isNumeric(cvv)){
			if(hasCardType){
				validLength = cardPrefixesAndLengths[options.cardType].ccvLen;
				var re = new RegExp('^[0-9]{'+validLength+'}$');
				return re.test(cvv);
			}else if(hasCardInput){
				var ccNumber = options.cardInput.value;
				if($.isNumeric(ccNumber)){
					var cType = _populateCardTypeFromCardNumber(ccNumber);
					if(cType==="unknown"){
						return false;
					}else{
						validLength = cardPrefixesAndLengths[cType].ccvLen;
						var re = new RegExp('^[0-9]{'+validLength+'}$');
						return re.test(cvv);
					}
				}
	        }
	        if (/^[0-9]{3,4}$/.test(cvv)) {
                return true;
            }
		}
		return false;
	}

	$.fn.validLength = function(opts){
		var defaults = {
			acceptedCards: Object.keys(cardPrefixesAndLengths)
		}
		var options = $.extend(defaults, opts || {});
		var $input = $(this);
		var allowedCards = _cleanAllowedCards(options.acceptedCards);
		var ccNumber = $input.val();
		if($.isNumeric(ccNumber)){
			var cType = _populateCardTypeFromCardNumber(ccNumber);
			if (allowedCards.indexOf(cType) > -1 && _withinLengthParameters(ccNumber, cType)){
				return true;
			}
		}
		return false;
	};

	$.fn.getCardType = function(){
		var $input = $(this);
		var ccNumber = $input.val();
		if($.isNumeric(ccNumber)){
			return _populateCardTypeFromCardNumber(ccNumber);
		}
		return unknownCardType;
	};

	$.fn.luhnCheck = function(){
		var $input = $(this);
		var ccNumber = $input.val();
		if($.isNumeric(ccNumber)){
			return _luhnCheck(ccNumber);
		}
		return false;
	};

})(jQuery, window);



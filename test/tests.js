(function($){
	var $input = $("<input></input>");
	QUnit.test("test validCC() no options invalid", function(assert){
		$input.val("12345");
		assert.equal(false, $input.validCC());
	});
	QUnit.test("test validCC() no options visa", function(assert){
		$input.val("4024007160979943");
		assert.equal(true, $input.validCC());
	});
	QUnit.test("test validCC() no options mastercard", function(assert){
		$input.val("5109137489501980");
		assert.equal(true, $input.validCC());
	});
	QUnit.test("test validCC() no options discover", function(assert){
		$input.val("6011352767031544");
		assert.equal(true, $input.validCC());
	});
	QUnit.test("test validCC() no options amex", function(assert){
		$input.val("347425443456620");
		assert.equal(true, $input.validCC());
	});
	QUnit.test("test validCC() no options diners", function(assert){
		$input.val("36951285762086");
		assert.equal(true, $input.validCC());
	});
	QUnit.test("test validCC() acceptedCards visa", function(assert){
		$input.val("4024007160979943");
		assert.equal(true, $input.validCC({acceptedCards: ["visa"]}));
		assert.equal(false, $input.validCC({acceptedCards: ["amex","master","maestro","dinersInt"]}));
	});
	QUnit.test("test validCC() acceptedCards mastercard", function(assert){
		$input.val("5109137489501980");
		assert.equal(true, $input.validCC({acceptedCards: ["master"]}));
		assert.equal(false, $input.validCC({acceptedCards: ["amex","visa","maestro","dinersInt"]}));
	});
	QUnit.test("test validCC() acceptedCards discover", function(assert){
		$input.val("6011352767031544");
		assert.equal(true, $input.validCC({acceptedCards: ["discover"]}));
		assert.equal(false, $input.validCC({acceptedCards: ["amex","master","maestro","dinersInt","visa"]}));
	});
	QUnit.test("test validCC() acceptedCards amex", function(assert){
		$input.val("347425443456620");
		assert.equal(true, $input.validCC({acceptedCards: ["amex"]}));
		assert.equal(false, $input.validCC({acceptedCards: ["visa","master","maestro","dinersInt"]}));
	});
	QUnit.test("test validCC() acceptedCards diners", function(assert){
		$input.val("36951285762086");
		assert.equal(true, $input.validCC({acceptedCards: ["dinersInt"]}));
		assert.equal(false, $input.validCC({acceptedCards: ["amex","master","maestro","visa"]}));
	});
	QUnit.test("test validCC() on success visa", function( assert){
		$input.val("4024007160979943");
		var clickedSuccess = false;
		$input.validCC({on: "click", success: function(){
			clickedSuccess = true;
		}});
		assert.equal(false, clickedSuccess);
		$input.trigger("click");
		assert.equal(true, clickedSuccess);
	});
	QUnit.test("test validCC() on failure visa", function( assert){
		$input.val("12345");
		var clickedFailure = false;
		$input.validCC({on: "click", failure: function(){
			clickedFailure = true;
		}});
		assert.equal(false, clickedFailure);
		$input.trigger("click");
		assert.equal(true, clickedFailure);
	});
	QUnit.test("test validLength() no options", function(assert){
		$input.val("12345");
		assert.equal(false, $input.validLength());
		$input.val("12345678901234");
		assert.equal(true, $input.validLength());
	});
	QUnit.test("test validLength() acceptedCards", function(assert){
		$input.val("1234567890123");
		assert.equal(false, $input.validLength({acceptedCards: ["amex"]}));
		$input.val("123456789012345");
		assert.equal(true, $input.validLength({acceptedCards: ["amex"]}));
	});
	QUnit.test("test getCardType() visa", function(assert){
		$input.val("4024007160979943");
		assert.equal("visa", $input.getCardType());
	});
	QUnit.test("test getCardType() mastercard", function(assert){
		$input.val("5109137489501980");
		assert.equal("master", $input.getCardType());
	});
	QUnit.test("test getCardType() discover", function(assert){
		$input.val("6011352767031544");
		assert.equal("discover", $input.getCardType());
	});
	QUnit.test("test getCardType() amex", function(assert){
		$input.val("347425443456620");
		assert.equal("amex", $input.getCardType());
	});
	QUnit.test("test getCardType() diners", function(assert){
		$input.val("36951285762086");
		assert.equal("dinersInt", $input.getCardType());
	});
	QUnit.test("test luhnCheck() fail", function(assert){
		$input.val("4024007160979942");
		assert.equal(false, $input.luhnCheck());
	});
	QUnit.test("test luhnCheck() pass", function(assert){
		$input.val("4024007160979943");
		assert.equal(true, $input.luhnCheck());
	});
	QUnit.test("test luhnCheck() pass", function(assert){
		$input.val("347425443456620");
		assert.equal(true, $input.luhnCheck());
	});
	QUnit.test("test isDateValid() year month and day pass", function(assert){
		assert.equal(true, $input.isDateValid({year:2020,month:10,day:27}));
	});
	QUnit.test("test isDateValid() year and monthpass", function(assert){
		assert.equal(true, $input.isDateValid({year:2020,month:10}));
	});
	QUnit.test("test isDateValid() year pass", function(assert){
		assert.equal(true, $input.isDateValid({year:2020}));
	});
	QUnit.test("test isDateValid() year month and day fail", function(assert){
		assert.equal(false, $input.isDateValid({year:2015,month:10,day:27}));
	});
	QUnit.test("test isDateValid() year and month fail", function(assert){
		assert.equal(false, $input.isDateValid({year:2015,month:10}));
	});
	QUnit.test("test isDateValid() year fail", function(assert){
		assert.equal(false, $input.isDateValid({year:2015}));
	});
})(jQuery);
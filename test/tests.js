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
		assert.equal(false, $input.validCC({acceptedCards: ["amex","master","maestro","dinersUS"]}));
	});
	QUnit.test("test validCC() acceptedCards mastercard", function(assert){
		$input.val("5109137489501980");
		assert.equal(true, $input.validCC({acceptedCards: ["master"]}));
		assert.equal(false, $input.validCC({acceptedCards: ["amex","visa","maestro","dinersUS"]}));
	});
	QUnit.test("test validCC() acceptedCards discover", function(assert){
		$input.val("6011352767031544");
		assert.equal(true, $input.validCC({acceptedCards: ["discover"]}));
		assert.equal(false, $input.validCC({acceptedCards: ["amex","master","maestro","dinersUS","visa"]}));
	});
	QUnit.test("test validCC() acceptedCards amex", function(assert){
		$input.val("347425443456620");
		assert.equal(true, $input.validCC({acceptedCards: ["amex"]}));
		assert.equal(false, $input.validCC({acceptedCards: ["visa","master","maestro","dinersUS"]}));
	});
	QUnit.test("test validCC() acceptedCards diners", function(assert){
		$input.val("36951285762086");
		assert.equal(true, $input.validCC({acceptedCards: ["dinersInt"]}));
		assert.equal(false, $input.validCC({acceptedCards: ["amex","master","maestro","visa"]}));
	});
})(jQuery);
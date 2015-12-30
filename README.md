CCValidator
===========
`ccValidator` is a simple jQuery credit card number validator.
This validator checks if there are enough digits in the number and if the number fits known patterns related to the allowed credit card types.

Usage
-----

Available Options
-----------------
**getCardType** - boolean - defaults to `false`  
When `true` the validator returns the card type instead of `true`/`false`, and "unknown" if it doesn't match a pattern.
 
**on** - string (event)  
pass in to run validation on the event passed in  
you can also include callbacks for success and failure  

**success** - function - defaults to function(){} - must be used with **on**  
Pass in a callback to run if card number is valid.

**failure** - function - defaults to function(){} - must be used with **on**   
Pass in a callback to run if card number is invalid.

**acceptedCards** - array - default is all cards.  
If you only want to validate specific cards pass them in as an array.  
Valid card strings:

	* "amex" - (American Express)
	* "dinersCart" - (Diners Club - Carte Blanche)
	* "dinersInt" - (Diners Club - International)
	* "dinersUS" - (Diners Club - USA & Canada)
	* "discover" - (Discover)
	* "insta" - (InstaPayment)
	* "jcb" -(JCB)
	* "laser" - (Laser)
	* "maestro" - (Maestro)
	* "master" - (Master Card)
	* "visa" - (Visa)
	* "visae" - (Visa Electron)
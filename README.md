CCValidator
===========
`ccValidator` is a simple jQuery credit card number validator.
This validator checks if there are enough digits in the number and if the number fits known patterns related to the allowed credit card types.

Usage
-----

Available Options
-----------------
**separator** - boolean - defaults to false.  
Set to true if your input field includes dashes, "-", as separators.

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
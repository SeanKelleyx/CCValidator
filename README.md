CCValidator
===========
`ccValidator` is a simple jQuery credit card number validator.
This validator checks if there are enough digits in the number and if the number fits known patterns related to the allowed credit card types.

Usage
-----
`validCC()` called on the input for the credit card number. Returns `true`/`false`. It checks for a numeric input, checks for a valid credit card type (based on the input value), a valid credit card length for the type, and ensures that the number passes the Luhn algorithm. Accepts options: on, success, failure, acceptedCards.  

`validLength()` called on the input for the credit card number. Returns `true`/`false`. Checks the given credit card number for an acceptable length. Accepts options: acceptedCards.  

`getCardType()` called on the input for the credit card number. Returns the `String` value of the credit card type (see acceptedCards option) or 'unknown' for not found. Accepts no options.  

`luhnCheck()` called on te input for the credit card number. Returns `true`/`false` if the card number passes the Luhn Algorithm. Accepts no options.

`validCvv()` called on the input for the cvv number. Returns `true`/`false` if the ccv is valid length. Accepts options: cardType or cardInput. 

`isDateValid()` called on jquery. Returns `true`/`false` if the date is in the future. Accepts options: year `Number`, month `Number`, day `Number`.


Options
-------
 
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
	* "solo" - (Solo)
	* "unionpay" - (Unionpay)
	* "visa" - (Visa)
	* "visae" - (Visa Electron)

**cardType** - string  - defaults to empty string
Pass in to validCvv() to validate the card specific CVV length.  

**cardInput** - element - defaults to empty string
Pass in to validCvv() to validate the card specific CVV length based on the card number value of the input.

**year** - number - defaults to undefined
Pass in to isDateValid() to validate the year is current or in the future.

**month** - number - defaults to undefined
Pass in to isDateValid() to validate the year/month is current or in the future. Only valid when used with year.

**day** - number - defaults to undefined
Pass in to isDateValid() to validate the year/month/day is current or in the future. Only valid when used with year and month.


jQuery versions
---------------

ccValidator works with 1.7.0 + 
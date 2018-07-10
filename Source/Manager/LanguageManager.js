//_____________________________________________________________________________________________
/**********************************************************************************************

	language management

	@Author: Alexander Bassov
	@Email: blackxes@gmx.de
	@Github: https://www.github.com/Blackxes

/*********************************************************************************************/

var LanguageClass = require( "../Models/Language.js" ).language;
var Filter = require( "../Libraries/Filter.js" ).filter;

//_____________________________________________________________________________________________
var LanguageManager = new class LanguageManagerClass {

	//_________________________________________________________________________________________
	constructor() {

		this.languages = [];
		this.languageIterator = 0;
	}

	//_________________________________________________________________________________________
	// registers a new language
	//
	// param1 (string) expects the language name
	//
	// return boolean
	//		true - when the registration succeeded
	//		false - when the registration failed
	//
	register( name ) {
		
		if ( this.has({"name": name}) )
			return false;
		
		this.languages.push( new LanguageClass( ++this.languageIterator, name ) );

		return this.languageIterator;
	}

	//_________________________________________________________________________________________
	// deletes a language
	//
	// param1 (object) expects the requirements the items shall match
	// param2 (object) expects the option for the filtering
	//
	// return boolean
	//		true - when the deletion succeeded
	//		false - when the deletion failed
	//
	delete( reqs, options ) {

		Filter.filter( this.languages, reqs, options ).forEach( (lang) => {
			this.languages.slice( this.languages.indexOf(lang), 1 );
		});
		
		return !Filter.filter( this.languages, reqs, options );
	}

	//_________________________________________________________________________________________
	// returns the requested language instance
	//
	// param1 (object) expects the requirements the gathered languages shall match
	// param2 (object) expects the options for the filtering
	//
	// return array - the on the requirement and options considered matched languages
	//
	get( reqs, options ) {
		
		return Filter.filter( this.languages, reqs, options );
	}

	//_________________________________________________________________________________________
	// returns the existance of a language as boolean
	//
	// param1 (object) expects the requirements the languages shall match
	// param2 (object) expects the options for the filtering
	//
	// return boolean
	//		true - when the languages exist
	//		false - when no matched languages were found
	//
	has( reqs, options ) {

		return Filter.filter( this.languages, reqs, options ).length != 0;
	}
}
exports.languageManager = LanguageManager;

//_____________________________________________________________________________________________
//
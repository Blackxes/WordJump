//_____________________________________________________________________________________________
/**********************************************************************************************

	vocablary manager

	@Author: Alexander Bassov
	@Email: blackxes@gmx.de
	@Github: https://www.github.com/Blackxes

/*********************************************************************************************/

var VocabularyClass = require( "../Models/Vocabulary.js" ).vocabulary;
var LangManager = require( "../Manager/LanguageManager.js" ).languageManager;

var Filter = require( "../Libraries/Filter.js" ).filter;

//_____________________________________________________________________________________________
var VocabularyManager = new class VocabularyManagerClass {

	//_________________________________________________________________________________________
	constructor() {

		this.vocabulary = [];
		this.vocabularyIterator = 0;
	}

	//_________________________________________________________________________________________
	// registers a new vocabulary
	register( name, language ) {

		// console.log(LangManager.has({"name": language}));

		if ( !name || !language || this.has({ "name": name }) || !LangManager.has({"name": language}) )
			return false;
		
		this.vocabulary.push( (new VocabularyClass(++this.vocabularyIterator, name, language)) );
		
		return this.vocabularyIterator;
	}

	//_________________________________________________________________________________________
	// deletes a vocabulary
	//
	delete( reqs, options ) {

		Filter.filter( this.vocabulary, reqs, options ).forEach( (voc) => {
			this.vocabulary.splice( this.vocabulary.indexOf(voc), 1 );
		});

		return true;
	}

	//_________________________________________________________________________________________
	// returns an array of the requested vocabulary filtered by the language
	//
	get( reqs, options ) {

		if ( name && !filtering && name.constructor !== Array && this.has(name) )
			return this.vocabulary[ this.vocabulary.indexOf(name) ];
		
		return Filter.filter( this.vocabulary, reqs, options );
	}

	//_________________________________________________________________________________________
	// returns the existance of a vocabulary or multiple ones
	//
	has( reqs, options ) {
		
		return Filter.filter( this.vocabulary, reqs, options ).length != 0;
	}

	//_________________________________________________________________________________________
	// associates vocabulary together so that they are handled equaly
	// in the tests although they are different instances but are bind by the language
	//
	// param1 (array) expects the names of the vocabularies
	//
	// return array - containing the vocabularies that couldnt be associated
	//		reason could be that the vocabulary doesnt exist
	//		already associated vocabularies are ignored
	//
	associate( vocs ) {
		
		// get vocabulary instances and the ids as array to easier associate them
		let instances = Filter.filter( this.vocabulary, {"name": vocs} );
		let ids = instances.map( voc => voc.id );
		
		instances.forEach( voc => voc.associate(ids) );

		return true;
	}
}
exports.vocabularyManager = VocabularyManager;

//_____________________________________________________________________________________________
//
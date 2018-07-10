//_____________________________________________________________________________________________
/**********************************************************************************************

	stores information about a vocabulary

	@Author: Alexander Bassov
	@Email: blackxes@gmx.de
	@Github: https://www.github.com/Blackxes

/*********************************************************************************************/



//_____________________________________________________________________________________________
var Vocabulary = class VocabularyClass {

	//_________________________________________________________________________________________
	constructor( id, name, language ) {

		this.active = true; 
		this.id = id;
		this.name = name;
		this.language = language;

		// contains the ids of the vocabularies that mean the same in other languages
		this.associations = [];
	}

	//_________________________________________________________________________________________
	// inserts an association when not already contained
	//
	// param1 (int) expects the vocabulary id
	//
	// return boolean
	//		true - when the assocation succeeded
	//		false - when no ids are provided or just one and its the own
	//
	associate( ids ) {

		if ( !ids || ids.constructor === Array && ids.length == 1 ) return false;
		
		// adjust when not array
		if ( ids.constructor !== Array )
			ids = [ids];
		
		ids.forEach( (id) => {
			if ( id == this.id || this.associations.indexOf(id) != -1 )
				return true;
			this.associations.push( id );
		});
		
		return true;
	}

	//_________________________________________________________________________________________
	// returns true/false wether this vocabulary is valid or not
	// a valid vocabulary has a id, name and language
	//
	valid() {
		return ( this.id && this.name && this.language );
	}
}
exports.vocabulary = Vocabulary;

//_____________________________________________________________________________________________
//
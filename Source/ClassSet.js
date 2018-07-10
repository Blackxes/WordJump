//_____________________________________________________________________________________________
/**********************************************************************************************

	contains container classes or classes with little functionality

	@Author: Alexander Bassov
	@Email: blackxes@gmx.de
	@Github: https://www.github.com/Blackxes

/*********************************************************************************************/



//_____________________________________________________________________________________________
// contains information about a user
exports.user = class UserClass {

	//_________________________________________________________________________________________
	constructor() {

		this.id = null;
		this.username = null;
		this.languageSets = {};
		this.statistics = null;
	}
}

//_____________________________________________________________________________________________
// manages languages
exports.languageManager = new class LanguageManagerClass {

	//_________________________________________________________________________________________
	constructor() {

		this.languages = [];
	}

	//_________________________________________________________________________________________
	// adds a language
	add( name ) {

		if ( this.has(label) ) {
			console.log("language exists: use \"edit\" instead");
			return true;
		}

		let language = new exports.language( languages.id );
		
		this.languages[language.id] = language;
	}

	//_________________________________________________________________________________________
	// edits a language
	edit( id, options ) {

		// if ()
	}

	//_________________________________________________________________________________________
	// remove a language

	//_________________________________________________________________________________________
	// checks if a language exists
	has( ...ids ) {
		
		let result = this.get(ids);

		ids.forEach( (id) => {
		});

		return Boolean(result[0]);
	}

	//_________________________________________________________________________________________
	// returns a language by either the id or label
	get( ...id ) {

		if ( !id || id && id.constructor !== String || id && id.constructor !== Number )
			return false;

		let result = this.languages.filter( (current) => {
			current.id == id || current.id == label
		});

		return 
	}

}

//_____________________________________________________________________________________________
// stores information about a vocabulary
exports.vocabulary = class VocabularyClass {

	//_________________________________________________________________________________________
	constructor() {

		this.id = null;
		this.label = "VOCABULARY";
		this.language = null;
	}

	//_________________________________________________________________________________________
	//

}

//_____________________________________________________________________________________________
// 

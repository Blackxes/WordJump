//_____________________________________________________________________________________________
/**********************************************************************************************

	stores information about a language

	@Author: Alexander Bassov
	@Email: blackxes@gmx.de
	@Github: https://www.github.com/Blackxes

/*********************************************************************************************/



//_____________________________________________________________________________________________
var Language = class LanguageClass {

	//_________________________________________________________________________________________
	constructor( id, name ) {

		this.active = true;
		this.id = id;
		this.name = name;
	}

	//_________________________________________________________________________________________
	// returns true/false wether this language is valid
	// a valid language has an id and a label
	//
	valid() {
		return ( this.id && this.name );
	}

}
exports.language = Language;

//_____________________________________________________________________________________________
//
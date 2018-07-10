//_____________________________________________________________________________________________
/**********************************************************************************************

	filters a container based on the given filtering and options

	@Author: Alexander Bassov
	@Email: blackxes@gmx.de
	@Github: https://www.github.com/Blackxes

/*********************************************************************************************/


//_________________________________________________________________________________________
var Filter = new class FilterClass {

	//_____________________________________________________________________________________
	constructor() {

		// these values are temporary and get empty after the filtering
		this.container = null;
		this.reqs = {};
		this.options = {};
		this.valid = false;
	}

	//_____________________________________________________________________________________
	// initializes the current filter process
	//
	// param1 (object|array) expects the container
	// param2 (object) expects the requirements
	// param3 (object) expects the options
	//
	// return boolean
	//		true - when the initialization was successful
	//		false - when the initialization failed
	//
	init( container, reqs, _options ) {

		// define base option set to avoid to always check wether item is defined or not
		var options = Object.assign( {"max": 0, "min": 0, "pickout": false}, _options );

		this.container = Object.assign( {}, container );
		this.reqs = Object.assign( {}, reqs );
		this.options = this.resolveOptions(options);

		// validation
		this.valid = this.validate();
		
		// when nothing is given simply return the container
		if ( !this.valid && this.valid !== null || !this.validateOptions() )
			return false;
		
		return true;
	}

	//_____________________________________________________________________________________
	// returns an array with vocabulary filtered by the given requirements
	//
	// param1 (object|array) expects the container
	// param2 (object) expects the requirements
	//		{ property: value } or { property: [val1, val2, etc] }
	// param3 (object) expects the options considering the filtering
	//		max (0): expects the maximum count / results still get returned even when max is not reached
	//		min (0): expects the minimum count / no result is returned when minimum is not reached
	//		pickout (false): removes the requirement defined in the filtering when an item matched
	//			this just increases performance because the check requirements function
	//			doesnt loop through and item since there are no requirements
	//
	// return Array - the filtered container
	//
	filter( container, reqs, _options ) {
		
		// initialize
		if ( !this.init( container, reqs, _options ) )
			return false;
		
		let results = [];
		let iterator = 0;

		for( let key in this.container ) {
			
			// quit when max has been reached
			if ( this.options.max && iterator >= this.options.max ) return results;

			if ( !this.reqs || this.matchesReqs(this.container[key]) )
				iterator = results.push( this.container[key] );
		}

		let returnValue = (this.options.min != 0 && this.options.min > results.length)
			? []
			: results;
		
		this.clear();
		
		return returnValue;
	};

	//_____________________________________________________________________________________
	// checks the requirements for the given value
	//
	// param1 (mixed) expects the value
	// param2 (object) expects the requirements
	//
	// return boolean
	//		true - matches given requirements
	//		false - doesnt match given requirements
	//
	matchesReqs( value ) {

		// dont check if value if defined cause the value can be undefined as well
		if ( !this.reqs || this.reqs && this.reqs.constructor !== Object )
			return true;

		for( let req in this.reqs ) {

			let reqValue = this.reqs[req];

			




			
			if ( reqValue ) {
				
				if ( reqValue.constructor === Function && reqValue(value) )
					return false
				
				else if ( reqValue.constructor === Array ) {
					 
					let contains = reqValue.some( (poss) => {
						if ( poss && poss.constructor === Function )
							return poss( value );
						if ( value[req] && value[req].constructor === Function )
							return value[req]() == poss;
						return value[req] == poss;
					});
					
					if ( !contains ) return false;
				}
			}

			if ( reqValue == value[req] )
				return continue;
		}

		// when no requirement got dismissed everything is fine
		return true;
	}

	//_____________________________________________________________________________________
	// validates given params and return true/false wether valid or not
	//
	// return boolean
	//		true - when valid
	//		false - when invalid
	//
	validate() {
		
		if ( this.container && (this.container.constructor !== Array && this.container.constructor !== Object) ) return false;
		if ( this.reqs && this.reqs.constructor !== Object ) return false;
		if ( this.options && this.options.constructor !== Object ) return false;
		if ( !this.container && !this.reqs && !this.options ) return null;

		return true;
	}

	//_____________________________________________________________________________________
	// validates the options
	//
	// return boolean
	//		true - when options are valid
	//		false - when options are invalid
	//
	validateOptions() {

		if ( !this.options ) return false;
		if ( this.options.max && this.options.min > this.options.max ) return false;

		return true;
	}

	//_____________________________________________________________________________________
	// resolves options
	//
	// param1 (object) expects the options
	//
	// return object
	//		object - the resolved object
	//
	resolveOptions( options ) {

		for( let key in options )
			if ( options[key].constructor === Function )
				options[key] = options[key]();
		
		return options;
	}

	//_____________________________________________________________________________________
	// clear the filter variables
	//
	clear() {

		this.container = {};
		this.reqs = {};
		this.options = {};
		this.valid = false;
	}
}
exports.filter = Filter;

//_____________________________________________________________________________________________
//
'use strict';

//useful things
let replace = require('replace-in-file'),
	randomVal = require('randomval'),

	//set up an object that will take in the name of the log file and preform the needed find and replace
anonData = {
	files: 'api.log',

	from: [/\s*([A-Z])+(?=\s.[ms|we])/g, /\s\d{6}\s(?=[use])/g,/\s\buser\b-\d{1,6}/g,/(?:tenant?.\d+)+/g,/(?!tenant?.\d+)+\s\d{0,2}\s(?=[\b10.\b])/g],
	to: [(' '+randomVal.randomHash(40)), (' '+randomVal.randomHash(6)+' '),(' '+'user-'+randomVal.randomInt()+' '),(' '+'tenant-'+randomVal.randomInt()+' '),(' '+randomVal.randomInt()+' ')],
	allowEmptyPaths: true,
	encoding: 'utf8',

};

//replace the data
replace(anonData)
	.then(changedFiles =>{
		console.log('Complete. api.log have been made anonymous');
})
	.catch(error => {
		console.error('Oops, something happened: ',error);
});


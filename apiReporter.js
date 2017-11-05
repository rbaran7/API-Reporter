'use strict';

//Some useful stuff
let fs = require('fs'),
	array = require('node-array'),
	asyn = require('async'),
	sortValues = require('sort-values'),
	content;

content = fs.readFileSync('api.log', 'utf8'); //reading the file syncly, works out here..

const getTimePeriod = function () {
	//regex the content to grab all timestamps, get the first and last values. Convert to "regular" date/time
	let timeStampArr, firstElement, lastElement, startTime, endTime = null;

	timeStampArr = content.match(/150(\d\.?\d)+/g);
	firstElement = parseInt(timeStampArr[0]); //Start time: 04:34:45 GMT-0500 (EST)
	lastElement = parseInt(timeStampArr[timeStampArr.length - 1]); //End time: 04:35:16 GMT-0500 (EST)

	startTime = new Date(firstElement);
	endTime = new Date(lastElement);

	console.log('\nThe Time Period Cover by the Log is:\n' + startTime + '  to  ' + endTime + '\n');
}

const getValuesFromLog = function(label,regexString){
//regex the content to grab all values of tenants-##/user agent/status code. Kick off async loop to find elements while making key value pairs, return when done.
	let valueArr, sorted = null,
		counts = {};
	
	valueArr = content.match(regexString);
	
	valueArr.forEachAsync(function(element){
		counts[element] = (counts[element] || 0) + 1; //returns value of counts[element] if set or 0. Add one and repeat.
	},
	function showMeTheData(){
		sorted = sortValues(counts, 'desc'); //sort highest to lowest
		console.log(label, sorted);
	});
};

//Organize those async calls!
asyn.series([
	function (callback) {
		getTimePeriod();
		callback();
	},
	function (callback) {
		getValuesFromLog('______________________' + '\nCount of Calls Preformed by Each Tenant (Highest - Lowest):\n', /(?:tenant?.\d+)+/g);
		callback();	
	},
	function (callback) {
		getValuesFromLog('______________________' + '\nUser Agents Ranked by Call Volume (Highest - Lowest):\n', /[?=\S]*\.\w+(?= [- ])|\bjava-sparkpost.*\b./g);
		callback();		
	},
	function (callback) {
		getValuesFromLog('______________________' + '\nHTTP Status Codes by Frequency (Highest - Lowest):\n', /\s\d{3}\s(?=")+/g);
		callback();
	},
], function (err, result) {
	if (err) {
		throw err;
	}
});

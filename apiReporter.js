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

const getTenants = function () {
//regex the content to grab all values of tenants-##. Kick off async loop to find elements while making key value pairs, return when done.
	let tenantArr, sorted = null,
		counts = {};

	tenantArr = content.match(/(?:tenant?.\d+)+/g);

	tenantArr.forEachAsync(function (element) {
			counts[element] = (counts[element] || 0) + 1; //returns value of counts[element] if set or 0. Add one and repeat.
		},
		function showMeData() {
			sorted = sortValues(counts, 'desc'); //sort by highest number of calls
			console.log('______________________' + '\nCount of Calls Preformed by Each Tenant (Highest - Lowest):\n');
			console.log(sorted);
		});
}

const getUserAgents = function () {
	//regex to grab the user agent values. Kick off async loop and check the frequency of each. Return the sorted object.
	let userAgentsArr, sortedAgents = null,
		agentCount = {};

	userAgentsArr = content.match(/[?=\S]*\.\w+(?= [- ])|\bjava-sparkpost.*\b./g);

	userAgentsArr.forEachAsync(function (element) {
			agentCount[element] = (agentCount[element] || 0) + 1;
		},
		function userAgents() {
			sortedAgents = sortValues(agentCount, 'desc');
			console.log('______________________' + '\nUser Agents Ranked by Call Volume (Highest - Lowest):\n');
			console.log(sortedAgents);
		});
}

const getHttpStatusCodes = function () {
	//regex to grab the status code values. Kick off async loop and check the frequency of each. Return the sorted object.
	let statusCodeArr, freq = null,
		codes = {};

	statusCodeArr = content.match(/\s\d{3}\s(?=")+/g);

	statusCodeArr.forEachAsync(function (element) {
			codes[element] = (codes[element] || 0) + 1;
		},
		function getFreqofCodes() {
			freq = sortValues(codes, 'desc');
			console.log('______________________' + '\nHTTP Status Codes by Frequency (Highest - Lowest):\n');
			console.log(freq);
		});
}

//Organize those async calls!
asyn.series([
	function (callback) {
		getTimePeriod();
		callback();
	},
	function (callback) {
		getTenants();
		callback();
	},
	function (callback) {
		getUserAgents();
		callback();
	},
	function (callback) {
		getHttpStatusCodes();
		callback();
	},
], function (err, result) {
	if (err) {
		throw err;
	}
});

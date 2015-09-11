var verifyEmail = false;

Accounts.config({ sendVerificationEmail: verifyEmail });

Meteor.startup(function() {
	// read environment variables from Meteor.settings
	if(Meteor.settings && Meteor.settings.env && _.isObject(Meteor.settings.env)) {
		for(var variableName in Meteor.settings.env) {
			process.env[variableName] = Meteor.settings.env[variableName];
		}
	}

	//
	// Setup OAuth login service configuration (read from Meteor.settings)
	//
	// Your settings file should look like this:
	//
	// {
	//     "oauth": {
	//         "google": {
	//             "clientId": "yourClientId",
	//             "secret": "yourSecret"
	//         },
	//         "github": {
	//             "clientId": "yourClientId",
	//             "secret": "yourSecret"
	//         }
	//     }
	// }
	//
	if(Accounts && Accounts.loginServiceConfiguration && Meteor.settings && Meteor.settings.oauth && _.isObject(Meteor.settings.oauth)) {
		// google
		if(Meteor.settings.oauth.google && _.isObject(Meteor.settings.oauth.google)) {
			// remove old configuration
			Accounts.loginServiceConfiguration.remove({
				service: "google"
			});

			var settingsObject = Meteor.settings.oauth.google;
			settingsObject.service = "google";

			// add new configuration
			Accounts.loginServiceConfiguration.insert(settingsObject);
		}
		// github
		if(Meteor.settings.oauth.github && _.isObject(Meteor.settings.oauth.github)) {
			// remove old configuration
			Accounts.loginServiceConfiguration.remove({
				service: "github"
			});

			var settingsObject = Meteor.settings.oauth.github;
			settingsObject.service = "github";

			// add new configuration
			Accounts.loginServiceConfiguration.insert(settingsObject);
		}
		// linkedin
		if(Meteor.settings.oauth.linkedin && _.isObject(Meteor.settings.oauth.linkedin)) {
			// remove old configuration
			Accounts.loginServiceConfiguration.remove({
				service: "linkedin"
			});

			var settingsObject = Meteor.settings.oauth.linkedin;
			settingsObject.service = "linkedin";

			// add new configuration
			Accounts.loginServiceConfiguration.insert(settingsObject);
		}
		// facebook
		if(Meteor.settings.oauth.facebook && _.isObject(Meteor.settings.oauth.facebook)) {
			// remove old configuration
			Accounts.loginServiceConfiguration.remove({
				service: "facebook"
			});

			var settingsObject = Meteor.settings.oauth.facebook;
			settingsObject.service = "facebook";

			// add new configuration
			Accounts.loginServiceConfiguration.insert(settingsObject);
		}
		// twitter
		if(Meteor.settings.oauth.twitter && _.isObject(Meteor.settings.oauth.twitter)) {
			// remove old configuration
			Accounts.loginServiceConfiguration.remove({
				service: "twitter"
			});

			var settingsObject = Meteor.settings.oauth.twitter;
			settingsObject.service = "twitter";

			// add new configuration
			Accounts.loginServiceConfiguration.insert(settingsObject);
		}
		// meteor
		if(Meteor.settings.oauth.meteor && _.isObject(Meteor.settings.oauth.meteor)) {
			// remove old configuration
			Accounts.loginServiceConfiguration.remove({
				service: "meteor-developer"
			});

			var settingsObject = Meteor.settings.oauth.meteor;
			settingsObject.service = "meteor-developer";

			// add new configuration
			Accounts.loginServiceConfiguration.insert(settingsObject);
		}
	}

	

// we have to create the basic Knowledge domains first, knowledge domain items will be added after that for Users and Projects!
if (Domains.find().count() === 0) {
	console.log('Creating sample knowledge domains...');

	var data = [
		{
			name: 'FreeMarker',
			specifity: 5
		},
		{
			name: 'Lithium REST API',
			specifity: 5
		},
		{
			name: 'HTML',
			specifity: 1
		},
		{
			name: 'CSS',
			specifity: 1
		},
		{
			name: 'JavaScript',
			specifity: 1
		},
		{
			name: 'jQuery',
			specifity: 1
		},
		{
			name: 'Git',
			specifity: 1
		}
	];

	_.each(data, function(obj) {
		console.log('Creating knowledge domain "' + obj.name + '"');

		var objid = Domains.insert({
			name: obj.name,
			specifity: obj.specifity || 1
		});
	});
}

if (Meteor.users.find().count() === 0) {
	console.log('Creating basic users...');

	var data = [
		{
			username: 'luk',
			email: 'spam@this.com',
			password: 'kflowcreate',
			profile: {
				// publicly visible fields go here
				name: 'Lukas Zahnd'
			},
			role: 'admin',
			domainitems: [
				{
					domain: 'FreeMarker',
					value: 5,
					type: 'experience'
				},
				{
					domain: 'Lithium REST API',
					value: 5,
					type: 'experience'
				},
				{
					domain: 'HTML',
					value: 5,
					type: 'experience'
				},
				{
					domain: 'CSS',
					value: 5,
					type: 'experience'
				},
				{
					domain: 'JavaScript',
					value: 4,
					type: 'experience'
				},
				{
					domain: 'jQuery',
					value: 5,
					type: 'experience'
				},
				{
					domain: 'Git',
					value: 3,
					type: 'experience'
				}
			]
		},
		{
			username: 'testadmin',
			email: 'spam+1@this.com',
			password: 'kflowadmin',
			profile: {
				// publicly visible fields go here
				name: 'Test Administrator'
			},
			role: 'admin'
		},
		{
			username: 'aadesh',
			email: 'spam+2@this.com',
			password: 'kflowengineer',
			profile: {
				// publicly visible fields go here
				name: 'Aadesh Advani'
			},
			role: 'user'
		},
		{
			username: 'baadri',
			email: 'spam+3@this.com',
			password: 'kflowengineer',
			profile: {
				// publicly visible fields go here
				name: 'Badri Bindra'
			},
			role: 'user'
		},
		{
			username: 'chakor',
			email: 'spam+4@this.com',
			password: 'kflowengineer',
			profile: {
				// publicly visible fields go here
				name: 'Chakor Charan'
			},
			role: 'user'
		},
		{
			username: 'employeea',
			email: 'spam+5@this.com',
			password: 'kflowengineer',
			profile: {
				// publicly visible fields go here
				name: 'Employee A'
			},
			role: 'user',
			domainitems: [
				{
					domain: 'FreeMarker',
					value: 1,
					type: 'experience'
				},
				{
					domain: 'Lithium REST API',
					value: 1,
					type: 'experience'
				},
				{
					domain: 'HTML',
					value: 2,
					type: 'experience'
				},
				{
					domain: 'CSS',
					value: 2,
					type: 'experience'
				},
				{
					domain: 'JavaScript',
					value: 3,
					type: 'experience'
				},
				{
					domain: 'jQuery',
					value: 3,
					type: 'experience'
				},
				{
					domain: 'Git',
					value: 2,
					type: 'experience'
				}
			]
		},
		{
			username: 'employeeb',
			email: 'spam+6@this.com',
			password: 'kflowengineer',
			profile: {
				// publicly visible fields go here
				name: 'Employee B'
			},
			role: 'user',
			domainitems: [
				{
					domain: 'FreeMarker',
					value: 1,
					type: 'experience'
				},
				{
					domain: 'Lithium REST API',
					value: 1,
					type: 'experience'
				},
				{
					domain: 'HTML',
					value: 3,
					type: 'experience'
				},
				{
					domain: 'CSS',
					value: 4,
					type: 'experience'
				},
				{
					domain: 'JavaScript',
					value: 2,
					type: 'experience'
				},
				{
					domain: 'jQuery',
					value: 2,
					type: 'experience'
				},
				{
					domain: 'Git',
					value: 1,
					type: 'experience'
				}
			]
		}
	];

	_.each(data, function(obj) {
		console.log('Creating user "' + obj.username + '"');

		var objid = Meteor.users.findOne(Accounts.createUser({
			username: obj.username,
			email: obj.email,
			password: obj.password,
			profile: {
				name: obj.profile.name
			}
		}));

		Roles.setUserRoles(objid, obj.role || 'user');


		if ( obj.domainitems != undefined && obj.domainitems.length > 0 ) {
			console.log('Found Knowledge Domain Entries for User "' + obj.username + '"');

			_.each(obj.domainitems, function(item) {
				// console.log(item);
				// we don't want domain items that are not assigned to a domain!
				if ( Domains.findOne({name: item.domain}) ) {
					// console.log('Knowledge Domain with name "' + item.domain + '" found, inserting entry');
					var itemid = Domainknowledges.insert({
						value: item.value,
						type: item.type || null,
						user: objid._id,
						domainId: Domains.findOne({name: item.domain})._id
					});
				} else {
					console.log('No Knowledge Domain with name "' + item.domain + '" found...');
				}
			});
		}
	});
}


if (Evaluations.find().count() === 0) {

	var data = [
		{
			name: 'Evaluation Sequence 1',
			items: [
				{
					text: 'How difficult was the task for you?',
					type: 'single',
					options: [
						{
							option: 'Easy',
							value: 1
						},
						{
							option: 'Quite Easy',
							value: 2
						},
						{
							option: 'Medium',
							value: 3
						},
						{
							option: 'Quite Hard',
							value: 4
						},
						{
							option: 'Hard',
							value: 5
						}
					]
				},
				{
					text: 'How long did you take to complete the task?',
					type: 'single',
					options: [
						{
							option: 'Much less than I expected',
							value: 1
						},
						{
							option: 'Less than I expected',
							value: 2
						},
						{
							option: 'Exactly how I expected',
							value: 3
						},
						{
							option: 'More than I expected',
							value: 4
						},
						{
							option: 'Much more than I expected',
							value: 5
						}
					]
				},
				{
					text: 'How helpful was the provided information material?',
					type: 'single',
					options: [
						{
							option: 'Not helpful at all',
							value: 1
						},
						{
							option: 'I had to search for additional information by myself',
							value: 2
						},
						{
							option: 'I found what I was looking for',
							value: 3
						},
						{
							option: 'I learned something I didnt expect',
							value: 4
						},
						{
							option: 'The information provided great detail and guidance for completing the task',
							value: 5
						}
					]
				}
			]
		},
		{
			name: 'Evaluation FreeMarker Session',
			items: [
				{
					text: 'How difficult was the task for you?',
					type: 'single',
					options: [
						{
							option: 'Easy',
							value: 1
						},
						{
							option: 'Quite Easy',
							value: 2
						},
						{
							option: 'Medium',
							value: 3
						},
						{
							option: 'Quite Hard',
							value: 4
						},
						{
							option: 'Hard',
							value: 5
						}
					]
				},
				{
					text: 'How long did you take to complete the task?',
					type: 'single',
					options: [
						{
							option: 'Much less than I expected',
							value: 1
						},
						{
							option: 'Less than I expected',
							value: 2
						},
						{
							option: 'Exactly how I expected',
							value: 3
						},
						{
							option: 'More than I expected',
							value: 4
						},
						{
							option: 'Much more than I expected',
							value: 5
						}
					]
				},
				{
					text: 'How helpful was the provided information material?',
					type: 'single',
					options: [
						{
							option: 'Not helpful at all',
							value: 1
						},
						{
							option: 'I had to search for additional information by myself',
							value: 2
						},
						{
							option: 'I found what I was looking for',
							value: 3
						},
						{
							option: 'I learned something I didnt expect',
							value: 4
						},
						{
							option: 'The information provided great detail and guidance for completing the task',
							value: 5
						}
					]
				}
			]
		},
		{
			name: 'Evaluation FreeMarker Worked-Example',
			items: [
				{
					text: 'How difficult was the task for you?',
					type: 'single',
					options: [
						{
							option: 'Easy',
							value: 1
						},
						{
							option: 'Quite Easy',
							value: 2
						},
						{
							option: 'Medium',
							value: 3
						},
						{
							option: 'Quite Hard',
							value: 4
						},
						{
							option: 'Hard',
							value: 5
						}
					]
				},
				{
					text: 'How long did you take to complete the task?',
					type: 'single',
					options: [
						{
							option: 'Much less than I expected',
							value: 1
						},
						{
							option: 'Less than I expected',
							value: 2
						},
						{
							option: 'Exactly how I expected',
							value: 3
						},
						{
							option: 'More than I expected',
							value: 4
						},
						{
							option: 'Much more than I expected',
							value: 5
						}
					]
				},
				{
					text: 'How helpful was the provided information material?',
					type: 'single',
					options: [
						{
							option: 'Not helpful at all',
							value: 1
						},
						{
							option: 'I had to search for additional information by myself',
							value: 2
						},
						{
							option: 'I found what I was looking for',
							value: 3
						},
						{
							option: 'I learned something I didnt expect',
							value: 4
						},
						{
							option: 'The information provided great detail and guidance for completing the task',
							value: 5
						}
					]
				}
			]
		},
		{
			name: 'Evaluation FreeMarker Completion Task',
			items: [
				{
					text: 'How difficult was the task for you?',
					type: 'single',
					options: [
						{
							option: 'Easy',
							value: 1
						},
						{
							option: 'Quite Easy',
							value: 2
						},
						{
							option: 'Medium',
							value: 3
						},
						{
							option: 'Quite Hard',
							value: 4
						},
						{
							option: 'Hard',
							value: 5
						}
					]
				},
				{
					text: 'How long did you take to complete the task?',
					type: 'single',
					options: [
						{
							option: 'Much less than I expected',
							value: 1
						},
						{
							option: 'Less than I expected',
							value: 2
						},
						{
							option: 'Exactly how I expected',
							value: 3
						},
						{
							option: 'More than I expected',
							value: 4
						},
						{
							option: 'Much more than I expected',
							value: 5
						}
					]
				},
				{
					text: 'How helpful was the provided information material?',
					type: 'single',
					options: [
						{
							option: 'Not helpful at all',
							value: 1
						},
						{
							option: 'I had to search for additional information by myself',
							value: 2
						},
						{
							option: 'I found what I was looking for',
							value: 3
						},
						{
							option: 'I learned something I didnt expect',
							value: 4
						},
						{
							option: 'The information provided great detail and guidance for completing the task',
							value: 5
						}
					]
				}
			]
		},
		{
			name: 'Evaluation FreeMarker Full Task',
			items: [
				{
					text: 'How difficult was the task for you?',
					type: 'single',
					options: [
						{
							option: 'Easy',
							value: 1
						},
						{
							option: 'Quite Easy',
							value: 2
						},
						{
							option: 'Medium',
							value: 3
						},
						{
							option: 'Quite Hard',
							value: 4
						},
						{
							option: 'Hard',
							value: 5
						}
					]
				},
				{
					text: 'How long did you take to complete the task?',
					type: 'single',
					options: [
						{
							option: 'Much less than I expected',
							value: 1
						},
						{
							option: 'Less than I expected',
							value: 2
						},
						{
							option: 'Exactly how I expected',
							value: 3
						},
						{
							option: 'More than I expected',
							value: 4
						},
						{
							option: 'Much more than I expected',
							value: 5
						}
					]
				},
				{
					text: 'How helpful was the provided information material?',
					type: 'single',
					options: [
						{
							option: 'Not helpful at all',
							value: 1
						},
						{
							option: 'I had to search for additional information by myself',
							value: 2
						},
						{
							option: 'I found what I was looking for',
							value: 3
						},
						{
							option: 'I learned something I didnt expect',
							value: 4
						},
						{
							option: 'The information provided great detail and guidance for completing the task',
							value: 5
						}
					]
				}
			]
		},
		{
			name: 'Evaluation FreeMarker Documenting',
			items: [
				{
					text: 'How difficult was the task for you?',
					type: 'single',
					options: [
						{
							option: 'Easy',
							value: 1
						},
						{
							option: 'Quite Easy',
							value: 2
						},
						{
							option: 'Medium',
							value: 3
						},
						{
							option: 'Quite Hard',
							value: 4
						},
						{
							option: 'Hard',
							value: 5
						}
					]
				},
				{
					text: 'How long did you take to complete the task?',
					type: 'single',
					options: [
						{
							option: 'Much less than I expected',
							value: 1
						},
						{
							option: 'Less than I expected',
							value: 2
						},
						{
							option: 'Exactly how I expected',
							value: 3
						},
						{
							option: 'More than I expected',
							value: 4
						},
						{
							option: 'Much more than I expected',
							value: 5
						}
					]
				},
				{
					text: 'How helpful was the provided information material?',
					type: 'single',
					options: [
						{
							option: 'Not helpful at all',
							value: 1
						},
						{
							option: 'I had to search for additional information by myself',
							value: 2
						},
						{
							option: 'I found what I was looking for',
							value: 3
						},
						{
							option: 'I learned something I didnt expect',
							value: 4
						},
						{
							option: 'The information provided great detail and guidance for completing the task',
							value: 5
						}
					]
				}
			]
		},
		{
			name: 'Evaluation Sequence 2',
			items: [
				{
					text: 'How difficult was the task for you?',
					type: 'single',
					options: [
						{
							option: 'Easy',
							value: 1
						},
						{
							option: 'Quite Easy',
							value: 2
						},
						{
							option: 'Medium',
							value: 3
						},
						{
							option: 'Quite Hard',
							value: 4
						},
						{
							option: 'Hard',
							value: 5
						}
					]
				},
				{
					text: 'How long did you take to complete the task?',
					type: 'single',
					options: [
						{
							option: 'Much less than I expected',
							value: 1
						},
						{
							option: 'Less than I expected',
							value: 2
						},
						{
							option: 'Exactly how I expected',
							value: 3
						},
						{
							option: 'More than I expected',
							value: 4
						},
						{
							option: 'Much more than I expected',
							value: 5
						}
					]
				},
				{
					text: 'How helpful was the provided information material?',
					type: 'single',
					options: [
						{
							option: 'Not helpful at all',
							value: 1
						},
						{
							option: 'I had to search for additional information by myself',
							value: 2
						},
						{
							option: 'I found what I was looking for',
							value: 3
						},
						{
							option: 'I learned something I didnt expect',
							value: 4
						},
						{
							option: 'The information provided great detail and guidance for completing the task',
							value: 5
						}
					]
				}
			]
		},
		{
			name: 'Evaluation Sequence 3',
			items: [
				{
					text: 'How difficult was the task for you?',
					type: 'single',
					options: [
						{
							option: 'Easy',
							value: 1
						},
						{
							option: 'Quite Easy',
							value: 2
						},
						{
							option: 'Medium',
							value: 3
						},
						{
							option: 'Quite Hard',
							value: 4
						},
						{
							option: 'Hard',
							value: 5
						}
					]
				},
				{
					text: 'How long did you take to complete the task?',
					type: 'single',
					options: [
						{
							option: 'Much less than I expected',
							value: 1
						},
						{
							option: 'Less than I expected',
							value: 2
						},
						{
							option: 'Exactly how I expected',
							value: 3
						},
						{
							option: 'More than I expected',
							value: 4
						},
						{
							option: 'Much more than I expected',
							value: 5
						}
					]
				},
				{
					text: 'How helpful was the provided information material?',
					type: 'single',
					options: [
						{
							option: 'Not helpful at all',
							value: 1
						},
						{
							option: 'I had to search for additional information by myself',
							value: 2
						},
						{
							option: 'I found what I was looking for',
							value: 3
						},
						{
							option: 'I learned something I didnt expect',
							value: 4
						},
						{
							option: 'The information provided great detail and guidance for completing the task',
							value: 5
						}
					]
				}
			]
		},
		{
			name: 'Evaluation Sequence 4',
			items: [
				{
					text: 'How difficult was the task for you?',
					type: 'single',
					options: [
						{
							option: 'Easy',
							value: 1
						},
						{
							option: 'Quite Easy',
							value: 2
						},
						{
							option: 'Medium',
							value: 3
						},
						{
							option: 'Quite Hard',
							value: 4
						},
						{
							option: 'Hard',
							value: 5
						}
					]
				},
				{
					text: 'How long did you take to complete the task?',
					type: 'single',
					options: [
						{
							option: 'Much less than I expected',
							value: 1
						},
						{
							option: 'Less than I expected',
							value: 2
						},
						{
							option: 'Exactly how I expected',
							value: 3
						},
						{
							option: 'More than I expected',
							value: 4
						},
						{
							option: 'Much more than I expected',
							value: 5
						}
					]
				},
				{
					text: 'How helpful was the provided information material?',
					type: 'single',
					options: [
						{
							option: 'Not helpful at all',
							value: 1
						},
						{
							option: 'I had to search for additional information by myself',
							value: 2
						},
						{
							option: 'I found what I was looking for',
							value: 3
						},
						{
							option: 'I learned something I didnt expect',
							value: 4
						},
						{
							option: 'The information provided great detail and guidance for completing the task',
							value: 5
						}
					]
				}
			]
		}
	];

	_.each(data, function(obj) {
		console.log('Creating evaluation "' + obj.name + '"');

		var objid = Evaluations.insert({
			name: obj.name
		});

		if ( obj.items != undefined && obj.items.length > 0 ) {
			console.log('Found items for evaluation "' + obj.name + '"');

			_.each(obj.items, function(item) {
				// console.log(item);
				var itemid = Evaluationitems.insert({
					evaluationId: objid,
					text: item.text,
					type: item.type
				});

				if ( item.options != undefined && item.options.length > 0 ) {
					console.log('Found options for evaluation item "' + item.text + '"');

					_.each(item.options, function(option) {
						// console.log(option);
						var optionid = Evaluationitemoptions.insert({
							evaluationitemId: itemid,
							option: option.option,
							value: option.value
						});
					});
				}
			});
		}
	});
}


if (Projects.find().count() === 0) {
	console.log('Creating sample projects...');

	var data = [
		{
			name: 'Sample Project',
			owner: Meteor.users.findOne({username: 'luk'}) ? Meteor.users.findOne({username: 'luk'})._id : null,
			start: new Date('2015/08/14'),
			end: new Date('2015/12/31'),
			description: 'This is a description of the sample project which is implemented in more detail.',
			specifity: 5,
			complexity: 2,
			sequences: [
				{
					name: 'Sequence 1',
					start: new Date('2015/08/14'),
					end: new Date('2015/08/21'),
					// project: Projects.findOne({name: 'Sample Project'}),
					user: Meteor.users.findOne({username: 'employeea'}) ? Meteor.users.findOne({username: 'employeea'})._id : null, // if no user is found, that will generate an execption!
					evaluation: Evaluations.findOne({name: 'Evaluation Sequence 1'}) ? Evaluations.findOne({name: 'Evaluation Sequence 1'})._id : null,
					tasks: [
						{
							name: 'FreeMarker Session',
							type: 'S',
							complexity: 1,
							status: 'ready',
							rating: null,
							domains: Domains.findOne({name: 'FreeMarker'}) ? Domains.findOne({name: 'FreeMarker'})._id : null,
							// sequences: Sequences.findOne({name: 'Sequence 1'}),
							evaluation: Evaluations.findOne({name: 'Evaluation FreeMarker Session'}) ? Evaluations.findOne({name: 'Evaluation FreeMarker Session'})._id : null
						},
						{
							name: 'FreeMarker Worked-Example',
							type: 'W',
							complexity: 2,
							status: 'locked',
							rating: null,
							domains: Domains.findOne({name: 'FreeMarker'}) ? Domains.findOne({name: 'FreeMarker'})._id : null,
							// sequences: Sequences.findOne({name: 'Sequence 1'}),
							evaluation: Evaluations.findOne({name: 'Evaluation FreeMarker Worked-Example'}) ? Evaluations.findOne({name: 'Evaluation FreeMarker Worked-Example'})._id : null
						},
						{
							name: 'FreeMarker Completion Task',
							type: 'C',
							complexity: 3,
							status: 'locked',
							rating: null,
							domains: Domains.findOne({name: 'FreeMarker'}) ? Domains.findOne({name: 'FreeMarker'})._id : null,
							// sequences: Sequences.findOne({name: 'Sequence 1'}),
							evaluation: Evaluations.findOne({name: 'Evaluation FreeMarker Completion Task'}) ? Evaluations.findOne({name: 'Evaluation FreeMarker Completion Task'})._id : null
						},
						{
							name: 'FreeMarker Full Task',
							type: 'F',
							complexity: 4,
							status: 'locked',
							rating: null,
							domains: Domains.findOne({name: 'FreeMarker'}) ? Domains.findOne({name: 'FreeMarker'})._id : null,
							// sequences: Sequences.findOne({name: 'Sequence 1'}),
							evaluation: Evaluations.findOne({name: 'Evaluation FreeMarker Full Task'}) ? Evaluations.findOne({name: 'Evaluation FreeMarker Full Task'})._id : null
						},
						{
							name: 'FreeMarker Documenting',
							type: 'D',
							complexity: 1,
							status: 'locked',
							rating: null,
							domains: Domains.findOne({name: 'FreeMarker'}) ? Domains.findOne({name: 'FreeMarker'})._id : null,
							// sequences: Sequences.findOne({name: 'Sequence 1'}),
							evaluation: Evaluations.findOne({name: 'Evaluation FreeMarker Documenting'}) ? Evaluations.findOne({name: 'Evaluation FreeMarker Documenting'})._id : null
						}
					]
				},
				{
					name: 'Sequence 2',
					start: new Date('2015/08/22'),
					end: new Date('2015/08/30'),
					// project: Projects.findOne({name: 'Sample Project'}),
					user: Meteor.users.findOne({username: 'employeeb'}) ? Meteor.users.findOne({username: 'employeeb'})._id : null,
					evaluation: Evaluations.findOne({name: 'Evaluation Sequence 2'}) ? Evaluations.findOne({name: 'Evaluation Sequence 2'})._id : null
				},
				{
					name: 'Sequence 3',
					start: new Date('2015/09/01'),
					end: new Date('2015/09/11'),
					// project: Projects.findOne({name: 'Sample Project'}),
					user: Meteor.users.findOne({username: 'employeeb'}) ? Meteor.users.findOne({username: 'employeeb'})._id : null,
					evaluation: Evaluations.findOne({name: 'Evaluation Sequence 3'}) ? Evaluations.findOne({name: 'Evaluation Sequence 3'})._id : null
				},
				{
					name: 'Sequence 4',
					start: new Date('2015/08/21'),
					end: new Date('2015/01/11'),
					// project: Projects.findOne({name: 'Sample Project'}),
					user: Meteor.users.findOne({username: 'employeea'}) ? Meteor.users.findOne({username: 'employeea'})._id : null,
					evaluation: Evaluations.findOne({name: 'Evaluation Sequence 4'}) ? Evaluations.findOne({name: 'Evaluation Sequence 4'})._id : null
				}
			],
			domainitems: [
				{
					domain: 'FreeMarker',
					value: 5,
					type: 'expertise'
				},
				{
					domain: 'Lithium REST API',
					value: 5,
					type: 'expertise'
				},
				{
					domain: 'HTML',
					value: 3,
					type: 'expertise'
				},
				{
					domain: 'CSS',
					value: 5,
					type: 'expertise'
				},
				{
					domain: 'JavaScript',
					value: 2,
					type: 'expertise'
				},
				{
					domain: 'jQuery',
					value: 4,
					type: 'expertise'
				},
				{
					domain: 'Git',
					value: 2,
					type: 'expertise'
				}
			]
		},
		{
			name: 'Project A',
			start: new Date('2015/09/01'),
			end: new Date('2015/02/12'),
			description: 'This is a description of Project A.',
			sequences: [
				
			]
		},
		{
			name: 'Project B',
			start: new Date('2015/03/01'),
			end: new Date('2015/06/27'),
			description: 'This is a description of Project B.',
			sequences: [
				
			]
		},
		{
			name: 'Project C',
			start: new Date('2015/07/17'),
			end: new Date('2015/09/11'),
			description: 'This is a description of Project C.',
			sequences: [
				
			]
		}
	];

	_.each(data, function(obj) {
		console.log('Creating project "' + obj.name + '"');

		var objid = Projects.insert({
			name: obj.name,
			owner: obj.owner || null,
			start: obj.start || null,
			end: obj.end || null,
			specifity: obj.specifity || null,
			complexity: obj.complexity || null,
			description: obj.description || null
		});

		if ( obj.sequences != undefined && obj.sequences.length > 0 ) {
			console.log('Found sequences for project "' + obj.name + '"');

			var order = 1;

			_.each(obj.sequences, function(seq) {
				// console.log(seq);
				var seqid = Sequences.insert({
					name: seq.name,
					order: seq.order || order,
					start: seq.start || null,
					end: seq.end || null,
					projectId: objid || null,
					user: seq.user || null,
					evaluation: seq.evaluation || null
				});

				order++;

				if ( seq.tasks != undefined && seq.tasks.length > 0 ) {
					console.log('Found tasks for sequence "' + seq.name + '"');

					_.each(seq.tasks, function(task) {
						// console.log(task);

						var taskid = Tasks.insert({
							name: task.name,
							type: task.type || null,
							complexity: task.complexity || null,
							status: task.status || null,
							rating: task.rating || null,
							projectId: objid,
							sequenceId: seqid,
							domains: task.domains || null,
							evaluation: task.evaluation || null
						});
					});
				}

			});
		}

		if ( obj.domainitems != undefined && obj.domainitems.length > 0 ) {
			console.log('Found Knowledge Domain Entries for project "' + obj.name + '"');

			_.each(obj.domainitems, function(item) {
				// console.log(item);
				// we don't want domain items that are not assigned to a domain!
				if ( Domains.findOne({name: item.domain}) ) {
					// console.log('Knowledge Domain with name "' + item.domain + '" found, inserting entry');
					var itemid = Domainknowledges.insert({
						value: item.value,
						type: item.type || null,
						project: objid,
						domainId: Domains.findOne({name: item.domain})._id
					});
				} else {
					console.log('No Knowledge Domain with name "' + item.domain + '" found...');
				}
			});
		}
	});
}

});

Meteor.methods({
	"createUserAccount": function(options) {
		if(!Users.isAdmin(Meteor.userId())) {
			throw new Meteor.Error(403, "Access denied.");
		}

		var userOptions = {};
		if(options.username) userOptions.username = options.username;
		if(options.email) userOptions.email = options.email;
		if(options.password) userOptions.password = options.password;
		if(options.profile) userOptions.profile = options.profile;
		if(options.profile && options.profile.email) userOptions.email = options.profile.email;

		Accounts.createUser(userOptions);
	},
	"updateUserAccount": function(userId, options) {
		// only admin or users own profile
		if(!(Users.isAdmin(Meteor.userId()) || userId == Meteor.userId())) {
			throw new Meteor.Error(403, "Access denied.");
		}

		// non-admin user can change only profile
		if(!Users.isAdmin(Meteor.userId())) {
			var keys = Object.keys(options);
			if(keys.length !== 1 || !options.profile) {
				throw new Meteor.Error(403, "Access denied.");
			}
		}

		var userOptions = {};
		if(options.username) userOptions.username = options.username;
		if(options.email) userOptions.email = options.email;
		if(options.password) userOptions.password = options.password;
		if(options.profile) userOptions.profile = options.profile;

		if(options.profile && options.profile.email) userOptions.email = options.profile.email;
		if(options.roles) userOptions.roles = options.roles;

		if(userOptions.email) {
			var email = userOptions.email;
			delete userOptions.email;
			userOptions.emails = [{ address: email }];
		}

		var password = "";
		if(userOptions.password) {
			password = userOptions.password;
			delete userOptions.password;
		}

		if(userOptions) {
			Users.update(userId, { $set: userOptions });
		}

		if(password) {
			Accounts.setPassword(userId, password);
		}
	},

	"sendMail": function(options) {
		this.unblock();

		Email.send(options);
	}
});

Accounts.onCreateUser(function (options, user) {
	user.roles = ["user"];

	if(options.profile) {
		user.profile = options.profile;
	}

	
	return user;
});

Accounts.validateLoginAttempt(function(info) {

	// reject users with role "blocked"
	if(info.user && Users.isInRole(info.user._id, "blocked")) {
		throw new Meteor.Error(403, "Your account is blocked.");
	}

  if(verifyEmail && info.user && info.user.emails && info.user.emails.length && !info.user.emails[0].verified ) {
			throw new Meteor.Error(499, "E-mail not verified.");
  }

	return true;
});


Users.before.insert(function(userId, doc) {
	if(doc.emails && doc.emails[0] && doc.emails[0].address) {
		doc.profile = doc.profile || {};
		doc.profile.email = doc.emails[0].address;
	} else {
		// oauth
		if(doc.services) {
			// google e-mail
			if(doc.services.google && doc.services.google.email) {
				doc.profile = doc.profile || {};
				doc.profile.email = doc.services.google.email;
			} else {
				// github e-mail
				if(doc.services.github && doc.services.github.accessToken) {
					var github = new GitHub({
						version: "3.0.0",
						timeout: 5000
					});

					github.authenticate({
						type: "oauth",
						token: doc.services.github.accessToken
					});

					try {
						var result = github.user.getEmails({});
						var email = _.findWhere(result, { primary: true });
						if(!email && result.length && _.isString(result[0])) {
							email = { email: result[0] };
						}

						if(email) {
							doc.profile = doc.profile || {};
							doc.profile.email = email.email;
						}
					} catch(e) {
						console.log(e);
					}
				} else {
					// linkedin email
					if(doc.services.linkedin && doc.services.linkedin.emailAddress) {
						doc.profile = doc.profile || {};
						doc.profile.name = doc.services.linkedin.firstName + " " + doc.services.linkedin.lastName;
						doc.profile.email = doc.services.linkedin.emailAddress;
					} else {
						if(doc.services.facebook && doc.services.facebook.email) {
							doc.profile = doc.profile || {};
							doc.profile.email = doc.services.facebook.email;
						} else {
							if(doc.services.twitter && doc.services.twitter.email) {
								doc.profile = doc.profile || {};
								doc.profile.email = doc.services.twitter.email;
							} else {
								if(doc.services["meteor-developer"] && doc.services["meteor-developer"].emails && doc.services["meteor-developer"].emails.length) {
									doc.profile = doc.profile || {};
									doc.profile.email = doc.services["meteor-developer"].emails[0].address;
								}
							}
						}
					}
				}
			}
		}
	}
});

Users.before.update(function(userId, doc, fieldNames, modifier, options) {
	if(modifier.$set && modifier.$set.emails && modifier.$set.emails.length && modifier.$set.emails[0].address) {
		modifier.$set.profile.email = modifier.$set.emails[0].address;
	}
});

Accounts.onLogin(function (info) {
	
});

Accounts.urls.resetPassword = function (token) {
	return Meteor.absoluteUrl('reset_password/' + token);
};

Accounts.urls.verifyEmail = function (token) {
	return Meteor.absoluteUrl('verify_email/' + token);
};

this.AdminProjectsDetailsSequenceeditController = RouteController.extend({
	template: "Admin",
	

	yieldTemplates: {
		'AdminProjectsDetailsSequenceedit': { to: 'AdminProjectsDetailsSubcontent'},
		'AdminProjectsDetails': { to: 'AdminSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("Admin"); this.render("loading", { to: "AdminSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("admin_users"),
			Meteor.subscribe("admin_evaluations"),
			Meteor.subscribe("admin_sequence", this.params.sequenceId),
			Meteor.subscribe("admin_project", this.params.projectId)
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		

		return {
			params: this.params || {},
			admin_users: Users.find({}, {}),
			admin_evaluations: Evaluations.find({}, {}),
			admin_sequence: Sequences.findOne({_id:this.params.sequenceId}, {}),
			admin_project: Projects.findOne({_id:this.params.projectId}, {})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
	}
});
this.AdminProjectsDetailsSequencedetailsTaskinsertController = RouteController.extend({
	template: "Admin",
	

	yieldTemplates: {
		'AdminProjectsDetailsSequencedetailsTaskinsert': { to: 'AdminProjectsDetailsSequencedetailsSubcontent'},
		'AdminProjectsDetailsSequencedetails': { to: 'AdminProjectsDetailsSubcontent'},
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
			Meteor.subscribe("admin_domains"),
			Meteor.subscribe("admin_evaluations"),
			Meteor.subscribe("admin_task_new"),
			Meteor.subscribe("admin_project", this.params.projectId),
			Meteor.subscribe("admin_sequence", this.params.sequenceId)
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
			admin_domains: Domains.find({}, {}),
			admin_evaluations: Evaluations.find({}, {}),
			admin_task_new: Tasks.findOne({_id:null}, {}),
			admin_project: Projects.findOne({_id:this.params.projectId}, {}),
			admin_sequence: Sequences.findOne({_id:this.params.sequenceId}, {})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
	}
});
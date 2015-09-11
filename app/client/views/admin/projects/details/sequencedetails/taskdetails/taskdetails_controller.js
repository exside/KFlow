this.AdminProjectsDetailsSequencedetailsTaskdetailsController = RouteController.extend({
	template: "Admin",
	

	yieldTemplates: {
		'AdminProjectsDetailsSequencedetailsTaskdetails': { to: 'AdminProjectsDetailsSequencedetailsSubcontent'},
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
			Meteor.subscribe("admin_task", this.params.taskId),
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
			admin_task: Tasks.findOne({_id:this.params.taskId}, {}),
			admin_project: Projects.findOne({_id:this.params.projectId}, {}),
			admin_sequence: Sequences.findOne({_id:this.params.sequenceId}, {})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
	}
});
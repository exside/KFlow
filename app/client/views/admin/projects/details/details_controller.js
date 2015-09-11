this.AdminProjectsDetailsController = RouteController.extend({
	template: "Admin",
	

	yieldTemplates: {
		'AdminProjectsDetails': { to: 'AdminSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		this.redirect('admin.projects.details.sequencelist', this.params || {}, { replaceState: true });
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
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
			admin_project: Projects.findOne({_id:this.params.projectId}, {})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
	}
});
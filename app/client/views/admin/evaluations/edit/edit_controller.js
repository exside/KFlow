this.AdminEvaluationsEditController = RouteController.extend({
	template: "Admin",
	

	yieldTemplates: {
		'AdminEvaluationsEdit': { to: 'AdminSubcontent'}
		
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
			Meteor.subscribe("admin_evaluation", this.params.evaluationId)
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
			admin_evaluation: Evaluations.findOne({_id:this.params.evaluationId}, {})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
	}
});
this.AdminEvaluationsDetailsEvaluationitemdetailsController = RouteController.extend({
	template: "Admin",
	

	yieldTemplates: {
		'AdminEvaluationsDetailsEvaluationitemdetails': { to: 'AdminEvaluationsDetailsSubcontent'},
		'AdminEvaluationsDetails': { to: 'AdminSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		this.redirect('admin.evaluations.details.evaluationitemdetails.evaluationitemoptionslist', this.params || {}, { replaceState: true });
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("admin_evaluationitem", this.params.evaluationitemId),
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
			admin_evaluationitem: Evaluationitems.findOne({_id:this.params.evaluationitemId}, {}),
			admin_evaluation: Evaluations.findOne({_id:this.params.evaluationId}, {})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
	}
});
this.AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptioninsertController = RouteController.extend({
	template: "Admin",
	

	yieldTemplates: {
		'AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptioninsert': { to: 'AdminEvaluationsDetailsEvaluationitemdetailsSubcontent'},
		'AdminEvaluationsDetailsEvaluationitemdetails': { to: 'AdminEvaluationsDetailsSubcontent'},
		'AdminEvaluationsDetails': { to: 'AdminSubcontent'}
		
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
			Meteor.subscribe("admin_evaluationitemoption_new"),
			Meteor.subscribe("admin_evaluation", this.params.evaluationId),
			Meteor.subscribe("admin_evaluationitem", this.params.evaluationitemId)
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
			admin_evaluationitemoption_new: Evaluationitemoptions.findOne({_id:null}, {}),
			admin_evaluation: Evaluations.findOne({_id:this.params.evaluationId}, {}),
			admin_evaluationitem: Evaluationitems.findOne({_id:this.params.evaluationitemId}, {})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
	}
});
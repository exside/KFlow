this.AdminDomainsDetailsDomainknowledgedetailsController = RouteController.extend({
	template: "Admin",
	

	yieldTemplates: {
		'AdminDomainsDetailsDomainknowledgedetails': { to: 'AdminDomainsDetailsSubcontent'},
		'AdminDomainsDetails': { to: 'AdminSubcontent'}
		
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
			Meteor.subscribe("admin_domainknowledge", this.params.domainknowledgeId),
			Meteor.subscribe("admin_domain", this.params.domainId)
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
			admin_domainknowledge: Domainknowledges.findOne({_id:this.params.domainknowledgeId}, {}),
			admin_domain: Domains.findOne({_id:this.params.domainId}, {})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
	}
});
this.AdminDomainsDetailsDomainknowledgelistController = RouteController.extend({
	template: "Admin",
	

	yieldTemplates: {
		'AdminDomainsDetailsDomainknowledgelist': { to: 'AdminDomainsDetailsSubcontent'},
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
			Meteor.subscribe("admin_domainknowledges", this.params.domainId),
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
			admin_domainknowledges: Domainknowledges.find({domainId:this.params.domainId}, {}),
			admin_domain: Domains.findOne({_id:this.params.domainId}, {})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
	}
});
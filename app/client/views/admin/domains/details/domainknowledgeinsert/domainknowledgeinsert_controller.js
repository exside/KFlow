this.AdminDomainsDetailsDomainknowledgeinsertController = RouteController.extend({
	template: "Admin",
	

	yieldTemplates: {
		'AdminDomainsDetailsDomainknowledgeinsert': { to: 'AdminDomainsDetailsSubcontent'},
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
			Meteor.subscribe("admin_projects"),
			Meteor.subscribe("admin_users"),
			Meteor.subscribe("admin_domainknowledge_new"),
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
			admin_projects: Projects.find({}, {}),
			admin_users: Users.find({}, {}),
			admin_domainknowledge_new: Domainknowledges.findOne({_id:null}, {}),
			admin_domain: Domains.findOne({_id:this.params.domainId}, {})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
	}
});
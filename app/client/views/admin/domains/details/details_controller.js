this.AdminDomainsDetailsController = RouteController.extend({
	template: "Admin",
	

	yieldTemplates: {
		'AdminDomainsDetails': { to: 'AdminSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		this.redirect('admin.domains.details.domainknowledgelist', this.params || {}, { replaceState: true });
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
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
			admin_domain: Domains.findOne({_id:this.params.domainId}, {})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
	}
});
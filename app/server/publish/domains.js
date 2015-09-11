Meteor.publish("admin_domains", function() {
	return Domains.find({}, {});
});

Meteor.publish("admin_domain", function(domainId) {
	return Domains.find({_id:domainId}, {});
});

Meteor.publish("admin_domain_new", function() {
	return Domains.find({_id:null}, {});
});


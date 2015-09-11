Meteor.publish("admin_domainknowledges", function(domainId) {
	return Domainknowledges.publishJoinedCursors(Domainknowledges.find({domainId:domainId}, {}));
});

Meteor.publish("admin_domainknowledge", function(domainknowledgeId) {
	return Domainknowledges.publishJoinedCursors(Domainknowledges.find({_id:domainknowledgeId}, {}));
});

Meteor.publish("admin_domainknowledge_new", function() {
	return Domainknowledges.publishJoinedCursors(Domainknowledges.find({_id:null}, {}));
});


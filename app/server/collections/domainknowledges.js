Domainknowledges.allow({
	insert: function (userId, doc) {
		return Domainknowledges.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Domainknowledges.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Domainknowledges.userCanRemove(userId, doc);
	}
});

Domainknowledges.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Domainknowledges.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Domainknowledges.before.remove(function(userId, doc) {
	
});

Domainknowledges.after.insert(function(userId, doc) {
	
});

Domainknowledges.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Domainknowledges.after.remove(function(userId, doc) {
	
});

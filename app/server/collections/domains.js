Domains.allow({
	insert: function (userId, doc) {
		return Domains.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Domains.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Domains.userCanRemove(userId, doc);
	}
});

Domains.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Domains.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Domains.before.remove(function(userId, doc) {
	
});

Domains.after.insert(function(userId, doc) {
	
});

Domains.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Domains.after.remove(function(userId, doc) {
	
});

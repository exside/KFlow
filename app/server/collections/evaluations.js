Evaluations.allow({
	insert: function (userId, doc) {
		return Evaluations.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Evaluations.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Evaluations.userCanRemove(userId, doc);
	}
});

Evaluations.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Evaluations.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Evaluations.before.remove(function(userId, doc) {
	
});

Evaluations.after.insert(function(userId, doc) {
	
});

Evaluations.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Evaluations.after.remove(function(userId, doc) {
	
});

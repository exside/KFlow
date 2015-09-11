Sequences.allow({
	insert: function (userId, doc) {
		return Sequences.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Sequences.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Sequences.userCanRemove(userId, doc);
	}
});

Sequences.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Sequences.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Sequences.before.remove(function(userId, doc) {
	
});

Sequences.after.insert(function(userId, doc) {
	
});

Sequences.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Sequences.after.remove(function(userId, doc) {
	
});

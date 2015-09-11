Evaluationitemoptions.allow({
	insert: function (userId, doc) {
		return Evaluationitemoptions.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Evaluationitemoptions.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Evaluationitemoptions.userCanRemove(userId, doc);
	}
});

Evaluationitemoptions.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Evaluationitemoptions.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Evaluationitemoptions.before.remove(function(userId, doc) {
	
});

Evaluationitemoptions.after.insert(function(userId, doc) {
	
});

Evaluationitemoptions.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Evaluationitemoptions.after.remove(function(userId, doc) {
	
});

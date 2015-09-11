this.Evaluationitems = new Mongo.Collection("evaluationitems");

this.Evaluationitems.userCanInsert = function(userId, doc) {
	return true;
}

this.Evaluationitems.userCanUpdate = function(userId, doc) {
	return true;
}

this.Evaluationitems.userCanRemove = function(userId, doc) {
	return true;
}

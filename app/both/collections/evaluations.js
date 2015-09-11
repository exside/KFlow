this.Evaluations = new Mongo.Collection("evaluations");

this.Evaluations.userCanInsert = function(userId, doc) {
	return true;
}

this.Evaluations.userCanUpdate = function(userId, doc) {
	return true;
}

this.Evaluations.userCanRemove = function(userId, doc) {
	return true;
}

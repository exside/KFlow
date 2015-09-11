this.Evaluationitemoptions = new Mongo.Collection("evaluationitemoptions");

this.Evaluationitemoptions.userCanInsert = function(userId, doc) {
	return true;
}

this.Evaluationitemoptions.userCanUpdate = function(userId, doc) {
	return true;
}

this.Evaluationitemoptions.userCanRemove = function(userId, doc) {
	return true;
}

this.Sequences = new Mongo.Collection("sequences");

this.Sequences.userCanInsert = function(userId, doc) {
	return true;
}

this.Sequences.userCanUpdate = function(userId, doc) {
	return true;
}

this.Sequences.userCanRemove = function(userId, doc) {
	return true;
}

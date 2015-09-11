this.Domainknowledges = new Mongo.Collection("domainknowledges");

this.Domainknowledges.userCanInsert = function(userId, doc) {
	return true;
}

this.Domainknowledges.userCanUpdate = function(userId, doc) {
	return true;
}

this.Domainknowledges.userCanRemove = function(userId, doc) {
	return true;
}

this.Domains = new Mongo.Collection("domains");

this.Domains.userCanInsert = function(userId, doc) {
	return true;
}

this.Domains.userCanUpdate = function(userId, doc) {
	return true;
}

this.Domains.userCanRemove = function(userId, doc) {
	return true;
}

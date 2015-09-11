Meteor.publish("admin_sequences", function(projectId) {
	return Sequences.publishJoinedCursors(Sequences.find({projectId:projectId}, {}));
});

Meteor.publish("admin_sequence", function(sequenceId) {
	return Sequences.publishJoinedCursors(Sequences.find({_id:sequenceId}, {}));
});

Meteor.publish("admin_sequence_new", function() {
	return Sequences.publishJoinedCursors(Sequences.find({_id:null}, {}));
});


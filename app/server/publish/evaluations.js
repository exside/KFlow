Meteor.publish("admin_evaluations", function() {
	return Evaluations.find({}, {});
});

Meteor.publish("admin_evaluation", function(evaluationId) {
	return Evaluations.find({_id:evaluationId}, {});
});

Meteor.publish("admin_evaluation_new", function() {
	return Evaluations.find({_id:null}, {});
});


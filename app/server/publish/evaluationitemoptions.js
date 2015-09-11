Meteor.publish("admin_evaluationitemoptions", function(evaluationitemId) {
	return Evaluationitemoptions.find({evaluationitemId:evaluationitemId}, {});
});

Meteor.publish("admin_evaluationitemoption", function(evaluationitemoptionId) {
	return Evaluationitemoptions.find({_id:evaluationitemoptionId}, {});
});

Meteor.publish("admin_evaluationitemoption_new", function() {
	return Evaluationitemoptions.find({_id:null}, {});
});


Meteor.publish("admin_evaluationitems", function(evaluationId) {
	return Evaluationitems.find({evaluationId:evaluationId}, {});
});

Meteor.publish("admin_evaluationitem", function(evaluationitemId) {
	return Evaluationitems.find({_id:evaluationitemId}, {});
});

Meteor.publish("admin_evaluationitem_new", function() {
	return Evaluationitems.find({_id:null}, {});
});


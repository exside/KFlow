Meteor.publish("admin_tasks", function(sequenceId) {
	return Tasks.publishJoinedCursors(Tasks.find({sequenceId:sequenceId}, {}));
});

Meteor.publish("admin_task", function(taskId) {
	return Tasks.publishJoinedCursors(Tasks.find({_id:taskId}, {}));
});

Meteor.publish("admin_task_new", function() {
	return Tasks.publishJoinedCursors(Tasks.find({_id:null}, {}));
});


Meteor.publish("admin_projects", function() {
	return Projects.publishJoinedCursors(Projects.find({}, {}));
});

Meteor.publish("admin_project", function(projectId) {
	return Projects.publishJoinedCursors(Projects.find({_id:projectId}, {}));
});

Meteor.publish("admin_project_new", function() {
	return Projects.publishJoinedCursors(Projects.find({_id:null}, {}));
});


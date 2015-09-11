Router.configure({
	templateNameConverter: "upperCamelCase",
	routeControllerNameConverter: "upperCamelCase",
	layoutTemplate: "layout",
	notFoundTemplate: "notFound",
	loadingTemplate: "loading"
});

var publicRoutes = [
	"home_public",
	"login",
	"register",
	"verify_email",
	"forgot_password",
	"reset_password"
];

var privateRoutes = [
	"admin",
	"admin.projects",
	"admin.projects.insert",
	"admin.projects.edit",
	"admin.projects.details",
	"admin.projects.details.sequencelist",
	"admin.projects.details.sequenceinsert",
	"admin.projects.details.sequenceedit",
	"admin.projects.details.sequencedetails",
	"admin.projects.details.sequencedetails.tasklist",
	"admin.projects.details.sequencedetails.taskinsert",
	"admin.projects.details.sequencedetails.taskedit",
	"admin.projects.details.sequencedetails.taskdetails",
	"admin.evaluations",
	"admin.evaluations.insert",
	"admin.evaluations.edit",
	"admin.evaluations.details",
	"admin.evaluations.details.evaluationitemlist",
	"admin.evaluations.details.evaluationiteminsert",
	"admin.evaluations.details.evaluationitemedit",
	"admin.evaluations.details.evaluationitemdetails",
	"admin.evaluations.details.evaluationitemdetails.evaluationitemoptionslist",
	"admin.evaluations.details.evaluationitemdetails.evaluationitemoptioninsert",
	"admin.evaluations.details.evaluationitemdetails.evaluationitemoptionedit",
	"admin.evaluations.details.evaluationitemdetails.evaluationitemoptiondetails",
	"admin.domains",
	"admin.domains.insert",
	"admin.domains.edit",
	"admin.domains.details",
	"admin.domains.details.domainknowledgelist",
	"admin.domains.details.domainknowledgeinsert",
	"admin.domains.details.domainknowledgeedit",
	"admin.domains.details.domainknowledgedetails",
	"admin.users",
	"admin.users.details",
	"admin.users.insert",
	"admin.users.edit",
	"user_settings",
	"user_settings.profile",
	"user_settings.change_pass",
	"logout"
];

var freeRoutes = [
	
];

var roleMap = [
	{ route: "admin",	roles: ["admin"] },
	{ route: "admin.projects",	roles: ["admin"] },
	{ route: "admin.projects.insert",	roles: ["admin"] },
	{ route: "admin.projects.edit",	roles: ["admin"] },
	{ route: "admin.projects.details",	roles: ["admin"] },
	{ route: "admin.projects.details.sequencelist",	roles: ["admin"] },
	{ route: "admin.projects.details.sequenceinsert",	roles: ["admin"] },
	{ route: "admin.projects.details.sequenceedit",	roles: ["admin"] },
	{ route: "admin.projects.details.sequencedetails",	roles: ["admin"] },
	{ route: "admin.projects.details.sequencedetails.tasklist",	roles: ["admin"] },
	{ route: "admin.projects.details.sequencedetails.taskinsert",	roles: ["admin"] },
	{ route: "admin.projects.details.sequencedetails.taskedit",	roles: ["admin"] },
	{ route: "admin.projects.details.sequencedetails.taskdetails",	roles: ["admin"] },
	{ route: "admin.evaluations",	roles: ["admin"] },
	{ route: "admin.evaluations.insert",	roles: ["admin"] },
	{ route: "admin.evaluations.edit",	roles: ["admin"] },
	{ route: "admin.evaluations.details",	roles: ["admin"] },
	{ route: "admin.evaluations.details.evaluationitemlist",	roles: ["admin"] },
	{ route: "admin.evaluations.details.evaluationiteminsert",	roles: ["admin"] },
	{ route: "admin.evaluations.details.evaluationitemedit",	roles: ["admin"] },
	{ route: "admin.evaluations.details.evaluationitemdetails",	roles: ["admin"] },
	{ route: "admin.evaluations.details.evaluationitemdetails.evaluationitemoptionslist",	roles: ["admin"] },
	{ route: "admin.evaluations.details.evaluationitemdetails.evaluationitemoptioninsert",	roles: ["admin"] },
	{ route: "admin.evaluations.details.evaluationitemdetails.evaluationitemoptionedit",	roles: ["admin"] },
	{ route: "admin.evaluations.details.evaluationitemdetails.evaluationitemoptiondetails",	roles: ["admin"] },
	{ route: "admin.domains",	roles: ["admin"] },
	{ route: "admin.domains.insert",	roles: ["admin"] },
	{ route: "admin.domains.edit",	roles: ["admin"] },
	{ route: "admin.domains.details",	roles: ["admin"] },
	{ route: "admin.domains.details.domainknowledgelist",	roles: ["admin"] },
	{ route: "admin.domains.details.domainknowledgeinsert",	roles: ["admin"] },
	{ route: "admin.domains.details.domainknowledgeedit",	roles: ["admin"] },
	{ route: "admin.domains.details.domainknowledgedetails",	roles: ["admin"] },
	{ route: "admin.users",	roles: ["admin"] },
	{ route: "admin.users.details",	roles: ["admin"] },
	{ route: "admin.users.insert",	roles: ["admin"] },
	{ route: "admin.users.edit",	roles: ["admin"] },
	{ route: "user_settings",	roles: ["user","admin"] },
	{ route: "user_settings.profile",	roles: ["user","admin"] },
	{ route: "user_settings.change_pass",	roles: ["user","admin"] }
];

this.firstGrantedRoute = function(preferredRoute) {
	if(preferredRoute && routeGranted(preferredRoute)) return preferredRoute;

	var grantedRoute = "";

	_.every(privateRoutes, function(route) {
		if(routeGranted(route)) {
			grantedRoute = route;
			return false;
		}
		return true;
	});
	if(grantedRoute) return grantedRoute;

	_.every(publicRoutes, function(route) {
		if(routeGranted(route)) {
			grantedRoute = route;
			return false;
		}
		return true;
	});
	if(grantedRoute) return grantedRoute;

	_.every(freeRoutes, function(route) {
		if(routeGranted(route)) {
			grantedRoute = route;
			return false;
		}
		return true;
	});
	if(grantedRoute) return grantedRoute;

	if(!grantedRoute) {
		// what to do?
		console.log("All routes are restricted for current user.");
	}

	return "";
}

// this function returns true if user is in role allowed to access given route
this.routeGranted = function(routeName) {
	if(!routeName) {
		// route without name - enable access (?)
		return true;
	}

	if(!roleMap || roleMap.length === 0) {
		// this app don't have role map - enable access
		return true;
	}

	var roleMapItem = _.find(roleMap, function(roleItem) { return roleItem.route == routeName; });
	if(!roleMapItem) {
		// page is not restricted
		return true;
	}

	if(!Meteor.user() || !Meteor.user().roles) {
		// user is not logged in
		return false;
	}

	// this page is restricted to some role(s), check if user is in one of allowedRoles
	var allowedRoles = roleMapItem.roles;
	var granted = _.intersection(allowedRoles, Meteor.user().roles);
	if(!granted || granted.length === 0) {
		return false;
	}

	return true;
};

Router.ensureLogged = function() {
	if(Meteor.userId() && (!Meteor.user() || !Meteor.user().roles)) {
		return;
	}

	if(!Meteor.userId()) {
		// user is not logged in - redirect to public home
		var redirectRoute = firstGrantedRoute("home_public");
		this.redirect(redirectRoute);
	} else {
		// user is logged in - check role
		if(!routeGranted(this.route.getName())) {
			// user is not in allowedRoles - redirect to first granted route
			var redirectRoute = firstGrantedRoute("");
			this.redirect(redirectRoute);
		} else {
			this.next();
		}
	}
};

Router.ensureNotLogged = function() {
	if(Meteor.userId() && (!Meteor.user() || !Meteor.user().roles)) {
		return;
	}

	if(Meteor.userId()) {
		var redirectRoute = firstGrantedRoute("");
		this.redirect(redirectRoute);
	}
	else {
		this.next();
	}
};

// called for pages in free zone - some of pages can be restricted
Router.ensureGranted = function() {
	if(Meteor.userId() && (!Meteor.user() || !Meteor.user().roles)) {
		return;
	}

	if(!routeGranted(this.route.getName())) {
		// user is not in allowedRoles - redirect to first granted route
		var redirectRoute = firstGrantedRoute("");
		this.redirect(redirectRoute);
	} else {
		this.next();
	}
};

Router.waitOn(function() { 
	Meteor.subscribe("current_user_data");
});

Router.onBeforeAction(function() {
	// loading indicator here
	if(!this.ready()) {
		$("body").addClass("wait");
	} else {
		$("body").removeClass("wait");
		this.next();
	}
});

Router.onBeforeAction(Router.ensureNotLogged, {only: publicRoutes});
Router.onBeforeAction(Router.ensureLogged, {only: privateRoutes});
Router.onBeforeAction(Router.ensureGranted, {only: freeRoutes}); // yes, route from free zone can be restricted to specific set of user roles

Router.map(function () {
	
	this.route("home_public", {path: "/", controller: "HomePublicController"});
	this.route("login", {path: "/login", controller: "LoginController"});
	this.route("register", {path: "/register", controller: "RegisterController"});
	this.route("verify_email", {path: "/verify_email/:verifyEmailToken", controller: "VerifyEmailController"});
	this.route("forgot_password", {path: "/forgot_password", controller: "ForgotPasswordController"});
	this.route("reset_password", {path: "/reset_password/:resetPasswordToken", controller: "ResetPasswordController"});
	this.route("admin", {path: "/admin", controller: "AdminController"});
	this.route("admin.projects", {path: "/admin/projects", controller: "AdminProjectsController"});
	this.route("admin.projects.insert", {path: "/admin/projects/insert", controller: "AdminProjectsInsertController"});
	this.route("admin.projects.edit", {path: "/admin/projects/edit/:projectId", controller: "AdminProjectsEditController"});
	this.route("admin.projects.details", {path: "/admin/projects/details/:projectId", controller: "AdminProjectsDetailsController"});
	this.route("admin.projects.details.sequencelist", {path: "/admin/projects/details/:projectId/sequencelist", controller: "AdminProjectsDetailsSequencelistController"});
	this.route("admin.projects.details.sequenceinsert", {path: "/admin/projects/details/:projectId/sequenceinsert", controller: "AdminProjectsDetailsSequenceinsertController"});
	this.route("admin.projects.details.sequenceedit", {path: "/admin/projects/details/:projectId/sequenceedit/:sequenceId", controller: "AdminProjectsDetailsSequenceeditController"});
	this.route("admin.projects.details.sequencedetails", {path: "/admin/projects/details/:projectId/sequencedetails/:sequenceId", controller: "AdminProjectsDetailsSequencedetailsController"});
	this.route("admin.projects.details.sequencedetails.tasklist", {path: "/admin/projects/details/:projectId/sequencedetails/:sequenceId/tasklist", controller: "AdminProjectsDetailsSequencedetailsTasklistController"});
	this.route("admin.projects.details.sequencedetails.taskinsert", {path: "/admin/projects/details/:projectId/sequencedetails/:sequenceId/taskinsert", controller: "AdminProjectsDetailsSequencedetailsTaskinsertController"});
	this.route("admin.projects.details.sequencedetails.taskedit", {path: "/admin/projects/details/:projectId/sequencedetails/:sequenceId/taskedit/:taskId", controller: "AdminProjectsDetailsSequencedetailsTaskeditController"});
	this.route("admin.projects.details.sequencedetails.taskdetails", {path: "/admin/projects/details/:projectId/sequencedetails/:sequenceId/taskdetails/:taskId", controller: "AdminProjectsDetailsSequencedetailsTaskdetailsController"});
	this.route("admin.evaluations", {path: "/admin/evaluations", controller: "AdminEvaluationsController"});
	this.route("admin.evaluations.insert", {path: "/admin/evaluations/insert", controller: "AdminEvaluationsInsertController"});
	this.route("admin.evaluations.edit", {path: "/admin/evaluations/edit/:evaluationId", controller: "AdminEvaluationsEditController"});
	this.route("admin.evaluations.details", {path: "/admin/evaluations/details/:evaluationId", controller: "AdminEvaluationsDetailsController"});
	this.route("admin.evaluations.details.evaluationitemlist", {path: "/admin/evaluations/details/:evaluationId/evaluationitemlist", controller: "AdminEvaluationsDetailsEvaluationitemlistController"});
	this.route("admin.evaluations.details.evaluationiteminsert", {path: "/admin/evaluations/details/:evaluationId/evaluationiteminsert", controller: "AdminEvaluationsDetailsEvaluationiteminsertController"});
	this.route("admin.evaluations.details.evaluationitemedit", {path: "/admin/evaluations/details/:evaluationId/evaluationitemedit/:evaluationitemId", controller: "AdminEvaluationsDetailsEvaluationitemeditController"});
	this.route("admin.evaluations.details.evaluationitemdetails", {path: "/admin/evaluations/details/:evaluationId/evaluationitemdetails/:evaluationitemId", controller: "AdminEvaluationsDetailsEvaluationitemdetailsController"});
	this.route("admin.evaluations.details.evaluationitemdetails.evaluationitemoptionslist", {path: "/admin/evaluations/details/:evaluationId/evaluationitemdetails/:evaluationitemId/evaluationitemoptionslist", controller: "AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptionslistController"});
	this.route("admin.evaluations.details.evaluationitemdetails.evaluationitemoptioninsert", {path: "/admin/evaluations/details/:evaluationId/evaluationitemdetails/:evaluationitemId/evaluationitemoptioninsert", controller: "AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptioninsertController"});
	this.route("admin.evaluations.details.evaluationitemdetails.evaluationitemoptionedit", {path: "/admin/evaluations/details/:evaluationId/evaluationitemdetails/:evaluationitemId/evaluationitemoptionedit/:evaluationitemoptionId", controller: "AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptioneditController"});
	this.route("admin.evaluations.details.evaluationitemdetails.evaluationitemoptiondetails", {path: "/admin/evaluations/details/:evaluationId/evaluationitemdetails/:evaluationitemId/evaluationitemoptiondetails/:evaluationitemoptionId", controller: "AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptiondetailsController"});
	this.route("admin.domains", {path: "/admin/domains", controller: "AdminDomainsController"});
	this.route("admin.domains.insert", {path: "/admin/domains/insert", controller: "AdminDomainsInsertController"});
	this.route("admin.domains.edit", {path: "/admin/domains/edit/:domainId", controller: "AdminDomainsEditController"});
	this.route("admin.domains.details", {path: "/admin/domains/details/:domainId", controller: "AdminDomainsDetailsController"});
	this.route("admin.domains.details.domainknowledgelist", {path: "/admin/domains/details/:domainId/domainknowledgelist", controller: "AdminDomainsDetailsDomainknowledgelistController"});
	this.route("admin.domains.details.domainknowledgeinsert", {path: "/admin/domains/details/:domainId/domainknowledgeinsert", controller: "AdminDomainsDetailsDomainknowledgeinsertController"});
	this.route("admin.domains.details.domainknowledgeedit", {path: "/admin/domains/details/:domainId/domainknowledgeedit/:domainknowledgeId", controller: "AdminDomainsDetailsDomainknowledgeeditController"});
	this.route("admin.domains.details.domainknowledgedetails", {path: "/admin/domains/details/:domainId/domainknowledgedetails/:domainknowledgeId", controller: "AdminDomainsDetailsDomainknowledgedetailsController"});
	this.route("admin.users", {path: "/admin/users", controller: "AdminUsersController"});
	this.route("admin.users.details", {path: "/admin/users/details/:userId", controller: "AdminUsersDetailsController"});
	this.route("admin.users.insert", {path: "/admin/users/insert", controller: "AdminUsersInsertController"});
	this.route("admin.users.edit", {path: "/admin/users/edit/:userId", controller: "AdminUsersEditController"});
	this.route("user_settings", {path: "/user_settings", controller: "UserSettingsController"});
	this.route("user_settings.profile", {path: "/user_settings/profile", controller: "UserSettingsProfileController"});
	this.route("user_settings.change_pass", {path: "/user_settings/change_pass", controller: "UserSettingsChangePassController"});
	this.route("logout", {path: "/logout", controller: "LogoutController"});
});

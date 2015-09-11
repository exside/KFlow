var pageSession = new ReactiveDict();

Template.AdminProjectsEdit.rendered = function() {
	
};

Template.AdminProjectsEdit.events({
	
});

Template.AdminProjectsEdit.helpers({
	
});

Template.AdminProjectsEditEditForm.rendered = function() {
	

	pageSession.set("adminProjectsEditEditFormInfoMessage", "");
	pageSession.set("adminProjectsEditEditFormErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

	$("input[type='file']").fileinput();
	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
};

Template.AdminProjectsEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminProjectsEditEditFormInfoMessage", "");
		pageSession.set("adminProjectsEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var adminProjectsEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(adminProjectsEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminProjectsEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("admin.projects", {projectId: self.params.projectId});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("adminProjectsEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Projects.update({ _id: t.data.admin_project._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("admin.projects", {projectId: this.params.projectId});
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.AdminProjectsEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminProjectsEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminProjectsEditEditFormErrorMessage");
	}
	
});

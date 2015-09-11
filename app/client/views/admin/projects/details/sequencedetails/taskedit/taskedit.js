var pageSession = new ReactiveDict();

Template.AdminProjectsDetailsSequencedetailsTaskedit.rendered = function() {
	
};

Template.AdminProjectsDetailsSequencedetailsTaskedit.events({
	
});

Template.AdminProjectsDetailsSequencedetailsTaskedit.helpers({
	
});

Template.AdminProjectsDetailsSequencedetailsTaskeditEditForm.rendered = function() {
	

	pageSession.set("adminProjectsDetailsSequencedetailsTaskeditEditFormInfoMessage", "");
	pageSession.set("adminProjectsDetailsSequencedetailsTaskeditEditFormErrorMessage", "");

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

Template.AdminProjectsDetailsSequencedetailsTaskeditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminProjectsDetailsSequencedetailsTaskeditEditFormInfoMessage", "");
		pageSession.set("adminProjectsDetailsSequencedetailsTaskeditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var adminProjectsDetailsSequencedetailsTaskeditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(adminProjectsDetailsSequencedetailsTaskeditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminProjectsDetailsSequencedetailsTaskeditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("admin.projects.details.sequencedetails", {projectId: self.params.projectId, sequenceId: self.params.sequenceId});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("adminProjectsDetailsSequencedetailsTaskeditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Tasks.update({ _id: t.data.admin_task._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("admin.projects.details.sequencedetails", {projectId: this.params.projectId, sequenceId: this.params.sequenceId});
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

Template.AdminProjectsDetailsSequencedetailsTaskeditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminProjectsDetailsSequencedetailsTaskeditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminProjectsDetailsSequencedetailsTaskeditEditFormErrorMessage");
	}
	
});

var pageSession = new ReactiveDict();

Template.AdminProjectsDetailsSequencedetailsTaskinsert.rendered = function() {
	
};

Template.AdminProjectsDetailsSequencedetailsTaskinsert.events({
	
});

Template.AdminProjectsDetailsSequencedetailsTaskinsert.helpers({
	
});

Template.AdminProjectsDetailsSequencedetailsTaskinsertInsertForm.rendered = function() {
	

	pageSession.set("adminProjectsDetailsSequencedetailsTaskinsertInsertFormInfoMessage", "");
	pageSession.set("adminProjectsDetailsSequencedetailsTaskinsertInsertFormErrorMessage", "");

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

Template.AdminProjectsDetailsSequencedetailsTaskinsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminProjectsDetailsSequencedetailsTaskinsertInsertFormInfoMessage", "");
		pageSession.set("adminProjectsDetailsSequencedetailsTaskinsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var adminProjectsDetailsSequencedetailsTaskinsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(adminProjectsDetailsSequencedetailsTaskinsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminProjectsDetailsSequencedetailsTaskinsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("admin.projects.details.sequencedetails", {projectId: self.params.projectId, sequenceId: self.params.sequenceId});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("adminProjectsDetailsSequencedetailsTaskinsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				values.projectId = self.params.projectId;
				values.sequenceId = self.params.sequenceId;

				newId = Tasks.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.AdminProjectsDetailsSequencedetailsTaskinsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminProjectsDetailsSequencedetailsTaskinsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminProjectsDetailsSequencedetailsTaskinsertInsertFormErrorMessage");
	}
	
});

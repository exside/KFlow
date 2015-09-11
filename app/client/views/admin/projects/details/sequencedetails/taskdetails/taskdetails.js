var pageSession = new ReactiveDict();

Template.AdminProjectsDetailsSequencedetailsTaskdetails.rendered = function() {
	
};

Template.AdminProjectsDetailsSequencedetailsTaskdetails.events({
	
});

Template.AdminProjectsDetailsSequencedetailsTaskdetails.helpers({
	
});

Template.AdminProjectsDetailsSequencedetailsTaskdetailsDetailsForm.rendered = function() {
	

	pageSession.set("adminProjectsDetailsSequencedetailsTaskdetailsDetailsFormInfoMessage", "");
	pageSession.set("adminProjectsDetailsSequencedetailsTaskdetailsDetailsFormErrorMessage", "");

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

Template.AdminProjectsDetailsSequencedetailsTaskdetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminProjectsDetailsSequencedetailsTaskdetailsDetailsFormInfoMessage", "");
		pageSession.set("adminProjectsDetailsSequencedetailsTaskdetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var adminProjectsDetailsSequencedetailsTaskdetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(adminProjectsDetailsSequencedetailsTaskdetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminProjectsDetailsSequencedetailsTaskdetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("adminProjectsDetailsSequencedetailsTaskdetailsDetailsFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		Router.go("admin.projects.details.sequencedetails", {projectId: this.params.projectId, sequenceId: this.params.sequenceId});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("admin.projects.details.sequencedetails", {projectId: this.params.projectId, sequenceId: this.params.sequenceId});
	}

	
});

Template.AdminProjectsDetailsSequencedetailsTaskdetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminProjectsDetailsSequencedetailsTaskdetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminProjectsDetailsSequencedetailsTaskdetailsDetailsFormErrorMessage");
	}
	
});

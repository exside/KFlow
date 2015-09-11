var pageSession = new ReactiveDict();

Template.AdminEvaluationsDetails.rendered = function() {
	
};

Template.AdminEvaluationsDetails.events({
	
});

Template.AdminEvaluationsDetails.helpers({
	
});

Template.AdminEvaluationsDetailsDetailsForm.rendered = function() {
	

	pageSession.set("adminEvaluationsDetailsDetailsFormInfoMessage", "");
	pageSession.set("adminEvaluationsDetailsDetailsFormErrorMessage", "");

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

Template.AdminEvaluationsDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminEvaluationsDetailsDetailsFormInfoMessage", "");
		pageSession.set("adminEvaluationsDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var adminEvaluationsDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(adminEvaluationsDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminEvaluationsDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("adminEvaluationsDetailsDetailsFormErrorMessage", message);
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

		Router.go("admin.evaluations", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("admin.evaluations", {});
	}

	
});

Template.AdminEvaluationsDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminEvaluationsDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminEvaluationsDetailsDetailsFormErrorMessage");
	}
	
});

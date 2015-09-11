var pageSession = new ReactiveDict();

Template.AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptiondetails.rendered = function() {
	
};

Template.AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptiondetails.events({
	
});

Template.AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptiondetails.helpers({
	
});

Template.AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptiondetailsDetailsForm.rendered = function() {
	

	pageSession.set("adminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptiondetailsDetailsFormInfoMessage", "");
	pageSession.set("adminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptiondetailsDetailsFormErrorMessage", "");

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

Template.AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptiondetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptiondetailsDetailsFormInfoMessage", "");
		pageSession.set("adminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptiondetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var adminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptiondetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(adminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptiondetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptiondetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("adminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptiondetailsDetailsFormErrorMessage", message);
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

		Router.go("admin.evaluations.details.evaluationitemdetails", {evaluationId: this.params.evaluationId, evaluationitemId: this.params.evaluationitemId});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("admin.evaluations.details.evaluationitemdetails", {evaluationId: this.params.evaluationId, evaluationitemId: this.params.evaluationitemId});
	}

	
});

Template.AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptiondetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptiondetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptiondetailsDetailsFormErrorMessage");
	}
	
});

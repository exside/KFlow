var pageSession = new ReactiveDict();

Template.AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptionedit.rendered = function() {
	
};

Template.AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptionedit.events({
	
});

Template.AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptionedit.helpers({
	
});

Template.AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptioneditEditForm.rendered = function() {
	

	pageSession.set("adminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptioneditEditFormInfoMessage", "");
	pageSession.set("adminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptioneditEditFormErrorMessage", "");

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

Template.AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptioneditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptioneditEditFormInfoMessage", "");
		pageSession.set("adminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptioneditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var adminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptioneditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(adminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptioneditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptioneditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("admin.evaluations.details.evaluationitemdetails", {evaluationId: self.params.evaluationId, evaluationitemId: self.params.evaluationitemId});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("adminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptioneditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Evaluationitemoptions.update({ _id: t.data.admin_evaluationitemoption._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("admin.evaluations.details.evaluationitemdetails", {evaluationId: this.params.evaluationId, evaluationitemId: this.params.evaluationitemId});
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

Template.AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptioneditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptioneditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptioneditEditFormErrorMessage");
	}
	
});

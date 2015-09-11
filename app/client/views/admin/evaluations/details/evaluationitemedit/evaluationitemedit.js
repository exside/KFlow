var pageSession = new ReactiveDict();

Template.AdminEvaluationsDetailsEvaluationitemedit.rendered = function() {
	
};

Template.AdminEvaluationsDetailsEvaluationitemedit.events({
	
});

Template.AdminEvaluationsDetailsEvaluationitemedit.helpers({
	
});

Template.AdminEvaluationsDetailsEvaluationitemeditEditForm.rendered = function() {
	

	pageSession.set("adminEvaluationsDetailsEvaluationitemeditEditFormInfoMessage", "");
	pageSession.set("adminEvaluationsDetailsEvaluationitemeditEditFormErrorMessage", "");

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

Template.AdminEvaluationsDetailsEvaluationitemeditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminEvaluationsDetailsEvaluationitemeditEditFormInfoMessage", "");
		pageSession.set("adminEvaluationsDetailsEvaluationitemeditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var adminEvaluationsDetailsEvaluationitemeditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(adminEvaluationsDetailsEvaluationitemeditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminEvaluationsDetailsEvaluationitemeditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("admin.evaluations.details", {evaluationId: self.params.evaluationId});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("adminEvaluationsDetailsEvaluationitemeditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Evaluationitems.update({ _id: t.data.admin_evaluationitem._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("admin.evaluations.details", {evaluationId: this.params.evaluationId});
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

Template.AdminEvaluationsDetailsEvaluationitemeditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminEvaluationsDetailsEvaluationitemeditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminEvaluationsDetailsEvaluationitemeditEditFormErrorMessage");
	}
	
});

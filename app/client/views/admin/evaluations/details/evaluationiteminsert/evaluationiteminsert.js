var pageSession = new ReactiveDict();

Template.AdminEvaluationsDetailsEvaluationiteminsert.rendered = function() {
	
};

Template.AdminEvaluationsDetailsEvaluationiteminsert.events({
	
});

Template.AdminEvaluationsDetailsEvaluationiteminsert.helpers({
	
});

Template.AdminEvaluationsDetailsEvaluationiteminsertInsertForm.rendered = function() {
	

	pageSession.set("adminEvaluationsDetailsEvaluationiteminsertInsertFormInfoMessage", "");
	pageSession.set("adminEvaluationsDetailsEvaluationiteminsertInsertFormErrorMessage", "");

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

Template.AdminEvaluationsDetailsEvaluationiteminsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminEvaluationsDetailsEvaluationiteminsertInsertFormInfoMessage", "");
		pageSession.set("adminEvaluationsDetailsEvaluationiteminsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var adminEvaluationsDetailsEvaluationiteminsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(adminEvaluationsDetailsEvaluationiteminsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminEvaluationsDetailsEvaluationiteminsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("admin.evaluations.details", {evaluationId: self.params.evaluationId});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("adminEvaluationsDetailsEvaluationiteminsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				values.evaluationId = self.params.evaluationId;

				newId = Evaluationitems.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.AdminEvaluationsDetailsEvaluationiteminsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminEvaluationsDetailsEvaluationiteminsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminEvaluationsDetailsEvaluationiteminsertInsertFormErrorMessage");
	}
	
});

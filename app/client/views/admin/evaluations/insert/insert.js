var pageSession = new ReactiveDict();

Template.AdminEvaluationsInsert.rendered = function() {
	
};

Template.AdminEvaluationsInsert.events({
	
});

Template.AdminEvaluationsInsert.helpers({
	
});

Template.AdminEvaluationsInsertInsertForm.rendered = function() {
	

	pageSession.set("adminEvaluationsInsertInsertFormInfoMessage", "");
	pageSession.set("adminEvaluationsInsertInsertFormErrorMessage", "");

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

Template.AdminEvaluationsInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminEvaluationsInsertInsertFormInfoMessage", "");
		pageSession.set("adminEvaluationsInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var adminEvaluationsInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(adminEvaluationsInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminEvaluationsInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("admin.evaluations", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("adminEvaluationsInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Evaluations.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("admin.evaluations", {});
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

Template.AdminEvaluationsInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminEvaluationsInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminEvaluationsInsertInsertFormErrorMessage");
	}
	
});

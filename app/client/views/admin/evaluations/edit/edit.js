var pageSession = new ReactiveDict();

Template.AdminEvaluationsEdit.rendered = function() {
	
};

Template.AdminEvaluationsEdit.events({
	
});

Template.AdminEvaluationsEdit.helpers({
	
});

Template.AdminEvaluationsEditEditForm.rendered = function() {
	

	pageSession.set("adminEvaluationsEditEditFormInfoMessage", "");
	pageSession.set("adminEvaluationsEditEditFormErrorMessage", "");

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

Template.AdminEvaluationsEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminEvaluationsEditEditFormInfoMessage", "");
		pageSession.set("adminEvaluationsEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var adminEvaluationsEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(adminEvaluationsEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminEvaluationsEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("admin.evaluations", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("adminEvaluationsEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Evaluations.update({ _id: t.data.admin_evaluation._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.AdminEvaluationsEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminEvaluationsEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminEvaluationsEditEditFormErrorMessage");
	}
	
});

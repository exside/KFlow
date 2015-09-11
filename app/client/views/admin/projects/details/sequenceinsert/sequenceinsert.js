var pageSession = new ReactiveDict();

Template.AdminProjectsDetailsSequenceinsert.rendered = function() {
	
};

Template.AdminProjectsDetailsSequenceinsert.events({
	
});

Template.AdminProjectsDetailsSequenceinsert.helpers({
	
});

Template.AdminProjectsDetailsSequenceinsertInsertForm.rendered = function() {
	

	pageSession.set("adminProjectsDetailsSequenceinsertInsertFormInfoMessage", "");
	pageSession.set("adminProjectsDetailsSequenceinsertInsertFormErrorMessage", "");

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

Template.AdminProjectsDetailsSequenceinsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminProjectsDetailsSequenceinsertInsertFormInfoMessage", "");
		pageSession.set("adminProjectsDetailsSequenceinsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var adminProjectsDetailsSequenceinsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(adminProjectsDetailsSequenceinsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminProjectsDetailsSequenceinsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("admin.projects.details", {projectId: self.params.projectId});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("adminProjectsDetailsSequenceinsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				values.projectId = self.params.projectId;

				newId = Sequences.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("admin.projects.details", {projectId: this.params.projectId});
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

Template.AdminProjectsDetailsSequenceinsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminProjectsDetailsSequenceinsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminProjectsDetailsSequenceinsertInsertFormErrorMessage");
	}
	
});

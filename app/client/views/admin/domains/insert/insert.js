var pageSession = new ReactiveDict();

Template.AdminDomainsInsert.rendered = function() {
	
};

Template.AdminDomainsInsert.events({
	
});

Template.AdminDomainsInsert.helpers({
	
});

Template.AdminDomainsInsertInsertForm.rendered = function() {
	

	pageSession.set("adminDomainsInsertInsertFormInfoMessage", "");
	pageSession.set("adminDomainsInsertInsertFormErrorMessage", "");

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

Template.AdminDomainsInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminDomainsInsertInsertFormInfoMessage", "");
		pageSession.set("adminDomainsInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var adminDomainsInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(adminDomainsInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminDomainsInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("admin.domains", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("adminDomainsInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Domains.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("admin.domains", {});
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

Template.AdminDomainsInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminDomainsInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminDomainsInsertInsertFormErrorMessage");
	}
	
});

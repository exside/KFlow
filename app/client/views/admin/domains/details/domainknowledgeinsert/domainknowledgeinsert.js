var pageSession = new ReactiveDict();

Template.AdminDomainsDetailsDomainknowledgeinsert.rendered = function() {
	
};

Template.AdminDomainsDetailsDomainknowledgeinsert.events({
	
});

Template.AdminDomainsDetailsDomainknowledgeinsert.helpers({
	
});

Template.AdminDomainsDetailsDomainknowledgeinsertInsertForm.rendered = function() {
	

	pageSession.set("adminDomainsDetailsDomainknowledgeinsertInsertFormInfoMessage", "");
	pageSession.set("adminDomainsDetailsDomainknowledgeinsertInsertFormErrorMessage", "");

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

Template.AdminDomainsDetailsDomainknowledgeinsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminDomainsDetailsDomainknowledgeinsertInsertFormInfoMessage", "");
		pageSession.set("adminDomainsDetailsDomainknowledgeinsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var adminDomainsDetailsDomainknowledgeinsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(adminDomainsDetailsDomainknowledgeinsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminDomainsDetailsDomainknowledgeinsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("admin.domains.details", {domainId: self.params.domainId});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("adminDomainsDetailsDomainknowledgeinsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				values.domainId = self.params.domainId;

				newId = Domainknowledges.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("admin.domains.details", {domainId: this.params.domainId});
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

Template.AdminDomainsDetailsDomainknowledgeinsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminDomainsDetailsDomainknowledgeinsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminDomainsDetailsDomainknowledgeinsertInsertFormErrorMessage");
	}
	
});

var pageSession = new ReactiveDict();

Template.AdminDomainsDetailsDomainknowledgeedit.rendered = function() {
	
};

Template.AdminDomainsDetailsDomainknowledgeedit.events({
	
});

Template.AdminDomainsDetailsDomainknowledgeedit.helpers({
	
});

Template.AdminDomainsDetailsDomainknowledgeeditEditForm.rendered = function() {
	

	pageSession.set("adminDomainsDetailsDomainknowledgeeditEditFormInfoMessage", "");
	pageSession.set("adminDomainsDetailsDomainknowledgeeditEditFormErrorMessage", "");

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

Template.AdminDomainsDetailsDomainknowledgeeditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminDomainsDetailsDomainknowledgeeditEditFormInfoMessage", "");
		pageSession.set("adminDomainsDetailsDomainknowledgeeditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var adminDomainsDetailsDomainknowledgeeditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(adminDomainsDetailsDomainknowledgeeditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminDomainsDetailsDomainknowledgeeditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("admin.domains.details", {domainId: self.params.domainId});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("adminDomainsDetailsDomainknowledgeeditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Domainknowledges.update({ _id: t.data.admin_domainknowledge._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.AdminDomainsDetailsDomainknowledgeeditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminDomainsDetailsDomainknowledgeeditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminDomainsDetailsDomainknowledgeeditEditFormErrorMessage");
	}
	
});

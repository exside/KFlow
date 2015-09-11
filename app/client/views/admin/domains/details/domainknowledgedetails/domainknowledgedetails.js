var pageSession = new ReactiveDict();

Template.AdminDomainsDetailsDomainknowledgedetails.rendered = function() {
	
};

Template.AdminDomainsDetailsDomainknowledgedetails.events({
	
});

Template.AdminDomainsDetailsDomainknowledgedetails.helpers({
	
});

Template.AdminDomainsDetailsDomainknowledgedetailsDetailsForm.rendered = function() {
	

	pageSession.set("adminDomainsDetailsDomainknowledgedetailsDetailsFormInfoMessage", "");
	pageSession.set("adminDomainsDetailsDomainknowledgedetailsDetailsFormErrorMessage", "");

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

Template.AdminDomainsDetailsDomainknowledgedetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminDomainsDetailsDomainknowledgedetailsDetailsFormInfoMessage", "");
		pageSession.set("adminDomainsDetailsDomainknowledgedetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var adminDomainsDetailsDomainknowledgedetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(adminDomainsDetailsDomainknowledgedetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminDomainsDetailsDomainknowledgedetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("adminDomainsDetailsDomainknowledgedetailsDetailsFormErrorMessage", message);
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

		Router.go("admin.domains.details", {domainId: this.params.domainId, domainknowledgeId: this.params.domainknowledgeId});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("admin.domains.details", {domainId: this.params.domainId, domainknowledgeId: this.params.domainknowledgeId});
	}

	
});

Template.AdminDomainsDetailsDomainknowledgedetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminDomainsDetailsDomainknowledgedetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminDomainsDetailsDomainknowledgedetailsDetailsFormErrorMessage");
	}
	
});

var pageSession = new ReactiveDict();

Template.AdminDomainsEdit.rendered = function() {
	
};

Template.AdminDomainsEdit.events({
	
});

Template.AdminDomainsEdit.helpers({
	
});

Template.AdminDomainsEditEditForm.rendered = function() {
	

	pageSession.set("adminDomainsEditEditFormInfoMessage", "");
	pageSession.set("adminDomainsEditEditFormErrorMessage", "");

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

Template.AdminDomainsEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminDomainsEditEditFormInfoMessage", "");
		pageSession.set("adminDomainsEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var adminDomainsEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(adminDomainsEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminDomainsEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("admin.domains", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("adminDomainsEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Domains.update({ _id: t.data.admin_domain._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.AdminDomainsEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminDomainsEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminDomainsEditEditFormErrorMessage");
	}
	
});

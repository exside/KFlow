var pageSession = new ReactiveDict();

Template.AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptionslist.rendered = function() {
	
};

Template.AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptionslist.events({
	
});

Template.AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptionslist.helpers({
	
});

var AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptionslistViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptionslistViewSearchString");
	var sortBy = pageSession.get("AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptionslistViewSortBy");
	var sortAscending = pageSession.get("AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptionslistViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["option", "value"];
		filtered = _.filter(raw, function(item) {
			var match = false;
			_.each(searchFields, function(field) {
				var value = (getPropertyValue(field, item) || "") + "";

				match = match || (value && value.match(regEx));
				if(match) {
					return false;
				}
			})
			return match;
		});
	}

	// sort
	if(sortBy) {
		filtered = _.sortBy(filtered, sortBy);

		// descending?
		if(!sortAscending) {
			filtered = filtered.reverse();
		}
	}

	return filtered;
};

var AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptionslistViewExport = function(cursor, fileType) {
	var data = AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptionslistViewItems(cursor);
	var exportFields = ["option", "value"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptionslistView.rendered = function() {
	pageSession.set("AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptionslistViewStyle", "table");
	
};

Template.AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptionslistView.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},

	"click #dataview-search-button": function(e, t) {
		e.preventDefault();
		var form = $(e.currentTarget).parent();
		if(form) {
			var searchInput = form.find("#dataview-search-input");
			if(searchInput) {
				searchInput.focus();
				var searchString = searchInput.val();
				pageSession.set("AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptionslistViewSearchString", searchString);
			}

		}
		return false;
	},

	"keydown #dataview-search-input": function(e, t) {
		if(e.which === 13)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					var searchString = searchInput.val();
					pageSession.set("AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptionslistViewSearchString", searchString);
				}

			}
			return false;
		}

		if(e.which === 27)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					searchInput.val("");
					pageSession.set("AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptionslistViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("admin.evaluations.details.evaluationitemdetails.evaluationitemoptioninsert", {evaluationId: UI._parentData(1).params.evaluationId, evaluationitemId: UI._parentData(1).params.evaluationitemId});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptionslistViewExport(this.admin_evaluationitemoptions, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptionslistViewExport(this.admin_evaluationitemoptions, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptionslistViewExport(this.admin_evaluationitemoptions, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptionslistViewExport(this.admin_evaluationitemoptions, "json");
	}

	
});

Template.AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptionslistView.helpers({

	"insertButtonClass": function() {
		return Evaluationitemoptions.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.admin_evaluationitemoptions || this.admin_evaluationitemoptions.count() == 0;
	},
	"isNotEmpty": function() {
		return this.admin_evaluationitemoptions && this.admin_evaluationitemoptions.count() > 0;
	},
	"isNotFound": function() {
		return this.admin_evaluationitemoptions && pageSession.get("AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptionslistViewSearchString") && AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptionslistViewItems(this.admin_evaluationitemoptions).length == 0;
	},
	"searchString": function() {
		return pageSession.get("AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptionslistViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptionslistViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptionslistViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptionslistViewStyle") == "gallery";
	}

	
});


Template.AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptionslistViewTable.rendered = function() {
	
};

Template.AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptionslistViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptionslistViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptionslistViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptionslistViewSortAscending") || false;
			pageSession.set("AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptionslistViewSortAscending", !sortAscending);
		} else {
			pageSession.set("AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptionslistViewSortAscending", true);
		}
	}
});

Template.AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptionslistViewTable.helpers({
	"tableItems": function() {
		return AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptionslistViewItems(this.admin_evaluationitemoptions);
	}
});


Template.AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptionslistViewTableItems.rendered = function() {
	
};

Template.AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptionslistViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		Router.go("admin.evaluations.details.evaluationitemdetails.evaluationitemoptiondetails", {evaluationId: UI._parentData(1).params.evaluationId, evaluationitemId: UI._parentData(1).params.evaluationitemId, evaluationitemoptionId: this._id});
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Evaluationitemoptions.update({ _id: this._id }, { $set: values });

		return false;
	},

	"click #delete-button": function(e, t) {
		e.preventDefault();
		var me = this;
		bootbox.dialog({
			message: "Delete? Are you sure?",
			title: "Delete",
			animate: false,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function() {
						Evaluationitemoptions.remove({ _id: me._id });
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});
		return false;
	},
	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("admin.evaluations.details.evaluationitemdetails.evaluationitemoptionedit", {evaluationId: UI._parentData(1).params.evaluationId, evaluationitemId: UI._parentData(1).params.evaluationitemId, evaluationitemoptionId: this._id});
		return false;
	}
});

Template.AdminEvaluationsDetailsEvaluationitemdetailsEvaluationitemoptionslistViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Evaluationitemoptions.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Evaluationitemoptions.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

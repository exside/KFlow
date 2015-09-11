var pageSession = new ReactiveDict();

Template.AdminEvaluationsDetailsEvaluationitemlist.rendered = function() {
	
};

Template.AdminEvaluationsDetailsEvaluationitemlist.events({
	
});

Template.AdminEvaluationsDetailsEvaluationitemlist.helpers({
	
});

var AdminEvaluationsDetailsEvaluationitemlistViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("AdminEvaluationsDetailsEvaluationitemlistViewSearchString");
	var sortBy = pageSession.get("AdminEvaluationsDetailsEvaluationitemlistViewSortBy");
	var sortAscending = pageSession.get("AdminEvaluationsDetailsEvaluationitemlistViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["text", "type"];
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

var AdminEvaluationsDetailsEvaluationitemlistViewExport = function(cursor, fileType) {
	var data = AdminEvaluationsDetailsEvaluationitemlistViewItems(cursor);
	var exportFields = [];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.AdminEvaluationsDetailsEvaluationitemlistView.rendered = function() {
	pageSession.set("AdminEvaluationsDetailsEvaluationitemlistViewStyle", "table");
	
};

Template.AdminEvaluationsDetailsEvaluationitemlistView.events({
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
				pageSession.set("AdminEvaluationsDetailsEvaluationitemlistViewSearchString", searchString);
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
					pageSession.set("AdminEvaluationsDetailsEvaluationitemlistViewSearchString", searchString);
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
					pageSession.set("AdminEvaluationsDetailsEvaluationitemlistViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("admin.evaluations.details.evaluationiteminsert", {evaluationId: this.params.evaluationId});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		AdminEvaluationsDetailsEvaluationitemlistViewExport(this.admin_evaluationitems, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		AdminEvaluationsDetailsEvaluationitemlistViewExport(this.admin_evaluationitems, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		AdminEvaluationsDetailsEvaluationitemlistViewExport(this.admin_evaluationitems, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		AdminEvaluationsDetailsEvaluationitemlistViewExport(this.admin_evaluationitems, "json");
	}

	
});

Template.AdminEvaluationsDetailsEvaluationitemlistView.helpers({

	"insertButtonClass": function() {
		return Evaluationitems.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.admin_evaluationitems || this.admin_evaluationitems.count() == 0;
	},
	"isNotEmpty": function() {
		return this.admin_evaluationitems && this.admin_evaluationitems.count() > 0;
	},
	"isNotFound": function() {
		return this.admin_evaluationitems && pageSession.get("AdminEvaluationsDetailsEvaluationitemlistViewSearchString") && AdminEvaluationsDetailsEvaluationitemlistViewItems(this.admin_evaluationitems).length == 0;
	},
	"searchString": function() {
		return pageSession.get("AdminEvaluationsDetailsEvaluationitemlistViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("AdminEvaluationsDetailsEvaluationitemlistViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("AdminEvaluationsDetailsEvaluationitemlistViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("AdminEvaluationsDetailsEvaluationitemlistViewStyle") == "gallery";
	}

	
});


Template.AdminEvaluationsDetailsEvaluationitemlistViewTable.rendered = function() {
	
};

Template.AdminEvaluationsDetailsEvaluationitemlistViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("AdminEvaluationsDetailsEvaluationitemlistViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("AdminEvaluationsDetailsEvaluationitemlistViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("AdminEvaluationsDetailsEvaluationitemlistViewSortAscending") || false;
			pageSession.set("AdminEvaluationsDetailsEvaluationitemlistViewSortAscending", !sortAscending);
		} else {
			pageSession.set("AdminEvaluationsDetailsEvaluationitemlistViewSortAscending", true);
		}
	}
});

Template.AdminEvaluationsDetailsEvaluationitemlistViewTable.helpers({
	"tableItems": function() {
		return AdminEvaluationsDetailsEvaluationitemlistViewItems(this.admin_evaluationitems);
	}
});


Template.AdminEvaluationsDetailsEvaluationitemlistViewTableItems.rendered = function() {
	
};

Template.AdminEvaluationsDetailsEvaluationitemlistViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		Router.go("admin.evaluations.details.evaluationitemdetails", {evaluationId: UI._parentData(1).params.evaluationId, evaluationitemId: this._id});
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Evaluationitems.update({ _id: this._id }, { $set: values });

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
						Evaluationitems.remove({ _id: me._id });
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
		Router.go("admin.evaluations.details.evaluationitemedit", {evaluationId: UI._parentData(1).params.evaluationId, evaluationitemId: this._id});
		return false;
	}
});

Template.AdminEvaluationsDetailsEvaluationitemlistViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Evaluationitems.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Evaluationitems.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

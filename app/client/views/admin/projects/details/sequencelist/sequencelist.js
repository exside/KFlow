var pageSession = new ReactiveDict();

Template.AdminProjectsDetailsSequencelist.rendered = function() {
	
};

Template.AdminProjectsDetailsSequencelist.events({
	
});

Template.AdminProjectsDetailsSequencelist.helpers({
	
});

var AdminProjectsDetailsSequencelistViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("AdminProjectsDetailsSequencelistViewSearchString");
	var sortBy = pageSession.get("AdminProjectsDetailsSequencelistViewSortBy");
	var sortAscending = pageSession.get("AdminProjectsDetailsSequencelistViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "order", "start", "end", "projectId", "user", "userobj.profile.name", "evaluation", "evaluationobj.name", "resource", "rating"];
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

var AdminProjectsDetailsSequencelistViewExport = function(cursor, fileType) {
	var data = AdminProjectsDetailsSequencelistViewItems(cursor);
	var exportFields = ["name", "order", "end", "userobj.profile.name", "evaluationobj.name", "rating"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.AdminProjectsDetailsSequencelistView.rendered = function() {
	pageSession.set("AdminProjectsDetailsSequencelistViewStyle", "table");
	
};

Template.AdminProjectsDetailsSequencelistView.events({
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
				pageSession.set("AdminProjectsDetailsSequencelistViewSearchString", searchString);
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
					pageSession.set("AdminProjectsDetailsSequencelistViewSearchString", searchString);
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
					pageSession.set("AdminProjectsDetailsSequencelistViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("admin.projects.details.sequenceinsert", {projectId: this.params.projectId});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		AdminProjectsDetailsSequencelistViewExport(this.admin_sequences, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		AdminProjectsDetailsSequencelistViewExport(this.admin_sequences, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		AdminProjectsDetailsSequencelistViewExport(this.admin_sequences, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		AdminProjectsDetailsSequencelistViewExport(this.admin_sequences, "json");
	}

	
});

Template.AdminProjectsDetailsSequencelistView.helpers({

	"insertButtonClass": function() {
		return Sequences.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.admin_sequences || this.admin_sequences.count() == 0;
	},
	"isNotEmpty": function() {
		return this.admin_sequences && this.admin_sequences.count() > 0;
	},
	"isNotFound": function() {
		return this.admin_sequences && pageSession.get("AdminProjectsDetailsSequencelistViewSearchString") && AdminProjectsDetailsSequencelistViewItems(this.admin_sequences).length == 0;
	},
	"searchString": function() {
		return pageSession.get("AdminProjectsDetailsSequencelistViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("AdminProjectsDetailsSequencelistViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("AdminProjectsDetailsSequencelistViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("AdminProjectsDetailsSequencelistViewStyle") == "gallery";
	}

	
});


Template.AdminProjectsDetailsSequencelistViewTable.rendered = function() {
	
};

Template.AdminProjectsDetailsSequencelistViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("AdminProjectsDetailsSequencelistViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("AdminProjectsDetailsSequencelistViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("AdminProjectsDetailsSequencelistViewSortAscending") || false;
			pageSession.set("AdminProjectsDetailsSequencelistViewSortAscending", !sortAscending);
		} else {
			pageSession.set("AdminProjectsDetailsSequencelistViewSortAscending", true);
		}
	}
});

Template.AdminProjectsDetailsSequencelistViewTable.helpers({
	"tableItems": function() {
		return AdminProjectsDetailsSequencelistViewItems(this.admin_sequences);
	}
});


Template.AdminProjectsDetailsSequencelistViewTableItems.rendered = function() {
	
};

Template.AdminProjectsDetailsSequencelistViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		Router.go("admin.projects.details.sequencedetails", {projectId: UI._parentData(1).params.projectId, sequenceId: this._id});
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Sequences.update({ _id: this._id }, { $set: values });

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
						Sequences.remove({ _id: me._id });
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
		Router.go("admin.projects.details.sequenceedit", {projectId: UI._parentData(1).params.projectId, sequenceId: this._id});
		return false;
	}
});

Template.AdminProjectsDetailsSequencelistViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Sequences.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Sequences.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

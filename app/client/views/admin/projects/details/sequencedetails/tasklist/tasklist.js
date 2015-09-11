var pageSession = new ReactiveDict();

Template.AdminProjectsDetailsSequencedetailsTasklist.rendered = function() {
	
};

Template.AdminProjectsDetailsSequencedetailsTasklist.events({
	
});

Template.AdminProjectsDetailsSequencedetailsTasklist.helpers({
	
});

var AdminProjectsDetailsSequencedetailsTasklistViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("AdminProjectsDetailsSequencedetailsTasklistViewSearchString");
	var sortBy = pageSession.get("AdminProjectsDetailsSequencedetailsTasklistViewSortBy");
	var sortAscending = pageSession.get("AdminProjectsDetailsSequencedetailsTasklistViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "type", "complexity", "status", "domains", "domainobjs.name", "projectId", "sequenceId", "evaluation", "resource", "rating"];
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

var AdminProjectsDetailsSequencedetailsTasklistViewExport = function(cursor, fileType) {
	var data = AdminProjectsDetailsSequencedetailsTasklistViewItems(cursor);
	var exportFields = ["name", "complexity", "status", "domainobjs.name", "rating"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.AdminProjectsDetailsSequencedetailsTasklistView.rendered = function() {
	pageSession.set("AdminProjectsDetailsSequencedetailsTasklistViewStyle", "table");
	
};

Template.AdminProjectsDetailsSequencedetailsTasklistView.events({
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
				pageSession.set("AdminProjectsDetailsSequencedetailsTasklistViewSearchString", searchString);
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
					pageSession.set("AdminProjectsDetailsSequencedetailsTasklistViewSearchString", searchString);
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
					pageSession.set("AdminProjectsDetailsSequencedetailsTasklistViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("admin.projects.details.sequencedetails.taskinsert", {projectId: this.params.projectId, sequenceId: this.params.sequenceId});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		AdminProjectsDetailsSequencedetailsTasklistViewExport(this.admin_tasks, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		AdminProjectsDetailsSequencedetailsTasklistViewExport(this.admin_tasks, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		AdminProjectsDetailsSequencedetailsTasklistViewExport(this.admin_tasks, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		AdminProjectsDetailsSequencedetailsTasklistViewExport(this.admin_tasks, "json");
	}

	
});

Template.AdminProjectsDetailsSequencedetailsTasklistView.helpers({

	"insertButtonClass": function() {
		return Tasks.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.admin_tasks || this.admin_tasks.count() == 0;
	},
	"isNotEmpty": function() {
		return this.admin_tasks && this.admin_tasks.count() > 0;
	},
	"isNotFound": function() {
		return this.admin_tasks && pageSession.get("AdminProjectsDetailsSequencedetailsTasklistViewSearchString") && AdminProjectsDetailsSequencedetailsTasklistViewItems(this.admin_tasks).length == 0;
	},
	"searchString": function() {
		return pageSession.get("AdminProjectsDetailsSequencedetailsTasklistViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("AdminProjectsDetailsSequencedetailsTasklistViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("AdminProjectsDetailsSequencedetailsTasklistViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("AdminProjectsDetailsSequencedetailsTasklistViewStyle") == "gallery";
	}

	
});


Template.AdminProjectsDetailsSequencedetailsTasklistViewTable.rendered = function() {
	
};

Template.AdminProjectsDetailsSequencedetailsTasklistViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("AdminProjectsDetailsSequencedetailsTasklistViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("AdminProjectsDetailsSequencedetailsTasklistViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("AdminProjectsDetailsSequencedetailsTasklistViewSortAscending") || false;
			pageSession.set("AdminProjectsDetailsSequencedetailsTasklistViewSortAscending", !sortAscending);
		} else {
			pageSession.set("AdminProjectsDetailsSequencedetailsTasklistViewSortAscending", true);
		}
	}
});

Template.AdminProjectsDetailsSequencedetailsTasklistViewTable.helpers({
	"tableItems": function() {
		return AdminProjectsDetailsSequencedetailsTasklistViewItems(this.admin_tasks);
	}
});


Template.AdminProjectsDetailsSequencedetailsTasklistViewTableItems.rendered = function() {
	
};

Template.AdminProjectsDetailsSequencedetailsTasklistViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		Router.go("admin.projects.details.sequencedetails.taskdetails", {projectId: UI._parentData(1).params.projectId, sequenceId: UI._parentData(1).params.sequenceId, taskId: this._id});
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Tasks.update({ _id: this._id }, { $set: values });

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
						Tasks.remove({ _id: me._id });
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
		Router.go("admin.projects.details.sequencedetails.taskedit", {projectId: UI._parentData(1).params.projectId, sequenceId: UI._parentData(1).params.sequenceId, taskId: this._id});
		return false;
	}
});

Template.AdminProjectsDetailsSequencedetailsTasklistViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Tasks.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Tasks.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

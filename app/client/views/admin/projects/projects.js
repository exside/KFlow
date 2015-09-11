var pageSession = new ReactiveDict();

Template.AdminProjects.rendered = function() {
	
};

Template.AdminProjects.events({
	
});

Template.AdminProjects.helpers({
	
});

var AdminProjectsViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("AdminProjectsViewSearchString");
	var sortBy = pageSession.get("AdminProjectsViewSortBy");
	var sortAscending = pageSession.get("AdminProjectsViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "owner", "ownerobj.profile.name", "description", "specifity", "complexity", "resource"];
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

var AdminProjectsViewExport = function(cursor, fileType) {
	var data = AdminProjectsViewItems(cursor);
	var exportFields = ["ownerobj.profile.name", "specifity"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.AdminProjectsView.rendered = function() {
	pageSession.set("AdminProjectsViewStyle", "table");
	
};

Template.AdminProjectsView.events({
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
				pageSession.set("AdminProjectsViewSearchString", searchString);
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
					pageSession.set("AdminProjectsViewSearchString", searchString);
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
					pageSession.set("AdminProjectsViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("admin.projects.insert", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		AdminProjectsViewExport(this.admin_projects, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		AdminProjectsViewExport(this.admin_projects, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		AdminProjectsViewExport(this.admin_projects, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		AdminProjectsViewExport(this.admin_projects, "json");
	}

	
});

Template.AdminProjectsView.helpers({

	"insertButtonClass": function() {
		return Projects.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.admin_projects || this.admin_projects.count() == 0;
	},
	"isNotEmpty": function() {
		return this.admin_projects && this.admin_projects.count() > 0;
	},
	"isNotFound": function() {
		return this.admin_projects && pageSession.get("AdminProjectsViewSearchString") && AdminProjectsViewItems(this.admin_projects).length == 0;
	},
	"searchString": function() {
		return pageSession.get("AdminProjectsViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("AdminProjectsViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("AdminProjectsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("AdminProjectsViewStyle") == "gallery";
	}

	
});


Template.AdminProjectsViewTable.rendered = function() {
	
};

Template.AdminProjectsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("AdminProjectsViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("AdminProjectsViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("AdminProjectsViewSortAscending") || false;
			pageSession.set("AdminProjectsViewSortAscending", !sortAscending);
		} else {
			pageSession.set("AdminProjectsViewSortAscending", true);
		}
	}
});

Template.AdminProjectsViewTable.helpers({
	"tableItems": function() {
		return AdminProjectsViewItems(this.admin_projects);
	}
});


Template.AdminProjectsViewTableItems.rendered = function() {
	
};

Template.AdminProjectsViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		Router.go("admin.projects.details", {projectId: this._id});
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Projects.update({ _id: this._id }, { $set: values });

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
						Projects.remove({ _id: me._id });
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
		Router.go("admin.projects.edit", {projectId: this._id});
		return false;
	}
});

Template.AdminProjectsViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Projects.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Projects.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

var pageSession = new ReactiveDict();

Template.AdminDomainsDetailsDomainknowledgelist.rendered = function() {
	
};

Template.AdminDomainsDetailsDomainknowledgelist.events({
	
});

Template.AdminDomainsDetailsDomainknowledgelist.helpers({
	
});

var AdminDomainsDetailsDomainknowledgelistViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("AdminDomainsDetailsDomainknowledgelistViewSearchString");
	var sortBy = pageSession.get("AdminDomainsDetailsDomainknowledgelistViewSortBy");
	var sortAscending = pageSession.get("AdminDomainsDetailsDomainknowledgelistViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["value", "type", "project", "projectobj.name", "user", "userobj.profile.name"];
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

var AdminDomainsDetailsDomainknowledgelistViewExport = function(cursor, fileType) {
	var data = AdminDomainsDetailsDomainknowledgelistViewItems(cursor);
	var exportFields = ["projectobj.name", "userobj.profile.name"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.AdminDomainsDetailsDomainknowledgelistView.rendered = function() {
	pageSession.set("AdminDomainsDetailsDomainknowledgelistViewStyle", "table");
	
};

Template.AdminDomainsDetailsDomainknowledgelistView.events({
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
				pageSession.set("AdminDomainsDetailsDomainknowledgelistViewSearchString", searchString);
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
					pageSession.set("AdminDomainsDetailsDomainknowledgelistViewSearchString", searchString);
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
					pageSession.set("AdminDomainsDetailsDomainknowledgelistViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("admin.domains.details.domainknowledgeinsert", {domainId: this.params.domainId});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		AdminDomainsDetailsDomainknowledgelistViewExport(this.admin_domainknowledges, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		AdminDomainsDetailsDomainknowledgelistViewExport(this.admin_domainknowledges, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		AdminDomainsDetailsDomainknowledgelistViewExport(this.admin_domainknowledges, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		AdminDomainsDetailsDomainknowledgelistViewExport(this.admin_domainknowledges, "json");
	}

	
});

Template.AdminDomainsDetailsDomainknowledgelistView.helpers({

	"insertButtonClass": function() {
		return Domainknowledges.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.admin_domainknowledges || this.admin_domainknowledges.count() == 0;
	},
	"isNotEmpty": function() {
		return this.admin_domainknowledges && this.admin_domainknowledges.count() > 0;
	},
	"isNotFound": function() {
		return this.admin_domainknowledges && pageSession.get("AdminDomainsDetailsDomainknowledgelistViewSearchString") && AdminDomainsDetailsDomainknowledgelistViewItems(this.admin_domainknowledges).length == 0;
	},
	"searchString": function() {
		return pageSession.get("AdminDomainsDetailsDomainknowledgelistViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("AdminDomainsDetailsDomainknowledgelistViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("AdminDomainsDetailsDomainknowledgelistViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("AdminDomainsDetailsDomainknowledgelistViewStyle") == "gallery";
	}

	
});


Template.AdminDomainsDetailsDomainknowledgelistViewTable.rendered = function() {
	
};

Template.AdminDomainsDetailsDomainknowledgelistViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("AdminDomainsDetailsDomainknowledgelistViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("AdminDomainsDetailsDomainknowledgelistViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("AdminDomainsDetailsDomainknowledgelistViewSortAscending") || false;
			pageSession.set("AdminDomainsDetailsDomainknowledgelistViewSortAscending", !sortAscending);
		} else {
			pageSession.set("AdminDomainsDetailsDomainknowledgelistViewSortAscending", true);
		}
	}
});

Template.AdminDomainsDetailsDomainknowledgelistViewTable.helpers({
	"tableItems": function() {
		return AdminDomainsDetailsDomainknowledgelistViewItems(this.admin_domainknowledges);
	}
});


Template.AdminDomainsDetailsDomainknowledgelistViewTableItems.rendered = function() {
	
};

Template.AdminDomainsDetailsDomainknowledgelistViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		Router.go("admin.domains.details.domainknowledgedetails", {domainId: UI._parentData(1).params.domainId, domainknowledgeId: this._id});
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Domainknowledges.update({ _id: this._id }, { $set: values });

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
						Domainknowledges.remove({ _id: me._id });
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
		Router.go("admin.domains.details.domainknowledgeedit", {domainId: UI._parentData(1).params.domainId, domainknowledgeId: this._id});
		return false;
	}
});

Template.AdminDomainsDetailsDomainknowledgelistViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Domainknowledges.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Domainknowledges.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

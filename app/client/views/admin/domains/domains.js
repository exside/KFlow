var pageSession = new ReactiveDict();

Template.AdminDomains.rendered = function() {
	
};

Template.AdminDomains.events({
	
});

Template.AdminDomains.helpers({
	
});

var AdminDomainsViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("AdminDomainsViewSearchString");
	var sortBy = pageSession.get("AdminDomainsViewSortBy");
	var sortAscending = pageSession.get("AdminDomainsViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "specifity", "resource"];
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

var AdminDomainsViewExport = function(cursor, fileType) {
	var data = AdminDomainsViewItems(cursor);
	var exportFields = ["name", "specifity"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.AdminDomainsView.rendered = function() {
	pageSession.set("AdminDomainsViewStyle", "table");
	
};

Template.AdminDomainsView.events({
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
				pageSession.set("AdminDomainsViewSearchString", searchString);
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
					pageSession.set("AdminDomainsViewSearchString", searchString);
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
					pageSession.set("AdminDomainsViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("admin.domains.insert", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		AdminDomainsViewExport(this.admin_domains, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		AdminDomainsViewExport(this.admin_domains, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		AdminDomainsViewExport(this.admin_domains, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		AdminDomainsViewExport(this.admin_domains, "json");
	}

	
});

Template.AdminDomainsView.helpers({

	"insertButtonClass": function() {
		return Domains.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.admin_domains || this.admin_domains.count() == 0;
	},
	"isNotEmpty": function() {
		return this.admin_domains && this.admin_domains.count() > 0;
	},
	"isNotFound": function() {
		return this.admin_domains && pageSession.get("AdminDomainsViewSearchString") && AdminDomainsViewItems(this.admin_domains).length == 0;
	},
	"searchString": function() {
		return pageSession.get("AdminDomainsViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("AdminDomainsViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("AdminDomainsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("AdminDomainsViewStyle") == "gallery";
	}

	
});


Template.AdminDomainsViewTable.rendered = function() {
	
};

Template.AdminDomainsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("AdminDomainsViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("AdminDomainsViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("AdminDomainsViewSortAscending") || false;
			pageSession.set("AdminDomainsViewSortAscending", !sortAscending);
		} else {
			pageSession.set("AdminDomainsViewSortAscending", true);
		}
	}
});

Template.AdminDomainsViewTable.helpers({
	"tableItems": function() {
		return AdminDomainsViewItems(this.admin_domains);
	}
});


Template.AdminDomainsViewTableItems.rendered = function() {
	
};

Template.AdminDomainsViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		Router.go("admin.domains.details", {domainId: this._id});
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Domains.update({ _id: this._id }, { $set: values });

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
						Domains.remove({ _id: me._id });
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
		Router.go("admin.domains.edit", {domainId: this._id});
		return false;
	}
});

Template.AdminDomainsViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Domains.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Domains.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

/**********************************************************************************
* 
*    Copyright (C) 2017 MuK IT GmbH
*
*    This program is free software: you can redistribute it and/or modify
*    it under the terms of the GNU Affero General Public License as
*    published by the Free Software Foundation, either version 3 of the
*    License, or (at your option) any later version.
*
*    This program is distributed in the hope that it will be useful,
*    but WITHOUT ANY WARRANTY; without even the implied warranty of
*    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*    GNU Affero General Public License for more details.
*
*    You should have received a copy of the GNU Affero General Public License
*    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*
**********************************************************************************/

odoo.define('muk_preview_attachment.ChatterPreview', function (require) {
"use strict";

var core = require('web.core');
var session = require('web.session');

var Thread = require('mail.ChatThread');

var PreviewHelper = require('muk_preview_attachment.PreviewHelper');

var QWeb = core.qweb;
var _t = core._t;

Thread.include({
	init: function() {
		this._super.apply(this, arguments);
		this.events = _.extend(this.events, {
            'click .o_overlay_download': '_onAttachmentView',
        });
	},
	_onAttachmentView: function (event) {
	    var $target = $(event.currentTarget);
		var activeAttachmentID = $target.data('id') ? 
				$target.data('id') : $target.find('.o_attachment_id ').data('id');
		if (activeAttachmentID) {
			PreviewHelper.createAttachmentPreview(
					activeAttachmentID, this);
		}
		event.preventDefault();
		event.stopPropagation();
    },
});

});
/* See license.txt for terms of usage */

define(function(require, exports, module) {

// Dependencies
const React = require("react");

// Firebug SDK
const { Reps } = require("reps/repository");

// RDP Inspector
const { PacketList } = require("./packet-list");
const { PacketsSidebar } = require("./packets-sidebar");
const { PacketsToolbar } = require("./packets-toolbar");
const { Splitter } = require("./splitter");

// Shortcuts
const { TR, TD, TABLE, TBODY, THEAD, TH, DIV } = Reps.DOM;

/**
 * @template This template renders 'Packets' tab body.
 */
var PacketsPanel = React.createClass({
/** @lends PacketPanel */

  displayName: "PacketsPanel",

  getInitialState: function() {
    return {
      packets: this.props.packets,
      selectedPacket: null
    };
  },

  render: function() {
    var leftPanel = DIV({className: "mainPanel"},
      PacketsToolbar({
        actions: this.props.actions,
        showInlineDetails: this.props.showInlineDetails
      }),
      PacketList({
        data: this.props.packets,
        actions: this.props.actions,
        selectedPacket: this.props.selectedPacket,
        searchFilter: this.props.searchFilter,
        showInlineDetails: this.props.showInlineDetails
      })
    );

    var rightPanel = DIV({className: "sidePanel"},
      PacketsSidebar({
        selectedPacket: this.props.selectedPacket,
        actions: this.props.actions
      })
    );

    return (
      DIV({className: "packetsPanelBox"},
        Splitter({
          mode: "vertical",
          min: 200,
          leftPanel: leftPanel,
          rightPanel: rightPanel,
          innerBox: DIV({className: "innerBox"})
        })
      )
    )
  }
});

// Exports from this module
exports.PacketsPanel = React.createFactory(PacketsPanel);

});

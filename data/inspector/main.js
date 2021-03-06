/* See license.txt for terms of usage */

define(function(require, exports, module) {

// ReactJS
var React = require("react");

// RDP Inspector
var { MainTabbedArea } = require("components/main-tabbed-area");
var { PacketsStore } = require("packets-store");
var { Resizer } = require("resizer");
var { Search } = require("search");

/**
 * List of all application commands. The list is passed into
 * components (starting with theApp) and so any part of the
 * application can execute them.
 */
var actions = {
  selectPacket: function(packet) {
    theApp.setState({selectedPacket: packet});
  },
  clear: function() {
    store.clear();
  },
  find: function() {
    postChromeMessage("find");
  },
  send: function(packet) {
    postChromeMessage("injectRDPPacket", packet);
  },
  appendSummary: function() {
    store.appendSummary();

    // Auto scroll to the bottom, so the new summary is
    // immediately visible.
    var node = document.querySelector(".packetsPanelBox .list");
    node.scrollTop = node.scrollHeight;
  },
  onShowInlineDetails: function() {
    var show = !theApp.state.showInlineDetails;
    theApp.setState({showInlineDetails: show});
  }
};

/**
 * Render the main application component. It's the main tab bar displayed
 * at the top of the window. This component also represents ReacJT root.
 */
var content = document.getElementById("content");
var theApp = React.render(MainTabbedArea({
  packets: [],
  actions: actions
}), content);

// Helper modules for handling application events.
var store = new PacketsStore(window, theApp);
var resizer = new Resizer(window, theApp);
var search = new Search(window, theApp);

// Send notification about initialization being done.
postChromeMessage("initialized");

// End of inspector.js
});

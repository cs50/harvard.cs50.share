define(function(require, exports, module) {

    // APIs consumed
    main.consumes = ["c9", "layout", "Plugin", "ui"];

    // APIs provided
    main.provides = ["harvard.cs50.share"];

    // Plugin
    return main;

    /**
     * Implements plugin.
     */
    function main(options, imports, register) {
        const c9 = imports.c9;
        const layout = imports.layout;
        const ui = imports.ui;
        const plugin = new imports.Plugin("CS50", main.consumes);
        let shareButton = null;

        // When plugin is loaded
        const i = c9.projectName.lastIndexOf('-');
        const userUUID = c9.projectName.substring(0, i);
        const projectName = c9.projectName.substring(i + 1);
        plugin.on("load", () => {
            shareButton = new ui.button({
                skin: "c9-menu-btn",
                caption: "Share",
                class: "c9-share cs50-share",
                tooltip: "Share this environment",
                onclick: () => window.open(`https://ide.cs50.io/members?uuid=${userUUID}&project=${projectName}`, "_blank"),
            });

            ui.insertByIndex(
                layout.findParent({
                    name: "preferences",
                }),
                shareButton,
                875,
                plugin
            );
        });

        // When plugin is unloaded
        plugin.on("unload", () => {
            shareButton = null;
        });

        // Register plugin
        register(null, {
            "harvard.cs50.share": plugin
        });
    }
});

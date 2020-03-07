import * as vscode from 'vscode';

import { TerminalCommandItem } from '../command/command.item';
import { ComposeService } from '../utils/compose';
import { ComposeTreeItem } from './compose.item';

export class ComposeServiceItem extends ComposeTreeItem<ComposeService> {

    constructor(context: vscode.ExtensionContext, model: ComposeService) {
        super(context, model, model.name || "Unknown service", vscode.TreeItemCollapsibleState.Collapsed);

        this.tooltip = model.name;

        this.iconPath = {
            light: this.context.asAbsolutePath('resources/light/container.svg'),
            dark: this.context.asAbsolutePath('resources/dark/container.svg')
        };

        this.itemCommands = [
            {
              name: `Start`,
              command: `docker-compose up -d --force-recreate ${this.model.name}`
            },
            {
                name: `Restart`,
                command: `docker-compose restart ${this.model.name}`
            },
            {
                name: `View logs`,
                command: `docker-compose logs -f --tail=50 ${this.model.name}`
            },
            {
                name: `Attach shell`,
                command: `docker-compose exec ${this.model.name} /bin/sh`
            },
            {
                name: `Rebuild`,
                command: `docker-compose up -d --build --force-recreate ${this.model.name}`
            },
            {
                name: `Stop`,
                command: `docker-compose stop ${this.model.name}`
            },
        ];
    }

    public getChildren(): TerminalCommandItem[] {
        return this.getItemCommands(this.model.filePath);
    }

    public getTreeItem(): vscode.TreeItem {
        return this;
    }

    /**
     * Set treeitem icon
     * Auto commands will be displayed with a blue icon
     * @returns
     */

    // refreshIcon() {
    // 	const iconPath = path.join(__filename, "..", "..", "resources");

    // 	if (this.terminalCommand.auto) {
    // 		this.iconPath = {
    // 			light: path.join(iconPath, "light", "blue.svg"),
    // 			dark: path.join(iconPath, "dark", "blue.svg")
    // 		};
    // 		return;
    // 	}

    // 	this.iconPath = {
    // 		light: path.join(iconPath, "light", "default.svg"),
    // 		dark: path.join(iconPath, "dark", "default.svg")
    // 	};
    // }
}

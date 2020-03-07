import * as vscode from "vscode";
import { ComposeStack, ComposeService } from "../utils/compose";
import { ComposeTreeItem } from "./compose.item";
import { ComposeServiceItem } from "./service.item";
import { TerminalCommandItem } from "../command/command.item";

export class ComposeStackItem extends ComposeTreeItem<ComposeStack> {

	constructor(context: vscode.ExtensionContext, model: ComposeStack) {
		super(context, model, model.name || "Unknown stack", vscode.TreeItemCollapsibleState.Expanded);

		this.label = `${model.name}`;
		this.tooltip = `${model.name}/docker-compose.yml`;

		this.iconPath = {
			light: this.context.asAbsolutePath('resources/docker.svg'),
			dark: this.context.asAbsolutePath('resources/docker.svg')
		};

		this.itemCommands = [
			{name: "Start", command: "docker-compose up -d --force-recreate"},
			{name: "Restart", command: "docker-compose restart"},
			{name: "View logs", command: "docker-compose logs -f --tail=50"},
			{name: "Rebuild", command: "docker-compose up -d --build --force-recreate"},
			{name: "Stop", command: "docker-compose stop"},
		];
	}

	public getChildren(): (ComposeTreeItem<ComposeService> | TerminalCommandItem)[] {
		let serviceItems = this.model
			.getServices()
			.map<ComposeServiceItem>(s => new ComposeServiceItem(this.context, s));
		return [...this.getItemCommands(this.model.filePath), ...serviceItems];
	}

}

import * as vscode from 'vscode';
import { CommandTreeViewProvider } from './terminalCommandView';
import { terminalCommandHandler } from './terminalCommand';

/**
 * Register treeview and treeitem commands
 */

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(vscode.window.registerTreeDataProvider('explorerTerminalCommands', new CommandTreeViewProvider(context)));
  context.subscriptions.push(vscode.commands.registerCommand('explorerTerminalCommands.executeCommand', terminalCommandHandler));
};

export function deactivate() { }


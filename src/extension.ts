import { CommandTreeViewProvider } from './command/command.tree';
import { ComposeTreeViewProvider } from './compose/compose.tree';
import { ExtensionContext, window, commands } from 'vscode';

export function activate(context: ExtensionContext) {
  const commandProvider = new CommandTreeViewProvider(context);
  const composeProvider = new ComposeTreeViewProvider(context);

	window.registerTreeDataProvider('explorerTerminalCommands', commandProvider);
  window.registerTreeDataProvider('composeTerminalCommands', composeProvider);

  let execCommand = commands.registerCommand('explorerTerminalCommands.executeCommand', (cmd) => {
    cmd.exec();
  });
  
  let refreshCommand = commands.registerCommand('explorerTerminalCommands.refreshCommands', () => {
    commandProvider.refresh();
    composeProvider.refresh();
  });

  context.subscriptions.push(execCommand);
	context.subscriptions.push(refreshCommand);
}

export function deactivate() { }


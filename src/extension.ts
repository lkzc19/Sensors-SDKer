
import * as vscode from 'vscode';
import { PostPanel } from './panel/PostPanel';

export function activate(context: vscode.ExtensionContext) {

	const postDisposable = vscode.commands.registerCommand('sensors-sdker.post', () => {
		PostPanel.render(context);
	});

	context.subscriptions.push(postDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}

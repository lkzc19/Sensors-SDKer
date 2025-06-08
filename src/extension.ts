
import * as vscode from 'vscode';
import { PostPanel } from './panel/PostPanel';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "sensors-sdker" is now active!');

	const pingDisposable = vscode.commands.registerCommand('sensors-sdker.ping', () => {
		vscode.window.showInformationMessage('Pong from Sensors SDKer!');
	});


	const postDisposable = vscode.commands.registerCommand('sensors-sdker.post', () => {
		PostPanel.render(context);
	});

	context.subscriptions.push(pingDisposable, postDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}

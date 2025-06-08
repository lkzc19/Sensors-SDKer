
import * as vscode from 'vscode';


export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "sensors-sdker" is now active!');

	const disposable = vscode.commands.registerCommand('sensors-sdker.ping', () => {
		vscode.window.showInformationMessage('Pong from Sensors SDKer!');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}

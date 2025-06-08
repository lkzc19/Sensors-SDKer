
import * as vscode from 'vscode';
import * as fs from "fs";
import { PostPanel } from './panel/PostPanel';
import { HelloWorldPanel } from './panel/TestPanel';



export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "sensors-sdker" is now active!');

	const pingDisposable = vscode.commands.registerCommand('sensors-sdker.ping', () => {
		vscode.window.showInformationMessage('Pong from Sensors SDKer!');
	});


	const postDisposable = vscode.commands.registerCommand('sensors-sdker.post', () => {
		// PostPanel.createOrShow(context);
		HelloWorldPanel.render(context.extensionUri);
	});

	context.subscriptions.push(pingDisposable, postDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}

import * as vscode from 'vscode';

export class PostPanel {
  public static createOrShow(context: vscode.ExtensionContext) {
    const panel = vscode.window.createWebviewPanel(
      'postPanel',
      'Post View',
      vscode.ViewColumn.One,
      {
        enableScripts: true
      }
    );

    panel.webview.html = this.getHtmlContent();
  }

  private static getHtmlContent(): string {
    return `
      <!DOCTYPE html>
      <html>
      <body>
        <h1>Post Content Here</h1>
        <textarea style="width:100%;height:200px"></textarea>
      </body>
      </html>
    `;
  }
}
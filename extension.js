// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');

function activate(context) {

    console.log('Congratulations, your extension "sample" is now active!');

    
    var disposable = vscode.commands.registerCommand('extension.sayHello', function () {

        var startLine = 1;

        var selection = vscode.window.activeTextEditor.selection;
        var selectedText = vscode.window.activeTextEditor.document.getText(selection);


        vscode.window.showInformationMessage(selectedText);

        vscode.window.activeTextEditor.edit((editBuilder) => {
            pos = new vscode.Position(startLine, 50);
                        
            editBuilder.insert(pos, 'textToInsert');                                
        }).then(() => {
            console.log('Edit applied!');
            

        }, (err) => {
            console.log('Edit rejected!');
            console.error(err);
        });



    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
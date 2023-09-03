import inquirer from "inquirer";
import chalk from "chalk";
export async function askForReplaceConfirmation(projectName, appPathChoice) {
    return await inquirer.prompt([
        {
            type: "confirm",
            name: "replace",
            message: chalk.yellow(`A project folder named "${projectName}" already exists in the '${appPathChoice.appPath}' directory. Do you want to replace it?`),
            default: false,
        },
    ]);
}

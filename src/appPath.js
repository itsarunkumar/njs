import inquirer from "inquirer";
import chalk from "chalk";
export async function getAppPathChoice() {
    return await inquirer.prompt([
        {
            type: "list",
            name: "appPath",
            message: "Choose the app path:",
            choices: ["./app", "./src/app"],
        },
    ]);
}
export function appPathDoesNotExist() {
    console.log(chalk.red("The specified app directory does not exist. Please create it before using this command."));
}

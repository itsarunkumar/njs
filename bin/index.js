#!/usr/bin/env node
import { Command } from "commander";
import * as fs from "fs";
import * as path from "path";
import inquirer from "inquirer";
import ora from "ora";
import chalk from "chalk"; // Import the chalk library
//modules
import {
  getAppPathChoice,
  appPathDoesNotExist,
  getAppPathChoiceForApi,
} from "../src/appPath.js";
import { askForReplaceConfirmation } from "../src/replacePrompt.js";
// Suppress deprecation warning
process.env.NODE_OPTIONS = "--no-deprecation";
const program = new Command();
//starting
program
  .command("start")
  .description("this is cli tool for nextjs")
  .action(() => {
    console.log(
      chalk.green(
        "Njs CLI is a CLI tool for Next.js. Its purpose is to create a project and populate it with predefined files"
      )
    );
  });
//creating component page
program
  .command("create-page <projectName>")
  .description("Creates a page folder and populates it with predefined files")
  .action(async (projectName) => {
    const rootDirectory = process.cwd();
    const appPathChoice = await getAppPathChoice();
    const appDirectory = path.join(rootDirectory, appPathChoice.appPath);
    const projectPath = path.join(appDirectory, projectName);
    // Check if the app directory exists
    if (!fs.existsSync(appDirectory)) {
      appPathDoesNotExist();
      return;
    }
    // Check if the project folder already exists
    if (fs.existsSync(projectPath)) {
      const { replace } = await askForReplaceConfirmation(
        projectName,
        appPathChoice.appPath
      );
      if (!replace) {
        console.log(chalk.cyan("Operation aborted."));
        return;
      }
      fs.rmSync(projectPath, { recursive: true });
    }
    const { fileType } = await inquirer.prompt([
      {
        type: "list",
        name: "fileType",
        message: "Choose file type:",
        choices: ["TypeScript (tsx)", "JavaScript (jsx)"],
      },
    ]);
    const type = fileType.includes("TypeScript") ? "tsx" : "jsx";
    fs.mkdirSync(projectPath);
    // Define predefined files and their content based on the file type
    const filesToCreate = [
      {
        name: `page.${type}`,
        content: `// Page component code here (${type})
  import React from 'react';
  
  export default function ${projectName}Page() {
    return (
      <div>
        <h1>${projectName}Page</h1>
      </div>
    );
  }`,
      },
      {
        name: `loading.${type}`,
        content: `// Loading component code here (${type})
  import React from 'react';
  
  export default function ${projectName}Loading() {
    return (
      <div>
        <h1>${projectName}Loading...</h1>
      </div>
    );
  }`,
      },
      {
        name: `layout.${type}`,
        content: `// Layout component code here (${type})
  import React from 'react';
  
  export default function ${projectName}Layout({children}) {
    return (
      <div>
        <h1>{children}</h1>
      </div>
    );
  }`,
      },
    ];
    const spinner = ora(chalk.blue("Creating project and files...")).start();
    setTimeout(() => {
      filesToCreate.forEach((file) => {
        const filePath = path.join(projectPath, file.name);
        fs.writeFileSync(filePath, file.content);
      });
      spinner.succeed(
        chalk.green(
          `Project "${projectName}" created with predefined ${type} files in the '${appPathChoice.appPath}' directory.`
        )
      );
    }, 2000);
  });
//creating component api
program
  .command("create-api <projectName>")
  .description("Creates an api folder and populates it with predefined files")
  .action(async (projectName) => {
    const rootDirectory = process.cwd();
    const appPathChoice = await getAppPathChoiceForApi();
    const appDirectory = path.join(rootDirectory, appPathChoice.appPath);
    const projectPath = path.join(appDirectory, projectName);
    // Check if the app directory exists
    if (!fs.existsSync(appDirectory)) {
      appPathDoesNotExist();
      return;
    }
    // Check if the project folder already exists
    if (fs.existsSync(projectPath)) {
      const { replace } = await askForReplaceConfirmation(
        projectName,
        appPathChoice.appPath
      );
      if (!replace) {
        console.log(chalk.cyan("Operation aborted."));
        return;
      }
      fs.rmSync(projectPath, { recursive: true });
    }
    const { fileType } = await inquirer.prompt([
      {
        type: "list",
        name: "fileType",
        message: "Choose file type:",
        choices: ["TypeScript (ts)", "JavaScript (js)"],
      },
    ]);
    const type = fileType.includes("TypeScript") ? "ts" : "js";
    fs.mkdirSync(projectPath);
    // Define predefined files and their content based on the file type
    const filesToCreate = [
      {
        name: `route.${type}`,
        content: `// route component code here (${type})
  
  
  export  function GET(request) {
    return new Response(null, {
      status: 200
    })
  }
  
  export  function POST(request) {
    return new Response(null, {
      status: 200
    })
  }
  
  `,
      },
    ];
    const spinner = ora(chalk.blue("Creating project and files...")).start();
    setTimeout(() => {
      filesToCreate.forEach((file) => {
        const filePath = path.join(projectPath, file.name);
        fs.writeFileSync(filePath, file.content);
      });
      spinner.succeed(
        chalk.green(
          `Project "${projectName}" created with predefined ${type} files in the '${appPathChoice.appPath}' directory.`
        )
      );
    }, 2000);
  });
program.parse(process.argv);

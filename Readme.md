`# Njs CLI - Next.js Command Line Interface

Njs CLI is a command-line tool designed to simplify the process of creating components and APIs in a Next.js application.

## Installation

You can install Njs CLI globally using npm:

```bash
npm install -g njs-next
```

## Getting Started

To start using Njs CLI, simply run:

bashCopy code

```
njs start
```

This will provide you with an overview of what the CLI tool does.

## Creating Pages

You can use the following command to create a new page component:

command:

```
njs create-page <pageName>
```

This command creates a new page component in the specified app directory and populates it with predefined files. You'll be prompted to choose between TypeScript (tsx) and JavaScript (jsx).

## Creating APIs

To create a new API endpoint, you can use the following command:

command:

```bash
njs create-api <apiRouteName>
```

This command creates a new API route in the specified app directory and populates it with predefined files. You'll be prompted to choose between TypeScript (ts) and JavaScript (js).

## Options

- `start`: Displays an overview of what the CLI tool does.
- `create-page <pageName>`: Creates a new page component with predefined files.
- `create-api <apiRouteName>`: Creates a new API route with predefined files.

## Examples

Create a new page component named "MyPage" in the "./app" directory:

bashCopy code

```bash
njs create-page MyPage
```

result:

```file
app
	-myPage
		-page.tsx
		-layout.tsx
		-loading.tsx
```

Create a new API route named "api/users" in the "./app" directory:

bashCopy code

```bash
njs create-api users
```

result:

```
app
 -api
	 -users
		 -route.ts
```

## Feedback and Contributions

If you encounter any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request on the [GitHub repository](https://github.com/itsarunkumar/njs).

## License

This project is licensed under the MIT License

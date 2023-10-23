MzReact-CLI
===

**What We Offer**
MzReact-CLI provides a Command Line Interface (CLI) to simplify the process of creating React components, whether in TypeScript (TS) or JavaScript (JS).

---
**Table of Contents**

<!-- TOC start (generated with https://github.com/derlin/bitdowntoc) -->

- [MzReact-CLI](#mzreact-cli)
- [Purpose](#purpose)
- [Getting Started](#getting-started)
- [Commands](#commands)
  - [Component](#component)
    - [Flexibility](#flexibility)
    - [Customization](#customization)
  - [Modeling](#modeling)
    - [What is it?](#what-is-it)
    - [Composition](#composition)
    - [At Generation](#at-generation)
    - [Placeholder Markers](#placeholder-markers)
  - [Usage](#usage)
    - [(Re)claim a Copy of the Model](#reclaim-a-copy-of-the-model)
    - [Generate Your Custom Model](#generate-your-custom-model)

<!-- TOC end -->
---
# Purpose
>Why Do You Need It?
Creating a component can be relatively quick and straightforward when starting fresh. However, as your project grows and becomes more complex, managing the structure and boilerplate code can become time-consuming and error-prone.

These are minor issues individually, but having a solution to streamline the process can be a significant relief.

# Getting Started
```bash
$ npm install -g mzreact-cli
```

Once installed, navigate to your project folder and start creating components to experience the magic.

```bash
$ cd <path to my project>
```

Now you're ready to generate components with additional features, as explained below.

# Commands
```bash
  V, --version             Display the version
  g, --generate            Introduces component generation. Can be combined with [c,...]
  r, --reclaim             Reclaim a resource template. Can be combined with [m,...]
  c, --component  <value>  The component
  m, --modeling   [value]  Updates the component design model
  f, --force               Force the action
  h, --help                Display help for command
```

There are three types of options:
1. Unary options: These do not require a specific value and provide information, like the version or help.
2. Conditional unary options: These need to be used in conjunction with binary options (c, m). Here, "c" and "m" represent "component" and "modeling."
3. Binary options: These require a value to work.

Here's a summary of the available options:

| Option                  | Description                                   |
|-------------------------|-----------------------------------------------|
| `V, --version`          | Display the CLI version                      |
| `h, --help`             | Show help for the command                    |
| `r, --reclaim`          | Reclaim a resource template, use with [m,...]|
| `g, --generate`         | Introduces component generation, combine with [c,...]|
| `f, --force`            | Force the action                             |
| `c, --component <value>`| Specify the component name                  |
| `m, --modeling [value]` | Updates the component design model           |

## Component
The most crucial binary option is the "component." This option enables you to create components following a structured model that emphasizes the separation of concerns. All generated components are folder-based, aligning with React's flexibility to create components in various ways.

To use this option, combine it with "generate (g, --generate)."

**Example:**

To create a folder-based component:

```bash
$ mzr gc <relative path>/MyComponent
```

If you want to create "MyComponent" as a subfolder of "pages," and "pages" is under the "src" folder:

```bash
$ mzr gc src/pages/MyComponent
```

By default, the CLI will prevent you from writing a component in a folder containing existing files. It assumes that these files already describe a component and raises an exception. However, if you are certain about your choice, you can use the "force" option:

```bash
$ mzr gc src/pages/MyComponent --force
```

### Flexibility
You don't need to create intermediate folders if they don't exist. You can create a component within a path like "src/my components/an/extremely/long/path/MyComponent" without creating each folder manually. Just ensure that the target folders do not contain any files.

### Customization
You may want to give your component a different name from the folder identifier. To customize the generation, use a colon symbol ":" in the component name value.

```bash
$ mzr gc <path to components>/<folderName>:<componentName>
```

You can also specify a custom prefix:

```bash
$ mzr gc <path to components>/<folderName>:<componentName>:<prefix>
```

## Modeling
Understanding how the CLI works under the hood is essential when using it. The concept of a "component model" is central to this understanding.

### What is it?
All generated components follow a model provided by the CLI, which aims to enforce the separation of concerns. This model proposes a design structure for your components. However, it is not restrictive, and you can customize it to fit your specific design requirements.

Before we explore how to modify the component model, let's take a closer look at it.

### Composition
To maintain the separation of concerns, components are organized within a folder that contains three files:
- **index.\<ext>**: This file represents the component and imports a local template component responsible for rendering logic.
- **template.\<ext>**: This file defines the template and is exclusively focused on rendering DOM or HTML elements.
- **style.\<ext>**: This file contains the component's styles and uses a first-level prefix to prevent style leakage.

**Component Model** (.mzr.md) [SEE EXAMPLE](https://github.com/ManuUseGitHub/MzReact-CLI/blob/master/src/template/.mzr.md)

The model is a markdown file (.md) with the filename **.mzr.md**. It contains three code blocks marked by markdown titles (e.g., "# Style," "# Template," and "# Index").

### At Generation
During component generation, each title in the model corresponds to a file with the same name, and the extension is determined by the language specified in the code block (e.g., ```scss```, ```jsx```, or ```tsx```). These code blocks serve as templates to scaffold components, allowing you to define your own structure and logic.

The model is a markdown file, so you can use tools to format and highlight code blocks effectively.

### Placeholder Markers
The model contains special markers that serve specific purposes:

- `#__PREFIX__#`: This marker holds the prefix, which is used to limit style leakage from your component to the entire project. It is not absolute but helps reduce the impact outside the scope of your component.
- `#__COMPONENT__#`: This marker holds the name of your component. Note that the prefix can be different from the component name.
- `#__TO_ROOT__#`: This marker is situational and not present in the default model. It is used when you want each component to include a reference to a context at the root component (typically, the App). It generates the necessary back-navigation (../../../, etc.) to connect the context, saving you from manual imports.

**Example**:

```tsx
import { AppContext } from "#__TO_ROOT__#/App"
```

## Usage
By using the CLI, you can access a local version of the model, which serves as a reference for generating your components. Two operations are available:
- Create a local version specific to your current project.
- Submit a new general version to use as a base for all your projects.

It's important to note that the submitted version will not replace the default; it will only take precedence if submitted. The CLI will prioritize a `.mzr-custom.md` file over the default `.mzr.md

` and the local `.mzr.md` over the one defined in the CLI.

You can reset the local version to the default by using the reclaim command (see below).

### (Re)claim a Copy of the Model
To create a custom version, start by fetching the default version stored in the CLI's distribution folder:

```bash
$ mzr rm
```

You can also specify a path to save the copy of the model. By default, it saves to the current working directory.

### Generate Your Custom Model
After you've made changes to the local version, you can submit your version to set it as the default for all your projects:

```bash
$ mzr gm
```

This will make your custom model the default for future component generations.
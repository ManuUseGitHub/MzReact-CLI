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
    - [Lazy composition](#lazy-composition)
    - [Customization](#customization)
    - [Fast scaffolding](#fast-scaffolding)
      - [From the command line only](#from-the-command-line-only)
      - [From a (remote) file](#from-a-remote-file)
    - [NEXT.js integration](#nextjs-integration)
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

| Option                   | Description                                           |
| ------------------------ | ----------------------------------------------------- |
| `V, --version`           | Display the CLI version                               |
| `h, --help`              | Show help for the command                             |
| `r, --reclaim`           | Reclaim a resource template, use with [m,...]         |
| `g, --generate`          | Introduces component generation, combine with [c,...] |
| `f, --force`             | Force the action                                      |
| `c, --component <value>` | Specify the component name                            |
| `m, --modeling [value]`  | Updates the component design model                    |

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
The main goal of the CLI is to make the process of creating new components effortless and fast. Give the path to the future component and it will d all the magic for you.
You can also decide the name of the component class to be different from the folder containing it via **customization**.

### Lazy composition
By default, components are generated with a Class matching the Folder they are in. The mechanism is considered lazy so, you can scafold fastly. Taking folders of a NEXT js application, the way they are written differs sometimes drastically from a valid component name. The lazy generation helps to address the issue without having to do **customizations**...

There is not magic but a REGEX behind the behaviour:
```js
const HYPHENED = "(?<hyphened>\\w+(?:\\-\\w+)+)";
const WITH_QUALIFIER = "\\[(?<with>[a-z\\d-]+)(?<qualify>.+)\\]";
const CATCH_ALL = "\\[{1,2}\\.{3}(?<all>[\\w\\-]+)\\]{1,2}";
const GROUP = "\\((?<group>[\\w\\-]+)\\)";
const RESERVED = "[@_](?<reserved>[\\w\\-]+)";
const AT_ORIGIN = "(?<same>\\.)";
const SERGMENTATION = "(?:(?:[\\/\\\\]?(?:[^\\/\\\\]+[\\/\\\\])+))"
const SUB_PATH = `(?<subpath>${SEGMENTATION}|[\\/\\\\])`;
const NESTED = "(?<nested>[^\\/\\\\]+)";
const HAS_NESTing = `(?:${SUB_PATH}${NESTED}[\\/\\\\]?)`
const pattern = `^(?:${[
  HYPHENED,WITH_QUALIFIER,CATCH_ALL,GROUP,RESERVED,AT_ORIGIN,HAS_NESTing
].join("|")})$`;

///^(?:(?<hyphened>\w+(?:\-\w+)+)|\[(?<with>[a-z\d-]+)(?<qualify>.+)\]|\[{1,2}\.{3}(?<all>[\w\-]+)\]{1,2}|\((?<group>[\w\-]+)\)|[@_](?<reserved>[\w\-]+)|(?<same>\.)|(?:(?<subpath>(?:(?:[\/\\]?(?:[^\/\\]+[\/\\])+))|[\/\\])(?<nested>[^\/\\]+)[\/\\]?))$/m
const PARSED_TO_NAME = RegExp(pattern,"m");
```

assuming that you wish to create components under : `src/app/components/experiments`,

| folder to create | translation |
| ---------------- | ----------- |
| `.`              | Experiments |


NEXT.js
| folder to create          | translation      |
| ------------------------- | ---------------- |
| `[productID]`             | Product          |
| `(grouped)`               | Grouped          |
| `[...catchAll]`           | CatchAll         |
| `[[...optionalCatchAll]]` | OptionalCatchAll |
| `_lib`                    | Lib              |
| `@parallel`               | Parallel         |

### Customization
You may want to give your component a different name from the folder identifier. To customize the generation, use a colon symbol ":" in the component name value.

```bash
$ mzr gc <path to components>/<folderName>:<componentName>
```

You can also specify a custom prefix:

```bash
$ mzr gc <path to components>/<folderName>:<componentName>:<prefix>
```

See the next section for an exemple applyable to NEXT.js

### Fast scaffolding
One capability this CLI is great for is its possibility to generate component on the fly from fingertips in less than 5 seconds. Since its version **0.6.0**, it can generate all a set of components in one command... not only two component or three but a thausand if needed in one command !

It is now possible via a simple arrow marker **=>** **commas**, and a set of 2 single **quotes**! 

- Arrow : **=>** is responsible to trigger the feature
- Commas `,` : will separate the elements
- quotes `'` : they are mandatory but provide you more flexibility.


#### From the command line only
```bash
$ mzr gc '<path to my components folder>/=>a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p ... '
```

With customization
```bash
$ mzr gc '<path to my components folder>/=>folderA:customComponentName,b:B:prefix,c, ...,z '
```

#### From a (remote) file
This solution is even better. You just need to set a text file somewhere and write your composition etheir commas separated or with line feed or both ! 
```bash
$ mzr gc '<path to my components folder>/=><path to my text file>'
```
The file does not have to be located in your project! It only has to be existing at the path you specified.

A to Z Exemple:
A file from tempfolder on Mac : 
```txt
about
b,
connexion
d:Document:doc
e
forgot-my-password:ForgotMyPassword
greetings:greet
help
info
javaScript:Documentation
kotlin:Course:j-course
_lib:Library
m,n
other/nested/c
[productID]:product
q
[[...resources]]:resources
[...slug]:docs
t,u
videos
watch
x,y,z
```

the command 
```bash
$ gfc 'src/experiments=>/var/folders/7v/n264wjns2n1dcjpqry5r2nb40000gn/T/template'
```
the results:
![alt text](https://github.com/ManuUseGitHub/MzReact-CLI/raw/master/image-2.png)

![alt text](https://github.com/ManuUseGitHub/MzReact-CLI/raw/master/image-3.png)

### NEXT.js integration
Let's assume that you want to generate components for NEXT.js and create a catch all section or nested dynamic routes. You may want to have things to match the framework specifications such as
- the component being under src
- the file being named page, but the component being something else
- ...

First, you will need to compose a model suitable to your need. 
[Lear more about modeling](#modeling).

```bash
$ mzr rm
```
This will generate a Markdown file for you
![alt text](https://github.com/ManuUseGitHub/MzReact-CLI/raw/master/image.png)

Then, change its content to be like this:

![alt text](https://github.com/ManuUseGitHub/MzReact-CLI/raw/master/image-1.png)

To finish, just run the command with `gc` to generate a component

```bash
 $ mzr gc 'my-app/src/app/blog:[...slug]:detail'
```
or
```bash
 $ mzr gc 'my-app/src/app/products:[productId]:product'
```
IMPORTANT:
Do not forget to put quotes around the path if it contains square braces or it will make the command invalid.

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
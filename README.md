MzReact-CLI
===
What do we provide ?
A CLI to help with React TS/JS components creation.
___
[TOC]
___
# Purpose
>Why exactly ? Creating a component is quite fast and not that tidious, hence, it can take 3 seconds around

- Yes, true. That's what it is when you start fresh and don't have to manage a rigorous structure... To highlight this, react is so flexible you can write a component in multiple ways... looking at one component then another can be as different as day and night.
- What about context also and all the boiler plate your component define before you can get into the real stuff from the creation of that new component ?

These are small problems, for sure, but having a solution to simplify the process can be very relieving.

# Getting started
```bat
$ npm install -g mzreact-cli
```

Once that is done, go to one of your project and create a component to test the magic.

```bat
$ cd <path to my project> 
```
With all that done, you are ready to generate your components including interresting extras. More on that in the rest.


# Commands
```sh
  V, --version             display the version
  g, --generate            introduces the generation of something. try coupling
                            it with [c,...]
  r, --reclaim             reclaim a resource template. try coupling it with
                            [m,...]
  c, --component  <value>  The component
  m, --modeling   [value]  Updates the component design model
  f, --force               force the action
  h, --help                display help for command
```

There will be 3 types of options. 1. Unary options which do not require a special value, 2. Conditional unary and 3. Binary options which require a value to be combined with. 

||options|description|
|--|--|--|
|1.|`V, --version`, <br/>`h, --help`|**Unary options without condition**<br/> These will give you the help and the version|
|2.|`r, --reclaim`, <br/>`g, --generate`<br/>`f, --force`|**Conditional unary options**.<br/>These have to be used with binary options (c,m).<br/>**note:** *c* and *m* here stand for *component* or *modeling*|
|3.|`c, --component`, <br/>`m, --modeling`|**Binary options**|


## Component

The most important binary option that is. It's via this one that you will be able to create component following a model focused on the separation of concern. To do so, all created component will be folder based. To keep the same focuse and because React allows it that way, component generated will stay folder based.

This option has to be combined with **generate (`g, --generate`)**. 

**Exemple**

To create a folder based component

```sh
$ mzr gc <relative path>/MyComponent
```
If you want to create MyComponent as a sub folder of pages and `pages` and pages is under `src` folder.

```sh
$ mzr gc src/pages/MyComponent
```

**Note**
The CLI will you prevent from writing a component in a folder where files are present no matter they kind or extention. By default it assumes that files present describe a component so it yield an exception. But if you are sure of what you are doing, you can **FORCE** (`f, --force`) the writing of a new component in the defined place.

```sh
$ mzr gc src/pages/MyComponent --force
#or
$ mzr gfc src/pages/MyComponent
```


### Flexibility
No need to create intermediate folders if they do not exist.
A path to a component in `src/my components/an/extremely/long/path/MyComponent` will work fine.

you can also over nest your components **as long as the target folders do not contain any file**. In this scenario, you can create a component into `an` ; `extremely`; `long` or even into `path`.

### Customization
In some cases, you may want a different name for your Component regarding the folder identifier. In a concrete example, you may prefere to create folders for error codes like 404, 500, etc. but you cannot name a component with a name starting by a number.

We offer the tweak you need.

To customize the generation, make use of the colon symbol `:` in the component name value.

```sh
$ mzr gc <path to components>/<folderName>:<componentName>
```
or you may also want to specify a custom prefix:
```sh
$ mzr gc <path to components>/<folderName>:<componentName>:<prefix>
```

## Modeling

Comming to use this CLI, one important thing to know is how it works under the hood. Thus understanding what is the component modele is going by itself.

### What is it?

All generated components following a modele that is given by the CLI. This modele try to enforce the separation of concernes. A proposal is made to offer you a design. However, since you may have specific design, this modele is not restrictive and customization is at your reach to suite your general design hopefuly. 

Before going into how to modify the component modele, let's take a look at it.

### Composition

To keep the **separating the concerns** components are presented in a folder containeing 3 files.
- **index.\<ext>** The component itself which imports a local Template component. containing the template. This file should be responsible for logic if you follow the separation of concerns.
- **template.\<ext>** The part of the component that should only define the template and logic only aiming to serve for the rendering of DOM or HTML elements
- **style.\<ext>** This file will contain the style for this component. A first level prefix is set to prevent your style from leaking outside.

**Component modele** (.mzr.md)
[SEE EXEMPLE](https://github.com/ManuUseGitHub/MzReact-CLI/blob/master/src/template/.mzr.md)

The modèle is a markdown file (.md) its filename should be **.mzr.md**. There, you can spot 3 code blocs introduced by markdown titles (**# Style**, **# Template**, and **# Index**). 

### At generation
At generation, every title will result to a file named by a read markdown title. And for each corresponding code bloc, the extension of the files will be the extention defined by the code block language ! (` ```scss`, ` ```jsx`, or ` ```tsx`). In other sences, these codeblocs will serve as snipets to scaffold components. So you can define your own structure and even logic. 

Moreover, since the modele is a markdown file, there are tools allowing you to display nicely your file and help with the highlights and colors of codeblocs.

### Placeholders markers
You may have spotten special markers by analysing the modele. let's explain them : 

`#__PREFIX__#`: will hold the prefix. It is used to give an alternative to limit the style to leak from your component to the whole project. It is not absolute but it helps to reduce the impact out of the scope of your component.

`#__COMPONENT__#`: will hold the name of your component.
Be aware that the prefix can be something other than the component name.

`#__TO_ROOT__#`: this marker is not shown in the default modele since it is very situational. Let's say for exemple, you want every component to include a reference of a context at the root component (commonly, the App), and since a component can be at different depth in folder structure, this one will yield the **backnavigation** (../../../ etc.) needed to connect the context in this case so you do not have to check after the imports yourself.
**Exemple**:

```tsx
import {AppContext} from "#__TO_ROOT__#/App"
```

## Usage
By using the CLI you will be able to get access to a version of the model (local) which will be used as a referal to generate your next components. Two operations will be available to you.
- Create a local version specific for your current project
- Give (submit) a new general version to base all your projects on
  - However the submitted version will not erase the default. It will only take precedence if it is submited. When the CLI sees there is a `.mzr-custom.md` next to `.mzr.md`, it will favourite the `.mzr.custom.md` as the general to apply.
  - the local to your project `.mzr.md` will also take precedence over the one that is defined in the CLI.
  - you can reinitialize the local version back to the default by running the reclaim command (see below)

### (Re)claim a copy of the modele
**The creation of a custom version**, starts by fetching the default version that is contained in the CLI dist folder :
```sh
$ mzr rm
#or
$ mzr --reclaim --modeling [path]
```

**path** : optional path to put the copy of the modele. (defaults to "." which is the current working directory)

### Generate your custom 

**After you worked on a local version**, you can submit your version that has to be used as default for all your project :
```sh
$ mzr gm
#or
$ mzr --generate --modeling
```
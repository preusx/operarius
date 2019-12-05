# Vue project generator

This is generator library based on `@vue/cli` v3 with predefined presets.

Presets available:
- `project` - Preset for vue project.
- `plugin` - Preset for vue plugin development(might be used for any javascript library development). With hot reloading example playground.

## Installation

Plugins are developed to use `yarn` as a default package manager. If you are using `npm` - you would need to change scripts call in your newly generated `package.json`.

```bash
yarn global add @operarius/vue-cli-generator
```

## Usage

You may use a long command name(`operarius-vue-create`), or a shortcut(`ovc`) for a new project generation.

```bash
ovc [project-name] [preset]
```

Where `project-name` is your project name, and `preset` is the name of the preset(all available are listed above).

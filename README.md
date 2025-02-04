# vite-plugin-generate-todo

🚀 A simple Vite plugin that automatically generates a `TODO.md` file by extracting `[TODO :: ...]` comments from your source code.

## 📌 Features

- Extracts `[TODO :: ... (yyyy.mm.dd)]` comments and date from source files.
- Generates a `TODO.md` file at the root of your project.
- Groups TODOs by file path for easy reference.
- Automatically adds a creation date(= current date) if not provided.
- Sorts TODOs by file path.

## :package: NPM Package

This package will be available on [NPM](https://www.npmjs.com/package/vite-plugin-generate-todo).

## 📞 Installation

```sh
npm install vite-plugin-generate-todo --save-dev
```

or

```sh
yarn add vite-plugin-generate-todo -D
```

## 🚀 Usage

### Vite Configuration (`vite.config.ts`)

Add the plugin to your Vite configuration:

```ts
import { defineConfig } from "vite";
import generateTodo from "vite-plugin-generate-todo";

export default defineConfig({
  plugins: [generateTodo()],
});
```

## 📝 How It Works

1. In your source code, use comments with the format `[TODO :: your-task (yyyy.mm.dd)]`.
2. If a date is not included, the plugin will automatically add the current date.
3. During the build process, the plugin collects all TODOs.
4. It generates a `TODO.md` file at the root of your project, sorted by file path.

### Example:

```ts
// src/components/Button.tsx

const Button = () => {
  return <button>Click me</button>;
};

// [TODO :: Refactor button styles]
// [TODO :: Add accessibility features (2025.02.04)]
```

### Generated `TODO.md`:

```md
# TODO LIST

### src/components/Button.tsx

- [ ] Refactor button styles - (2025. 2. 4)
- [ ] Add accessibility features - (2025. 2. 4)
```

## 🛠️ Plugin Options

Currently, this plugin does not require additional configuration.

## 💜 License

MIT

## 📩 Contributing

Feel free to open issues or pull requests if you have suggestions or improvements! 🚀

## Author

- Maintainer: [Donggun Lim](https://github.com/Ldonggun6766)
- Email: Ldonggun6766@gmail.com

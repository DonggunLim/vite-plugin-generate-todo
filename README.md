# vite-plugin-generate-todo

🚀 A simple Vite plugin that automatically generates a `TODO.md` file by extracting `[TODO :: ...]` comments from your source code.

## 📌 Features

- Extracts `[TODO :: ...]` comments from source files
- Generates a `TODO.md` file at the root of your project
- Groups TODOs by file path for easy reference

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

1. In your source code, use comments with the format `[TODO :: your-task]`.
2. During the build process, the plugin collects all TODOs.
3. It generates a `TODO.md` file at the root of your project.

### Example:

```ts
// src/components/Button.tsx

const Button = () => {
  return <button>Click me</button>;
};

// [TODO :: Refactor button styles]
// [TODO :: Add accessibility features]
```

###

### Generated `TODO.md`:

```md
# TODO LIST

### src/components/Button.tsx

- [ ] Refactor button styles
- [ ] Add accessibility features
```

## 🛠️ Plugin Options

Currently, this plugin does not require additional configuration.

## 💜 License

MIT

## 📩 Contributing

Feel free to open issues or pull requests if you have suggestions or improvements! 🚀

## Author

- Maintainer: [Donggun Lim](https://github.com/DonggunLim)
- Email: Ldonggun6766@gmail.com

import { Plugin } from "vite";
import fs from "fs";

const todoList: Record<string, string[]> = {};

const generateTodo = (): Plugin => {
  return {
    name: "vite-plugin-generate-Todo",
    enforce: "pre",
    transform(code, id) {
      const regex = /\[TODO :: (.*?)\]/g;
      const matches = [...code.matchAll(regex)];

      if (!matches.length) return null;

      const path = "src" + id.split("/src")[1];
      if (!todoList[path]) {
        todoList[path] = [];
      }
      matches.forEach((match) => todoList[path].push(match[1]));
    },
    buildEnd() {
      const content = processTodoList(todoList);
      fs.writeFile("TODO.md", content, (error) => {
        if (error) console.error(error);
      });
    },
  };
};

const processTodoList = (todoList: Record<string, string[]>) => {
  let content = "# TODO LIST\n";
  Object.keys(todoList).forEach((path) => {
    content += `### ${path}\n`;
    content += todoList[path].map((todo) => ` - [ ] ${todo}\n`).join("\n");
  });
  return content;
};

export default generateTodo;

import { Plugin } from "vite";
import fs from "fs";

type Todo = {
  text: string;
  createdAt: string;
};
type TodoList = Record<string, Todo[]>;

const todoList: TodoList = {};

const generateTodo = (): Plugin => {
  return {
    name: "vite-plugin-generate-Todo",
    enforce: "pre",
    transform(code, id) {
      const regex = /\[TODO :: (.*?)(\(\d{4}\. \d{1,2}\. \d{1,2}\))?\]/g;
      const matches = [...code.matchAll(regex)];
      if (!matches.length)
        return {
          code,
          map: null,
        };

      const path = "src" + id.split("/src")[1];
      if (!todoList[path]) {
        todoList[path] = [];
      }

      let updatedCode = code;
      matches.forEach((match) => {
        const hasDate = !!match[2];
        const createdAt =
          match[2] ?? `(${new Date().toLocaleDateString().replace(/.$/, "")})`;

        if (!hasDate) {
          updatedCode = updatedCode.replace(
            match[0] ?? "",
            `[TODO :: ${match[1]} ${createdAt}]`
          );
        }

        todoList[path].push({ text: match[1], createdAt });
      });

      return {
        code: updatedCode,
        map: null,
      };
    },
    buildEnd() {
      try {
        const content = processTodoList(todoList);
        fs.writeFile("TODO.md", content, (error) => {
          if (error) throw error;
        });
      } catch (error) {
        console.error(error);
      }
    },
  };
};

const processTodoList = (todoList: TodoList) => {
  const sortedListByKey = Object.fromEntries(
    Object.entries(todoList).toSorted(([keyA], [keyB]) =>
      keyA.localeCompare(keyB)
    )
  );

  let content = "# TODO LIST\n";
  Object.keys(sortedListByKey).forEach((path) => {
    content += `### ${path}\n`;
    content += sortedListByKey[path]
      .map((todo) => ` - [ ] ${todo.text} - ${todo.createdAt}\n`)
      .join("\n");
  });
  return content;
};

export default generateTodo;

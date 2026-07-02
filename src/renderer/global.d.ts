export {};

export type Todo = {
  id: string;
  text: string;
  complete: boolean;
};

declare global {
  interface Window {
    api: {
      getTodos: () => Promise<Todo[]>;
      addTodo: (title: string) => Promise<Todo[]>;
      completeTodo: (id: string) => Promise<Todo[]>;
      deleteTodo: (id: string) => Promise<Todo[]>;
    };
  }
}
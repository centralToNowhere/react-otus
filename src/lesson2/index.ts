import { createInterface } from "readline";

import { runner } from "./runner";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    rl.question("> ", (answer: string) => {
      try {
        const result = runner(answer);

        if (result) {
          resolve(String(result));
        }
      } catch (e) {
        reject(e);
      }
    });
  });
};

const app = (): void => {
  question()
    .then((result) => {
      console.log(`Result: ${result}`);
    })
    .catch((e) => {
      console.log(e.message);
    })
    .finally(() => {
      app();
    });
};

app();

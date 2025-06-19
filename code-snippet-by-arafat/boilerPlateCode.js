export default boilerplates = {
  html: `<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
  <meta charset="UTF-8" />
</head>
<body>

</body>
</html>`,

  css: `/* Start writing your CSS here */`,

  javascript: `// Start writing JavaScript code here
console.log("Hello, world!");
`,

  typescript: `// Start writing TypeScript code here
const greet = (name: string): void => {
  console.log(\`Hello, \${name}!\`);
};`,

  python: `# Start writing Python code here
print("Hello, world!")`,

  java: `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello, World!");
  }
}`,

  cpp: `#include <iostream>
using namespace std;

int main() {
  cout << "Hello, World!" << endl;
  return 0;
}`,

  c: `#include <stdio.h>

int main() {
  printf("Hello, World!\\n");
  return 0;
}`,

  csharp: `using System;

class Program {
  static void Main() {
    Console.WriteLine("Hello, World!");
  }
}`,

  php: `<?php
echo "Hello, World!";
?>`,

  go: `package main

import "fmt"

func main() {
  fmt.Println("Hello, World!")
}`,

  rust: `fn main() {
  println!("Hello, world!");
}`,

  ruby: `puts "Hello, World!"`,

  shell: `#!/bin/bash
echo "Hello, World!"`,

  sql: `-- Write your SQL query here
SELECT * FROM users;`,

  xml: `<?xml version="1.0" encoding="UTF-8" ?>
<note>
  <to>User</to>
  <from>Admin</from>
  <heading>Reminder</heading>
  <body>Hello, World!</body>
</note>`,

  yaml: `# Sample YAML
user:
  name: Arafat
  role: Developer`,

  markdown: `# Welcome to Code Snippet by Arafat

Start writing markdown here.`,

  json: `{
  "name": "Arafat",
  "role": "Developer",
  "active": true
}`,

  kotlin: `fun main() {
    println("Hello, World!")
}`,

  swift: `import Foundation

print("Hello, World!")`,

  dart: `void main() {
  print('Hello, World!');
}`,

  objectivec: `#import <Foundation/Foundation.h>

int main() {
  NSLog(@"Hello, World!");
  return 0;
}`,

  scss: `// Start writing SCSS here
$primary: #3490dc;
body {
  background-color: $primary;
}`,

  less: `// Start writing Less code here
@primary: #3490dc;
body {
  color: @primary;
}`,
};

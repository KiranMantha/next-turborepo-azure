import type { PlopTypes } from '@turbo/gen';

// Learn more about Turborepo Generators at https://turbo.build/docs/guides/generating-code

export default function componentGenerator(plop: PlopTypes.NodePlopAPI): void {
  // A simple generator to add a new React component to the internal UI library
  plop.setGenerator('react-component', {
    description: 'Adds a new react component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the component?'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'packages/ui/src/{{pascalCase name}}/index.ts',
        templateFile: 'component/templates/index.hbs'
      },
      {
        type: 'add',
        path: 'packages/ui/src/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile: 'component/templates/component.hbs'
      },
      {
        type: 'add',
        path: 'packages/ui/src/{{pascalCase name}}/{{pascalCase name}}.model.ts',
        templateFile: 'component/templates/component.model.hbs'
      },
      {
        type: 'add',
        path: 'packages/ui/src/{{pascalCase name}}/{{pascalCase name}}.module.scss',
        template: '.wrapper {\n  display: flex;\n}'
      },
      {
        type: 'add',
        path: 'packages/ui/src/{{pascalCase name}}/{{pascalCase name}}.stories.tsx',
        templateFile: 'component/templates/component.stories.hbs'
      },
      {
        type: 'add',
        path: 'packages/ui/src/{{pascalCase name}}/{{pascalCase name}}.mock.ts',
        templateFile: 'component/templates/component.mock.hbs'
      }
    ]
  });
}

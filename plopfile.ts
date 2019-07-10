export = (plop) => {
    plop.setGenerator('components', {
        description: 'egg component generator',
        prompts: [
            {
                type: 'list',
                name: 'componentName',
                message: 'select component',
                choices: [ 'controller','service','middleware','model','schedule']
            },
            {
				type: 'input',
				name: 'fileName',
				message: 'input component name?'
			}
        ],
        actions: function (key) {

            const { componentName, fileName } = key;

            const templateFiles = {
                controller: {
                    type: 'add',
                    path: 'app/controller/{{fileName}}.ts',
                    templateFile: 'plop_templates/controller.hbs'
                },
                model: {
                    type: 'add',
                    path: 'app/model/{{fileName}}.ts',
                    templateFile: 'plop_templates/model.hbs'
                },
                service: {
                    type: 'add',
                    path: 'app/service/{{fileName}}.ts',
                    templateFile: 'plop_templates/service.hbs'
                },
            }

            return [templateFiles[componentName]];
        }
    });
};

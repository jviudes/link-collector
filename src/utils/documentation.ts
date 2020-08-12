const DOCUMENTATION_JSON = {
  info: {
    title: 'LINK COLLECTOR API',
    name: 'link-collector docs',
    description: 'Service created to extrac links from the html of a given link.'
  },
  swagger: '2.0',
  paths: {
    '/': {
      get: {
        tags: ['link-collector'],
        summary: 'recover link',
        parameters: [
          {
            name: 'url',
            in: 'query',
            description: 'url to search for',
            required: false,
            schema: { type: 'string', example: 'https://www.test.com.br' }
          }
        ],
        responses: {
          '200': { description: 'OK' },
          '400': { description: 'INVALID URL' },
          '500': { description: 'INTERNAL ERROR' }
        }
      },
      delete: {
        tags: ['link-collector'],
        summary: 'delete link',
        parameters: [
          {
            name: 'url',
            in: 'query',
            description: 'url record to delete',
            required: true,
            schema: { type: 'string', example: 'https://www.test.com.br' }
          }
        ],
        responses: { '204': { description: '' }, '400': { description: 'URL REQUIRED' }, '500': { description: 'INTERNAL ERROR' } }
      }
    }
  },
  responses: {},
  parameters: {},
  securityDefinitions: {},
  tags: [{ name: 'link-collector', description: 'Methods' }]
};

export default DOCUMENTATION_JSON;

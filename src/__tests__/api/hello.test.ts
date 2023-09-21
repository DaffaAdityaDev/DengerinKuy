import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { NextApiResponse } from 'next';
import handler from '../../pages/api/hello';
import { mock, MockProxy } from 'jest-mock-extended';
import { NextApiResponse } from 'next';


const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

let mockRes: MockProxy<NextApiResponse>;

beforeEach(() => {
  mockRes = mock<NextApiResponse>();
});

test('returns hello world in the response data', async () => {
    server.use(
        rest.get('/api/hello', (req, res: MockProxy<NextApiResponse>) => {
          res.status(200).send({ message: 'Hello, world!' });
        })
      );
      

   // Fetch data from the API route
   const response = await handler({} as any, mockRes);

   // Test the response data directly
   expect(mockRes.status).toHaveBeenCalledWith(200);
   expect(mockRes.send).toHaveBeenCalledWith({ name: 'Hello World' });
});

import { environment } from './environment.development';

describe('development environment', () => {
  it('uses the project API Gateway develop endpoint', () => {
    expect(environment.backendUrl).toBe(
      'https://eknqcvq3l1.execute-api.us-west-2.amazonaws.com/develop'
    );
  });
});

// amplify/auth/resource.ts
import { defineAuth } from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true, // Allow users to register and login via email
  },
  // Add user groups for permission differentiation
  groups: ['ADMIN', 'EMPLOYEE'],
});
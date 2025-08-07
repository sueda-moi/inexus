// amplify/data/resource.ts
import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any unauthenticated user can "create", "read", "update", 
and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  // define user char enum 
  Role: a.enum(['ADMIN', 'EMPLOYEE']),

  JobPosting: a
    .model({
      title: a.string().required(),
      description: a.string().required(),
      location: a.string(),
      requirements: a.string().array(),
    })
    .authorization((allow) => [
      allow.groups(['ADMIN']).to(['create', 'read', 'update', 'delete']),
      allow.public('apiKey').to(['read']),
    ]),

  BlogPost: a
    .model({
      content: a.string().required(),
      authorName: a.string(), // Denormalize username when posting to optimize for display
      //  owner field will be automatically added
    })
    .authorization((allow) => [
      // The article owner can do anything
      allow.owner().to(['create', 'read', 'update', 'delete']),
      // Logged-in members (including ADMIN) can read all articles
      allow.authenticated('userPools').to(['read']),
      // ADMIN group can delete any article
      allow.groups(['ADMIN']).to(['delete']),
    ]),
});

// Export a type using schema definition for frontend use
export type Schema = ClientSchema<typeof schema>;

// Pass schema to defineData
export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool', // User login required by default
    apiKeyAuthorizationMode: {
      // Use API Key for public access scenarios, such as job listings
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>

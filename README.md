This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

<!-- ## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details. -->

# Backend with AWS Amplify Gen 2

This project uses AWS Amplify Gen 2 to build, deploy, and manage its backend. The entire backend is defined as code (IaC - Infrastructure as Code) within the `/amplify` directory. This document outlines the development and deployment workflow.

## Prerequisites

Before you begin, ensure you have the following installed and configured:

1. **Node.js**: v18 or later.
2. **AWS Account**: An active AWS account.
3. **AWS CLI**: Configured with your credentials. Run `aws configure` if you haven't already.
4. **AWS Amplify CLI**: The latest version.
   
   ```bash
   npm install -g @aws-amplify/cli
   ```

## Local Development using Amplify Sandbox

For local development, we use the **Amplify Sandbox**. The Sandbox is a personal, temporary cloud environment that mirrors your backend definition. It allows for rapid iteration without affecting production or other team members.

### Step 1: Start the Sandbox

In your project's root directory, run the following command to start the sandbox:

```bash
npx amplify sandbox
```

This command will:

* Read your backend definition from the code in the `/amplify` directory.

* Deploy a **temporary**, **personal** **backend** to the AWS cloud.

* Generate an `amplifyconfiguration.json` file in your project root. Your frontend will use this file to connect to the sandbox environment.

* Begin watching for file changes within the `/amplify` directory.

## Step 2: Run the Next.js Frontend

With the sandbox running in one terminal, open a second terminal and start the Next.js development server:

```bash
npm run dev
```

Your Next.js application will now be running locally and connected to your personal sandbox backend in the cloud.



### Step 3: Making Backend Changes

To modify the backend (e.g., change a data model or an auth rule):

1. Edit the corresponding TypeScript file in the `/amplify` directory (e.g., `amplify/data/resource.ts`).

2. Save the file.

3. The running sandbox process will automatically detect the change and update your live sandbox environment in the cloud. Your frontend will reflect these changes on the next API call or page refresh.



### Step 4: Stopping the Sandbox

When you are finished with your development session, stop the sandbox process by pressing `Ctrl + C` in its terminal. It will ask if you want to delete the sandbox environment. **It is standard practice to answer Yes (y)**, as this will remove all the temporary AWS resources and avoid incurring costs.



### Deployment

There are two primary methods for deploying the backend to a permanent environment like staging or production.

### Method 1: CI/CD via Amplify Hosting (Recommended)

The most robust method is to use Amplify's integrated CI/CD pipeline.

1. **Connect Your Repository**: Push your project to a Git provider (GitHub, GitLab, Bitbucket, etc.).

2. **Use AWS Amplify Console**: Log in to the AWS Amplify Console and connect it to your Git repository.

3. **Configure Build Settings**: Follow the console prompts. Amplify will automatically detect it's a Next.js + Amplify Gen 2 project and set up the build settings.

4. **Deploy**: Once configured, every `git push` to your specified branch (e.g., `main`) will automatically trigger a deployment of both the frontend and the backend.

### Method 2: Manual CLI Deployment

You can also deploy a permanent backend environment directly from your command line. This is useful for creating shared test environments or for deployments without a Git-based workflow.

Bash

```
npx amplify deploy
```

This command will provision a **permanent** backend in the cloud based on your current code in the `/amplify` directory.



## Important Notes on Version Control

- **Commit the `/amplify` directory**: This directory is your backend's source code and **MUST** be committed to Git.

- **IGNORE `amplifyconfiguration.json`**: This file is generated dynamically and contains environment-specific endpoints and secrets. It is correctly listed in the `.gitignore` file and **MUST NOT** be committed to Git.

- **IGNORE `amplify/.amplify/`**: This hidden sub-directory contains temporary state and build artifacts. It is also correctly listed in `.gitignore`.
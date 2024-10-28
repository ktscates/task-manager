# Task Manager App

A Task Manager web application built with React, Firebase, TailwindCSS, and other modern web tools. The app supports user authentication, CRUD operations on tasks, search and filtering, a dark mode theme, and localization in English and French.

## Features

- **User Authentication** (Firebase)
- **Task Management**: Creation, editing, deletion, and categorization
- **Dark Mode** theme support
- **Language Localization** (i18n) with English and French
- **Toast Notifications** for user feedback
- **Responsive Design** for mobile, tablet, and desktop
- **Hosting on Netlify**

## Tech Stack

- **Frontend**: React, TailwindCSS, TypeScript
- **Backend**: Firebase (Firestore and Authentication)
- **Testing**: Jest, React Testing Library
- **Deployment**: Netlify

## Getting Started

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/ktscates/task-manager.git
   cd task-manager
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

### Running the App

    ```bash
    npm start
    ```
    Open your browser and navigate to `http://localhost:3000`.

## Testing

To run tests using Jest and React Testing Library:

```bash
npm test --config jest.config.js


```

## Deployment

### Deploying on Netlify

1. **Connect Repository**: In Netlify, connect this repository for continuous deployment.
2. **Environment Variables**: In your Netlify project settings, go to **Site Settings > Environment Variables** and add each variable from your `.env` file.
3. **Build Settings**:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `build`

Upon pushing changes to the connected branch, Netlify will automatically build and deploy the app.

## Live Link

You can access the deployed application at [Task manager](https://ktscates-task-manager.netlify.app).

```

```

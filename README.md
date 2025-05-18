# Semester Project 2 - Auction House

This project is an auction site written with Vite. You can check out the live website [here.](https://auctionhousenab.netlify.app/)

## How to run the project

### Prerequisites
Make sure to have [Node.js](https://nodejs.org/) installed.

### Installation

Clone the repository:
```bash
git clone https://github.com/nicolaibye/fed2-sempro2-auctionhouse.git
```
Install dependencies:
```bash
npm install
```

### Coding/Prod

To run the dev server:
```bash
npm run dev
```
Build for production:
```bash
npm run build
```
This will create a dist folder that you can run on a local host:
```bash
npx serve dist
```

### Scripts and .env

Scripts for running unit and e2e tests:
```bash
npm run test:unit
npm run test:e2e
```

Ensure to add an .env file with these values:
```bash
TEST_USER_EMAIL= a test e-mail
TEST_USER_PASSWORD= acompanied test password
```

### Dependencies
- Vite
- Tailwind CSS

### Contribution
If you want to add something to the project make sure to work within a new branch
```bash
git checkout -b 000-your-branch-name
```

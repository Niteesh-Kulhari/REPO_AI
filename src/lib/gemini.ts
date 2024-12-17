import { GoogleGenerativeAI } from "@google/generative-ai"

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not defined in the environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash'
})

export const aiSummariseCommit = async (diff: string) => {
    //https://github.com/docker/genai-stack/commit<commithash>.diff

    const res = await model.generateContent([
        `You are an expert programmer, and you are trying to summarize a git diff.
        Reminders about the git diff format:
        For every file, there are a few metadata lines, like (for example):
        \`\`\`
        diff --git a/lib/index.js b/lib/index.js
        index aadf691..bfef603 100644
        --- a/lib/index.js
        +++ b/lib/index.js
        \`\`\`
        This means that \`lib/index.js\` was modified in this commit. Note that this is only an example.
        Then there is a specifier of the lines that were modified.
        A line starting with \`+\` means it was added.
        A line starting with \`-\` means this line was deleted.
        A line that starts with neither \`+\` nor \`-\` is code given for context and better understanding.
        It is not part of the diff.
        [...]
        EXAMPLE SUMMARY COMMENTS:
        \`\`\`
        *Raised the amount of returned recordings from \`10\` to \`100\` [packages/server/recordings_api.ts], [packages/server/constants.ts]
        *Fixed a typo in the github action name [.github/workflow/gpt-commit-summarizer.yml]
        *Moved the \`octokit\` initialization to a seperate file [src/octokit.ts], [src/index.ts]
        *Added an OpenAI API for completions [packages/utils/apis/openai.ts]
        *Lowered numeric tolerance for test files
        \`\`\`
        Most commits will have less comments than this example list.
        The last comment does not include the file names,
        because there were more than one relevant files in the hpothetical commit.
        Do not include parts of example in your summary.
        It is given only as an example of appropriate comments.`,
            `plese summarise the following diff file: \n\n${diff}`
    ]);

    return res.response.text();
}



//Local Testing
// const diff = `
// diff --git a/.github/workflows/build.yml b/.github/workflows/build.yml
// index 67521b7..61cce43 100644
// --- a/.github/workflows/build.yml
// +++ b/.github/workflows/build.yml
// @@ -1,23 +1,30 @@
// -name: CI
// +name: CI pipeline

// +# Trigger the pipeline on pull requests to the 'main' branch
// on:
// +  pull_request:
// +    branches:
// +      - main
// +
// +  # Optionally, you can trigger it on push events to the main branch as well
//   push:
//     branches:
//       - main

// jobs:
//   build:
// +    name: Builds the project
//     runs-on: ubuntu-latest
//     steps:
// -      - name: Checkout code
// -        uses: actions/checkout@v2
// +      - uses: actions/checkout@v3

// -      - name: Set up Node.js
// -        uses: actions/setup-node@v2
// +      - name: Use Node.js
// +        uses: actions/setup-node@v3
//         with:
// -          node-version: '16'  # Specify your Node.js version
// +          node-version: '20'

// -      - name: Install dependencies
// +      # Install dependencies
// +      - name: Install Dependencies
//         run: npm install
//         env:
//           NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: placeholder-value
//           NEXT_PUBLIC_FIREBASE_API_KEY: placeholder-value
//           NEXT_PUBLIC_FIREBASE_APP_ID: placeholder-value
//           NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: placeholder-value`


// console.log(await summariseCommit(diff))

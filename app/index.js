// libs for github & graphql
const core = require('@actions/core');
const github = require('@actions/github');


// get the octokit handle 
const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN');
const octokit = github.getOctokit(GITHUB_TOKEN);


const url = '/repos/{owner}/{repo}/actions/oidc/customization/sub';

async function run() {
    await octokit.request({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        url,
        method: 'PUT',
        use_default: false,
        include_claim_keys: [
            'owner',
            'repo'
        ]
    });
}

run();
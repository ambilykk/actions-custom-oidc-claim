// libs for github & graphql
const core = require('@actions/core');
const github = require('@actions/github');


// get the octokit handle 
const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN');
const octokit = github.getOctokit(GITHUB_TOKEN);

// inputs defined in action metadata file
const owner = github.context.repository.owner;
const repo = github.context.repository.repo;
const url ='/repos/{owner}/{repo}/actions/oidc/customization/sub';


await octokit.request({
    owner,
    repo,
    url,
    method: 'PUT',
    use_default: false,
    include_claim_keys: [
        'owner',
        'repo'
    ]
  });
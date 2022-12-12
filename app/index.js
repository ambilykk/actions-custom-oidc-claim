// libs for github & graphql
const core = require('@actions/core');
const github = require('@actions/github');


// get the octokit handle 
const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN');
const octokit = github.getOctokit(GITHUB_TOKEN);

// get the input values
const org_repo = core.getInput('org-repo');
const claim_keys = core.getInput('claim-keys');
const use_default = core.getInput('use-default');

// github api url for organization and repository
let url = '/repos/{owner}/{repo}/actions/oidc/customization/sub';
if (org_repo == 'org') {
    url = '/orgs/{org}/actions/oidc/customization/sub';
}

async function run() {
    try {
        let req_body = {};

        // set the claim keys for organization 
        if (org_repo == 'org') {
            req_body = {
                org: github.context.repo.owner,
                url,
                method: 'PUT',
                include_claim_keys: use_default==true? ['repo', 'context'] : claim_keys.split(',').map(item => item.trim())
            }
        }
        else if (org_repo == 'repo')  {
            // set the claim keys for repository 
            req_body = {
                owner: github.context.repo.owner,
                repo: github.context.repo.repo,
                url,
                method: 'PUT',
                use_default: use_default==true? true : false,
                include_claim_keys: use_default==true? [] : claim_keys.split(',').map(item => item.trim())
            }
        }
        else{
             core.warning(`Input '${org_repo}' is not valid`);
             return;
        }
        
        // console.log(req_body);
        // call the github api to set the claim keys
        const response = await octokit.request(req_body);
        console.log(response);
    } catch (error) {
        core.setFailed(error.message);
    }
}

// run the action
run();

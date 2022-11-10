# Actions Custom OIDC Claim 
This action helps in setting custom Actions OpenID Connect(OIDC) subject claim for a repository

**Note**: Trust policy setup in AWS IAM supports the partial subject mapping using Wildcards (*) and "StringLike" conditions. Whereas, Azure AD Federated Identity will not support the wild cards based partial mapping. 

**_IMP: Use this action once to setup the new OIDC subject claim; don't run as part of other workflows_**

# How to Use the Action

## action in workflow

Include the ations-custom-oidc-claim action in your workflow. 
Current version supports only the 'repo' claim key. Will include the list of supported claim keys as an input to scatter to multiple scenarios

Current claim key. -> **repo:{orgname}/{reponame}**

Ensure to edit the sub definition in target Idp to match the subject claim passed form GitHub

```
name: Run Once - OIDC
on: 
   workflow_dispatch:

permissions: write-all  
jobs: 
    build-image:
        runs-on: ubuntu-latest 
        
        steps:                  
         - name: oidc customization
           uses: ambilykk/actions-custom-oidc-claim@main
           with:
              GITHUB_TOKEN: ${{secrets.GITHUB_TOKEN}}  
```

## Parameters

| Name                           | Required  | Description                                                                      |
|--------------------------------|------------|----------------------------------------------------------------------|
| GITHUB_TOKEN                 | Yes | PAT Token for access    |


## Pending
- Including multiple claim key combinations

# License

The scripts and documentation in this project are released under the [MIT License](https://github.com/actions/download-artifact/blob/main/LICENSE)

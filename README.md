# Actions Custom OIDC Claim 
This action helps in setting custom Actions OpenID Connect(OIDC) subject claim for a repository

**Note**: Trust policy setup in AWS IAM supports the partial subject mapping using Wildcards (*) and "StringLike" conditions. Whereas, Azure AD Federated Identity will not support the wild cards based partial mapping. 

**_IMP: Use this action once to setup the new OIDC subject claim; don't run as part of other workflows_**

# How to Use the Action

## action in workflow

Include the actions-custom-oidc-claim action in your workflow. Ensure to edit the sub definition in target Idp to match the subject claim passed form GitHub

1: Set the OIDC subject claim for repository with keys repo and context [repo:{org}/{repo}:environment:{env}] 
```
permissions: write-all  
jobs: 
    build-image:
        runs-on: ubuntu-latest 
        
        steps:                  
         - name: oidc customization
           uses: ambilykk/actions-custom-oidc-claim@main
           with:
              GITHUB_TOKEN: ${{secrets.GITHUB_TOKEN}}  
              claim-keys: repo, context
```

2: Revert back to the default OIDC subject claim for repository 
```
       
        steps:                  
         - name: oidc customization
           uses: ambilykk/actions-custom-oidc-claim@main
           with:
              GITHUB_TOKEN: ${{secrets.GITHUB_TOKEN}}  
              use-default: true
```
3: Set the OIDC subject claim for organization with keys repo, context and repository_owner [repo:{org}/{repo}:environment:{env}:repository_owner:{owner}] 
```
       
        steps:                  
         - name: oidc customization
           uses: ambilykk/actions-custom-oidc-claim@main
           with:
              GITHUB_TOKEN: ${{secrets.GITHUB_TOKEN}}  
              claim-keys: repo, context, repository_owner
              org-repo: org
```

## Parameters

| Name                           | Required  | Default Value | Description                                           |
|--------------------------------|-----------|---------------|-------------------------------------------------------|
| GITHUB_TOKEN                 | Yes |  | PAT Token for access    |
| org-repo                      | No | repo | Specify the scope of the subject claim - repo or org                  |
| claim-keys                     | No | repo, context | Comma separated list of claim keys. <br/> <ul><li>the maximum size of claim-keys can be 512 characters</li><li>claim key can only contain alphanumeric characters and underscores</li></ul> <h3>Supported claim keys</h3> ["sub","aud","exp","iat","iss","jti","nbf", "ref","repository","repository_id","repository_owner","repository_owner_id","run_id", "run_number","run_attempt","actor","actor_id","workflow","head_ref","base_ref","event_name", "ref_type","environment","environment_node_id","job_workflow_ref","repository_visibility", "context"]  |
| use-default                    | No | false | Use the default sub claim format |



# License

The scripts and documentation in this project are released under the [MIT License](https://github.com/actions/download-artifact/blob/main/LICENSE)

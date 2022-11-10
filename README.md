# Actions OIDC Custom Claim 
This action helps in setting custom Actions OpenID Connect(OIDC) subject claim for a repository

**Note**: Trust policy setup in AWS IAM supports the partial subject mapping using Wildcards (*) and "StringLike" conditions. Whereas, Azure AD Federated Identity will not support the wild cards based partial mapping. 
**IMP: Use this action once to setup the new OIDC subject claim; don't run as part of other workflows**

# How to Use the Action

## action in workflow

Include the deployment-auto-approve action in your workflow. 

Following is the sample code for integrating this action with your workflow. 
Sample workflow defines three jobs - First, Second and Third. Third job runs on environment 'demo', configured with [Environment Protection Rule (Required reviewers)](https://docs.github.com/en/enterprise-cloud@latest/actions/deployment/targeting-different-environments/using-environments-for-deployment#environment-protection-rules).


![env protection rule](https://user-images.githubusercontent.com/10282550/196625488-6ecf132d-8e1f-443f-8c22-7a8a0223a314.png)

Auto Approval is controlled using the workflow input - **approve_deploy** [custom input variable]

```
jobs:
  First:
    name: First
    runs-on: ubuntu-latest      
    steps:
     - name: Hello World
       run: | 
          echo "Hello from first job"
  Second:
    name: Second
    runs-on: ubuntu-latest  
    steps:
     - name: Second job       
       run: | 
          echo "Hello from first job"
     - name: checkout
       uses: actions/checkout@v3
        
     - name: Auto approve
       if: ${{ inputs.approve_deploy == 'approve' }}
       uses: techrill88/deployment-auto-approve@main
       with:
         GITHUB_TOKEN: ${{secrets.GH_TOKEN}}   
         environment: ${{ inputs.environment }}
          
  Third:
    runs-on: ubuntu-latest  
    environment: demo
    steps:             
      - name: Final job   
        run: |
         echo "Third job"        
```

### Responses

1. **Notification - when the deployment-auto-approve action executed by a user who is not added as a reviewer**
![Screenshot 2022-10-20 at 12 08 25 PM](https://user-images.githubusercontent.com/10282550/196874957-b1942e02-2636-408e-86d8-408f96ee912b.png)

2. **The environment passed was not found in the list of environment to pre-approve**

   ![Screenshot 2022-10-20 at 2 11 04 PM](https://user-images.githubusercontent.com/10282550/196900446-7c4e2abf-6a8c-4154-bec0-86d36388cba6.png)


3. **Deployment Review & Summary - when executed by a reviewer**

   ![Screenshot 2022-10-20 at 12 13 17 PM](https://user-images.githubusercontent.com/10282550/196875307-414a9b9f-93a6-4efc-b3f6-10e9e159e958.png)



## Parameters

| Name                           | Required  | Description                                                                      |
|--------------------------------|------------|----------------------------------------------------------------------|
| GITHUB_TOKEN                 | Yes | PAT Token for access    |
| environment                  | Yes | Environment to pre-approve deployment |


## Limitations

- If the workflow jobs defined as dependent workflows (using - needs), then this action will not work
- If the workflow triggered by a non-reviewer, auto approval will not work

# License

The scripts and documentation in this project are released under the [MIT License](https://github.com/actions/download-artifact/blob/main/LICENSE)

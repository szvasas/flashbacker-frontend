const envToUse = (env.NAME === "$ENV_NAME") ? process.env : env

export const cognitoConfig = {
  "aws_project_region": envToUse.VUE_APP_FLASHBACKER_COGNITO_REGION,
  "aws_cognito_region": envToUse.VUE_APP_FLASHBACKER_COGNITO_REGION,
  "aws_user_pools_id": envToUse.VUE_APP_FLASHBACKER_COGNITO_USER_POOLS_ID,
  "aws_user_pools_web_client_id": envToUse.VUE_APP_FLASHBACKER_COGNITO_USER_POOLS_WEB_CLIENT_ID,
  "oauth": {
    "domain": envToUse.VUE_APP_FLASHBACKER_COGNITO_DOMAIN,
    "scope": [
      "phone",
      "email",
      "openid",
      "profile",
      "aws.cognito.signin.user.admin"
    ],
    "redirectSignIn": envToUse.VUE_APP_FLASHBACKER_COGNITO_REDIRECT_SIGN_IN,
    "redirectSignOut": envToUse.VUE_APP_FLASHBACKER_COGNITO_REDIRECT_SIGN_OUT,
    "responseType": "code"
  },
  "federationTarget": "COGNITO_USER_POOLS"
};

export const backendUrl = envToUse.VUE_APP_FLASHBACKER_BACKEND_URL

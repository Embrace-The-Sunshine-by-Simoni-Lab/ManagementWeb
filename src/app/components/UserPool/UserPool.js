import {CognitoUserPool} from "amazon-cognito-identity-js"


const poolData = {
    UserPoolId: "us-west-2_dVPYIA2Hg",
    ClientId: "3unf1vcousmgrugefl1m4j2sgt"
}
export default new CognitoUserPool(poolData)

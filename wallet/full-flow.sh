#!/bin/bash

set -e pipefail

# TODO parameterize the did:dht uri
ISSUER_DID=did:dht:pnrqiiogeadkx37s57kw9onczy3ra3cyyupjmrfizb4bgtbup16o

# resolve the did:dht for the IDV service endpoint
IDV_INITIATE_ENDPOINT=$(node 1-resolve-idv-service-endpoint.js $ISSUER_DID)

# request the SIOPv2 Auth Request (https://openid.github.io/SIOPv2/openid-connect-self-issued-v2-wg-draft.html#name-self-issued-openid-provider-a)
SIOPV2_REQUEST=$(node 2-request-siopv2-request.js $IDV_INITIATE_ENDPOINT)

# submit the SIOPv2 Auth Response (https://openid.github.io/SIOPv2/openid-connect-self-issued-v2-wg-draft.html#name-self-issued-openid-provider-au)
IDV_REQUEST=$(node 3-submit-siopv2-response.js "$SIOPV2_REQUEST")
IDV_FORM_URL=$(echo $IDV_REQUEST | jq -r '.url')
CREDENTIAL_OFFER=$(echo $IDV_REQUEST | jq -r '.credential_offer')

# simulate submitting the form PII data
node 4-simulate-idv-form-submission.js $IDV_FORM_URL

# fetch metadata
CREDENTIAL_ISSUSER_METADATA=$(node 5-fetch-credential-issuer-metadata.js "$CREDENTIAL_OFFER")
AUTH_SERVER_METADATA=$(node 6-fetch-authorization-server-metadata.js "$CREDENTIAL_OFFER")

# request access token
ACCESS_TOKEN_RESPONSE=$(node 7-request-access-token.js "$CREDENTIAL_OFFER" "$AUTH_SERVER_METADATA")

# request the credential
node 8-request-credential.js $ISSUER_DID "$CREDENTIAL_ISSUSER_METADATA" "$ACCESS_TOKEN_RESPONSE"
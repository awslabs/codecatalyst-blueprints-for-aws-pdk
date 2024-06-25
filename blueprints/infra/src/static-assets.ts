/*! Copyright [Amazon.com](http://amazon.com/), Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0 */
export const assets: { [filepath: string]: string } = {
  "packages/infra/main/test/__snapshots__/main.test.ts.snap": `// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[\`Snapshot 1\`] = \`
{
  "Mappings": {
    "LatestNodeRuntimeMap": {
      "af-south-1": {
        "value": "nodejs20.x",
      },
      "ap-east-1": {
        "value": "nodejs20.x",
      },
      "ap-northeast-1": {
        "value": "nodejs20.x",
      },
      "ap-northeast-2": {
        "value": "nodejs20.x",
      },
      "ap-northeast-3": {
        "value": "nodejs20.x",
      },
      "ap-south-1": {
        "value": "nodejs20.x",
      },
      "ap-south-2": {
        "value": "nodejs20.x",
      },
      "ap-southeast-1": {
        "value": "nodejs20.x",
      },
      "ap-southeast-2": {
        "value": "nodejs20.x",
      },
      "ap-southeast-3": {
        "value": "nodejs20.x",
      },
      "ap-southeast-4": {
        "value": "nodejs20.x",
      },
      "ca-central-1": {
        "value": "nodejs20.x",
      },
      "cn-north-1": {
        "value": "nodejs18.x",
      },
      "cn-northwest-1": {
        "value": "nodejs18.x",
      },
      "eu-central-1": {
        "value": "nodejs20.x",
      },
      "eu-central-2": {
        "value": "nodejs20.x",
      },
      "eu-north-1": {
        "value": "nodejs20.x",
      },
      "eu-south-1": {
        "value": "nodejs20.x",
      },
      "eu-south-2": {
        "value": "nodejs20.x",
      },
      "eu-west-1": {
        "value": "nodejs20.x",
      },
      "eu-west-2": {
        "value": "nodejs20.x",
      },
      "eu-west-3": {
        "value": "nodejs20.x",
      },
      "il-central-1": {
        "value": "nodejs20.x",
      },
      "me-central-1": {
        "value": "nodejs20.x",
      },
      "me-south-1": {
        "value": "nodejs20.x",
      },
      "sa-east-1": {
        "value": "nodejs20.x",
      },
      "us-east-1": {
        "value": "nodejs20.x",
      },
      "us-east-2": {
        "value": "nodejs20.x",
      },
      "us-gov-east-1": {
        "value": "nodejs18.x",
      },
      "us-gov-west-1": {
        "value": "nodejs18.x",
      },
      "us-iso-east-1": {
        "value": "nodejs18.x",
      },
      "us-iso-west-1": {
        "value": "nodejs18.x",
      },
      "us-isob-east-1": {
        "value": "nodejs18.x",
      },
      "us-west-1": {
        "value": "nodejs20.x",
      },
      "us-west-2": {
        "value": "nodejs20.x",
      },
    },
  },
  "Outputs": {
    "DefaultApiEndpointE84BC215": {
      "Value": {
        "Fn::Join": [
          "",
          [
            "https://",
            {
              "Ref": "DefaultApiA2AD717B",
            },
            ".execute-api.",
            {
              "Ref": "AWS::Region",
            },
            ".",
            {
              "Ref": "AWS::URLSuffix",
            },
            "/",
            {
              "Ref": "DefaultApiDeploymentStageprodA87ECEBF",
            },
            "/",
          ],
        ],
      },
    },
    "DefaultwebsiteDistributionDomainNameF59D56BF": {
      "Value": {
        "Fn::GetAtt": [
          "DefaultwebsiteCloudfrontDistributionA17FD839",
          "DomainName",
        ],
      },
    },
    "testUserIdentitytestUserIdentityIdentityPoolId0DCB76FF": {
      "Value": {
        "Ref": "testUserIdentityIdentityPoolBAEBB5D7",
      },
    },
    "testUserIdentitytestUserIdentityUserPoolId9CF290F0": {
      "Value": {
        "Ref": "testUserIdentityUserPoolB4EEB643",
      },
    },
  },
  "Parameters": {
    "BootstrapVersion": {
      "Default": "/cdk-bootstrap/hnb659fds/version",
      "Description": "Version of the CDK Bootstrap resources in this environment, automatically retrieved from SSM Parameter Store. [cdk:skip]",
      "Type": "AWS::SSM::Parameter::Value<String>",
    },
  },
  "Resources": {
    "CustomCDKBucketDeployment8693BB64968944B69AAFB0CC9EB8756C81C01536": {
      "DependsOn": [
        "CustomCDKBucketDeployment8693BB64968944B69AAFB0CC9EB8756CServiceRoleDefaultPolicy88902FDF",
        "CustomCDKBucketDeployment8693BB64968944B69AAFB0CC9EB8756CServiceRole89A01265",
      ],
      "Properties": {
        "Code": {
          "S3Bucket": {
            "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-\${AWS::Region}",
          },
          "S3Key": "2d56e153cac88d3e0c2f842e8e6f6783b8725bf91f95e0673b4725448a56e96d.zip",
        },
        "Environment": {
          "Variables": {
            "AWS_CA_BUNDLE": "/etc/pki/ca-trust/extracted/pem/tls-ca-bundle.pem",
          },
        },
        "Handler": "index.handler",
        "Layers": [
          {
            "Ref": "DefaultwebsiteWebsiteDeploymentAwsCliLayer5C4B3D9C",
          },
        ],
        "Role": {
          "Fn::GetAtt": [
            "CustomCDKBucketDeployment8693BB64968944B69AAFB0CC9EB8756CServiceRole89A01265",
            "Arn",
          ],
        },
        "Runtime": "python3.9",
        "Timeout": 900,
      },
      "Type": "AWS::Lambda::Function",
    },
    "CustomCDKBucketDeployment8693BB64968944B69AAFB0CC9EB8756CServiceRole89A01265": {
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Statement": [
            {
              "Action": "sts:AssumeRole",
              "Effect": "Allow",
              "Principal": {
                "Service": "lambda.amazonaws.com",
              },
            },
          ],
          "Version": "2012-10-17",
        },
        "ManagedPolicyArns": [
          {
            "Fn::Join": [
              "",
              [
                "arn:",
                {
                  "Ref": "AWS::Partition",
                },
                ":iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
              ],
            ],
          },
        ],
      },
      "Type": "AWS::IAM::Role",
    },
    "CustomCDKBucketDeployment8693BB64968944B69AAFB0CC9EB8756CServiceRoleDefaultPolicy88902FDF": {
      "Properties": {
        "PolicyDocument": {
          "Statement": [
            {
              "Action": [
                "s3:GetObject*",
                "s3:GetBucket*",
                "s3:List*",
              ],
              "Effect": "Allow",
              "Resource": [
                {
                  "Fn::Join": [
                    "",
                    [
                      "arn:",
                      {
                        "Ref": "AWS::Partition",
                      },
                      ":s3:::",
                      {
                        "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-\${AWS::Region}",
                      },
                    ],
                  ],
                },
                {
                  "Fn::Join": [
                    "",
                    [
                      "arn:",
                      {
                        "Ref": "AWS::Partition",
                      },
                      ":s3:::",
                      {
                        "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-\${AWS::Region}",
                      },
                      "/*",
                    ],
                  ],
                },
              ],
            },
            {
              "Action": [
                "s3:GetObject*",
                "s3:GetBucket*",
                "s3:List*",
                "s3:DeleteObject*",
                "s3:PutObject",
                "s3:PutObjectLegalHold",
                "s3:PutObjectRetention",
                "s3:PutObjectTagging",
                "s3:PutObjectVersionTagging",
                "s3:Abort*",
              ],
              "Effect": "Allow",
              "Resource": [
                {
                  "Fn::GetAtt": [
                    "DefaultwebsiteWebsiteBucketA2053FBA",
                    "Arn",
                  ],
                },
                {
                  "Fn::Join": [
                    "",
                    [
                      {
                        "Fn::GetAtt": [
                          "DefaultwebsiteWebsiteBucketA2053FBA",
                          "Arn",
                        ],
                      },
                      "/*",
                    ],
                  ],
                },
              ],
            },
            {
              "Action": [
                "cloudfront:GetInvalidation",
                "cloudfront:CreateInvalidation",
              ],
              "Effect": "Allow",
              "Resource": "*",
            },
          ],
          "Version": "2012-10-17",
        },
        "PolicyName": "CustomCDKBucketDeployment8693BB64968944B69AAFB0CC9EB8756CServiceRoleDefaultPolicy88902FDF",
        "Roles": [
          {
            "Ref": "CustomCDKBucketDeployment8693BB64968944B69AAFB0CC9EB8756CServiceRole89A01265",
          },
        ],
      },
      "Type": "AWS::IAM::Policy",
    },
    "CustomS3AutoDeleteObjectsCustomResourceProviderHandler9D90184F": {
      "DependsOn": [
        "CustomS3AutoDeleteObjectsCustomResourceProviderRole3B1BD092",
      ],
      "Properties": {
        "Code": {
          "S3Bucket": {
            "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-\${AWS::Region}",
          },
          "S3Key": "faa95a81ae7d7373f3e1f242268f904eb748d8d0fdd306e8a6fe515a1905a7d6.zip",
        },
        "Description": {
          "Fn::Join": [
            "",
            [
              "Lambda function for auto-deleting objects in ",
              {
                "Ref": "DefaultwebsiteAccessLogsBucket07831AFA",
              },
              " S3 bucket.",
            ],
          ],
        },
        "Handler": "index.handler",
        "MemorySize": 128,
        "Role": {
          "Fn::GetAtt": [
            "CustomS3AutoDeleteObjectsCustomResourceProviderRole3B1BD092",
            "Arn",
          ],
        },
        "Runtime": {
          "Fn::FindInMap": [
            "LatestNodeRuntimeMap",
            {
              "Ref": "AWS::Region",
            },
            "value",
          ],
        },
        "Timeout": 900,
      },
      "Type": "AWS::Lambda::Function",
    },
    "CustomS3AutoDeleteObjectsCustomResourceProviderRole3B1BD092": {
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Statement": [
            {
              "Action": "sts:AssumeRole",
              "Effect": "Allow",
              "Principal": {
                "Service": "lambda.amazonaws.com",
              },
            },
          ],
          "Version": "2012-10-17",
        },
        "ManagedPolicyArns": [
          {
            "Fn::Sub": "arn:\${AWS::Partition}:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
          },
        ],
      },
      "Type": "AWS::IAM::Role",
    },
    "DefaultApiA2AD717B": {
      "DependsOn": [
        "DefaultApiPrepareSpecCustomResourceCD26018D",
      ],
      "Metadata": {
        "cdk_nag": {
          "rules_to_suppress": [
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs$/g",
                },
              ],
              "id": "AwsSolutions-IAM4",
              "reason": "Cloudwatch Role requires access to create/read groups at the root level.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs$/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoManagedPolicies",
              "reason": "Cloudwatch Role requires access to create/read groups at the root level.",
            },
            {
              "id": "AwsSolutions-APIG2",
              "reason": "This construct implements fine grained validation via OpenApi.",
            },
            {
              "id": "AwsPrototyping-APIGWRequestValidation",
              "reason": "This construct implements fine grained validation via OpenApi.",
            },
          ],
        },
      },
      "Properties": {
        "BodyS3Location": {
          "Bucket": {
            "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-\${AWS::Region}",
          },
          "Key": {
            "Fn::GetAtt": [
              "DefaultApiPrepareSpecCustomResourceCD26018D",
              "outputSpecKey",
            ],
          },
        },
        "Name": "DefaultApi",
        "Policy": {
          "Statement": [
            {
              "Action": "execute-api:Invoke",
              "Effect": "Allow",
              "Principal": {
                "AWS": {
                  "Fn::Join": [
                    "",
                    [
                      "arn:",
                      {
                        "Ref": "AWS::Partition",
                      },
                      ":iam::",
                      {
                        "Ref": "AWS::AccountId",
                      },
                      ":root",
                    ],
                  ],
                },
              },
              "Resource": "execute-api:/*",
            },
            {
              "Action": "execute-api:Invoke",
              "Effect": "Allow",
              "Principal": {
                "AWS": "*",
              },
              "Resource": "execute-api:/*/OPTIONS/*",
            },
          ],
          "Version": "2012-10-17",
        },
      },
      "Type": "AWS::ApiGateway::RestApi",
    },
    "DefaultApiAccessLogs3452ABE8": {
      "DeletionPolicy": "Retain",
      "Metadata": {
        "cdk_nag": {
          "rules_to_suppress": [
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs$/g",
                },
              ],
              "id": "AwsSolutions-IAM4",
              "reason": "Cloudwatch Role requires access to create/read groups at the root level.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs$/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoManagedPolicies",
              "reason": "Cloudwatch Role requires access to create/read groups at the root level.",
            },
            {
              "id": "AwsSolutions-APIG2",
              "reason": "This construct implements fine grained validation via OpenApi.",
            },
            {
              "id": "AwsPrototyping-APIGWRequestValidation",
              "reason": "This construct implements fine grained validation via OpenApi.",
            },
          ],
        },
      },
      "Properties": {
        "RetentionInDays": 731,
      },
      "Type": "AWS::Logs::LogGroup",
      "UpdateReplacePolicy": "Retain",
    },
    "DefaultApiAccount1D2093F1": {
      "DeletionPolicy": "Retain",
      "DependsOn": [
        "DefaultApiA2AD717B",
        "DefaultApiPrepareSpecCustomResourceCD26018D",
      ],
      "Metadata": {
        "cdk_nag": {
          "rules_to_suppress": [
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs$/g",
                },
              ],
              "id": "AwsSolutions-IAM4",
              "reason": "Cloudwatch Role requires access to create/read groups at the root level.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs$/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoManagedPolicies",
              "reason": "Cloudwatch Role requires access to create/read groups at the root level.",
            },
            {
              "id": "AwsSolutions-APIG2",
              "reason": "This construct implements fine grained validation via OpenApi.",
            },
            {
              "id": "AwsPrototyping-APIGWRequestValidation",
              "reason": "This construct implements fine grained validation via OpenApi.",
            },
          ],
        },
      },
      "Properties": {
        "CloudWatchRoleArn": {
          "Fn::GetAtt": [
            "DefaultApiCloudWatchRole0B8F9545",
            "Arn",
          ],
        },
      },
      "Type": "AWS::ApiGateway::Account",
      "UpdateReplacePolicy": "Retain",
    },
    "DefaultApiCloudWatchRole0B8F9545": {
      "DeletionPolicy": "Retain",
      "DependsOn": [
        "DefaultApiPrepareSpecCustomResourceCD26018D",
      ],
      "Metadata": {
        "cdk_nag": {
          "rules_to_suppress": [
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs$/g",
                },
              ],
              "id": "AwsSolutions-IAM4",
              "reason": "Cloudwatch Role requires access to create/read groups at the root level.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs$/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoManagedPolicies",
              "reason": "Cloudwatch Role requires access to create/read groups at the root level.",
            },
            {
              "id": "AwsSolutions-APIG2",
              "reason": "This construct implements fine grained validation via OpenApi.",
            },
            {
              "id": "AwsPrototyping-APIGWRequestValidation",
              "reason": "This construct implements fine grained validation via OpenApi.",
            },
          ],
        },
      },
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Statement": [
            {
              "Action": "sts:AssumeRole",
              "Effect": "Allow",
              "Principal": {
                "Service": "apigateway.amazonaws.com",
              },
            },
          ],
          "Version": "2012-10-17",
        },
        "ManagedPolicyArns": [
          {
            "Fn::Join": [
              "",
              [
                "arn:",
                {
                  "Ref": "AWS::Partition",
                },
                ":iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs",
              ],
            ],
          },
        ],
      },
      "Type": "AWS::IAM::Role",
      "UpdateReplacePolicy": "Retain",
    },
    "DefaultApiDefaultApiAclApiWebACLCBBF4B40": {
      "Metadata": {
        "cdk_nag": {
          "rules_to_suppress": [
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs$/g",
                },
              ],
              "id": "AwsSolutions-IAM4",
              "reason": "Cloudwatch Role requires access to create/read groups at the root level.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs$/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoManagedPolicies",
              "reason": "Cloudwatch Role requires access to create/read groups at the root level.",
            },
            {
              "id": "AwsSolutions-APIG2",
              "reason": "This construct implements fine grained validation via OpenApi.",
            },
            {
              "id": "AwsPrototyping-APIGWRequestValidation",
              "reason": "This construct implements fine grained validation via OpenApi.",
            },
          ],
        },
      },
      "Properties": {
        "DefaultAction": {
          "Allow": {},
        },
        "Name": "test-DefaultApi-Acl-c84ede96",
        "Rules": [
          {
            "Name": "AWS-AWSManagedRulesCommonRuleSet",
            "OverrideAction": {
              "None": {},
            },
            "Priority": 2,
            "Statement": {
              "ManagedRuleGroupStatement": {
                "Name": "AWSManagedRulesCommonRuleSet",
                "VendorName": "AWS",
              },
            },
            "VisibilityConfig": {
              "CloudWatchMetricsEnabled": true,
              "MetricName": "test-DefaultApi-Acl-c84ede96-AWS-AWSManagedRulesCommonRuleSet",
              "SampledRequestsEnabled": true,
            },
          },
        ],
        "Scope": "REGIONAL",
        "VisibilityConfig": {
          "CloudWatchMetricsEnabled": true,
          "MetricName": "test-DefaultApi-Acl-c84ede96",
          "SampledRequestsEnabled": true,
        },
      },
      "Type": "AWS::WAFv2::WebACL",
    },
    "DefaultApiDefaultApiAclWebACLAssociation6A1340F7": {
      "Metadata": {
        "cdk_nag": {
          "rules_to_suppress": [
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs$/g",
                },
              ],
              "id": "AwsSolutions-IAM4",
              "reason": "Cloudwatch Role requires access to create/read groups at the root level.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs$/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoManagedPolicies",
              "reason": "Cloudwatch Role requires access to create/read groups at the root level.",
            },
            {
              "id": "AwsSolutions-APIG2",
              "reason": "This construct implements fine grained validation via OpenApi.",
            },
            {
              "id": "AwsPrototyping-APIGWRequestValidation",
              "reason": "This construct implements fine grained validation via OpenApi.",
            },
          ],
        },
      },
      "Properties": {
        "ResourceArn": {
          "Fn::Join": [
            "",
            [
              "arn:",
              {
                "Ref": "AWS::Partition",
              },
              ":apigateway:",
              {
                "Ref": "AWS::Region",
              },
              "::/restapis/",
              {
                "Ref": "DefaultApiA2AD717B",
              },
              "/stages/",
              {
                "Ref": "DefaultApiDeploymentStageprodA87ECEBF",
              },
            ],
          ],
        },
        "WebACLArn": {
          "Fn::GetAtt": [
            "DefaultApiDefaultApiAclApiWebACLCBBF4B40",
            "Arn",
          ],
        },
      },
      "Type": "AWS::WAFv2::WebACLAssociation",
    },
    "DefaultApiDeployment7F82433Efa6a1b7d6281d7e9d0b7fa08c9c26a87": {
      "DependsOn": [
        "DefaultApiPrepareSpecCustomResourceCD26018D",
      ],
      "Metadata": {
        "cdk_nag": {
          "rules_to_suppress": [
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs$/g",
                },
              ],
              "id": "AwsSolutions-IAM4",
              "reason": "Cloudwatch Role requires access to create/read groups at the root level.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs$/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoManagedPolicies",
              "reason": "Cloudwatch Role requires access to create/read groups at the root level.",
            },
            {
              "id": "AwsSolutions-APIG2",
              "reason": "This construct implements fine grained validation via OpenApi.",
            },
            {
              "id": "AwsPrototyping-APIGWRequestValidation",
              "reason": "This construct implements fine grained validation via OpenApi.",
            },
          ],
        },
      },
      "Properties": {
        "Description": "Automatically created by the RestApi construct",
        "RestApiId": {
          "Ref": "DefaultApiA2AD717B",
        },
      },
      "Type": "AWS::ApiGateway::Deployment",
    },
    "DefaultApiDeploymentStageprodA87ECEBF": {
      "DependsOn": [
        "DefaultApiAccount1D2093F1",
        "DefaultApiPrepareSpecCustomResourceCD26018D",
      ],
      "Metadata": {
        "cdk_nag": {
          "rules_to_suppress": [
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs$/g",
                },
              ],
              "id": "AwsSolutions-IAM4",
              "reason": "Cloudwatch Role requires access to create/read groups at the root level.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs$/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoManagedPolicies",
              "reason": "Cloudwatch Role requires access to create/read groups at the root level.",
            },
            {
              "id": "AwsSolutions-APIG2",
              "reason": "This construct implements fine grained validation via OpenApi.",
            },
            {
              "id": "AwsPrototyping-APIGWRequestValidation",
              "reason": "This construct implements fine grained validation via OpenApi.",
            },
          ],
        },
      },
      "Properties": {
        "AccessLogSetting": {
          "DestinationArn": {
            "Fn::GetAtt": [
              "DefaultApiAccessLogs3452ABE8",
              "Arn",
            ],
          },
          "Format": "$context.identity.sourceIp $context.identity.caller $context.identity.user [$context.requestTime] "$context.httpMethod $context.resourcePath $context.protocol" $context.status $context.responseLength $context.requestId",
        },
        "DeploymentId": {
          "Ref": "DefaultApiDeployment7F82433Efa6a1b7d6281d7e9d0b7fa08c9c26a87",
        },
        "MethodSettings": [
          {
            "DataTraceEnabled": false,
            "HttpMethod": "*",
            "LoggingLevel": "INFO",
            "ResourcePath": "/*",
          },
        ],
        "RestApiId": {
          "Ref": "DefaultApiA2AD717B",
        },
        "StageName": "prod",
      },
      "Type": "AWS::ApiGateway::Stage",
    },
    "DefaultApiPrepareSpecCustomResourceCD26018D": {
      "DeletionPolicy": "Delete",
      "Metadata": {
        "cdk_nag": {
          "rules_to_suppress": [
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs$/g",
                },
              ],
              "id": "AwsSolutions-IAM4",
              "reason": "Cloudwatch Role requires access to create/read groups at the root level.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs$/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoManagedPolicies",
              "reason": "Cloudwatch Role requires access to create/read groups at the root level.",
            },
            {
              "id": "AwsSolutions-APIG2",
              "reason": "This construct implements fine grained validation via OpenApi.",
            },
            {
              "id": "AwsPrototyping-APIGWRequestValidation",
              "reason": "This construct implements fine grained validation via OpenApi.",
            },
          ],
        },
      },
      "Properties": {
        "ServiceToken": {
          "Fn::GetAtt": [
            "DefaultApiPrepareSpecProviderframeworkonEvent9F290643",
            "Arn",
          ],
        },
        "corsOptions": {
          "allowHeaders": [
            "Content-Type",
            "X-Amz-Date",
            "Authorization",
            "X-Api-Key",
            "X-Amz-Security-Token",
            "X-Amz-User-Agent",
            "x-amz-content-sha256",
          ],
          "allowMethods": [
            "OPTIONS",
            "GET",
            "PUT",
            "POST",
            "DELETE",
            "PATCH",
            "HEAD",
          ],
          "allowOrigins": [
            "*",
          ],
          "statusCode": 204,
        },
        "defaultAuthorizerReference": {
          "authorizerId": "aws.auth.sigv4",
        },
        "inputSpecLocation": {
          "bucket": {
            "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-\${AWS::Region}",
          },
          "key": "fd4e4469d78599c183988ca80d3cc183dca98b49aff0840fcf4140cebec9cacd.json",
        },
        "integrations": {
          "sayHello": {
            "integration": {
              "requestTemplates": {
                "application/json": "{"statusCode": 200}",
              },
              "responses": {
                "default": {
                  "responseParameters": {
                    "method.response.header.Access-Control-Allow-Headers": "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent,x-amz-content-sha256'",
                    "method.response.header.Access-Control-Allow-Methods": "'OPTIONS,GET,PUT,POST,DELETE,PATCH,HEAD'",
                    "method.response.header.Access-Control-Allow-Origin": "'*'",
                  },
                  "responseTemplates": {
                    "application/json": "{
  "message": "cedo laborum articulus"
}",
                  },
                  "statusCode": "200",
                },
              },
              "type": "MOCK",
            },
          },
        },
        "operationLookup": {
          "sayHello": {
            "contentTypes": [
              "application/json",
            ],
            "method": "GET",
            "path": "/hello",
          },
        },
        "outputSpecLocation": {
          "bucket": {
            "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-\${AWS::Region}",
          },
          "key": "fd4e4469d78599c183988ca80d3cc183dca98b49aff0840fcf4140cebec9cacd.json-prepared",
        },
        "securitySchemes": {
          "aws.auth.sigv4": {
            "in": "header",
            "name": "Authorization",
            "type": "apiKey",
            "x-amazon-apigateway-authtype": "awsSigv4",
          },
        },
      },
      "Type": "AWS::CloudFormation::CustomResource",
      "UpdateReplacePolicy": "Delete",
    },
    "DefaultApiPrepareSpecHandler6A2CD82D": {
      "DependsOn": [
        "DefaultApiPrepareSpecRoleE641F043",
      ],
      "Metadata": {
        "cdk_nag": {
          "rules_to_suppress": [
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs$/g",
                },
              ],
              "id": "AwsSolutions-IAM4",
              "reason": "Cloudwatch Role requires access to create/read groups at the root level.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs$/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoManagedPolicies",
              "reason": "Cloudwatch Role requires access to create/read groups at the root level.",
            },
            {
              "id": "AwsSolutions-APIG2",
              "reason": "This construct implements fine grained validation via OpenApi.",
            },
            {
              "id": "AwsPrototyping-APIGWRequestValidation",
              "reason": "This construct implements fine grained validation via OpenApi.",
            },
          ],
        },
      },
      "Properties": {
        "Code": {
          "S3Bucket": {
            "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-\${AWS::Region}",
          },
          "S3Key": "ba12dcde6c81683acb464c36ad9b89d05fcd1e69a429ac6f69e123052d4d5b6d.zip",
        },
        "FunctionName": "test-D6861293PrepSpec",
        "Handler": "index.handler",
        "Role": {
          "Fn::GetAtt": [
            "DefaultApiPrepareSpecRoleE641F043",
            "Arn",
          ],
        },
        "Runtime": "nodejs18.x",
        "Timeout": 30,
      },
      "Type": "AWS::Lambda::Function",
    },
    "DefaultApiPrepareSpecProviderRole0BE3C562": {
      "Metadata": {
        "cdk_nag": {
          "rules_to_suppress": [
            {
              "id": "AwsSolutions-IAM5",
              "reason": "Cloudwatch resources have been scoped down to the LogGroup level, however * is still needed as stream names are created just in time.",
            },
            {
              "id": "AwsPrototyping-IAMNoWildcardPermissions",
              "reason": "Cloudwatch resources have been scoped down to the LogGroup level, however * is still needed as stream names are created just in time.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs$/g",
                },
              ],
              "id": "AwsSolutions-IAM4",
              "reason": "Cloudwatch Role requires access to create/read groups at the root level.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs$/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoManagedPolicies",
              "reason": "Cloudwatch Role requires access to create/read groups at the root level.",
            },
            {
              "id": "AwsSolutions-APIG2",
              "reason": "This construct implements fine grained validation via OpenApi.",
            },
            {
              "id": "AwsPrototyping-APIGWRequestValidation",
              "reason": "This construct implements fine grained validation via OpenApi.",
            },
          ],
        },
      },
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Statement": [
            {
              "Action": "sts:AssumeRole",
              "Effect": "Allow",
              "Principal": {
                "Service": "lambda.amazonaws.com",
              },
            },
          ],
          "Version": "2012-10-17",
        },
        "Policies": [
          {
            "PolicyDocument": {
              "Statement": [
                {
                  "Action": [
                    "logs:CreateLogGroup",
                    "logs:CreateLogStream",
                    "logs:PutLogEvents",
                  ],
                  "Effect": "Allow",
                  "Resource": [
                    {
                      "Fn::Join": [
                        "",
                        [
                          "arn:aws:logs:",
                          {
                            "Ref": "AWS::Region",
                          },
                          ":",
                          {
                            "Ref": "AWS::AccountId",
                          },
                          ":log-group:/aws/lambda/test-D6861293PrepSpecProvider",
                        ],
                      ],
                    },
                    {
                      "Fn::Join": [
                        "",
                        [
                          "arn:aws:logs:",
                          {
                            "Ref": "AWS::Region",
                          },
                          ":",
                          {
                            "Ref": "AWS::AccountId",
                          },
                          ":log-group:/aws/lambda/test-D6861293PrepSpecProvider:*",
                        ],
                      ],
                    },
                  ],
                },
              ],
              "Version": "2012-10-17",
            },
            "PolicyName": "logs",
          },
        ],
      },
      "Type": "AWS::IAM::Role",
    },
    "DefaultApiPrepareSpecProviderRoleDefaultPolicy8873140C": {
      "Metadata": {
        "cdk_nag": {
          "rules_to_suppress": [
            {
              "id": "AwsSolutions-IAM5",
              "reason": "Cloudwatch resources have been scoped down to the LogGroup level, however * is still needed as stream names are created just in time.",
            },
            {
              "id": "AwsPrototyping-IAMNoWildcardPermissions",
              "reason": "Cloudwatch resources have been scoped down to the LogGroup level, however * is still needed as stream names are created just in time.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs$/g",
                },
              ],
              "id": "AwsSolutions-IAM4",
              "reason": "Cloudwatch Role requires access to create/read groups at the root level.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs$/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoManagedPolicies",
              "reason": "Cloudwatch Role requires access to create/read groups at the root level.",
            },
            {
              "id": "AwsSolutions-APIG2",
              "reason": "This construct implements fine grained validation via OpenApi.",
            },
            {
              "id": "AwsPrototyping-APIGWRequestValidation",
              "reason": "This construct implements fine grained validation via OpenApi.",
            },
          ],
        },
      },
      "Properties": {
        "PolicyDocument": {
          "Statement": [
            {
              "Action": "lambda:InvokeFunction",
              "Effect": "Allow",
              "Resource": [
                {
                  "Fn::GetAtt": [
                    "DefaultApiPrepareSpecHandler6A2CD82D",
                    "Arn",
                  ],
                },
                {
                  "Fn::Join": [
                    "",
                    [
                      {
                        "Fn::GetAtt": [
                          "DefaultApiPrepareSpecHandler6A2CD82D",
                          "Arn",
                        ],
                      },
                      ":*",
                    ],
                  ],
                },
              ],
            },
          ],
          "Version": "2012-10-17",
        },
        "PolicyName": "DefaultApiPrepareSpecProviderRoleDefaultPolicy8873140C",
        "Roles": [
          {
            "Ref": "DefaultApiPrepareSpecProviderRole0BE3C562",
          },
        ],
      },
      "Type": "AWS::IAM::Policy",
    },
    "DefaultApiPrepareSpecProviderframeworkonEvent9F290643": {
      "DependsOn": [
        "DefaultApiPrepareSpecProviderRoleDefaultPolicy8873140C",
        "DefaultApiPrepareSpecProviderRole0BE3C562",
      ],
      "Metadata": {
        "cdk_nag": {
          "rules_to_suppress": [
            {
              "id": "AwsSolutions-L1",
              "reason": "Latest runtime cannot be configured. CDK will need to upgrade the Provider construct accordingly.",
            },
            {
              "id": "AwsPrototyping-LambdaLatestVersion",
              "reason": "Latest runtime cannot be configured. CDK will need to upgrade the Provider construct accordingly.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs$/g",
                },
              ],
              "id": "AwsSolutions-IAM4",
              "reason": "Cloudwatch Role requires access to create/read groups at the root level.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs$/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoManagedPolicies",
              "reason": "Cloudwatch Role requires access to create/read groups at the root level.",
            },
            {
              "id": "AwsSolutions-APIG2",
              "reason": "This construct implements fine grained validation via OpenApi.",
            },
            {
              "id": "AwsPrototyping-APIGWRequestValidation",
              "reason": "This construct implements fine grained validation via OpenApi.",
            },
          ],
        },
      },
      "Properties": {
        "Code": {
          "S3Bucket": {
            "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-\${AWS::Region}",
          },
          "S3Key": "3542be390685e0c8353d92ccb5796d343cd93ca946b6b0de798004206a199adc.zip",
        },
        "Description": "AWS CDK resource provider framework - onEvent (test/DefaultApi/DefaultApi/PrepareSpecProvider)",
        "Environment": {
          "Variables": {
            "USER_ON_EVENT_FUNCTION_ARN": {
              "Fn::GetAtt": [
                "DefaultApiPrepareSpecHandler6A2CD82D",
                "Arn",
              ],
            },
          },
        },
        "FunctionName": "test-D6861293PrepSpecProvider",
        "Handler": "framework.onEvent",
        "Role": {
          "Fn::GetAtt": [
            "DefaultApiPrepareSpecProviderRole0BE3C562",
            "Arn",
          ],
        },
        "Runtime": {
          "Fn::FindInMap": [
            "LatestNodeRuntimeMap",
            {
              "Ref": "AWS::Region",
            },
            "value",
          ],
        },
        "Timeout": 900,
      },
      "Type": "AWS::Lambda::Function",
    },
    "DefaultApiPrepareSpecRoleE641F043": {
      "Metadata": {
        "cdk_nag": {
          "rules_to_suppress": [
            {
              "applies_to": [
                {
                  "regex": "/^Resource::arn:aws:logs:<AWS::Region>:<AWS::AccountId>:log-group:/aws/lambda/test-D6861293PrepSpec:*/g",
                },
              ],
              "id": "AwsSolutions-IAM5",
              "reason": "Cloudwatch resources have been scoped down to the LogGroup level, however * is still needed as stream names are created just in time.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Resource::arn:<AWS::Partition>:s3:.*/fd4e4469d78599c183988ca80d3cc183dca98b49aff0840fcf4140cebec9cacd.json-prepared/*/g",
                },
              ],
              "id": "AwsSolutions-IAM5",
              "reason": "S3 resources have been scoped down to the appropriate prefix in the CDK asset bucket, however * is still needed as since the prepared spec hash is not known until deploy time.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Resource::arn:aws:logs:<AWS::Region>:<AWS::AccountId>:log-group:/aws/lambda/test-D6861293PrepSpec:*/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoWildcardPermissions",
              "reason": "Cloudwatch resources have been scoped down to the LogGroup level, however * is still needed as stream names are created just in time.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Resource::arn:<AWS::Partition>:s3:.*/fd4e4469d78599c183988ca80d3cc183dca98b49aff0840fcf4140cebec9cacd.json-prepared/*/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoWildcardPermissions",
              "reason": "S3 resources have been scoped down to the appropriate prefix in the CDK asset bucket, however * is still needed as since the prepared spec hash is not known until deploy time.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs$/g",
                },
              ],
              "id": "AwsSolutions-IAM4",
              "reason": "Cloudwatch Role requires access to create/read groups at the root level.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs$/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoManagedPolicies",
              "reason": "Cloudwatch Role requires access to create/read groups at the root level.",
            },
            {
              "id": "AwsSolutions-APIG2",
              "reason": "This construct implements fine grained validation via OpenApi.",
            },
            {
              "id": "AwsPrototyping-APIGWRequestValidation",
              "reason": "This construct implements fine grained validation via OpenApi.",
            },
          ],
        },
      },
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Statement": [
            {
              "Action": "sts:AssumeRole",
              "Effect": "Allow",
              "Principal": {
                "Service": "lambda.amazonaws.com",
              },
            },
          ],
          "Version": "2012-10-17",
        },
        "Policies": [
          {
            "PolicyDocument": {
              "Statement": [
                {
                  "Action": [
                    "logs:CreateLogGroup",
                    "logs:CreateLogStream",
                    "logs:PutLogEvents",
                  ],
                  "Effect": "Allow",
                  "Resource": [
                    {
                      "Fn::Join": [
                        "",
                        [
                          "arn:aws:logs:",
                          {
                            "Ref": "AWS::Region",
                          },
                          ":",
                          {
                            "Ref": "AWS::AccountId",
                          },
                          ":log-group:/aws/lambda/test-D6861293PrepSpec",
                        ],
                      ],
                    },
                    {
                      "Fn::Join": [
                        "",
                        [
                          "arn:aws:logs:",
                          {
                            "Ref": "AWS::Region",
                          },
                          ":",
                          {
                            "Ref": "AWS::AccountId",
                          },
                          ":log-group:/aws/lambda/test-D6861293PrepSpec:*",
                        ],
                      ],
                    },
                  ],
                },
              ],
              "Version": "2012-10-17",
            },
            "PolicyName": "logs",
          },
          {
            "PolicyDocument": {
              "Statement": [
                {
                  "Action": "s3:getObject",
                  "Effect": "Allow",
                  "Resource": {
                    "Fn::Join": [
                      "",
                      [
                        "arn:",
                        {
                          "Ref": "AWS::Partition",
                        },
                        ":s3:::",
                        {
                          "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-\${AWS::Region}",
                        },
                        "/fd4e4469d78599c183988ca80d3cc183dca98b49aff0840fcf4140cebec9cacd.json",
                      ],
                    ],
                  },
                },
                {
                  "Action": "s3:putObject",
                  "Effect": "Allow",
                  "Resource": {
                    "Fn::Join": [
                      "",
                      [
                        "arn:",
                        {
                          "Ref": "AWS::Partition",
                        },
                        ":s3:::",
                        {
                          "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-\${AWS::Region}",
                        },
                        "/fd4e4469d78599c183988ca80d3cc183dca98b49aff0840fcf4140cebec9cacd.json-prepared/*",
                      ],
                    ],
                  },
                },
              ],
              "Version": "2012-10-17",
            },
            "PolicyName": "s3",
          },
        ],
      },
      "Type": "AWS::IAM::Role",
    },
    "DefaultwebsiteAccessLogsBucket07831AFA": {
      "DeletionPolicy": "Delete",
      "Metadata": {
        "cdk_nag": {
          "rules_to_suppress": [
            {
              "id": "AwsSolutions-L1",
              "reason": "Latest runtime cannot be configured. CDK will need to upgrade the BucketDeployment construct accordingly.",
            },
            {
              "id": "AwsPrototyping-LambdaLatestVersion",
              "reason": "Latest runtime cannot be configured. CDK will need to upgrade the BucketDeployment construct accordingly.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Action::s3:.*$/g",
                },
                {
                  "regex": "/^Resource::.*$/g",
                },
              ],
              "id": "AwsSolutions-IAM5",
              "reason": "All Policies have been scoped to a Bucket. Given Buckets can contain arbitrary content, wildcard resources with bucket scope are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Action::s3:.*$/g",
                },
                {
                  "regex": "/^Resource::.*$/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoWildcardPermissions",
              "reason": "All Policies have been scoped to a Bucket. Given Buckets can contain arbitrary content, wildcard resources with bucket scope are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole$/g",
                },
              ],
              "id": "AwsSolutions-IAM4",
              "reason": "Buckets can contain arbitrary content, therefore wildcard resources under a bucket are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole$/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoManagedPolicies",
              "reason": "Buckets can contain arbitrary content, therefore wildcard resources under a bucket are required.",
            },
            {
              "id": "AwsSolutions-S1",
              "reason": "Access Log buckets should not have s3 bucket logging",
            },
            {
              "id": "AwsPrototyping-S3BucketLoggingEnabled",
              "reason": "Access Log buckets should not have s3 bucket logging",
            },
            {
              "id": "AwsPrototyping-CloudFrontDistributionGeoRestrictions",
              "reason": "Suppressed to allow unrestricted access. Not recommended in production.",
            },
          ],
        },
      },
      "Properties": {
        "BucketEncryption": {
          "ServerSideEncryptionConfiguration": [
            {
              "ServerSideEncryptionByDefault": {
                "SSEAlgorithm": "AES256",
              },
            },
          ],
        },
        "OwnershipControls": {
          "Rules": [
            {
              "ObjectOwnership": "ObjectWriter",
            },
          ],
        },
        "PublicAccessBlockConfiguration": {
          "BlockPublicAcls": true,
          "BlockPublicPolicy": true,
          "IgnorePublicAcls": true,
          "RestrictPublicBuckets": true,
        },
        "Tags": [
          {
            "Key": "aws-cdk:auto-delete-objects",
            "Value": "true",
          },
        ],
      },
      "Type": "AWS::S3::Bucket",
      "UpdateReplacePolicy": "Delete",
    },
    "DefaultwebsiteAccessLogsBucketAutoDeleteObjectsCustomResourceB5532938": {
      "DeletionPolicy": "Delete",
      "DependsOn": [
        "DefaultwebsiteAccessLogsBucketPolicy9922C894",
      ],
      "Metadata": {
        "cdk_nag": {
          "rules_to_suppress": [
            {
              "id": "AwsSolutions-L1",
              "reason": "Latest runtime cannot be configured. CDK will need to upgrade the BucketDeployment construct accordingly.",
            },
            {
              "id": "AwsPrototyping-LambdaLatestVersion",
              "reason": "Latest runtime cannot be configured. CDK will need to upgrade the BucketDeployment construct accordingly.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Action::s3:.*$/g",
                },
                {
                  "regex": "/^Resource::.*$/g",
                },
              ],
              "id": "AwsSolutions-IAM5",
              "reason": "All Policies have been scoped to a Bucket. Given Buckets can contain arbitrary content, wildcard resources with bucket scope are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Action::s3:.*$/g",
                },
                {
                  "regex": "/^Resource::.*$/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoWildcardPermissions",
              "reason": "All Policies have been scoped to a Bucket. Given Buckets can contain arbitrary content, wildcard resources with bucket scope are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole$/g",
                },
              ],
              "id": "AwsSolutions-IAM4",
              "reason": "Buckets can contain arbitrary content, therefore wildcard resources under a bucket are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole$/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoManagedPolicies",
              "reason": "Buckets can contain arbitrary content, therefore wildcard resources under a bucket are required.",
            },
            {
              "id": "AwsSolutions-S1",
              "reason": "Access Log buckets should not have s3 bucket logging",
            },
            {
              "id": "AwsPrototyping-S3BucketLoggingEnabled",
              "reason": "Access Log buckets should not have s3 bucket logging",
            },
            {
              "id": "AwsPrototyping-CloudFrontDistributionGeoRestrictions",
              "reason": "Suppressed to allow unrestricted access. Not recommended in production.",
            },
          ],
        },
      },
      "Properties": {
        "BucketName": {
          "Ref": "DefaultwebsiteAccessLogsBucket07831AFA",
        },
        "ServiceToken": {
          "Fn::GetAtt": [
            "CustomS3AutoDeleteObjectsCustomResourceProviderHandler9D90184F",
            "Arn",
          ],
        },
      },
      "Type": "Custom::S3AutoDeleteObjects",
      "UpdateReplacePolicy": "Delete",
    },
    "DefaultwebsiteAccessLogsBucketPolicy9922C894": {
      "Metadata": {
        "cdk_nag": {
          "rules_to_suppress": [
            {
              "id": "AwsSolutions-L1",
              "reason": "Latest runtime cannot be configured. CDK will need to upgrade the BucketDeployment construct accordingly.",
            },
            {
              "id": "AwsPrototyping-LambdaLatestVersion",
              "reason": "Latest runtime cannot be configured. CDK will need to upgrade the BucketDeployment construct accordingly.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Action::s3:.*$/g",
                },
                {
                  "regex": "/^Resource::.*$/g",
                },
              ],
              "id": "AwsSolutions-IAM5",
              "reason": "All Policies have been scoped to a Bucket. Given Buckets can contain arbitrary content, wildcard resources with bucket scope are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Action::s3:.*$/g",
                },
                {
                  "regex": "/^Resource::.*$/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoWildcardPermissions",
              "reason": "All Policies have been scoped to a Bucket. Given Buckets can contain arbitrary content, wildcard resources with bucket scope are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole$/g",
                },
              ],
              "id": "AwsSolutions-IAM4",
              "reason": "Buckets can contain arbitrary content, therefore wildcard resources under a bucket are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole$/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoManagedPolicies",
              "reason": "Buckets can contain arbitrary content, therefore wildcard resources under a bucket are required.",
            },
            {
              "id": "AwsSolutions-S1",
              "reason": "Access Log buckets should not have s3 bucket logging",
            },
            {
              "id": "AwsPrototyping-S3BucketLoggingEnabled",
              "reason": "Access Log buckets should not have s3 bucket logging",
            },
            {
              "id": "AwsPrototyping-CloudFrontDistributionGeoRestrictions",
              "reason": "Suppressed to allow unrestricted access. Not recommended in production.",
            },
          ],
        },
      },
      "Properties": {
        "Bucket": {
          "Ref": "DefaultwebsiteAccessLogsBucket07831AFA",
        },
        "PolicyDocument": {
          "Statement": [
            {
              "Action": "s3:*",
              "Condition": {
                "Bool": {
                  "aws:SecureTransport": "false",
                },
              },
              "Effect": "Deny",
              "Principal": {
                "AWS": "*",
              },
              "Resource": [
                {
                  "Fn::GetAtt": [
                    "DefaultwebsiteAccessLogsBucket07831AFA",
                    "Arn",
                  ],
                },
                {
                  "Fn::Join": [
                    "",
                    [
                      {
                        "Fn::GetAtt": [
                          "DefaultwebsiteAccessLogsBucket07831AFA",
                          "Arn",
                        ],
                      },
                      "/*",
                    ],
                  ],
                },
              ],
            },
            {
              "Action": [
                "s3:PutBucketPolicy",
                "s3:GetBucket*",
                "s3:List*",
                "s3:DeleteObject*",
              ],
              "Effect": "Allow",
              "Principal": {
                "AWS": {
                  "Fn::GetAtt": [
                    "CustomS3AutoDeleteObjectsCustomResourceProviderRole3B1BD092",
                    "Arn",
                  ],
                },
              },
              "Resource": [
                {
                  "Fn::GetAtt": [
                    "DefaultwebsiteAccessLogsBucket07831AFA",
                    "Arn",
                  ],
                },
                {
                  "Fn::Join": [
                    "",
                    [
                      {
                        "Fn::GetAtt": [
                          "DefaultwebsiteAccessLogsBucket07831AFA",
                          "Arn",
                        ],
                      },
                      "/*",
                    ],
                  ],
                },
              ],
            },
            {
              "Action": "s3:PutObject",
              "Condition": {
                "ArnLike": {
                  "aws:SourceArn": {
                    "Fn::GetAtt": [
                      "DefaultwebsiteWebsiteBucketA2053FBA",
                      "Arn",
                    ],
                  },
                },
                "StringEquals": {
                  "aws:SourceAccount": {
                    "Ref": "AWS::AccountId",
                  },
                },
              },
              "Effect": "Allow",
              "Principal": {
                "Service": "logging.s3.amazonaws.com",
              },
              "Resource": {
                "Fn::Join": [
                  "",
                  [
                    {
                      "Fn::GetAtt": [
                        "DefaultwebsiteAccessLogsBucket07831AFA",
                        "Arn",
                      ],
                    },
                    "/website-access-logs*",
                  ],
                ],
              },
            },
            {
              "Action": "s3:PutObject",
              "Condition": {
                "ArnLike": {
                  "aws:SourceArn": {
                    "Fn::GetAtt": [
                      "DefaultwebsiteDistributionLogBucketC3F8697B",
                      "Arn",
                    ],
                  },
                },
                "StringEquals": {
                  "aws:SourceAccount": {
                    "Ref": "AWS::AccountId",
                  },
                },
              },
              "Effect": "Allow",
              "Principal": {
                "Service": "logging.s3.amazonaws.com",
              },
              "Resource": {
                "Fn::Join": [
                  "",
                  [
                    {
                      "Fn::GetAtt": [
                        "DefaultwebsiteAccessLogsBucket07831AFA",
                        "Arn",
                      ],
                    },
                    "/distribution-access-logs*",
                  ],
                ],
              },
            },
          ],
          "Version": "2012-10-17",
        },
      },
      "Type": "AWS::S3::BucketPolicy",
    },
    "DefaultwebsiteCloudfrontDistributionA17FD839": {
      "Metadata": {
        "cdk_nag": {
          "rules_to_suppress": [
            {
              "id": "AwsSolutions-CFR4",
              "reason": "Certificate is not mandatory therefore the Cloudfront certificate will be used.",
            },
            {
              "id": "AwsPrototyping-CloudFrontDistributionHttpsViewerNoOutdatedSSL",
              "reason": "Certificate is not mandatory therefore the Cloudfront certificate will be used.",
            },
            {
              "id": "AwsSolutions-L1",
              "reason": "Latest runtime cannot be configured. CDK will need to upgrade the BucketDeployment construct accordingly.",
            },
            {
              "id": "AwsPrototyping-LambdaLatestVersion",
              "reason": "Latest runtime cannot be configured. CDK will need to upgrade the BucketDeployment construct accordingly.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Action::s3:.*$/g",
                },
                {
                  "regex": "/^Resource::.*$/g",
                },
              ],
              "id": "AwsSolutions-IAM5",
              "reason": "All Policies have been scoped to a Bucket. Given Buckets can contain arbitrary content, wildcard resources with bucket scope are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Action::s3:.*$/g",
                },
                {
                  "regex": "/^Resource::.*$/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoWildcardPermissions",
              "reason": "All Policies have been scoped to a Bucket. Given Buckets can contain arbitrary content, wildcard resources with bucket scope are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole$/g",
                },
              ],
              "id": "AwsSolutions-IAM4",
              "reason": "Buckets can contain arbitrary content, therefore wildcard resources under a bucket are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole$/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoManagedPolicies",
              "reason": "Buckets can contain arbitrary content, therefore wildcard resources under a bucket are required.",
            },
            {
              "id": "AwsSolutions-S1",
              "reason": "Access Log buckets should not have s3 bucket logging",
            },
            {
              "id": "AwsPrototyping-S3BucketLoggingEnabled",
              "reason": "Access Log buckets should not have s3 bucket logging",
            },
            {
              "id": "AwsPrototyping-CloudFrontDistributionGeoRestrictions",
              "reason": "Suppressed to allow unrestricted access. Not recommended in production.",
            },
          ],
        },
      },
      "Properties": {
        "DistributionConfig": {
          "CustomErrorResponses": [
            {
              "ErrorCode": 404,
              "ResponseCode": 200,
              "ResponsePagePath": "/index.html",
            },
          ],
          "DefaultCacheBehavior": {
            "CachePolicyId": "658327ea-f89d-4fab-a63d-7e88639e58f6",
            "Compress": true,
            "TargetOriginId": "testDefaultwebsiteCloudfrontDistributionOrigin1E8DEFFFA",
            "ViewerProtocolPolicy": "redirect-to-https",
          },
          "DefaultRootObject": "index.html",
          "Enabled": true,
          "HttpVersion": "http2",
          "IPV6Enabled": true,
          "Logging": {
            "Bucket": {
              "Fn::GetAtt": [
                "DefaultwebsiteDistributionLogBucketC3F8697B",
                "RegionalDomainName",
              ],
            },
          },
          "Origins": [
            {
              "DomainName": {
                "Fn::GetAtt": [
                  "DefaultwebsiteWebsiteBucketA2053FBA",
                  "RegionalDomainName",
                ],
              },
              "Id": "testDefaultwebsiteCloudfrontDistributionOrigin1E8DEFFFA",
              "S3OriginConfig": {
                "OriginAccessIdentity": {
                  "Fn::Join": [
                    "",
                    [
                      "origin-access-identity/cloudfront/",
                      {
                        "Ref": "DefaultwebsiteOriginAccessIdentityADAB9ED2",
                      },
                    ],
                  ],
                },
              },
            },
          ],
          "WebACLId": {
            "Fn::GetAtt": [
              "DefaultwebsiteWebsiteAclCFAclCustomResourceF47C4A99",
              "WebAclArn",
            ],
          },
        },
      },
      "Type": "AWS::CloudFront::Distribution",
    },
    "DefaultwebsiteDistributionLogBucketAutoDeleteObjectsCustomResource78184740": {
      "DeletionPolicy": "Delete",
      "DependsOn": [
        "DefaultwebsiteDistributionLogBucketPolicy6C6294B4",
      ],
      "Metadata": {
        "cdk_nag": {
          "rules_to_suppress": [
            {
              "id": "AwsSolutions-L1",
              "reason": "Latest runtime cannot be configured. CDK will need to upgrade the BucketDeployment construct accordingly.",
            },
            {
              "id": "AwsPrototyping-LambdaLatestVersion",
              "reason": "Latest runtime cannot be configured. CDK will need to upgrade the BucketDeployment construct accordingly.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Action::s3:.*$/g",
                },
                {
                  "regex": "/^Resource::.*$/g",
                },
              ],
              "id": "AwsSolutions-IAM5",
              "reason": "All Policies have been scoped to a Bucket. Given Buckets can contain arbitrary content, wildcard resources with bucket scope are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Action::s3:.*$/g",
                },
                {
                  "regex": "/^Resource::.*$/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoWildcardPermissions",
              "reason": "All Policies have been scoped to a Bucket. Given Buckets can contain arbitrary content, wildcard resources with bucket scope are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole$/g",
                },
              ],
              "id": "AwsSolutions-IAM4",
              "reason": "Buckets can contain arbitrary content, therefore wildcard resources under a bucket are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole$/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoManagedPolicies",
              "reason": "Buckets can contain arbitrary content, therefore wildcard resources under a bucket are required.",
            },
            {
              "id": "AwsSolutions-S1",
              "reason": "Access Log buckets should not have s3 bucket logging",
            },
            {
              "id": "AwsPrototyping-S3BucketLoggingEnabled",
              "reason": "Access Log buckets should not have s3 bucket logging",
            },
            {
              "id": "AwsPrototyping-CloudFrontDistributionGeoRestrictions",
              "reason": "Suppressed to allow unrestricted access. Not recommended in production.",
            },
          ],
        },
      },
      "Properties": {
        "BucketName": {
          "Ref": "DefaultwebsiteDistributionLogBucketC3F8697B",
        },
        "ServiceToken": {
          "Fn::GetAtt": [
            "CustomS3AutoDeleteObjectsCustomResourceProviderHandler9D90184F",
            "Arn",
          ],
        },
      },
      "Type": "Custom::S3AutoDeleteObjects",
      "UpdateReplacePolicy": "Delete",
    },
    "DefaultwebsiteDistributionLogBucketC3F8697B": {
      "DeletionPolicy": "Delete",
      "Metadata": {
        "cdk_nag": {
          "rules_to_suppress": [
            {
              "id": "AwsSolutions-L1",
              "reason": "Latest runtime cannot be configured. CDK will need to upgrade the BucketDeployment construct accordingly.",
            },
            {
              "id": "AwsPrototyping-LambdaLatestVersion",
              "reason": "Latest runtime cannot be configured. CDK will need to upgrade the BucketDeployment construct accordingly.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Action::s3:.*$/g",
                },
                {
                  "regex": "/^Resource::.*$/g",
                },
              ],
              "id": "AwsSolutions-IAM5",
              "reason": "All Policies have been scoped to a Bucket. Given Buckets can contain arbitrary content, wildcard resources with bucket scope are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Action::s3:.*$/g",
                },
                {
                  "regex": "/^Resource::.*$/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoWildcardPermissions",
              "reason": "All Policies have been scoped to a Bucket. Given Buckets can contain arbitrary content, wildcard resources with bucket scope are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole$/g",
                },
              ],
              "id": "AwsSolutions-IAM4",
              "reason": "Buckets can contain arbitrary content, therefore wildcard resources under a bucket are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole$/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoManagedPolicies",
              "reason": "Buckets can contain arbitrary content, therefore wildcard resources under a bucket are required.",
            },
            {
              "id": "AwsSolutions-S1",
              "reason": "Access Log buckets should not have s3 bucket logging",
            },
            {
              "id": "AwsPrototyping-S3BucketLoggingEnabled",
              "reason": "Access Log buckets should not have s3 bucket logging",
            },
            {
              "id": "AwsPrototyping-CloudFrontDistributionGeoRestrictions",
              "reason": "Suppressed to allow unrestricted access. Not recommended in production.",
            },
          ],
        },
      },
      "Properties": {
        "BucketEncryption": {
          "ServerSideEncryptionConfiguration": [
            {
              "ServerSideEncryptionByDefault": {
                "SSEAlgorithm": "AES256",
              },
            },
          ],
        },
        "LoggingConfiguration": {
          "DestinationBucketName": {
            "Ref": "DefaultwebsiteAccessLogsBucket07831AFA",
          },
          "LogFilePrefix": "distribution-access-logs",
        },
        "OwnershipControls": {
          "Rules": [
            {
              "ObjectOwnership": "BucketOwnerPreferred",
            },
          ],
        },
        "PublicAccessBlockConfiguration": {
          "BlockPublicAcls": true,
          "BlockPublicPolicy": true,
          "IgnorePublicAcls": true,
          "RestrictPublicBuckets": true,
        },
        "Tags": [
          {
            "Key": "aws-cdk:auto-delete-objects",
            "Value": "true",
          },
        ],
      },
      "Type": "AWS::S3::Bucket",
      "UpdateReplacePolicy": "Delete",
    },
    "DefaultwebsiteDistributionLogBucketPolicy6C6294B4": {
      "Metadata": {
        "cdk_nag": {
          "rules_to_suppress": [
            {
              "id": "AwsSolutions-L1",
              "reason": "Latest runtime cannot be configured. CDK will need to upgrade the BucketDeployment construct accordingly.",
            },
            {
              "id": "AwsPrototyping-LambdaLatestVersion",
              "reason": "Latest runtime cannot be configured. CDK will need to upgrade the BucketDeployment construct accordingly.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Action::s3:.*$/g",
                },
                {
                  "regex": "/^Resource::.*$/g",
                },
              ],
              "id": "AwsSolutions-IAM5",
              "reason": "All Policies have been scoped to a Bucket. Given Buckets can contain arbitrary content, wildcard resources with bucket scope are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Action::s3:.*$/g",
                },
                {
                  "regex": "/^Resource::.*$/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoWildcardPermissions",
              "reason": "All Policies have been scoped to a Bucket. Given Buckets can contain arbitrary content, wildcard resources with bucket scope are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole$/g",
                },
              ],
              "id": "AwsSolutions-IAM4",
              "reason": "Buckets can contain arbitrary content, therefore wildcard resources under a bucket are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole$/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoManagedPolicies",
              "reason": "Buckets can contain arbitrary content, therefore wildcard resources under a bucket are required.",
            },
            {
              "id": "AwsSolutions-S1",
              "reason": "Access Log buckets should not have s3 bucket logging",
            },
            {
              "id": "AwsPrototyping-S3BucketLoggingEnabled",
              "reason": "Access Log buckets should not have s3 bucket logging",
            },
            {
              "id": "AwsPrototyping-CloudFrontDistributionGeoRestrictions",
              "reason": "Suppressed to allow unrestricted access. Not recommended in production.",
            },
          ],
        },
      },
      "Properties": {
        "Bucket": {
          "Ref": "DefaultwebsiteDistributionLogBucketC3F8697B",
        },
        "PolicyDocument": {
          "Statement": [
            {
              "Action": "s3:*",
              "Condition": {
                "Bool": {
                  "aws:SecureTransport": "false",
                },
              },
              "Effect": "Deny",
              "Principal": {
                "AWS": "*",
              },
              "Resource": [
                {
                  "Fn::GetAtt": [
                    "DefaultwebsiteDistributionLogBucketC3F8697B",
                    "Arn",
                  ],
                },
                {
                  "Fn::Join": [
                    "",
                    [
                      {
                        "Fn::GetAtt": [
                          "DefaultwebsiteDistributionLogBucketC3F8697B",
                          "Arn",
                        ],
                      },
                      "/*",
                    ],
                  ],
                },
              ],
            },
            {
              "Action": [
                "s3:PutBucketPolicy",
                "s3:GetBucket*",
                "s3:List*",
                "s3:DeleteObject*",
              ],
              "Effect": "Allow",
              "Principal": {
                "AWS": {
                  "Fn::GetAtt": [
                    "CustomS3AutoDeleteObjectsCustomResourceProviderRole3B1BD092",
                    "Arn",
                  ],
                },
              },
              "Resource": [
                {
                  "Fn::GetAtt": [
                    "DefaultwebsiteDistributionLogBucketC3F8697B",
                    "Arn",
                  ],
                },
                {
                  "Fn::Join": [
                    "",
                    [
                      {
                        "Fn::GetAtt": [
                          "DefaultwebsiteDistributionLogBucketC3F8697B",
                          "Arn",
                        ],
                      },
                      "/*",
                    ],
                  ],
                },
              ],
            },
          ],
          "Version": "2012-10-17",
        },
      },
      "Type": "AWS::S3::BucketPolicy",
    },
    "DefaultwebsiteOriginAccessIdentityADAB9ED2": {
      "Metadata": {
        "cdk_nag": {
          "rules_to_suppress": [
            {
              "id": "AwsSolutions-L1",
              "reason": "Latest runtime cannot be configured. CDK will need to upgrade the BucketDeployment construct accordingly.",
            },
            {
              "id": "AwsPrototyping-LambdaLatestVersion",
              "reason": "Latest runtime cannot be configured. CDK will need to upgrade the BucketDeployment construct accordingly.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Action::s3:.*$/g",
                },
                {
                  "regex": "/^Resource::.*$/g",
                },
              ],
              "id": "AwsSolutions-IAM5",
              "reason": "All Policies have been scoped to a Bucket. Given Buckets can contain arbitrary content, wildcard resources with bucket scope are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Action::s3:.*$/g",
                },
                {
                  "regex": "/^Resource::.*$/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoWildcardPermissions",
              "reason": "All Policies have been scoped to a Bucket. Given Buckets can contain arbitrary content, wildcard resources with bucket scope are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole$/g",
                },
              ],
              "id": "AwsSolutions-IAM4",
              "reason": "Buckets can contain arbitrary content, therefore wildcard resources under a bucket are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole$/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoManagedPolicies",
              "reason": "Buckets can contain arbitrary content, therefore wildcard resources under a bucket are required.",
            },
            {
              "id": "AwsSolutions-S1",
              "reason": "Access Log buckets should not have s3 bucket logging",
            },
            {
              "id": "AwsPrototyping-S3BucketLoggingEnabled",
              "reason": "Access Log buckets should not have s3 bucket logging",
            },
            {
              "id": "AwsPrototyping-CloudFrontDistributionGeoRestrictions",
              "reason": "Suppressed to allow unrestricted access. Not recommended in production.",
            },
          ],
        },
      },
      "Properties": {
        "CloudFrontOriginAccessIdentityConfig": {
          "Comment": "Allows CloudFront to reach the bucket",
        },
      },
      "Type": "AWS::CloudFront::CloudFrontOriginAccessIdentity",
    },
    "DefaultwebsiteWebsiteAclCFAclCustomResourceF47C4A99": {
      "DeletionPolicy": "Delete",
      "Metadata": {
        "cdk_nag": {
          "rules_to_suppress": [
            {
              "id": "AwsSolutions-L1",
              "reason": "Latest runtime cannot be configured. CDK will need to upgrade the BucketDeployment construct accordingly.",
            },
            {
              "id": "AwsPrototyping-LambdaLatestVersion",
              "reason": "Latest runtime cannot be configured. CDK will need to upgrade the BucketDeployment construct accordingly.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Action::s3:.*$/g",
                },
                {
                  "regex": "/^Resource::.*$/g",
                },
              ],
              "id": "AwsSolutions-IAM5",
              "reason": "All Policies have been scoped to a Bucket. Given Buckets can contain arbitrary content, wildcard resources with bucket scope are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Action::s3:.*$/g",
                },
                {
                  "regex": "/^Resource::.*$/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoWildcardPermissions",
              "reason": "All Policies have been scoped to a Bucket. Given Buckets can contain arbitrary content, wildcard resources with bucket scope are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole$/g",
                },
              ],
              "id": "AwsSolutions-IAM4",
              "reason": "Buckets can contain arbitrary content, therefore wildcard resources under a bucket are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole$/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoManagedPolicies",
              "reason": "Buckets can contain arbitrary content, therefore wildcard resources under a bucket are required.",
            },
            {
              "id": "AwsSolutions-S1",
              "reason": "Access Log buckets should not have s3 bucket logging",
            },
            {
              "id": "AwsPrototyping-S3BucketLoggingEnabled",
              "reason": "Access Log buckets should not have s3 bucket logging",
            },
            {
              "id": "AwsPrototyping-CloudFrontDistributionGeoRestrictions",
              "reason": "Suppressed to allow unrestricted access. Not recommended in production.",
            },
          ],
        },
      },
      "Properties": {
        "ID": "test-WebsiteAcl-8267",
        "MANAGED_RULES": [
          {
            "name": "AWSManagedRulesCommonRuleSet",
            "vendor": "AWS",
          },
        ],
        "ServiceToken": {
          "Fn::GetAtt": [
            "DefaultwebsiteWebsiteAclCloudfrontAclProviderframeworkonEventD0BE0BBD",
            "Arn",
          ],
        },
      },
      "Type": "AWS::CloudFormation::CustomResource",
      "UpdateReplacePolicy": "Delete",
    },
    "DefaultwebsiteWebsiteAclCloudfrontAclProviderframeworkonEventD0BE0BBD": {
      "DependsOn": [
        "DefaultwebsiteWebsiteAclCloudfrontWebAclProviderRoleDefaultPolicy1A8F6C24",
        "DefaultwebsiteWebsiteAclCloudfrontWebAclProviderRole7CD36452",
      ],
      "Metadata": {
        "cdk_nag": {
          "rules_to_suppress": [
            {
              "id": "AwsSolutions-L1",
              "reason": "Latest runtime cannot be configured. CDK will need to upgrade the Provider construct accordingly.",
            },
            {
              "id": "AwsPrototyping-LambdaLatestVersion",
              "reason": "Latest runtime cannot be configured. CDK will need to upgrade the Provider construct accordingly.",
            },
            {
              "id": "AwsSolutions-L1",
              "reason": "Latest runtime cannot be configured. CDK will need to upgrade the BucketDeployment construct accordingly.",
            },
            {
              "id": "AwsPrototyping-LambdaLatestVersion",
              "reason": "Latest runtime cannot be configured. CDK will need to upgrade the BucketDeployment construct accordingly.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Action::s3:.*$/g",
                },
                {
                  "regex": "/^Resource::.*$/g",
                },
              ],
              "id": "AwsSolutions-IAM5",
              "reason": "All Policies have been scoped to a Bucket. Given Buckets can contain arbitrary content, wildcard resources with bucket scope are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Action::s3:.*$/g",
                },
                {
                  "regex": "/^Resource::.*$/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoWildcardPermissions",
              "reason": "All Policies have been scoped to a Bucket. Given Buckets can contain arbitrary content, wildcard resources with bucket scope are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole$/g",
                },
              ],
              "id": "AwsSolutions-IAM4",
              "reason": "Buckets can contain arbitrary content, therefore wildcard resources under a bucket are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole$/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoManagedPolicies",
              "reason": "Buckets can contain arbitrary content, therefore wildcard resources under a bucket are required.",
            },
            {
              "id": "AwsSolutions-S1",
              "reason": "Access Log buckets should not have s3 bucket logging",
            },
            {
              "id": "AwsPrototyping-S3BucketLoggingEnabled",
              "reason": "Access Log buckets should not have s3 bucket logging",
            },
            {
              "id": "AwsPrototyping-CloudFrontDistributionGeoRestrictions",
              "reason": "Suppressed to allow unrestricted access. Not recommended in production.",
            },
          ],
        },
      },
      "Properties": {
        "Code": {
          "S3Bucket": {
            "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-\${AWS::Region}",
          },
          "S3Key": "3542be390685e0c8353d92ccb5796d343cd93ca946b6b0de798004206a199adc.zip",
        },
        "Description": "AWS CDK resource provider framework - onEvent (test/Defaultwebsite/Defaultwebsite/WebsiteAcl/CloudfrontAclProvider)",
        "Environment": {
          "Variables": {
            "USER_ON_EVENT_FUNCTION_ARN": {
              "Fn::GetAtt": [
                "DefaultwebsiteWebsiteAclCloudfrontWebAclOnEventHandler3BDB88D0",
                "Arn",
              ],
            },
          },
        },
        "FunctionName": {
          "Fn::Join": [
            "",
            [
              {
                "Ref": "DefaultwebsiteWebsiteAclCloudfrontWebAclOnEventHandler3BDB88D0",
              },
              "-Provider",
            ],
          ],
        },
        "Handler": "framework.onEvent",
        "Role": {
          "Fn::GetAtt": [
            "DefaultwebsiteWebsiteAclCloudfrontWebAclProviderRole7CD36452",
            "Arn",
          ],
        },
        "Runtime": {
          "Fn::FindInMap": [
            "LatestNodeRuntimeMap",
            {
              "Ref": "AWS::Region",
            },
            "value",
          ],
        },
        "Timeout": 900,
      },
      "Type": "AWS::Lambda::Function",
    },
    "DefaultwebsiteWebsiteAclCloudfrontWebAclOnEventHandler3BDB88D0": {
      "DependsOn": [
        "DefaultwebsiteWebsiteAclOnEventHandlerRoleE4ED612D",
      ],
      "Metadata": {
        "cdk_nag": {
          "rules_to_suppress": [
            {
              "id": "AwsSolutions-L1",
              "reason": "Latest runtime cannot be configured. CDK will need to upgrade the BucketDeployment construct accordingly.",
            },
            {
              "id": "AwsPrototyping-LambdaLatestVersion",
              "reason": "Latest runtime cannot be configured. CDK will need to upgrade the BucketDeployment construct accordingly.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Action::s3:.*$/g",
                },
                {
                  "regex": "/^Resource::.*$/g",
                },
              ],
              "id": "AwsSolutions-IAM5",
              "reason": "All Policies have been scoped to a Bucket. Given Buckets can contain arbitrary content, wildcard resources with bucket scope are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Action::s3:.*$/g",
                },
                {
                  "regex": "/^Resource::.*$/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoWildcardPermissions",
              "reason": "All Policies have been scoped to a Bucket. Given Buckets can contain arbitrary content, wildcard resources with bucket scope are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole$/g",
                },
              ],
              "id": "AwsSolutions-IAM4",
              "reason": "Buckets can contain arbitrary content, therefore wildcard resources under a bucket are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole$/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoManagedPolicies",
              "reason": "Buckets can contain arbitrary content, therefore wildcard resources under a bucket are required.",
            },
            {
              "id": "AwsSolutions-S1",
              "reason": "Access Log buckets should not have s3 bucket logging",
            },
            {
              "id": "AwsPrototyping-S3BucketLoggingEnabled",
              "reason": "Access Log buckets should not have s3 bucket logging",
            },
            {
              "id": "AwsPrototyping-CloudFrontDistributionGeoRestrictions",
              "reason": "Suppressed to allow unrestricted access. Not recommended in production.",
            },
          ],
        },
      },
      "Properties": {
        "Code": {
          "S3Bucket": {
            "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-\${AWS::Region}",
          },
          "S3Key": "4c2d6a97252bdf6404368c4e77a84397e12bf4d549bdd970088cb57c246301c8.zip",
        },
        "FunctionName": "test-AclEvent-a28267",
        "Handler": "index.onEvent",
        "Role": {
          "Fn::GetAtt": [
            "DefaultwebsiteWebsiteAclOnEventHandlerRoleE4ED612D",
            "Arn",
          ],
        },
        "Runtime": "nodejs18.x",
        "Timeout": 300,
      },
      "Type": "AWS::Lambda::Function",
    },
    "DefaultwebsiteWebsiteAclCloudfrontWebAclProviderRole7CD36452": {
      "Metadata": {
        "cdk_nag": {
          "rules_to_suppress": [
            {
              "id": "AwsSolutions-IAM5",
              "reason": "Cloudwatch resources have been scoped down to the LogGroup level, however * is still needed as stream names are created just in time.",
            },
            {
              "id": "AwsPrototyping-IAMNoWildcardPermissions",
              "reason": "Cloudwatch resources have been scoped down to the LogGroup level, however * is still needed as stream names are created just in time.",
            },
            {
              "id": "AwsSolutions-L1",
              "reason": "Latest runtime cannot be configured. CDK will need to upgrade the BucketDeployment construct accordingly.",
            },
            {
              "id": "AwsPrototyping-LambdaLatestVersion",
              "reason": "Latest runtime cannot be configured. CDK will need to upgrade the BucketDeployment construct accordingly.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Action::s3:.*$/g",
                },
                {
                  "regex": "/^Resource::.*$/g",
                },
              ],
              "id": "AwsSolutions-IAM5",
              "reason": "All Policies have been scoped to a Bucket. Given Buckets can contain arbitrary content, wildcard resources with bucket scope are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Action::s3:.*$/g",
                },
                {
                  "regex": "/^Resource::.*$/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoWildcardPermissions",
              "reason": "All Policies have been scoped to a Bucket. Given Buckets can contain arbitrary content, wildcard resources with bucket scope are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole$/g",
                },
              ],
              "id": "AwsSolutions-IAM4",
              "reason": "Buckets can contain arbitrary content, therefore wildcard resources under a bucket are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole$/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoManagedPolicies",
              "reason": "Buckets can contain arbitrary content, therefore wildcard resources under a bucket are required.",
            },
            {
              "id": "AwsSolutions-S1",
              "reason": "Access Log buckets should not have s3 bucket logging",
            },
            {
              "id": "AwsPrototyping-S3BucketLoggingEnabled",
              "reason": "Access Log buckets should not have s3 bucket logging",
            },
            {
              "id": "AwsPrototyping-CloudFrontDistributionGeoRestrictions",
              "reason": "Suppressed to allow unrestricted access. Not recommended in production.",
            },
          ],
        },
      },
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Statement": [
            {
              "Action": "sts:AssumeRole",
              "Effect": "Allow",
              "Principal": {
                "Service": "lambda.amazonaws.com",
              },
            },
          ],
          "Version": "2012-10-17",
        },
        "Policies": [
          {
            "PolicyDocument": {
              "Statement": [
                {
                  "Action": [
                    "logs:CreateLogGroup",
                    "logs:CreateLogStream",
                    "logs:PutLogEvents",
                  ],
                  "Effect": "Allow",
                  "Resource": [
                    {
                      "Fn::Join": [
                        "",
                        [
                          "arn:aws:logs:",
                          {
                            "Ref": "AWS::Region",
                          },
                          ":",
                          {
                            "Ref": "AWS::AccountId",
                          },
                          ":log-group:/aws/lambda/",
                          {
                            "Ref": "DefaultwebsiteWebsiteAclCloudfrontWebAclOnEventHandler3BDB88D0",
                          },
                          "-Provider",
                        ],
                      ],
                    },
                    {
                      "Fn::Join": [
                        "",
                        [
                          "arn:aws:logs:",
                          {
                            "Ref": "AWS::Region",
                          },
                          ":",
                          {
                            "Ref": "AWS::AccountId",
                          },
                          ":log-group:/aws/lambda/",
                          {
                            "Ref": "DefaultwebsiteWebsiteAclCloudfrontWebAclOnEventHandler3BDB88D0",
                          },
                          "-Provider:*",
                        ],
                      ],
                    },
                  ],
                },
              ],
              "Version": "2012-10-17",
            },
            "PolicyName": "logs",
          },
        ],
      },
      "Type": "AWS::IAM::Role",
    },
    "DefaultwebsiteWebsiteAclCloudfrontWebAclProviderRoleDefaultPolicy1A8F6C24": {
      "Metadata": {
        "cdk_nag": {
          "rules_to_suppress": [
            {
              "id": "AwsSolutions-IAM5",
              "reason": "Cloudwatch resources have been scoped down to the LogGroup level, however * is still needed as stream names are created just in time.",
            },
            {
              "id": "AwsPrototyping-IAMNoWildcardPermissions",
              "reason": "Cloudwatch resources have been scoped down to the LogGroup level, however * is still needed as stream names are created just in time.",
            },
            {
              "id": "AwsSolutions-L1",
              "reason": "Latest runtime cannot be configured. CDK will need to upgrade the BucketDeployment construct accordingly.",
            },
            {
              "id": "AwsPrototyping-LambdaLatestVersion",
              "reason": "Latest runtime cannot be configured. CDK will need to upgrade the BucketDeployment construct accordingly.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Action::s3:.*$/g",
                },
                {
                  "regex": "/^Resource::.*$/g",
                },
              ],
              "id": "AwsSolutions-IAM5",
              "reason": "All Policies have been scoped to a Bucket. Given Buckets can contain arbitrary content, wildcard resources with bucket scope are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Action::s3:.*$/g",
                },
                {
                  "regex": "/^Resource::.*$/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoWildcardPermissions",
              "reason": "All Policies have been scoped to a Bucket. Given Buckets can contain arbitrary content, wildcard resources with bucket scope are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole$/g",
                },
              ],
              "id": "AwsSolutions-IAM4",
              "reason": "Buckets can contain arbitrary content, therefore wildcard resources under a bucket are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole$/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoManagedPolicies",
              "reason": "Buckets can contain arbitrary content, therefore wildcard resources under a bucket are required.",
            },
            {
              "id": "AwsSolutions-S1",
              "reason": "Access Log buckets should not have s3 bucket logging",
            },
            {
              "id": "AwsPrototyping-S3BucketLoggingEnabled",
              "reason": "Access Log buckets should not have s3 bucket logging",
            },
            {
              "id": "AwsPrototyping-CloudFrontDistributionGeoRestrictions",
              "reason": "Suppressed to allow unrestricted access. Not recommended in production.",
            },
          ],
        },
      },
      "Properties": {
        "PolicyDocument": {
          "Statement": [
            {
              "Action": "lambda:InvokeFunction",
              "Effect": "Allow",
              "Resource": [
                {
                  "Fn::GetAtt": [
                    "DefaultwebsiteWebsiteAclCloudfrontWebAclOnEventHandler3BDB88D0",
                    "Arn",
                  ],
                },
                {
                  "Fn::Join": [
                    "",
                    [
                      {
                        "Fn::GetAtt": [
                          "DefaultwebsiteWebsiteAclCloudfrontWebAclOnEventHandler3BDB88D0",
                          "Arn",
                        ],
                      },
                      ":*",
                    ],
                  ],
                },
              ],
            },
          ],
          "Version": "2012-10-17",
        },
        "PolicyName": "DefaultwebsiteWebsiteAclCloudfrontWebAclProviderRoleDefaultPolicy1A8F6C24",
        "Roles": [
          {
            "Ref": "DefaultwebsiteWebsiteAclCloudfrontWebAclProviderRole7CD36452",
          },
        ],
      },
      "Type": "AWS::IAM::Policy",
    },
    "DefaultwebsiteWebsiteAclOnEventHandlerRoleE4ED612D": {
      "Metadata": {
        "cdk_nag": {
          "rules_to_suppress": [
            {
              "applies_to": [
                {
                  "regex": "/^Resource::arn:aws:wafv2:us-east-1:<AWS::AccountId>:global/(.*)$/g",
                },
              ],
              "id": "AwsSolutions-IAM5",
              "reason": "WafV2 resources have been scoped down to the ACL/IPSet level, however * is still needed as resource id's are created just in time.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Resource::arn:aws:logs:<AWS::Region>:<AWS::AccountId>:log-group:/aws/lambda/test-AclEvent-a28267:*/g",
                },
              ],
              "id": "AwsSolutions-IAM5",
              "reason": "Cloudwatch resources have been scoped down to the LogGroup level, however * is still needed as stream names are created just in time.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Resource::arn:aws:wafv2:us-east-1:<AWS::AccountId>:global/(.*)$/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoWildcardPermissions",
              "reason": "WafV2 resources have been scoped down to the ACL/IPSet level, however * is still needed as resource id's are created just in time.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Resource::arn:aws:logs:<AWS::Region>:<AWS::AccountId>:log-group:/aws/lambda/test-AclEvent-a28267:*/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoWildcardPermissions",
              "reason": "Cloudwatch resources have been scoped down to the LogGroup level, however * is still needed as stream names are created just in time.",
            },
            {
              "id": "AwsSolutions-L1",
              "reason": "Latest runtime cannot be configured. CDK will need to upgrade the BucketDeployment construct accordingly.",
            },
            {
              "id": "AwsPrototyping-LambdaLatestVersion",
              "reason": "Latest runtime cannot be configured. CDK will need to upgrade the BucketDeployment construct accordingly.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Action::s3:.*$/g",
                },
                {
                  "regex": "/^Resource::.*$/g",
                },
              ],
              "id": "AwsSolutions-IAM5",
              "reason": "All Policies have been scoped to a Bucket. Given Buckets can contain arbitrary content, wildcard resources with bucket scope are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Action::s3:.*$/g",
                },
                {
                  "regex": "/^Resource::.*$/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoWildcardPermissions",
              "reason": "All Policies have been scoped to a Bucket. Given Buckets can contain arbitrary content, wildcard resources with bucket scope are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole$/g",
                },
              ],
              "id": "AwsSolutions-IAM4",
              "reason": "Buckets can contain arbitrary content, therefore wildcard resources under a bucket are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole$/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoManagedPolicies",
              "reason": "Buckets can contain arbitrary content, therefore wildcard resources under a bucket are required.",
            },
            {
              "id": "AwsSolutions-S1",
              "reason": "Access Log buckets should not have s3 bucket logging",
            },
            {
              "id": "AwsPrototyping-S3BucketLoggingEnabled",
              "reason": "Access Log buckets should not have s3 bucket logging",
            },
            {
              "id": "AwsPrototyping-CloudFrontDistributionGeoRestrictions",
              "reason": "Suppressed to allow unrestricted access. Not recommended in production.",
            },
          ],
        },
      },
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Statement": [
            {
              "Action": "sts:AssumeRole",
              "Effect": "Allow",
              "Principal": {
                "Service": "lambda.amazonaws.com",
              },
            },
          ],
          "Version": "2012-10-17",
        },
        "Policies": [
          {
            "PolicyDocument": {
              "Statement": [
                {
                  "Action": [
                    "logs:CreateLogGroup",
                    "logs:CreateLogStream",
                    "logs:PutLogEvents",
                  ],
                  "Effect": "Allow",
                  "Resource": [
                    {
                      "Fn::Join": [
                        "",
                        [
                          "arn:aws:logs:",
                          {
                            "Ref": "AWS::Region",
                          },
                          ":",
                          {
                            "Ref": "AWS::AccountId",
                          },
                          ":log-group:/aws/lambda/test-AclEvent-a28267",
                        ],
                      ],
                    },
                    {
                      "Fn::Join": [
                        "",
                        [
                          "arn:aws:logs:",
                          {
                            "Ref": "AWS::Region",
                          },
                          ":",
                          {
                            "Ref": "AWS::AccountId",
                          },
                          ":log-group:/aws/lambda/test-AclEvent-a28267:*",
                        ],
                      ],
                    },
                  ],
                },
              ],
              "Version": "2012-10-17",
            },
            "PolicyName": "logs",
          },
          {
            "PolicyDocument": {
              "Statement": [
                {
                  "Action": [
                    "wafv2:CreateWebACL",
                    "wafv2:DeleteWebACL",
                    "wafv2:UpdateWebACL",
                    "wafv2:GetWebACL",
                  ],
                  "Effect": "Allow",
                  "Resource": [
                    {
                      "Fn::Join": [
                        "",
                        [
                          "arn:aws:wafv2:us-east-1:",
                          {
                            "Ref": "AWS::AccountId",
                          },
                          ":global/ipset/test-WebsiteAcl-8267-IPSet/*",
                        ],
                      ],
                    },
                    {
                      "Fn::Join": [
                        "",
                        [
                          "arn:aws:wafv2:us-east-1:",
                          {
                            "Ref": "AWS::AccountId",
                          },
                          ":global/webacl/test-WebsiteAcl-8267/*",
                        ],
                      ],
                    },
                    {
                      "Fn::Join": [
                        "",
                        [
                          "arn:aws:wafv2:us-east-1:",
                          {
                            "Ref": "AWS::AccountId",
                          },
                          ":global/managedruleset/*/*",
                        ],
                      ],
                    },
                  ],
                },
                {
                  "Action": [
                    "wafv2:CreateIPSet",
                    "wafv2:DeleteIPSet",
                    "wafv2:UpdateIPSet",
                    "wafv2:GetIPSet",
                  ],
                  "Effect": "Allow",
                  "Resource": {
                    "Fn::Join": [
                      "",
                      [
                        "arn:aws:wafv2:us-east-1:",
                        {
                          "Ref": "AWS::AccountId",
                        },
                        ":global/ipset/test-WebsiteAcl-8267-IPSet/*",
                      ],
                    ],
                  },
                },
              ],
              "Version": "2012-10-17",
            },
            "PolicyName": "wafv2",
          },
        ],
      },
      "Type": "AWS::IAM::Role",
    },
    "DefaultwebsiteWebsiteBucketA2053FBA": {
      "DeletionPolicy": "Delete",
      "Metadata": {
        "cdk_nag": {
          "rules_to_suppress": [
            {
              "id": "AwsSolutions-L1",
              "reason": "Latest runtime cannot be configured. CDK will need to upgrade the BucketDeployment construct accordingly.",
            },
            {
              "id": "AwsPrototyping-LambdaLatestVersion",
              "reason": "Latest runtime cannot be configured. CDK will need to upgrade the BucketDeployment construct accordingly.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Action::s3:.*$/g",
                },
                {
                  "regex": "/^Resource::.*$/g",
                },
              ],
              "id": "AwsSolutions-IAM5",
              "reason": "All Policies have been scoped to a Bucket. Given Buckets can contain arbitrary content, wildcard resources with bucket scope are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Action::s3:.*$/g",
                },
                {
                  "regex": "/^Resource::.*$/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoWildcardPermissions",
              "reason": "All Policies have been scoped to a Bucket. Given Buckets can contain arbitrary content, wildcard resources with bucket scope are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole$/g",
                },
              ],
              "id": "AwsSolutions-IAM4",
              "reason": "Buckets can contain arbitrary content, therefore wildcard resources under a bucket are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole$/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoManagedPolicies",
              "reason": "Buckets can contain arbitrary content, therefore wildcard resources under a bucket are required.",
            },
            {
              "id": "AwsSolutions-S1",
              "reason": "Access Log buckets should not have s3 bucket logging",
            },
            {
              "id": "AwsPrototyping-S3BucketLoggingEnabled",
              "reason": "Access Log buckets should not have s3 bucket logging",
            },
            {
              "id": "AwsPrototyping-CloudFrontDistributionGeoRestrictions",
              "reason": "Suppressed to allow unrestricted access. Not recommended in production.",
            },
          ],
        },
      },
      "Properties": {
        "BucketEncryption": {
          "ServerSideEncryptionConfiguration": [
            {
              "ServerSideEncryptionByDefault": {
                "SSEAlgorithm": "AES256",
              },
            },
          ],
        },
        "LoggingConfiguration": {
          "DestinationBucketName": {
            "Ref": "DefaultwebsiteAccessLogsBucket07831AFA",
          },
          "LogFilePrefix": "website-access-logs",
        },
        "OwnershipControls": {
          "Rules": [
            {
              "ObjectOwnership": "BucketOwnerEnforced",
            },
          ],
        },
        "PublicAccessBlockConfiguration": {
          "BlockPublicAcls": true,
          "BlockPublicPolicy": true,
          "IgnorePublicAcls": true,
          "RestrictPublicBuckets": true,
        },
        "Tags": [
          {
            "Key": "aws-cdk:auto-delete-objects",
            "Value": "true",
          },
          {
            "Key": "aws-cdk:cr-owned:ad852956",
            "Value": "true",
          },
        ],
        "VersioningConfiguration": {
          "Status": "Enabled",
        },
      },
      "Type": "AWS::S3::Bucket",
      "UpdateReplacePolicy": "Delete",
    },
    "DefaultwebsiteWebsiteBucketAutoDeleteObjectsCustomResourceEC7C78C1": {
      "DeletionPolicy": "Delete",
      "DependsOn": [
        "DefaultwebsiteWebsiteBucketPolicy16337DBB",
      ],
      "Metadata": {
        "cdk_nag": {
          "rules_to_suppress": [
            {
              "id": "AwsSolutions-L1",
              "reason": "Latest runtime cannot be configured. CDK will need to upgrade the BucketDeployment construct accordingly.",
            },
            {
              "id": "AwsPrototyping-LambdaLatestVersion",
              "reason": "Latest runtime cannot be configured. CDK will need to upgrade the BucketDeployment construct accordingly.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Action::s3:.*$/g",
                },
                {
                  "regex": "/^Resource::.*$/g",
                },
              ],
              "id": "AwsSolutions-IAM5",
              "reason": "All Policies have been scoped to a Bucket. Given Buckets can contain arbitrary content, wildcard resources with bucket scope are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Action::s3:.*$/g",
                },
                {
                  "regex": "/^Resource::.*$/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoWildcardPermissions",
              "reason": "All Policies have been scoped to a Bucket. Given Buckets can contain arbitrary content, wildcard resources with bucket scope are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole$/g",
                },
              ],
              "id": "AwsSolutions-IAM4",
              "reason": "Buckets can contain arbitrary content, therefore wildcard resources under a bucket are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole$/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoManagedPolicies",
              "reason": "Buckets can contain arbitrary content, therefore wildcard resources under a bucket are required.",
            },
            {
              "id": "AwsSolutions-S1",
              "reason": "Access Log buckets should not have s3 bucket logging",
            },
            {
              "id": "AwsPrototyping-S3BucketLoggingEnabled",
              "reason": "Access Log buckets should not have s3 bucket logging",
            },
            {
              "id": "AwsPrototyping-CloudFrontDistributionGeoRestrictions",
              "reason": "Suppressed to allow unrestricted access. Not recommended in production.",
            },
          ],
        },
      },
      "Properties": {
        "BucketName": {
          "Ref": "DefaultwebsiteWebsiteBucketA2053FBA",
        },
        "ServiceToken": {
          "Fn::GetAtt": [
            "CustomS3AutoDeleteObjectsCustomResourceProviderHandler9D90184F",
            "Arn",
          ],
        },
      },
      "Type": "Custom::S3AutoDeleteObjects",
      "UpdateReplacePolicy": "Delete",
    },
    "DefaultwebsiteWebsiteBucketPolicy16337DBB": {
      "Metadata": {
        "cdk_nag": {
          "rules_to_suppress": [
            {
              "id": "AwsSolutions-L1",
              "reason": "Latest runtime cannot be configured. CDK will need to upgrade the BucketDeployment construct accordingly.",
            },
            {
              "id": "AwsPrototyping-LambdaLatestVersion",
              "reason": "Latest runtime cannot be configured. CDK will need to upgrade the BucketDeployment construct accordingly.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Action::s3:.*$/g",
                },
                {
                  "regex": "/^Resource::.*$/g",
                },
              ],
              "id": "AwsSolutions-IAM5",
              "reason": "All Policies have been scoped to a Bucket. Given Buckets can contain arbitrary content, wildcard resources with bucket scope are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Action::s3:.*$/g",
                },
                {
                  "regex": "/^Resource::.*$/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoWildcardPermissions",
              "reason": "All Policies have been scoped to a Bucket. Given Buckets can contain arbitrary content, wildcard resources with bucket scope are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole$/g",
                },
              ],
              "id": "AwsSolutions-IAM4",
              "reason": "Buckets can contain arbitrary content, therefore wildcard resources under a bucket are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole$/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoManagedPolicies",
              "reason": "Buckets can contain arbitrary content, therefore wildcard resources under a bucket are required.",
            },
            {
              "id": "AwsSolutions-S1",
              "reason": "Access Log buckets should not have s3 bucket logging",
            },
            {
              "id": "AwsPrototyping-S3BucketLoggingEnabled",
              "reason": "Access Log buckets should not have s3 bucket logging",
            },
            {
              "id": "AwsPrototyping-CloudFrontDistributionGeoRestrictions",
              "reason": "Suppressed to allow unrestricted access. Not recommended in production.",
            },
          ],
        },
      },
      "Properties": {
        "Bucket": {
          "Ref": "DefaultwebsiteWebsiteBucketA2053FBA",
        },
        "PolicyDocument": {
          "Statement": [
            {
              "Action": "s3:*",
              "Condition": {
                "Bool": {
                  "aws:SecureTransport": "false",
                },
              },
              "Effect": "Deny",
              "Principal": {
                "AWS": "*",
              },
              "Resource": [
                {
                  "Fn::GetAtt": [
                    "DefaultwebsiteWebsiteBucketA2053FBA",
                    "Arn",
                  ],
                },
                {
                  "Fn::Join": [
                    "",
                    [
                      {
                        "Fn::GetAtt": [
                          "DefaultwebsiteWebsiteBucketA2053FBA",
                          "Arn",
                        ],
                      },
                      "/*",
                    ],
                  ],
                },
              ],
            },
            {
              "Action": [
                "s3:PutBucketPolicy",
                "s3:GetBucket*",
                "s3:List*",
                "s3:DeleteObject*",
              ],
              "Effect": "Allow",
              "Principal": {
                "AWS": {
                  "Fn::GetAtt": [
                    "CustomS3AutoDeleteObjectsCustomResourceProviderRole3B1BD092",
                    "Arn",
                  ],
                },
              },
              "Resource": [
                {
                  "Fn::GetAtt": [
                    "DefaultwebsiteWebsiteBucketA2053FBA",
                    "Arn",
                  ],
                },
                {
                  "Fn::Join": [
                    "",
                    [
                      {
                        "Fn::GetAtt": [
                          "DefaultwebsiteWebsiteBucketA2053FBA",
                          "Arn",
                        ],
                      },
                      "/*",
                    ],
                  ],
                },
              ],
            },
            {
              "Action": "s3:ListBucket",
              "Effect": "Allow",
              "Principal": {
                "CanonicalUser": {
                  "Fn::GetAtt": [
                    "DefaultwebsiteOriginAccessIdentityADAB9ED2",
                    "S3CanonicalUserId",
                  ],
                },
              },
              "Resource": {
                "Fn::GetAtt": [
                  "DefaultwebsiteWebsiteBucketA2053FBA",
                  "Arn",
                ],
              },
            },
            {
              "Action": "s3:GetObject",
              "Effect": "Allow",
              "Principal": {
                "CanonicalUser": {
                  "Fn::GetAtt": [
                    "DefaultwebsiteOriginAccessIdentityADAB9ED2",
                    "S3CanonicalUserId",
                  ],
                },
              },
              "Resource": {
                "Fn::Join": [
                  "",
                  [
                    {
                      "Fn::GetAtt": [
                        "DefaultwebsiteWebsiteBucketA2053FBA",
                        "Arn",
                      ],
                    },
                    "/*",
                  ],
                ],
              },
            },
          ],
          "Version": "2012-10-17",
        },
      },
      "Type": "AWS::S3::BucketPolicy",
    },
    "DefaultwebsiteWebsiteDeploymentAwsCliLayer5C4B3D9C": {
      "Metadata": {
        "cdk_nag": {
          "rules_to_suppress": [
            {
              "id": "AwsSolutions-L1",
              "reason": "Latest runtime cannot be configured. CDK will need to upgrade the BucketDeployment construct accordingly.",
            },
            {
              "id": "AwsPrototyping-LambdaLatestVersion",
              "reason": "Latest runtime cannot be configured. CDK will need to upgrade the BucketDeployment construct accordingly.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Action::s3:.*$/g",
                },
                {
                  "regex": "/^Resource::.*$/g",
                },
              ],
              "id": "AwsSolutions-IAM5",
              "reason": "All Policies have been scoped to a Bucket. Given Buckets can contain arbitrary content, wildcard resources with bucket scope are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Action::s3:.*$/g",
                },
                {
                  "regex": "/^Resource::.*$/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoWildcardPermissions",
              "reason": "All Policies have been scoped to a Bucket. Given Buckets can contain arbitrary content, wildcard resources with bucket scope are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole$/g",
                },
              ],
              "id": "AwsSolutions-IAM4",
              "reason": "Buckets can contain arbitrary content, therefore wildcard resources under a bucket are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole$/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoManagedPolicies",
              "reason": "Buckets can contain arbitrary content, therefore wildcard resources under a bucket are required.",
            },
            {
              "id": "AwsSolutions-S1",
              "reason": "Access Log buckets should not have s3 bucket logging",
            },
            {
              "id": "AwsPrototyping-S3BucketLoggingEnabled",
              "reason": "Access Log buckets should not have s3 bucket logging",
            },
            {
              "id": "AwsPrototyping-CloudFrontDistributionGeoRestrictions",
              "reason": "Suppressed to allow unrestricted access. Not recommended in production.",
            },
          ],
        },
      },
      "Properties": {
        "Content": {
          "S3Bucket": {
            "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-\${AWS::Region}",
          },
          "S3Key": "3322b7049fb0ed2b7cbb644a2ada8d1116ff80c32dca89e6ada846b5de26f961.zip",
        },
        "Description": "/opt/awscli/aws",
      },
      "Type": "AWS::Lambda::LayerVersion",
    },
    "DefaultwebsiteWebsiteDeploymentCustomResourceE9DC7FDC": {
      "DeletionPolicy": "Delete",
      "Metadata": {
        "cdk_nag": {
          "rules_to_suppress": [
            {
              "id": "AwsSolutions-L1",
              "reason": "Latest runtime cannot be configured. CDK will need to upgrade the BucketDeployment construct accordingly.",
            },
            {
              "id": "AwsPrototyping-LambdaLatestVersion",
              "reason": "Latest runtime cannot be configured. CDK will need to upgrade the BucketDeployment construct accordingly.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Action::s3:.*$/g",
                },
                {
                  "regex": "/^Resource::.*$/g",
                },
              ],
              "id": "AwsSolutions-IAM5",
              "reason": "All Policies have been scoped to a Bucket. Given Buckets can contain arbitrary content, wildcard resources with bucket scope are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Action::s3:.*$/g",
                },
                {
                  "regex": "/^Resource::.*$/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoWildcardPermissions",
              "reason": "All Policies have been scoped to a Bucket. Given Buckets can contain arbitrary content, wildcard resources with bucket scope are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole$/g",
                },
              ],
              "id": "AwsSolutions-IAM4",
              "reason": "Buckets can contain arbitrary content, therefore wildcard resources under a bucket are required.",
            },
            {
              "applies_to": [
                {
                  "regex": "/^Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole$/g",
                },
              ],
              "id": "AwsPrototyping-IAMNoManagedPolicies",
              "reason": "Buckets can contain arbitrary content, therefore wildcard resources under a bucket are required.",
            },
            {
              "id": "AwsSolutions-S1",
              "reason": "Access Log buckets should not have s3 bucket logging",
            },
            {
              "id": "AwsPrototyping-S3BucketLoggingEnabled",
              "reason": "Access Log buckets should not have s3 bucket logging",
            },
            {
              "id": "AwsPrototyping-CloudFrontDistributionGeoRestrictions",
              "reason": "Suppressed to allow unrestricted access. Not recommended in production.",
            },
          ],
        },
      },
      "Properties": {
        "DestinationBucketName": {
          "Ref": "DefaultwebsiteWebsiteBucketA2053FBA",
        },
        "DistributionId": {
          "Ref": "DefaultwebsiteCloudfrontDistributionA17FD839",
        },
        "Prune": true,
        "ServiceToken": {
          "Fn::GetAtt": [
            "CustomCDKBucketDeployment8693BB64968944B69AAFB0CC9EB8756C81C01536",
            "Arn",
          ],
        },
        "SourceBucketNames": [
          {
            "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-\${AWS::Region}",
          },
          {
            "Fn::Sub": "cdk-hnb659fds-assets-\${AWS::AccountId}-\${AWS::Region}",
          },
        ],
        "SourceMarkers": [
          {},
          {
            "<<marker:0xbaba:0>>": {
              "Ref": "AWS::Region",
            },
            "<<marker:0xbaba:1>>": {
              "Ref": "testUserIdentityIdentityPoolBAEBB5D7",
            },
            "<<marker:0xbaba:2>>": {
              "Ref": "testUserIdentityUserPoolB4EEB643",
            },
            "<<marker:0xbaba:3>>": {
              "Ref": "testUserIdentityUserPoolWebClientBC123C65",
            },
            "<<marker:0xbaba:4>>": {
              "Ref": "DefaultApiA2AD717B",
            },
            "<<marker:0xbaba:5>>": {
              "Ref": "AWS::Region",
            },
            "<<marker:0xbaba:6>>": {
              "Ref": "AWS::URLSuffix",
            },
            "<<marker:0xbaba:7>>": {
              "Ref": "DefaultApiDeploymentStageprodA87ECEBF",
            },
          },
        ],
        "SourceObjectKeys": [
          "4e658650683c3b9301c7989bf1bbdd180d71677b2f1062cc67976709f3ad50cd.zip",
          "7a4312ac8488bd441eb543eb03c2f024943cec5ca506285d8989fb18f32919b6.zip",
        ],
      },
      "Type": "Custom::CDKBucketDeployment",
      "UpdateReplacePolicy": "Delete",
    },
    "testUserIdentityIdentityPoolAuthenticatedRole08CCC9FE": {
      "DependsOn": [
        "testUserIdentityUserPoolB4EEB643",
        "testUserIdentityUserPoolsmsRole259861DE",
        "testUserIdentityUserPoolWebClientBC123C65",
      ],
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Statement": [
            {
              "Action": "sts:AssumeRoleWithWebIdentity",
              "Condition": {
                "ForAnyValue:StringLike": {
                  "cognito-identity.amazonaws.com:amr": "authenticated",
                },
                "StringEquals": {
                  "cognito-identity.amazonaws.com:aud": {
                    "Ref": "testUserIdentityIdentityPoolBAEBB5D7",
                  },
                },
              },
              "Effect": "Allow",
              "Principal": {
                "Federated": "cognito-identity.amazonaws.com",
              },
            },
          ],
          "Version": "2012-10-17",
        },
        "Description": {
          "Fn::Join": [
            "",
            [
              "Default Authenticated Role for Identity Pool ",
              {
                "Fn::GetAtt": [
                  "testUserIdentityIdentityPoolBAEBB5D7",
                  "Name",
                ],
              },
            ],
          ],
        },
      },
      "Type": "AWS::IAM::Role",
    },
    "testUserIdentityIdentityPoolAuthenticatedRoleDefaultPolicy0231CEF1": {
      "DependsOn": [
        "testUserIdentityUserPoolB4EEB643",
        "testUserIdentityUserPoolsmsRole259861DE",
        "testUserIdentityUserPoolWebClientBC123C65",
      ],
      "Properties": {
        "PolicyDocument": {
          "Statement": [
            {
              "Action": "execute-api:Invoke",
              "Effect": "Allow",
              "Resource": {
                "Fn::Join": [
                  "",
                  [
                    "arn:",
                    {
                      "Ref": "AWS::Partition",
                    },
                    ":execute-api:",
                    {
                      "Ref": "AWS::Region",
                    },
                    ":",
                    {
                      "Ref": "AWS::AccountId",
                    },
                    ":",
                    {
                      "Ref": "DefaultApiA2AD717B",
                    },
                    "/*/*/*",
                  ],
                ],
              },
            },
          ],
          "Version": "2012-10-17",
        },
        "PolicyName": "testUserIdentityIdentityPoolAuthenticatedRoleDefaultPolicy0231CEF1",
        "Roles": [
          {
            "Ref": "testUserIdentityIdentityPoolAuthenticatedRole08CCC9FE",
          },
        ],
      },
      "Type": "AWS::IAM::Policy",
    },
    "testUserIdentityIdentityPoolBAEBB5D7": {
      "DependsOn": [
        "testUserIdentityUserPoolB4EEB643",
        "testUserIdentityUserPoolsmsRole259861DE",
        "testUserIdentityUserPoolWebClientBC123C65",
      ],
      "Properties": {
        "AllowUnauthenticatedIdentities": false,
        "CognitoIdentityProviders": [
          {
            "ClientId": {
              "Ref": "testUserIdentityUserPoolWebClientBC123C65",
            },
            "ProviderName": {
              "Fn::Join": [
                "",
                [
                  "cognito-idp.",
                  {
                    "Ref": "AWS::Region",
                  },
                  ".",
                  {
                    "Ref": "AWS::URLSuffix",
                  },
                  "/",
                  {
                    "Ref": "testUserIdentityUserPoolB4EEB643",
                  },
                ],
              ],
            },
            "ServerSideTokenCheck": true,
          },
        ],
      },
      "Type": "AWS::Cognito::IdentityPool",
    },
    "testUserIdentityIdentityPoolDefaultRoleAttachment698E37CF": {
      "DependsOn": [
        "testUserIdentityUserPoolB4EEB643",
        "testUserIdentityUserPoolsmsRole259861DE",
        "testUserIdentityUserPoolWebClientBC123C65",
      ],
      "Properties": {
        "IdentityPoolId": {
          "Ref": "testUserIdentityIdentityPoolBAEBB5D7",
        },
        "Roles": {
          "authenticated": {
            "Fn::GetAtt": [
              "testUserIdentityIdentityPoolAuthenticatedRole08CCC9FE",
              "Arn",
            ],
          },
          "unauthenticated": {
            "Fn::GetAtt": [
              "testUserIdentityIdentityPoolUnauthenticatedRoleD490B381",
              "Arn",
            ],
          },
        },
      },
      "Type": "AWS::Cognito::IdentityPoolRoleAttachment",
    },
    "testUserIdentityIdentityPoolUnauthenticatedRoleD490B381": {
      "DependsOn": [
        "testUserIdentityUserPoolB4EEB643",
        "testUserIdentityUserPoolsmsRole259861DE",
        "testUserIdentityUserPoolWebClientBC123C65",
      ],
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Statement": [
            {
              "Action": "sts:AssumeRoleWithWebIdentity",
              "Condition": {
                "ForAnyValue:StringLike": {
                  "cognito-identity.amazonaws.com:amr": "unauthenticated",
                },
                "StringEquals": {
                  "cognito-identity.amazonaws.com:aud": {
                    "Ref": "testUserIdentityIdentityPoolBAEBB5D7",
                  },
                },
              },
              "Effect": "Allow",
              "Principal": {
                "Federated": "cognito-identity.amazonaws.com",
              },
            },
          ],
          "Version": "2012-10-17",
        },
        "Description": {
          "Fn::Join": [
            "",
            [
              "Default Unauthenticated Role for Identity Pool ",
              {
                "Fn::GetAtt": [
                  "testUserIdentityIdentityPoolBAEBB5D7",
                  "Name",
                ],
              },
            ],
          ],
        },
      },
      "Type": "AWS::IAM::Role",
    },
    "testUserIdentityUserPoolB4EEB643": {
      "DeletionPolicy": "Retain",
      "Properties": {
        "AccountRecoverySetting": {
          "RecoveryMechanisms": [
            {
              "Name": "verified_email",
              "Priority": 1,
            },
          ],
        },
        "AdminCreateUserConfig": {
          "AllowAdminCreateUserOnly": true,
        },
        "AliasAttributes": [
          "email",
        ],
        "AutoVerifiedAttributes": [
          "email",
          "phone_number",
        ],
        "DeletionProtection": "ACTIVE",
        "EmailVerificationMessage": "The verification code to your new account is {####}",
        "EmailVerificationSubject": "Verify your new account",
        "EnabledMfas": [
          "SMS_MFA",
          "SOFTWARE_TOKEN_MFA",
        ],
        "MfaConfiguration": "ON",
        "Policies": {
          "PasswordPolicy": {
            "MinimumLength": 8,
            "RequireLowercase": true,
            "RequireNumbers": true,
            "RequireSymbols": true,
            "RequireUppercase": true,
            "TemporaryPasswordValidityDays": 3,
          },
        },
        "Schema": [
          {
            "Mutable": true,
            "Name": "phone_number",
            "Required": false,
          },
          {
            "Mutable": true,
            "Name": "email",
            "Required": true,
          },
          {
            "Mutable": true,
            "Name": "given_name",
            "Required": true,
          },
          {
            "Mutable": true,
            "Name": "family_name",
            "Required": true,
          },
        ],
        "SmsConfiguration": {
          "ExternalId": "testtestUserIdentityUserPoolA908B557",
          "SnsCallerArn": {
            "Fn::GetAtt": [
              "testUserIdentityUserPoolsmsRole259861DE",
              "Arn",
            ],
          },
        },
        "SmsVerificationMessage": "The verification code to your new account is {####}",
        "UserAttributeUpdateSettings": {
          "AttributesRequireVerificationBeforeUpdate": [
            "email",
            "phone_number",
          ],
        },
        "UserPoolAddOns": {
          "AdvancedSecurityMode": "ENFORCED",
        },
        "UsernameConfiguration": {
          "CaseSensitive": false,
        },
        "VerificationMessageTemplate": {
          "DefaultEmailOption": "CONFIRM_WITH_CODE",
          "EmailMessage": "The verification code to your new account is {####}",
          "EmailSubject": "Verify your new account",
          "SmsMessage": "The verification code to your new account is {####}",
        },
      },
      "Type": "AWS::Cognito::UserPool",
      "UpdateReplacePolicy": "Retain",
    },
    "testUserIdentityUserPoolWebClientBC123C65": {
      "Properties": {
        "AllowedOAuthFlows": [
          "implicit",
          "code",
        ],
        "AllowedOAuthFlowsUserPoolClient": true,
        "AllowedOAuthScopes": [
          "profile",
          "phone",
          "email",
          "openid",
          "aws.cognito.signin.user.admin",
        ],
        "CallbackURLs": [
          "https://example.com",
        ],
        "ExplicitAuthFlows": [
          "ALLOW_USER_PASSWORD_AUTH",
          "ALLOW_USER_SRP_AUTH",
          "ALLOW_REFRESH_TOKEN_AUTH",
        ],
        "SupportedIdentityProviders": [
          "COGNITO",
        ],
        "UserPoolId": {
          "Ref": "testUserIdentityUserPoolB4EEB643",
        },
      },
      "Type": "AWS::Cognito::UserPoolClient",
    },
    "testUserIdentityUserPoolsmsRole259861DE": {
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Statement": [
            {
              "Action": "sts:AssumeRole",
              "Condition": {
                "StringEquals": {
                  "sts:ExternalId": "testtestUserIdentityUserPoolA908B557",
                },
              },
              "Effect": "Allow",
              "Principal": {
                "Service": "cognito-idp.amazonaws.com",
              },
            },
          ],
          "Version": "2012-10-17",
        },
        "Policies": [
          {
            "PolicyDocument": {
              "Statement": [
                {
                  "Action": "sns:Publish",
                  "Effect": "Allow",
                  "Resource": "*",
                },
              ],
              "Version": "2012-10-17",
            },
            "PolicyName": "sns-publish",
          },
        ],
      },
      "Type": "AWS::IAM::Role",
    },
  },
  "Rules": {
    "CheckBootstrapVersion": {
      "Assertions": [
        {
          "Assert": {
            "Fn::Not": [
              {
                "Fn::Contains": [
                  [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                  ],
                  {
                    "Ref": "BootstrapVersion",
                  },
                ],
              },
            ],
          },
          "AssertDescription": "CDK bootstrap stack version 6 required. Please run 'cdk bootstrap' with a recent version of the CDK CLI.",
        },
      ],
    },
  },
}
\`;
`,
};

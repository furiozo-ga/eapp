module.exports={
  plugins: [
    ["@semantic-release/commit-analyzer", {
        releaseRules: [
            {"type": "major"  , "release": "major"},
            {"type": "release", "release": "major"},
        ],
        parserOpts: {
            "noteKeywords": ["BREAKING CHANGE", "BREAKING CHANGES", "BREAKING"]
        }
    }],

    ["@semantic-release/exec",{
        prepareCmd: `
            set -e
            CR=unicominternal.azurecr.io
            VER=\${nextRelease.version}

         docker login $CR -u $DOCKER_HUB_USER -p $DOCKER_HUB_PASSWORD \
         && docker build    -f dockerfile     -t $CR/furiozo.eapp:$VER $STAGING_PATH \
         && docker push                          $CR/furiozo.eapp:$VER \
         && echo \${nextRelease.version} \
        `,
        successCmd: `set -e
            false
            sed -i 's/{{version}}/\${nextRelease.version}/g' ci/k8s.yaml  \
            && echo "##vso[task.setvariable variable=newVer;]yes" \
            && echo "##vso[task.setvariable variable=relType;]\${nextRelease.type}"
        `,
    }],

    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/git"
  ],

  branches: [
    'master',
    { name: 'release-*', prerelease: true },
  ],
}

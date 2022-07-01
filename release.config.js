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
        prepareCmd: `CR=unicominternal.azurecr.io && VER=\${nextRelease.version} \
         && echo \${nextRelease.version} \
        `,
        successCmd: `\
            sed -i 's/{{version}}/\${nextRelease.version}/g' ci/manifest.yaml   \
            && echo "##vso[task.setvariable variable=newVer;]yes"
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

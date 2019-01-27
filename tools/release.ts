const semanticRelease = require('semantic-release')
const { WritableStreamBuffer } = require('stream-buffers')

const stdoutBuffer = new WritableStreamBuffer()
const stderrBuffer = new WritableStreamBuffer()

function getBuildVersion() {
  return semanticRelease(
    {
      // Core options
      dryRun: true,
      branch: 'master',
      repositoryUrl: 'https://github.com/justindujardin/mathtastic.git'
    },
    {
      // Run semantic-release from `/path/to/git/repo/root` without having to change local process `cwd` with `process.chdir()`
      cwd: './',
      // Pass the variable `MY_ENV_VAR` to semantic-release without having to modify the local `process.env`
      env: { ...process.env, MY_ENV_VAR: 'MY_ENV_VAR_VALUE' },
      // Store stdout and stderr to use later instead of writing to `process.stdout` and `process.stderr`
      stdout: stdoutBuffer,
      stderr: stderrBuffer
    }
  )
    .then((result: any) => {
      if (result) {
        const { lastRelease, commits, nextRelease, releases } = result

        console.log(`Published ${nextRelease.type} release version ${nextRelease.version} containing ${commits.length} commits.`)

        if (lastRelease.version) {
          console.log(`The last release was "${lastRelease.version}".`)
        }

        for (const release of releases) {
          console.log(`The release was published with plugin "${release}".`)
        }
        return releases
      } else {
        console.log('No release published.')
      }

      // Get stdout and stderr content
      console.log(stdoutBuffer.getContentsAsString('utf8'))
      console.error(stderrBuffer.getContentsAsString('utf8'))
      return null
    })
    .catch((err: any) => {
      console.error('The automated release failed with %O', err)
      return null
    })
}

getBuildVersion()
  .then((version: any) => {
    console.log('version is: ', version)
  })
  .catch((e: any) => console.error(e))

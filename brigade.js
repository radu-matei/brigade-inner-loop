const {events, Job} = require("brigadier");

// This is for the local dev loop.
events.on("exec", (e, p) => {
  console.log(e);
  const payload = JSON.parse(e.payload);
  /*
   * Unit tests
   * These are run against the image that Draft built
   */

  const imageName = payload.image;
  const j = new Job("test", imageName)
  
  // if runnign in remote cluster, uncomment this
  //j.imageForcePull = true;
  
  j.tasks = [
    "yarn test"
  ];

  j.run().catch( err => {
    const title = `Tests failed for ${ hook.repository.repo_name }`;
    const msg = "Run `brig build logs --jobs " + e.buildID + "` to see why.";
    console.log(msg);
  })

  /*
   * Functional tests
   * These are run against the service that Draft started.
   */

  const funcTests = new Job("ftest", "alpine:3.7");
  funcTests.tasks = [
    "apk update && apk add curl"
  ];

  const uris = ["healthz", "hello"];
  for (const uri of uris) {
    const cmd = `curl -sf http://$NODE_DEMO_CHART_SERVICE_HOST/${ uri }`
    funcTests.tasks.push("echo Testing " + cmd)
    funcTests.tasks.push(cmd)
  }

  funcTests.run().catch(err => {
    const title = `Functional tests failed for ${ hook.repository.repo_name }`;
    const msg = "Run `brig build logs --jobs " + e.buildID + "` to see why.";
    console.log(msg);
  })
})


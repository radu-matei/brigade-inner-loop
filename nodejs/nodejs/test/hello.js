const { assert } = require("chai");
const hello = require("../src/hello");

describe("Hello", function() {
  describe("#Brigade", function(){
      it("should return 'Hello, Brigade!'", function() {
        assert.equal(hello.world(), "Hello, Brigade!");
      });
  });
});
const { deterministicPartitionKey } = require("../index");

describe("deterministicPartitionKey", () => {
  it("returns a string", () => {
    const result = deterministicPartitionKey({ foo: "bar" });
    expect(typeof result).toBe("string");
  });

  it("returns the partition key if it is provided", () => {
    const input = { partitionKey: "myPartitionKey" };
    const result = deterministicPartitionKey(input);
    expect(result).toBe("myPartitionKey");
  });

  it("returns a hash of the input if no partition key is provided", () => {
    const input = { foo: "bar" };
    const result = deterministicPartitionKey(input);
    expect(result).toMatch(/[a-f0-9]{128}/);
  });

  it("returns the trivial partition key if no input is provided", () => {
    const result = deterministicPartitionKey();
    expect(result).toBe("0");
  });

  it("hashes the partition key if it is too long", () => {
    const input = { partitionKey: "x".repeat(257) };
    const result = deterministicPartitionKey(input);
    expect(result).toMatch(/[a-f0-9]{128}/);
  });

  it("hashes the input if it is too long and no partition key is provided", () => {
    const input = { foo: "x".repeat(1024) };
    const result = deterministicPartitionKey(input);
    expect(result).toMatch(/[a-f0-9]{128}/);
  });

  it("converts a non-string partition key to a string", () => {
    const input = { partitionKey: 42 };
    const result = deterministicPartitionKey(input);
    expect(typeof result).toBe("string");
  });

  it("converts a non-string input to a string before hashing", () => {
    const input = { foo: 42 };
    const result = deterministicPartitionKey(input);
    expect(result).toMatch(/[a-f0-9]{128}/);
  });
});

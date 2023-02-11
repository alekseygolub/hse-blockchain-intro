const { expect } = require("chai");

const { ethers } = require("hardhat");

describe("Token contract", function () {
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const Token = await ethers.getContractFactory("SimpleERC20Token");
    const hardhatToken = await Token.deploy();

    expect(await hardhatToken.totalSupply()).to.equal(10000);
  });

  it("Should transfer tokens between accounts", async function() {
    const [owner, addr1, addr2] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("SimpleERC20Token");
    const hardhatToken = await Token.deploy();

    // Transfer 50 tokens from owner to addr1
    await hardhatToken.transfer(addr1.address, 50);
    expect(await hardhatToken.balanceOf(addr1.address)).to.equal(50);

    // Transfer 50 tokens from addr1 to addr2
    await hardhatToken.connect(addr1).transfer(addr2.address, 50);
    expect(await hardhatToken.balanceOf(addr2.address)).to.equal(50);
  });

  it("Should fail if sender doesn't have enough tokens", async function () {
    const [owner, addr1] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("SimpleERC20Token");
    const hardhatToken = await Token.deploy();

    const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);

    // Try to send 1 token from addr1 (0 tokens) to owner.
    // `require` will evaluate false and revert the transaction.
    await expect(
      hardhatToken.connect(addr1).transfer(owner.address, 1)
    ).to.be.revertedWith("Not enough tokens");

    // Owner balance shouldn't have changed.
    expect(await hardhatToken.balanceOf(owner.address)).to.equal(
      initialOwnerBalance
    );
  });

  it("Mint should add tokens to user", async function () {
    const [owner] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("SimpleERC20Token");
    const hardhatToken = await Token.deploy();

    const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
    expect(await hardhatToken.balanceOf(owner.address)).to.equal(10000);

    await hardhatToken.mint(10);

    // Owner balance should increase
    expect(await hardhatToken.balanceOf(owner.address)).to.equal(
      10010
    );
  });
});
const displayGreeting = async (greeting, contract, accounts, web3) => {
  greeting = await contract.methods
    .addCharityProject("phuc", "test", 1234)
    .send({ from: accounts[0], gas: 3000000 });
  console.log(await contract.methods.listCharity(accounts[0], 0).call());
  //   console.log(
  //     await contract.methods
  //       .listCharity(accounts[0], 0)
  //       .send({ from: accounts[0], gas: 3000000 })
  //   );
  const CharityProject = await $.getJSON("./contracts/CharityProject.json");

  const example = new web3.eth.Contract(
    CharityProject.abi,
    await contract.methods.listCharity(accounts[0], 0).call()
  );

  let x = await example.methods.target.call().call();
  console.log(x);

  let a = await example.methods
    .addBeneficiary(
      "0xADF139b8e2f03191cC14276f335bcE39D9ac3Db0",
      "phuc1",
      "phuc1"
    )
    .send({
      from: accounts[0],
      gas: 3000000,
    });
  console.log(a);

  let e = await example.methods.state.call().call();

  console.log(e);

  let b = await example.methods.startCharity().send({
    from: accounts[0],
    gas: 3000000,
  });

  console.log(b);

  let c = await example.methods.state.call().call();

  console.log(c);

  $("h2").html(greeting);
};

// const updateGreeting = (greeting, contract, accounts) => {
//   let input;
//   $("#input").on("change", (e) => {
//     input = e.target.value;
//   });
//   $("#form").on("submit", async (e) => {
//     e.preventDefault();
//     await contract.methods
//       .updateGreeting(input)
//       .send({ from: accounts[0], gas: 40000 });
//     displayGreeting(greeting, contract);
//   });
// };

async function greetingApp() {
  const web3 = await getWeb3();
  const accounts = await web3.eth.getAccounts();
  const contract = await getContract(web3);
  let greeting;

  displayGreeting(greeting, contract, accounts, web3);
  //   updateGreeting(greeting, contract, accounts);
}

greetingApp();

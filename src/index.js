const proposal = require("./models/proposal"),
  conference = require("./models/conference"),
  readline = require("readline");

console.log(`Insira talks no formato <Nome da talk> (<lenght>min | lightning).
  Ex 1: Sit Down and Write 30min
  Ex 2: Rails for Python Developers lightning
  Digite :q para imprimir as tracks\n`);

const proposals = [],
  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> "
  });
rl.prompt();
rl.on("line", input => {
  if (input !== ":q") {
    try {
      const newProposal = proposal(input);
      proposals.push(newProposal);
    } catch (err) {
      console.log(err);
    } finally {
      rl.prompt();
    }
  } else {
    const { tracks } = conference(proposals);
    tracks.forEach(({ morning, afternoon }) => {
      morning.talks.forEach(({ toString }) => console.log(toString()));
      afternoon.talks.forEach(({ toString }) => console.log(toString()));
      console.log("=================================================");
    });

    process.exit(0);
  }
});

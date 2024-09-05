// const bcrypt = require("bcrypt");
// const saltRounds = 10;
// const myPlaintextPassword = "ABC";
// async function test() {
//   let hash1 = await bcrypt.hash(myPlaintextPassword, saltRounds);
//   let hash2 = await bcrypt.hash(myPlaintextPassword, saltRounds);
//   console.log(hash1);
//   console.log(hash2);
//   let result1 = await bcrypt.compare("ABC", hash1);
//   let result2 = await bcrypt.compare("ABC", hash2);
// }

// test();

// var validator = require("email-validator");

// const result = validator.validate("test@email@com.fr"); // true
// console.log(result);

var jwt = require("jsonwebtoken");

async function test() {
  try {
    var token = jwt.sign({ foo: "bar" }, "shhhhh", {
      expiresIn: 60 * 60,
      audience: ["foo", "bar"],
    });
    var decoded = jwt.verify(token, "shhhhh");
    console.log(decoded);
  } catch (error) {
    console.log(error.message);
  }
}

test();

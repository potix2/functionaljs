const expect = require('expect.js');

describe('data types and features', () => {
  it('4.1 how to create natural numbers', (next) => {
    const succ = (n) => {
      return n + 1;
    };

    expect(
      succ(0)
    ).to.eql(
      1
    );
    expect(
      succ(succ(0))
    ).to.eql(
      2
    );
    next();
  });

  it('4.2 undefined variables', (next) => {
    var variable;
    expect(
      variable
    ).to.eql(
      undefined
    );
    next();
  });

  it('4.6 access to an instance of an object', (next) => {
    var addressbook = {
      No1: {
        name: "Alan Turing",
        gender: "male",
        birthDay: "1912/6/23"
      },
      No2: {
        name: "Haskell Curry",
        gender: "male",
        birthDay: "1900/9/12"
      },
      No3: {
        name: "Alonzo Church",
        gender: "male",
        birthDay: "1903/6/14"
      },
      No4: {
        name: "Ada Lovelace",
        gender: "female",
        birthDay: "1815/12/10"
      }
    };

    expect(
      addressbook.No1.name
    ).to.eql(
      "Alan Turing"
    );
    expect(
      addressbook["No1"]["name"]
    ).to.eql(
      "Alan Turing"
    );
    next();
  });

  it('4.7 basic operations for array', (next) => {
    const arr = [10,11,12];
    expect(
      arr[0]
    ).to.eql(
      10
    );
    expect(
      arr[2]
    ).to.eql(
      12
    );
    expect(
      arr[100]
    ).to.eql(
      undefined
    );
    next();
  });

  it('4.8 sorting the elements in a array', (next) => {
    const arr = [5,3,4,1,2];
    expect(
      arr.sort((n,m) => {
        return n > m;
      })
    ).to.eql(
      [1,2,3,4,5]
    );
    next();
  });

  it('4.9')
});


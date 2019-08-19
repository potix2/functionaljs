const expect = require('expect.js');

describe('control flow', () => {
  it('5.2 checking whether it is even or not', (next) => {
    const even = (n) => {
      return (n % 2) === 0;
    };

    expect(
      even(2)
    ).to.eql(
      true
    );
    expect(
      even(3)
    ).to.eql(
      false
    );

    next();
  });
  it('5.3 nested if statement', (next) => {
    const compare = (n, m) => {
      return n - m;
    };

    expect(
      compare(2, 3)
    ).to.be.lessThan(0);

    expect(
      compare(3, 3)
    ).to.be.eql(0);

    expect(
      compare(4, 3)
    ).to.be.greaterThan(0);

    next();
  });

  //5.12 the definition of List (ADT)
  const empty = () => {
    return (pattern) => {
      return pattern.empty();
    };
  };

  const cons = (value, list) => {
    return (pattern) => {
      return pattern.cons(value, list);
    };
  };

  const match = (data, pattern) => {
    return data(pattern);
  };

  const isEmpty = (aList) => {
    return match(aList, {
      empty: (_) => {
        return true;
      },
      cons: (head, tail) => {
        return false;
      }
    });
  };
  const head = (aList) => {
    return match(aList, {
      empty: (_) => {
        return null;
      },
      cons: (head, tail) => {
        return head;
      }
    });
  };
  const tail = (aList) => {
    return match(aList, {
      empty: (_) => {
        return null;
      },
      cons: (head, tail) => {
        return tail;
      }
    });
  };

  it('5.15 testing List(ADT)', (next) => {
    expect(
      isEmpty(empty())
    ).to.eql(true);

    expect(
      isEmpty(cons(1, empty()))
    ).to.eql(false);

    expect(
      head(cons(1, cons(2, empty())))
    ).to.eql(1);

    expect(
      head(tail(cons(1, cons(2, empty()))))
    ).to.eql(2);

    next();
  });

  // 5.21 map
  const map = (aList, transform) => {
    return match(aList, {
      empty: (_) => { return empty(); },
      cons: (head, tail) => {
        return cons(transform(head),
          map(tail, transform));
      }
    });
  };

  // 5.22
  const toArray = (aList) => {
    const helper = (aList, accumulator) => {
      return match(aList, {
        empty: (_) => { return accumulator; },
        cons: (head, tail) => {
          return helper(tail, accumulator.concat(head));
        }
      });
    };
    return helper(aList, []);
  };

  it('5.22 toArray', (next) => {
    expect(
      toArray(cons(1, cons(2, empty())))
    ).to.eql([1,2]);

    const succ = (n) => {
      return n + 1;
    };

    expect(
      toArray(map(cons(1, cons(2, empty())), succ))
    ).to.eql(
      [2,3]
    );
    next();
  });

  it('5.25 length', (next) => {
    const length = (aList) => {
      return match(aList, {
        empty: (_) => {
          return 0;
        },
        cons: (head, tail) => {
          return 1 + length(tail);
        }
      });
    };

    expect(
      length(cons(1, cons(2, cons(3, empty()))))
    ).to.eql(3);

    expect(
      length(empty())
    ).to.eql(0);
    next();
  });

  it('5.26 append', (next) => {
    const append = (xs, ys) => {
      return match(xs, {
        empty: (_) => { return ys; },
        cons: (head, tail) => {
          return cons(head, append(tail, ys));
        }
      });
    };

    expect(
      toArray(
        append(
          cons(1, cons(2, empty())),
          cons(3, cons(4, empty()))
        ))
    ).to.eql(
      [1, 2, 3, 4]
    );
    next();
  });

  it('5.27 reverse', (next) => {
    const reverse = (aList) => {
      const helper = (aList, acc) => {
        return match(aList, {
          empty: (_) => {
            return acc;
          },
          cons: (head, tail) => {
            return helper(tail, cons(head, acc));
          }
        });
      };
      return helper(aList, empty());
    };

    expect(
      toArray(
        reverse(
          cons(1, cons(2, cons(3, empty())))
        )
      )
    ).to.eql([3,2,1]);
    next();
  });

  it('5.28 arithmetic expression(ADT)', (next) => {
    const num = (n) => {
      return (pattern) => {
        return pattern.num(n);
      };
    };
    const add = (exp1, exp2) => {
      return (pattern) => {
        return pattern.add(exp1, exp2);
      };
    };
    const mul = (exp1, exp2) => {
      return (pattern) => {
        return pattern.mul(exp1, exp2);
      };
    };

    const calculate = (exp) => {
      return match(exp, {
        num: (n) => {
          return n;
        },
        add: (e1, e2) => {
          return calculate(e1) + calculate(e2);
        },
        mul: (e1, e2) => {
          return calculate(e1) * calculate(e2);
        }
      });
    };

    expect(
      calculate(
        mul(
          add(
            num(1),
            num(2)
          ),
          num(3)
        )
      )
    ).to.eql(9);
    next();
  });
});
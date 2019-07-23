const expect = require('expect.js');

describe('functional programing language', () => {
  it('2.1 sum() function with forEach method', (next) => {
    const sum = (array) => {
      var result = 0;
      array.forEach((item) => {
        result = result + item;
      });
      return result;
    };
    expect(
      sum([1,2,3,4,5])
    ).to.eql(
      15
    );
    next();
  });
  it('2.3 Imperative Factorial', () => {
    const factorial = (n) => {
      var result = 1;
      var times = 1;
      while(times < n + 1) {
        result = result * times;
        times = times + 1;
      }
      return result;
    };

    expect(
      factorial(5)
    ).to.eql(
      120
    );
  });

  it('2.4 Implementation of the object type as the immutable data structure', () => {
    const empty = (_) => {
      return null;
    };
    const get = (key, obj) => {
      return obj(key);
    };
    const set = (key, value, obj) => {
      return (key2) => {
        if (key === key2) {
          return value;
        } else {
          return get(key2, obj);
        }
      };
    };

    const a = set('one', '1', set('foo', 'bar', empty));
    expect(
      a('foo')
    ).to.eql('bar');

    expect(
      a('xxx')
    ).to.eql(null);
  });

  it('2.5 the definition of the addition using the assignment', () => {
    const add = (x,y) => {
      var times = 0;
      var result = x;

      while(times < y) {
        result = result + 1;
        times = times + 1;
      }
      return result;
    };
    expect(
      add(1,2)
    ).to.eql(3);
  });

  it('2.6 the definition of the addition using the recursive call', () => {
    const add = (x,y) => {
      if (y < 1) {
        return x;
      } else {
        return add(x + 1, y - 1);
      }
    };
    expect(
      add(1,2)
    ).to.eql(3);
  });

  it('2.9 the definition of sum', () => {
    const sum1 = (array) => {
      var i = 0;
      var result = 0;
      while(i < array.length) {
        result = result + array[i];
        i = i + 1;
      }
      return result;
    };
    expect(
      sum1([1,2,3,4,5,6,7,8,9,10])
    ).to.eql(55);

    const sum2 = (array) => {
      return array.reduce((acc, item) => {
        return acc + item;
      }, 0);
    };
    expect(
      sum2([1,2,3,4,5,6,7,8,9,10])
    ).to.eql(55);
  });

  it('2.10 the definition of product', () => {
    const product = (array) => {
      return array.reduce((acc, item) => {
        return acc * item;
      }, 1);
    };
    expect(
      product([1,2,3])
    ).to.eql(6);
  });

  const map = (transform) => {
    return (array) => {
      return array.reduce((acc, item) => {
        return acc.concat(transform(item));
      }, []);
    };
  };

  it('2.11 the definition of map', () => {
    expect(
      map((x) => x + 1)([1,3,5,7,9,11])
    ).to.eql([2,4,6,8,10,12]);
  });

  const constant = (any) => {
    return (_) => {
      return any;
    };
  };
  const alwaysOne = constant(1);
  it('2.14 replace all elements of an array to 1', () => {
    expect(
      map(alwaysOne)([1,2,3])
    ).to.eql([1,1,1]);
  });

  const sum = (array) => {
    return array.reduce((acc, item) => {
      return acc + item;
    }, 0);
  };
  it('2.15 the definition of length', () => {
    const length = (array) => sum(map(alwaysOne)(array));
    expect(
      length([1,2,3])
    ).to.eql(3);
  });

  const compose = (f,g) => {
    return (arg) => {
      return f(g(arg));
    };
  };
  it('2.17 the definition of length using compose', () => {
    const length = compose(sum, map(alwaysOne));
    expect(
      length([1,2,3])
    ).to.eql(3);
  });

  it('2.28 elemAt', () => {
    const succ = (n) => n + 1;
    const iterate = (init) => {
      return (step) => {
        return [init, (_) => {
          return iterate(step(init))(step);
        }];
      };
    };
    const filter = (predicate) => {
      return (aStream) => {
        const head = aStream[0];
        if(predicate(head)) {
          return [head, (_) => {
            return filter(predicate)(aStream[1]());
          }];
        } else {
          return filter(predicate)(aStream[1]());
        }
      };
    };
    const enumFrom = (n) => {
      return iterate(n)(succ);
    };
    const naturals = enumFrom(1);
    const twoStep = (n) => {
      return n + 2;
    };
    const even = (n) => {
      return (n % 2) == 0;
    };
    //const evenStream = iterate(2)(twoStep);
    const evenStream = filter(even)(naturals);
    const elemAt = (n) => {
      return (aStream) => {
        if(n === 1) {
          return aStream[0];
        } else {
          return elemAt(n-1)(aStream[1]());
        }
      };
    };

    expect(
      elemAt(3)(evenStream)
    ).to.eql(6);
  });

});

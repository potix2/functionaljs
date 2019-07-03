const expect = require('expect.js');

describe('命令型モデル', () => {
  describe('turing machine', () => {
    var machine = (program, tape, initState, endState) => {
      var position = 0;
      var state = initState;
      var currentInstruction = undefined;

      while (state !== endState) {
        const cell = tape[String(position)];
        if (cell) {
          currentInstruction = program[state][cell];
        } else {
          currentInstruction = program[state].B;
        }

        if (!currentInstruction) {
          return false;
        } else {
          tape[String(position)] = currentInstruction.write;
          position += currentInstruction.move;
          state = currentInstruction.next;
        }
      }
      return tape;
    };

    describe('example for executing turing machine', () => {
      it('implement succ function on turing machine', (next) => {
        const tape = {
          '0': '1',
          '1': '0'
        };
        const program = {
          'q0': {
            "1": {"write": "1", "move": 1, "next": 'q0'},
            "0": {"write": "0", "move": 1, "next": 'q0'},
            "B": {"write": "B", "move": -1, "next": 'q1'},
          },
          'q1': {
            "1": {"write": "0", "move": -1, "next": 'q1'},
            "0": {"write": "1", "move": -1, "next": 'q2'},
            "B": {"write": "1", "move": -1, "next": 'q3'},
          },
          'q2': {
            "1": {"write": "1", "move": -1, "next": 'q2'},
            "0": {"write": "0", "move": -1, "next": 'q2'},
            "B": {"write": "B", "move": 1, "next": 'q4'},
          },
          'q3': {
            "1": {"write": "1", "move": 1, "next": 'q4'},
            "0": {"write": "0", "move": 1, "next": 'q4'},
            "B": {"write": "B", "move": 1, "next": 'q4'},
          }
        };
        expect(
          machine(program,
            tape,
            'q0',
            'q4')
        ).to.eql(
          {
            '-1': 'B',
            '0': '1',
            '1': '1',
            '2': 'B'
          }
        );
        next();
      });
    });
  });
});
describe('functional model', () => {
  describe('substitution rule', () => {
    it('reduction of simple lambda expression', (next) => {
      const succ = (n) => {
        return n + 1;
      };
      expect(
        succ(1)
      ).to.eql(
        2
      );
      next();
    });
    it('add function', (next) => {
      const succ = (n) => {
        return n + 1;
      };
      const prev = (n) => {
        return n - 1;
      };
      const add = (x, y) => {
        if ( y < 1) {
          return x;
        } else {
          return add(succ(x), prev(y));
        }
      };
      expect(
        add(3,2)
      ).to.eql(
        5
      );
      next();
    });
    it('recursion and recurrence relation', (next) => {
      const a = (n) => {
        if (n === 1) {
          return 1;
        } else {
          return a(n - 1) + 3;
        }
      };
      expect(
        a(3)
      ).to.eql(
        7
      );
      expect(
        a(4)
      ).to.eql(
        10
      );
      next();
    });
    it('implementation of add with while statement', (next) => {
      const add = (x, y) => {
        while(y > 0) {
          x = x + 1;
          y = y - 1;
        }
        return x;
      };
      expect(
        add(3,2)
      ).to.eql(
        5
      );
      next();
    });
  });
  describe('definition of function', () => {
    const times = (count, f, arg, memo) => {
      if (count > 1) {
        return times(count - 1, f, arg, f(memo, arg));
      } else {
        return f(memo, arg);
      }
    };
    const succ = (n) => {
      return n + 1;
    };
    const prev = (n) => {
      return n - 1;
    };
    const add = (x, y) => {
      if ( y < 1) {
        return x;
      } else {
        return add(succ(x), prev(y));
      }
    };
    const multiply = (n,m) => {
      return times(m, add, n, 0);
    };

    it('define multiply', (next) => {
      expect(
        multiply(2, 3)
      ).to.eql(
        6
      );
      next();
    });
    it('define exponential', (next) => {
      const exponential = (n, m) => {
        return times(m, multiply, n, 1);
      };
      expect(
        exponential(2, 5)
      ).to.eql(
        32
      );
      next();
    });
  });
});

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

# Links

- [ember](./ember.html)

# Compare and Contrast

> Let's port the React tutorial to Ember

# The introductory sample

```jsx
class ShoppingList extends React.Component {
  render() {
    return (
      <div className="shopping-list">
        <h1>Shopping List for {this.props.name}</h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
        </ul>
      </div>
    );
  }
}
```

```gbs
--- hbs ---
<div className="shopping-list">
  <h1>Shopping List for {{@name}}</h1>
  <ul>
    <li>Instagram</li>
    <li>WhatsApp</li>
    <li>Oculus</li>
  </ul>
</div>

{{! Example usage: <ShoppingList name="Mark" />}}
```

# The starter code

## React

```jsx
class Square extends React.Component {
  render() {
    return <button className="square">{/* TODO */}</button>;
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square />;
  }

  render() {
    const status = "Next player: X";

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
```

## React Hooks

```jsx
function Square() {
  return <button className="square">{/* TODO */}</button>;
}

function Board() {
  const status = "Next player: X";

  function renderSquare(i) {
    return <Square />;
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
```

## Ember

game.gbs

```gbs
--- hbs ---
<div class="game">
  <div class="game-board">
    <Board />
  </div>
  <div class="game-info">
    <div>{{! status }</div>
    <ol>{{! TODO }}</ol>
  </div>
</div>
```

board.gbs

```gbs
--- ts ---
const status = "Next player: X";

--- hbs ---
<div>
  <div class="status">{{status}}</div>
  <div class="board-row">
    <Square />
    <Square />
    <Square />
  </div>
  <div class="board-row">
    <Square />
    <Square />
    <Square />
  </div>
  <div class="board-row">
    <Square />
    <Square />
    <Square />
  </div>
</div>
```

square.gbs

```gbs
--- hbs ---
<button class="square">{{! TODO }}</button>;
```

# Step 1

## React

```jsx {3}
class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />;
  }
```

```jsx {5}
class Square extends React.Component {
  render() {
    return (
      <button className="square">
        {this.props.value}
      </button>
    );
  }
}
```

## React with Hooks

```jsx {2}
function Square({ value }) {
  return <button className="square">{value}</button>;
}
```

```jsx {5}
function Board() {
  const status = "Next player: X";

  function renderSquare(i) {
    return <Square value={i} />;
  }
```

## Ember

```gbs{5-7,10-12,15-17}
--- ts ---
const status = "Next Player: X";

--- hbs ---
<div>
  <div className="status">{{status}}</div>
  <div className="board-row">
    <Square @value={{0}} />
    <Square @value={{1}} />
    <Square @value={{2}} />
  </div>
  <div className="board-row">
    <Square @value={{3}} />
    <Square @value={{4}} />
    <Square @value={{5}} />
  </div>
  <div className="board-row">
    <Square @value={{6}} />
    <Square @value={{7}} />
    <Square @value={{8}} />
  </div>
</div>
```

```gbs{2}
--- hbs ---
<button class="square">{{@value}}</button>;
```

# Step 2: Making an interactive component

## React

```jsx {4}
class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={function() { alert('click'); }}>
        {this.props.value}
      </button>
    );
  }
}
```

## React with Hooks

```jsx
function Square({ value }) {
  return (
    <button className="square" onClick={function() { alert('click'); }}>
      {this.props.value}
    </button>
  );
}
```

## Ember

```gbs {2-4,7}
--- ts ---
function clicked() {
  alert('clicked');
}

--- hbs ---
<button class="square" {{on click=clicked}}>{{@value}}</button>;
```

# Step 3: Adding State

## React

```jsx {2-7}
class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <button className="square" onClick={() => alert('click')}>
        {this.props.value}
      </button>
    );
  }
}
```

## React with Hooks

```jsx
function Square({ value }) {
  const [value, setValue] = useState(null);

  return (
    <button className="square" onClick={function() { alert('click'); }}>
      {this.props.value}
    </button>
  );
}
```

## Ember

```gbs{2,4-6}
--- ts ---
import { Component } from '@glimmer/component';

export default class extends Component {
  @tracked value;
}

function clicked() {
  alert('clicked');
}

--- hbs ---
<button class="square" {{on click=clicked}}>{{@value}}</button>;
```

# Step 4: Turn Props into State

## React

```jsx {12,13,15}
class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <button
        className="square"
        onClick={this.setState({value: 'X'})}
      >
        {this.state.value}
      </button>
    );
  }
}
```

## React with Hooks

```jsx
function Square({ value }) {
  const [value, setValue] = useState(null);

  return (
    <button className="square" onClick={setValue('X')}>
      {value}
    </button>
  );
}
```

## Ember

```gbs
--- ts ---
import { Component } from '@glimmer/component';

export default class extends Component {
  @tracked value;

  @callback
  clicked() {
    this.value = 'X';
  }
}

--- hbs ---
<button class="square" {{on click=this.clicked}}>
  {{this.value}}
</button>;
```

# Step 5: Lifting State Up

## React

```jsx{2-7}
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  renderSquare(i) {
    return <Square value={this.state.squares[i]} />;
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
```

## React with Hooks

```jsx
function Board() {
  const status = "Next player: X";
  const [squares, setSquares] = useState(Array(9).fill(null));

  function renderSquare(i) {
    return <Square value={squares[i]} />;
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

```

## Ember

```gbs
--- ts ---
export default class extends Component {
  @tracked squares = Array(9).fill(null);

  @callback
  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.squares = squares;
  }
}

const status = "Next player: X";

--- hbs ---
<div>
  <div className="status">{{status}}</div>
  <div className="board-row">
    <Square @value={{0}} onclick={{action this.handleClick 0}} />
    <Square @value={{1}} onclick={{action this.handleClick 1}} />
    <Square @value={{2}} onclick={{action this.handleClick 2}} />
  </div>
  <div className="board-row">
    <Square @value={{3}} onclick={{action this.handleClick 3}} />
    <Square @value={{4}} onclick={{action this.handleClick 4}} />
    <Square @value={{5}} onclick={{action this.handleClick 5}} />
  </div>
  <div className="board-row">
    <Square @value={{6}} onclick={{action this.handleClick 6}} />
    <Square @value={{7}} onclick={{action this.handleClick 7}} />
    <Square @value={{8}} onclick={{action this.handleClick 8}} />
  </div>
</div>
```

# Step 6: Function Components

## React

```jsx
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
```

## Ember

```gbs
--- hbs ---
<button class="square" {{on click=@onclick}}>{{@value}}</button>;
```

# Step 7: Taking Turns

## React

## Ember

```gbs{3}
--- ts ---
export default class extends Component {
  @tracked squares = Array(9).fill(null);
  @tracked xIsNext = true;
}
```

```gbs
--- ts ---
export default class extends Component {
  @tracked squares = Array(9).fill(null);
  @tracked xIsNext = true;

  @callback
  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.squares = squares;
    this.xIsNext = !this.state.xIsNext
  }
}

--- hbs ---
<div>
  <div className="status">Next player: {{if this.xIsNext "X" "O"}}</div>
  <div className="board-row">
    <Square @value={{0}} onclick={{action this.handleClick 0}} />
    <Square @value={{1}} onclick={{action this.handleClick 1}} />
    <Square @value={{2}} onclick={{action this.handleClick 2}} />
  </div>
  <div className="board-row">
    <Square @value={{3}} onclick={{action this.handleClick 3}} />
    <Square @value={{4}} onclick={{action this.handleClick 4}} />
    <Square @value={{5}} onclick={{action this.handleClick 5}} />
  </div>
  <div className="board-row">
    <Square @value={{6}} onclick={{action this.handleClick 6}} />
    <Square @value={{7}} onclick={{action this.handleClick 7}} />
    <Square @value={{8}} onclick={{action this.handleClick 8}} />
  </div>
</div>
```

# Step 8: Picking Winner

## React

## Ember

```gbs
--- ts ---
export default class extends Component {
  @tracked squares = Array(9).fill(null);
  @tracked xIsNext = true;

  get status() {
    let winner = calculateWinner(this.squares);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.xIsNext ? 'X' : 'O');
    }

    return status;
  }

  @callback
  handleClick(i) {
    if (calculateWinner(this.squares) || square[i]) {
      return;
    }

    const squares = this.squares.slice();
    squares[i] = this..xIsNext ? 'X' : 'O';
    this.squares = squares;
    this.xIsNext = !this.xIsNext
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

--- hbs ---
<div>
  <div className="status">{{this.status}}</div>
  <div className="board-row">
    <Square @value={{0}} onclick={{action this.handleClick 0}} />
    <Square @value={{1}} onclick={{action this.handleClick 1}} />
    <Square @value={{2}} onclick={{action this.handleClick 2}} />
  </div>
  <div className="board-row">
    <Square @value={{3}} onclick={{action this.handleClick 3}} />
    <Square @value={{4}} onclick={{action this.handleClick 4}} />
    <Square @value={{5}} onclick={{action this.handleClick 5}} />
  </div>
  <div className="board-row">
    <Square @value={{6}} onclick={{action this.handleClick 6}} />
    <Square @value={{7}} onclick={{action this.handleClick 7}} />
    <Square @value={{8}} onclick={{action this.handleClick 8}} />
  </div>
</div>
```
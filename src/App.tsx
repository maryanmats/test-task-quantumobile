import React, { useState } from 'react';
import './App.scss';
import { Pad } from './Pad/Pad';
import { Digit, Operator } from './types/types';

function App() {
  const [result, setResult] = useState<number>(0);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(true);
  const [pendingOperator, setPendingOperator] = useState<Operator>();
  const [display, setDisplay] = useState<string>('0');

  const calculate = (rightOperand: number, pendingOperator: Operator): boolean => {
    let newResult = result;

    switch (pendingOperator) {
      case '+':
        newResult += rightOperand;
        break;
      case '-':
        newResult -= rightOperand;
        break;
      case '×':
        newResult *= rightOperand;
        break;
      case '÷':
        if (rightOperand === 0) {
          return false;
        }

        newResult /= rightOperand;
    }

    setResult(newResult)
    setDisplay(newResult.toString().toString().slice(0, 12));

    return true;
  }

  const onDigitButtonClick = (digit: Digit) => {
    let newDisplay = display;

    if ((display === '0' && digit === 0) || display.length > 12) {
      return;
    }

    if (waitingForOperand) {
      newDisplay = '';
      setWaitingForOperand(false);
    }

    if (display !== '0') {
      newDisplay = newDisplay + digit.toString()
    } else {
      newDisplay = digit.toString()
    }
    
    setDisplay(newDisplay);
  }

  const onPointButtonClick = () => {
    let newDisplay = display;

    if (waitingForOperand) {
      newDisplay = '0';
    }

    if (newDisplay.indexOf('.') === -1) {
      newDisplay = newDisplay + '.';
    }

    setDisplay(newDisplay);
    setWaitingForOperand(false);
  }

  const onOperatorButtonClick = (operator: Operator) => {
    const operand = Number(display);

    if (typeof pendingOperator !== 'undefined' && !waitingForOperand) {
      if (!calculate(operand, pendingOperator)) {
        return;
      }
    } else {
      setResult(operand);
    }

    setPendingOperator(operator);
    setWaitingForOperand(true);
  }

  const onEqualButtonClick = () => {
    const operand = Number(display);

    if (typeof pendingOperator !== 'undefined' && !waitingForOperand) {
      if (!calculate(operand, pendingOperator)) {
        return;
      }

      setPendingOperator(undefined);
    } else {
      setDisplay(operand.toString());
    }

    setResult(operand);
    setWaitingForOperand(true);
  }

  const onAllClearButtonClick = () => {
    setResult(0);
    setPendingOperator(undefined);
    setDisplay('0');
    setWaitingForOperand(true);
  }

  const onClearEntryButtonClick = () => {
    setDisplay('0');
    setWaitingForOperand(true);
  }

  const isCursor = pendingOperator && <span className='cursor'></span>;

  return (
    <div className="App">
      <div className='output'>
        <div className='current'>{typeof pendingOperator !== 'undefined'
    ? `${result}${pendingOperator}${waitingForOperand ? '' : display}`
    : ''}
  {isCursor}</div>
        <div className='display'>{Number(display).toLocaleString('ru')}</div>
      </div>
      <Pad
        onDigitButtonClick={onDigitButtonClick}
        onPointButtonClick={onPointButtonClick}
        onOperatorButtonClick={onOperatorButtonClick}
        onEqualButtonClick={onEqualButtonClick}
        onAllClearButtonClick={onAllClearButtonClick}
        onClearEntryButtonClick={onClearEntryButtonClick}
      />
    </div>
  );
}

export default App;

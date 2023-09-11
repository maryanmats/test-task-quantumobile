import { useEffect } from "react";
import { Digit, Operator } from "../types/types";
import { Button } from "../Button/Button";

interface PadProps {
  onDigitButtonClick: (digit: Digit) => void
  onPointButtonClick: () => void
  onOperatorButtonClick: (operator: Operator) => void
  onEqualButtonClick: () => void
  onAllClearButtonClick: () => void
  onClearEntryButtonClick: () => void
}

export const Pad: React.FC<PadProps> = ({
  onDigitButtonClick,
  onPointButtonClick,
  onOperatorButtonClick,
  onEqualButtonClick,
  onAllClearButtonClick,
}) => {
  const handleKeyDown = ({ keyCode, shiftKey }: KeyboardEvent) => {
    if (keyCode >= 48 && keyCode <= 57 && !shiftKey) {
      onDigitButtonClick((keyCode - 48) as Digit)
    } else if ((keyCode >= 96 && keyCode <= 105)) {
      onDigitButtonClick((keyCode - 96) as Digit)
    } else if (keyCode === 107 || (keyCode === 187 && shiftKey)) {
      onOperatorButtonClick('+')
    } else if (keyCode === 109 || keyCode === 189) {
      onOperatorButtonClick('-')
    } else if (keyCode === 190) {
      onPointButtonClick();
    } else if (keyCode === 106 || (keyCode === 56 && shiftKey)) {
      onOperatorButtonClick('×')
    } else if (keyCode === 111 || keyCode === 191) {
      onOperatorButtonClick('÷')
    } else if (keyCode === 13 || (keyCode === 187 && !shiftKey)) {
      onEqualButtonClick()
    }  else if (keyCode === 27) {
      onAllClearButtonClick()
    }
  }

  useEffect(() => {
    document.body.addEventListener('keydown', handleKeyDown)
    return () => document.body.removeEventListener('keydown', handleKeyDown)
  })

  return (
    <div className='buttons'>
        <Button content ='AC' onClick={onAllClearButtonClick} />
        <Button content='÷' operand='operand' onClick={() => onOperatorButtonClick('÷')} />
        <Button content='7' onClick={() => onDigitButtonClick(7)} />
        <Button content='8' onClick={() => onDigitButtonClick(8)} />
        <Button content='9' onClick={() => onDigitButtonClick(9)} />
        <Button content='×' operand='operand' onClick={() => onOperatorButtonClick('×')} />
        <Button content='4' onClick={() => onDigitButtonClick(4)} />
        <Button content='5' onClick={() => onDigitButtonClick(5)} />
        <Button content='6' onClick={() => onDigitButtonClick(6)} />
        <Button content='-' operand='operand' onClick={() => onOperatorButtonClick('-')} />
        <Button content='1' onClick={() => onDigitButtonClick(1)} />
        <Button content='2' onClick={() => onDigitButtonClick(2)} />
        <Button content='3' onClick={() => onDigitButtonClick(3)} />
        <Button content='+' operand='operand' onClick={() => onOperatorButtonClick('+')} />
        <Button content='0' onClick={() => onDigitButtonClick(0)} />
        <Button content='.' onClick={onPointButtonClick} />
        <Button content='=' onClick={onEqualButtonClick} />
      </div>
  )
}
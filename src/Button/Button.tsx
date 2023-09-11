import React from 'react';
import './Button.scss';
import classNames from 'classnames';

type Props = {
  content: string;
  operand?: string;
  onClick?: () => void
}

export const Button: React.FC<Props> = ({ content, operand, onClick  }) => {


  return <div className={classNames('button', 
            {'zero' : content === '0'},
            {'ac' : content === 'AC'},
            {'equals' : content === '='},
            {'operand' : operand === 'operand'},
          )}
          onClick={onClick}
          >
              {content}
         </div>;
}
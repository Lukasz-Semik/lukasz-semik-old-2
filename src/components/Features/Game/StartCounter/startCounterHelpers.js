import { max } from 'lodash';

import { generateRandom } from '@/helpers/math';

export const prepareLetters = sentence => {
  const letters = sentence.split('');
  const fallingDelays = new Array(letters.length)
    .fill(null)
    .map(() => Number(`${generateRandom(0, 2)}.${generateRandom(5, 9)}`));
  const maxValue = max(fallingDelays);

  let isLastMarked = false;

  return fallingDelays.map((delay, index) => {
    const isLast = !isLastMarked && delay === maxValue;

    if (isLast) {
      isLastMarked = true;
    }

    return {
      content: letters[index],
      delay: `${delay}s`,
      isLast,
    };
  });
};

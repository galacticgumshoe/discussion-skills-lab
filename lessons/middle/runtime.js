// MIT. Only Middle's legacy research flag needs a binding bridge. Controllers,
// persistence, navigation and rendering remain shared implementations.
import { standardActivityRegistry } from '../../assets/js/app/section-renderer.js';

const choice = standardActivityRegistry['multiple-choice'];
export const middleRegistry = Object.freeze({ ...standardActivityRegistry,
  'multiple-choice': Object.freeze({ ...choice,
    read(activity, state) {
      const own = choice.read(activity, state);
      if (activity.id === 'research' && state.flags['research-correct-ever']) own.earnedQuestionIds = ['effective-research'];
      return own;
    },
    write(activity, state, own) {
      choice.write(activity, state, own);
      if (activity.id === 'research' && own.earnedQuestionIds.includes('effective-research')) state.flags['research-correct-ever'] = true;
    }
  })
});

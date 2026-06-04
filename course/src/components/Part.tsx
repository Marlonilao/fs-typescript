import type { CoursePart } from '../types';
import { assertNever } from '../utils';

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case 'basic':
      return (
        <>
          <p>
            {part.name} {part.exerciseCount}
          </p>
          <p>{part.description}</p>
        </>
      );
    case 'group':
      return (
        <>
          <p>
            {part.name} {part.exerciseCount}
          </p>
          <p>Project exercise: {part.groupProjectCount}</p>
        </>
      );
    case 'background':
      return (
        <>
          <p>
            {part.name} {part.exerciseCount}
          </p>
          <p>{part.description}</p>
          <p>submit to {part.backgroundMaterial}</p>
        </>
      );

    case 'special':
      return (
        <>
          <p>
            {part.name} {part.exerciseCount}
          </p>
          <p>{part.description}</p>
          <p>required skills: {part.requirements.join(', ')}</p>
        </>
      );

    default:
      return assertNever(part);
  }
};

export default Part;

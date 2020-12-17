import {renderNextDays} from '../helpers/format.helper';

export default function useNextDays() {
  return renderNextDays(14).map((e, i) =>
    !i
      ? {
          choose: true,
          date: e,
        }
      : {
          choose: false,
          date: e,
        },
  );
}

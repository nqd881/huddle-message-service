import { AnyValueObject } from "ddd-node";
import { uniqWith } from "lodash";

export const getUniqueValueObjects = <T extends AnyValueObject>(
  valueObjects: T[]
) => {
  return uniqWith(valueObjects, (x, y) => x.equals(y));
};

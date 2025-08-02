import { MeasuringStrategy, type MeasuringConfiguration } from "@dnd-kit/core";

export const dragMeasuring: MeasuringConfiguration = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
};

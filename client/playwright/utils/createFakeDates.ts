import { faker } from "@faker-js/faker";

export const createFakeDates = (startOffsetDays: number = 1) => {
  const fakeStart = faker.date
    .soon({ days: startOffsetDays })
    .toISOString()
    .split("T")[0]
    .split("-");
  const startDate = `${fakeStart[1]}/${fakeStart[2]}/${fakeStart[0]}`;

  const fakeEnd = faker.date
    .future({ refDate: startDate })
    .toISOString()
    .split("T")[0]
    .split("-");
  const endDate = `${fakeEnd[1]}/${fakeEnd[2]}/${fakeEnd[0]}`;

  return {
    startDate,
    endDate,
  };
};

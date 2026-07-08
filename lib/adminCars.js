const KEY = "loisnx.admin.overrides";

function read() {
  if (typeof window === "undefined") return { added: [], edited: {}, deletedIds: [] };
  try {
    const parsed = JSON.parse(window.localStorage.getItem(KEY));
    return {
      added: parsed?.added || [],
      edited: parsed?.edited || {},
      deletedIds: parsed?.deletedIds || [],
    };
  } catch {
    return { added: [], edited: {}, deletedIds: [] };
  }
}

function write(data) {
  window.localStorage.setItem(KEY, JSON.stringify(data));
}

/** Applies every local add/edit/delete on top of the base (mock) dataset.
 *  Only meaningful in the browser — server components never see these. */
export function applyLocalOverrides(baseCars) {
  const { added, edited, deletedIds } = read();
  const withEdits = baseCars
    .filter((car) => !deletedIds.includes(car.id))
    .map((car) => (edited[car.id] ? { ...car, ...edited[car.id] } : car));
  const addedFiltered = added.filter((car) => !deletedIds.includes(car.id));
  return [...addedFiltered, ...withEdits];
}

export function addLocalCar(carData) {
  const data = read();
  const now = new Date().toISOString();
  const car = { status: "available", featured: false, ...carData, id: `local-${Date.now().toString(36)}`, createdAt: now, updatedAt: now };
  data.added.unshift(car);
  write(data);
  return car;
}

export function updateLocalCar(id, patch) {
  const data = read();
  const now = new Date().toISOString();
  const addedIndex = data.added.findIndex((car) => car.id === id);
  if (addedIndex >= 0) {
    data.added[addedIndex] = { ...data.added[addedIndex], ...patch, updatedAt: now };
    write(data);
    return data.added[addedIndex];
  }
  data.edited[id] = { ...(data.edited[id] || {}), ...patch, updatedAt: now };
  write(data);
  return { id, ...patch };
}

export function deleteLocalCar(id) {
  const data = read();
  data.added = data.added.filter((car) => car.id !== id);
  if (!data.deletedIds.includes(id)) data.deletedIds.push(id);
  write(data);
}

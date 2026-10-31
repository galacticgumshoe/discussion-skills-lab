// Test-only fixture operations, used identically in Node and browser checks.
export function candidateFor(base, fixture) {
  if (Object.hasOwn(fixture, 'root')) return fixture.root;
  const data = structuredClone(base);
  if (fixture.document) Object.assign(data, fixture.document);
  if (fixture.remove) delete data[fixture.remove];
  if (Object.hasOwn(fixture, 'item')) data.items[0] = fixture.item === null ? null : { ...data.items[0], ...fixture.item };
  if (fixture.duplicate) data.items.push({ ...data.items[0], title: 'different title, same id' });
  return data;
}

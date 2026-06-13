const OVERRIDES: Record<string, string> = {
  'c#': 'csharp',
  'c++': 'cpp',
  '.net': 'dotnet',
};

export function tagSlug(tag: string): string {
  const lower = tag.toLowerCase();
  return (
    OVERRIDES[lower] ?? lower.replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  );
}

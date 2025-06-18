export function buildFolderTree(files) {
  const tree = {};

  for (const path in files) {
    const parts = path.split("/");
    let current = tree;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isFile = i === parts.length - 1;

      if (isFile) {
        current[part] = "file";
      } else {
        current[part] = current[part] || {};
        current = current[part];
      }
    }
  }

  return tree;
}

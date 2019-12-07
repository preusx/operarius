const isDef = v => v !== undefined && v !== null;
const isObject = obj => obj !== null && typeof obj === 'object';

function stripNamespaceIfExists(name) {
  if (!isDef(name) || name.indexOf('@') < 0) {
    return name;
  }
  return name.split('/').slice(-1).join('');
}

function normalizeModuleName(name) {
  return stripNamespaceIfExists(name);
}

function normalizeAuthor(_author) {
  let author = '';

  if (typeof (_author) === 'string') {
    author = _author;
  } else if (isObject(_author)) {
    author = _author.name;
  }

  return author;
}

module.exports = {
  normalizeModuleName,
  normalizeAuthor,
  stripNamespaceIfExists,
};

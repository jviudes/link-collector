const urlRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
const regexUrl = new RegExp(urlRegex);

const pathRegex = /\/[^#]?[a-z0-9]+/;
const regexPath = new RegExp(pathRegex);

function isUrlValid(url: string) {
  return regexUrl.test(url);
}

function isSubPath(path: string) {
  return regexPath.test(path);
}

export { isUrlValid, isSubPath };

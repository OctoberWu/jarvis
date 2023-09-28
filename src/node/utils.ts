const JS_TYPE_RE = /\.((j|t)sx?)$|\.mjs$/;
export const isJSRequest = (url: string): boolean => {
  url = cleanUrl(url);
  return JS_TYPE_RE.test(url);
};

const CSS_TYPE_RE = new RegExp(/\.css$/);
export const isCssRequest = (request: string): boolean => CSS_TYPE_RE.test(request);

export const queryRE = /\?.*$/s;
export const hashRE = /#.*$/s;

export const cleanUrl = (url: string): string => url.replace(hashRE, '').replace(queryRE, '');

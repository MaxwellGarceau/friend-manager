export const getJwtToken = () => document.cookie.replace(/(?:(?:^|.*;\s*)jwtToken\s*\=\s*([^;]*).*$)|^.*$/, '$1');

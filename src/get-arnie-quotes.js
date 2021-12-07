const { httpGet } = require('./mock-http-interface');

const getArnieQuotes = async (urls) => {
  const promises = urls.map(async url => (await httpGet(url)));
  return (await Promise.allSettled(promises)).map(result => {
    const { status, body } = result.value;
    if (status === 200) return { 'Arnie Quote': JSON.parse(body)['message'] };
    else return { 'FAILURE': JSON.parse(body)['message'] };
  });
};

module.exports = {
  getArnieQuotes,
};

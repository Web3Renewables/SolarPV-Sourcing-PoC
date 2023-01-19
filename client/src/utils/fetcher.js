const fetcher = (...args) => fetch(...args).then((res) => res.json());

function fetchUtil(resource, requestOptions) {
  let { headers, method, body } = requestOptions;

  return fetcher(resource, {
    method,
    headers: {
        ...headers,
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    body,
  });
}

export { fetcher, fetchUtil };

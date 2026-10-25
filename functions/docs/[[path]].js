// Internal docs live in the repo but are not public: /docs/* returns 404.
export const onRequest = () => new Response('Not found', { status: 404 });

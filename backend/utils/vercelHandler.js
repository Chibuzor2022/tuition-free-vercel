import serverless from "serverless-http";

// Wrap Express app into Vercel-compatible handler
export const createHandler = (app) => {
  return async (req, res) => {
    const handler = serverless(app);
    return handler(req, res);
  };
};

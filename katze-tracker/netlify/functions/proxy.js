const ALLOWED_HOSTS = new Set(["api.upbit.com", "api.bitget.com"]);

const corsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-headers": "Content-Type",
  "access-control-allow-methods": "GET, OPTIONS",
  "cache-control": "no-store",
};

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: "",
    };
  }

  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: "Method not allowed",
    };
  }

  const target = event.queryStringParameters && event.queryStringParameters.url;
  if (!target) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: "Missing url parameter",
    };
  }

  let parsed;
  try {
    parsed = new URL(target);
  } catch (error) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: "Invalid url",
    };
  }

  if (!ALLOWED_HOSTS.has(parsed.hostname)) {
    return {
      statusCode: 403,
      headers: corsHeaders,
      body: "Host not allowed",
    };
  }

  try {
    const upstream = await fetch(parsed.toString(), {
      headers: { accept: "application/json" },
    });
    const body = await upstream.text();

    return {
      statusCode: upstream.status,
      headers: {
        ...corsHeaders,
        "content-type": upstream.headers.get("content-type") || "application/json",
      },
      body,
    };
  } catch (error) {
    return {
      statusCode: 502,
      headers: corsHeaders,
      body: "Upstream fetch failed",
    };
  }
};

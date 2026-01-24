const OPENAI_ENDPOINT = "https://api.openai.com/v1/responses";
const MODEL = "gpt-4o-mini";

const corsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-headers": "Content-Type",
  "access-control-allow-methods": "POST, OPTIONS",
  "cache-control": "no-store",
};

const jsonHeaders = {
  ...corsHeaders,
  "content-type": "application/json",
};

const normalize = (value) => (typeof value === "string" ? value.trim() : "");

const extractOutputText = (payload) => {
  if (!payload || !Array.isArray(payload.output)) return "";
  for (const item of payload.output) {
    if (!item || !Array.isArray(item.content)) continue;
    const textPart = item.content.find((part) => part && part.type === "output_text");
    if (textPart && typeof textPart.text === "string") return textPart.text;
  }
  return "";
};

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: jsonHeaders,
      body: JSON.stringify({ success: false, msg: "Method not allowed." }),
    };
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers: jsonHeaders,
      body: JSON.stringify({ success: false, msg: "OPENAI_API_KEY is not set." }),
    };
  }

  let payload = {};
  try {
    payload = JSON.parse(event.body || "{}");
  } catch (error) {
    return {
      statusCode: 400,
      headers: jsonHeaders,
      body: JSON.stringify({ success: false, msg: "Invalid JSON body." }),
    };
  }

  const departure = normalize(payload.departure).toUpperCase();
  const destination = normalize(payload.destination).toUpperCase();
  const coin = normalize(payload.coin).toUpperCase();
  const chain = normalize(payload.chain).toUpperCase();

  if (!departure || !destination || !coin || !chain) {
    return {
      statusCode: 400,
      headers: jsonHeaders,
      body: JSON.stringify({ success: false, msg: "All fields are required." }),
    };
  }

  const prompt = `${departure}->${destination} ${coin}/${chain} \uc774\uccb4\ud560\ub54c \uc18c\uc694\ub418\ub294 \uc774\uccb4\uc2dc\uac04\uc744 \ucd94\uc815\ud574\uc11c \uc54c\ub824\uc918. \ub2f5\ubcc0 \uc591\uc2dd\uc740 \uc815\ud655\ud558\uac8c, \uc624\ucc28\ub294 \ucd5c\uc18c\ub85c, \ubc94\uc704\ub3c4 \ucd5c\uc18c\ub85c [\uac70\ub798\uc18c1 -> \uac70\ub798\uc18c2, \ucf54\uc778\uba85/\uccb4\uc778\uba85, \uc57d 00~00\ubd84 ]`;

  try {
    const upstream = await fetch(OPENAI_ENDPOINT, {
      method: "POST",
      headers: {
        authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ model: MODEL, input: prompt, store: false }),
    });

    const raw = await upstream.text();
    let data = null;
    try {
      data = JSON.parse(raw);
    } catch (error) {
      data = null;
    }

    if (!upstream.ok) {
      const msg = data && data.error && data.error.message
        ? data.error.message
        : "OpenAI request failed.";
      return {
        statusCode: 502,
        headers: jsonHeaders,
        body: JSON.stringify({ success: false, msg }),
      };
    }

    const outputText = (data && typeof data.output_text === "string" ? data.output_text : "")
      || extractOutputText(data);
    const result = typeof outputText === "string" ? outputText.trim() : "";
    if (!result) {
      return {
        statusCode: 502,
        headers: jsonHeaders,
        body: JSON.stringify({ success: false, msg: "Empty response from model." }),
      };
    }

    return {
      statusCode: 200,
      headers: jsonHeaders,
      body: JSON.stringify({ success: true, result }),
    };
  } catch (error) {
    return {
      statusCode: 502,
      headers: jsonHeaders,
      body: JSON.stringify({ success: false, msg: "Chain analysis failed." }),
    };
  }
};

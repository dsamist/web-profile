const STATIC_EXT = /\.(css|js|map|png|jpg|jpeg|gif|ico|svg|webp|woff|woff2|ttf|eot|xml|txt)$/i;

export default async function handler(request, context) {
  const url = new URL(request.url);

  // Skip static assets — only log actual page visits
  if (STATIC_EXT.test(url.pathname)) return;

  const axiomToken = Deno.env.get("AXIOM_TOKEN");
  const axiomDataset = Deno.env.get("AXIOM_DATASET") ?? "semmanuel-blog-dataset";
  const axiomUrl = Deno.env.get("AXIOM_URL") ?? "https://eu-central-1.aws.edge.axiom.co";

  if (!axiomToken) return;

  const ip =
    request.headers.get("x-nf-client-connection-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  const country = context.geo?.country?.code ?? request.headers.get("x-country") ?? undefined;
  const city = context.geo?.city ?? undefined;
  const referer = request.headers.get("referer") ?? undefined;
  const userAgent = request.headers.get("user-agent") ?? undefined;

  const event = {
    _time: new Date().toISOString(),
    level: "info",
    event: "page.visited",
    env: "production",
    site: "semmanuel.com",
    path: url.pathname,
    ip,
    ...(country && { country }),
    ...(city && { city }),
    ...(referer && { referer }),
    ...(userAgent && { userAgent }),
  };

  // Use waitUntil so the log fires after the response — zero added latency
  context.waitUntil(
    fetch(`${axiomUrl}/v1/ingest/${axiomDataset}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${axiomToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([event]),
    }).catch(() => {})
  );
}

export const config = { path: "/*" };

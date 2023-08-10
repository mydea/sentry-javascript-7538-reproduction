// This file NEEDS to be CommonJS. Opentelemetry does not work with
// ESM modules. So, we use commonJS and import the app file
// at the bottom.
const Sentry = require("@sentry/node");

const express = require("express");

const { ProfilingIntegration } = require("@sentry/profiling-node");

const app = express();

/* Sentry.init({
  dsn: "DSN_HERE",

  enabled: true,
  debug: true,

  instrumenter: "otel",

  release: "testing",
  environment: "sentry-reproduction",
  tracesSampleRate: 1.0,

  profilesSampleRate: 1.0, // Profiling sample rate is relative to tracesSampleRate

  beforeSend: (event) => {
    console.log("Testing");
    return event;
  },

  integrations: [
    new Sentry.Integrations.Express({ app }),
    new Sentry.Integrations.Http({ tracing: true }),
    new ProfilingIntegration(),
  ],
}); */

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());
//app.use(Sentry.Handlers.tracingHandler());

app.get("/", function (req, res) {
  Sentry.addBreadcrumb({
    message: "Custom Breadcrumb Inserted",
  });
  console.log("Triggered route");
  return res.json({ success: true });
});

const port = process.env.PORT || 8085;

app.listen(port, () => {
  console.log(`http server listening on port ${port}`);
});

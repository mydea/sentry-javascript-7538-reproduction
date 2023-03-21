// This file NEEDS to be CommonJS. Opentelemetry does not work with
// ESM modules. So, we use commonJS and import the app file
// at the bottom.
const Sentry = require("@sentry/node");
const {
  SentrySpanProcessor,
  SentryPropagator,
} = require("@sentry/opentelemetry-node");

const express = require("express");

const { Integrations } = require("@sentry/tracing");

const { HttpInstrumentation } = require("@opentelemetry/instrumentation-http");
const { GrpcInstrumentation } = require("@opentelemetry/instrumentation-grpc");

const opentelemetry = require("@opentelemetry/sdk-node");
const {
  OTLPTraceExporter,
} = require("@opentelemetry/exporter-trace-otlp-grpc");

const { ProfilingIntegration } = require("@sentry/profiling-node");
const {
  ExpressInstrumentation,
} = require("@opentelemetry/instrumentation-express");

const app = express();

Sentry.init({
  dsn: "https://570b5cb8bd594e5da60603c626595195@o1337141.ingest.sentry.io/6606495",

  enabled: true,
  debug: true,

  //instrumenter: "otel",

  release: "testing",
  environment: "sentry-reproduction",
  tracesSampleRate: 1.0,

  profilesSampleRate: 1.0, // Profiling sample rate is relative to tracesSampleRate

  beforeSend: (event) => {
    console.log("Testing");
    return event;
  },

  integrations: [
    new Integrations.Express({ app }),
    new Sentry.Integrations.Http({ tracing: true }),
    new ProfilingIntegration(),
  ],
});

const sdk = new opentelemetry.NodeSDK({
  textMapPropagator: new SentryPropagator(),
  /*
    sampler: new opentelemetry.tracing.TraceIdRatioBasedSampler(
      TRACE_SAMPLE_PERCENTAGE
    ),
    */
  // Existing config
  traceExporter: new OTLPTraceExporter(),
  instrumentations: [
    new HttpInstrumentation(),
    // These instrumentations increase memory usage significantly so keeping disabled for now.
    //new NetInstrumentation(),
    //new FsInstrumentation(),
    //new BunyanInstrumentation(),
    //new DnsInstrumentation(),
    new ExpressInstrumentation(),
    new GrpcInstrumentation(),
  ],

  // Sentry config
  spanProcessor: new SentrySpanProcessor(),
});

//otelApi.propagation.setGlobalPropagator(new SentryPropagator())

sdk.start();

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

app.get("/", function (req, res) {
  Sentry.addBreadcrumb("Health check");
  console.log("Triggered route");
  return res.json({ success: true });
});

const port = process.env.PORT || 8085;

app.listen(port, () => {
  console.log(`http server listening on port ${port}`);
});

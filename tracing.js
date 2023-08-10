const { GrpcInstrumentation } = require("@opentelemetry/instrumentation-grpc");

const grpcInstrumentation = new GrpcInstrumentation();

const { HttpInstrumentation } = require("@opentelemetry/instrumentation-http");

const {
  SentrySpanProcessor,
  SentryPropagator,
} = require("@sentry/opentelemetry-node");

const { diag, DiagConsoleLogger, DiagLogLevel } = require("@opentelemetry/api");

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ALL);

const opentelemetry = require("@opentelemetry/sdk-node");

// const { ConsoleSpanExporter } = require("@opentelemetry/sdk-trace-node");

const {
  OTLPTraceExporter,
} = require("@opentelemetry/exporter-trace-otlp-grpc");

const {
  ExpressInstrumentation,
} = require("@opentelemetry/instrumentation-express");

const sdk = new opentelemetry.NodeSDK({
  traceExporter: new OTLPTraceExporter(),
  //traceExporter: new ConsoleSpanExporter(),
  instrumentations: [
    // grpcInstrumentation,
    new HttpInstrumentation(),
    new ExpressInstrumentation(),
  ],

  // Sentry config
  // spanProcessor: new SentrySpanProcessor(),
  // textMapPropagator: new SentryPropagator(),
});

sdk.start();

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('@sentry/core');
const express = require('./node/integrations/express.js');
const postgres = require('./node/integrations/postgres.js');
const mysql = require('./node/integrations/mysql.js');
const mongo = require('./node/integrations/mongo.js');
const prisma = require('./node/integrations/prisma.js');
const graphql = require('./node/integrations/graphql.js');
const apollo = require('./node/integrations/apollo.js');
const browsertracing = require('./browser/browsertracing.js');
const request = require('./browser/request.js');
const extensions = require('./extensions.js');



exports.IdleTransaction = core.IdleTransaction;
exports.Span = core.Span;
exports.SpanStatus = core.SpanStatus;
exports.TRACEPARENT_REGEXP = core.TRACEPARENT_REGEXP;
exports.Transaction = core.Transaction;
exports.extractTraceparentData = core.extractTraceparentData;
exports.getActiveTransaction = core.getActiveTransaction;
exports.hasTracingEnabled = core.hasTracingEnabled;
exports.spanStatusfromHttpCode = core.spanStatusfromHttpCode;
exports.startIdleTransaction = core.startIdleTransaction;
exports.stripUrlQueryAndFragment = core.stripUrlQueryAndFragment;
exports.Express = express.Express;
exports.Postgres = postgres.Postgres;
exports.Mysql = mysql.Mysql;
exports.Mongo = mongo.Mongo;
exports.Prisma = prisma.Prisma;
exports.GraphQL = graphql.GraphQL;
exports.Apollo = apollo.Apollo;
exports.BROWSER_TRACING_INTEGRATION_ID = browsertracing.BROWSER_TRACING_INTEGRATION_ID;
exports.BrowserTracing = browsertracing.BrowserTracing;
exports.defaultRequestInstrumentationOptions = request.defaultRequestInstrumentationOptions;
exports.instrumentOutgoingRequests = request.instrumentOutgoingRequests;
exports.addExtensionMethods = extensions.addExtensionMethods;
//# sourceMappingURL=index.js.map

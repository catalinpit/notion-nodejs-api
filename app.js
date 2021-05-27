const app = require('fastify')({ logger: true });

require('dotenv').config();
app.register(require('./src/routes/routes'));

app.listen(process.env.PORT, (err, addr) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }

    app.log.info(`Your server is listening on port ${process.env.PORT} 🧨`);
});
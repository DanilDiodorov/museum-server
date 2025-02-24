export default () => ({
    port: parseInt(process.env.PORT) || 5000,
    fileUrl: `https://${process.env.DOMAIN}/api/file`,
    jwtSecret: process.env.JWT_SECRET,
    domain: process.env.DOMAIN,
})

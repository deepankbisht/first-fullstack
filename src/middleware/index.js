import jwt  from "jsonwebtoken";

function authMiddleware(req, res, next) {
    const token = req.headers.token;

    if (!token) {
        res.status(403).send({
            message: "You are not logged in",
        });
        return;
    }

    const decoded = jwt.verify(token, "Deepank@1234");

    const username = decoded.username;

    if (!username) {
        res.status(403).send({
            message: "malformed token",
        });
        return;
    }
    req.user = username;
    next();
}

export { authMiddleware };

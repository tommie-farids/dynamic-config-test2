import * as chai from "chai"
import { default as chaiHttp, request } from "chai-http"

import { app, db } from "../index.js"

chai.use(chaiHttp);

const expect = chai.expect;

before(done => {
    const createTable = `
        CREATE TABLE IF NOT EXISTS products (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            price INT NOT NULL,
            img VARCHAR(255) NOT NULL
        );
    `
    db.query(createTable, (err, result) => {
        if (err) return done(err);
        done();
    });
});

after(done => {
    db.end();
    done();
});

describe("Products API", () => {
    let testId;

    it("GET /products - should return an array", done => {
        request.execute(app)
            .get("/products")
            .end((_, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an("array");
                done();
            });
    });

    it("POST /products - should create a product", done => {
        request.execute(app)
            .post("/products")
            .send({
                name: "Test Product",
                description: "Lorem ipsum dolor sit amet...",
                price: 282,
                img: "https://imgurl.com/img.png"
            })
            .end((_, res) => {
                expect(res).to.have.status(200);
                expect(res.body.insertId).to.be.a("number");
                testId = res.body.insertId;
                done();
            });
    });

    it("PUT /products/:id - should update the test product", done => {
        request.execute(app)
            .put(`/products/${testId}`)
            .send({
                name: "Updated Test Product",
                description: "Updated - Lorem ipsum dolor...",
                price: 482,
                img: "https://imgurl.com/img.jpeg"
            })
            .end((_, res) => {
                expect(res).to.have.status(200);
                expect(res.body.affectedRows).to.equal(1);
                done();
            });
    });

    it("DELETE /products - should delete the test product", done => {
        request.execute(app)
            .delete(`/products/${testId}`)
            .end((_, res) => {
                expect(res).to.have.status(200);
                expect(res.body.affectedRows).to.equal(1);
                done();
            });
    });
});
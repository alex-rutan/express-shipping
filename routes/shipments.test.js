"use strict";

const request = require("supertest");
const app = require("../app");


describe("POST /", function () {
  test("valid", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(resp.body).toEqual({ shipped: expect.any(Number) });
  });

  test("invalid productId", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 999,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(resp.body.error).toEqual({
      "message": [
        "instance.productId must be greater than or equal to 1000"
      ],
      "status": 400
    });
    expect(resp.status).toEqual(400);
  });
});

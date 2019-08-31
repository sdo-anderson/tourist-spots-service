const chai = require("chai"),
  should = chai.should(),
  expect = chai.expect;
const server = require("../src/server/server");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

/**
 * @author Anderson Oliveira
 * @copyright 08/2019
 * @description Check route root with success
 */
describe("GET ROOT", () => {
  it("it should GET ROOT the success status", done => {
    chai
      .request(server)
      .get("/")
      .end((err, res) => {
        res.should.have.status(200);
        console.log("TYPE", typeof res.text);
        expect(JSON.parse(res.text))
          .to.have.property("status")
          .equal("Conectado ao Server");
        done();
      });
  });
});

/**
 * @author Anderson Oliveira
 * @copyright 08/2019
 * @description Check route root with success
 */
describe("GET SPOTS", () => {
  it("it should GET SPOTS the success status", done => {
    chai
      .request(server)
      .post("/api")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send({
        query: "{getSpots { address }}"
      })
      .end((err, res) => {
        console.log("SPOTS ===> ", JSON.parse(res.text).data.getSpots);
        res.should.have.status(200);
        JSON.parse(res.text)
          .data.getSpots.should.have.property("address")
          .equal("Rua Um");
        // expect(JSON.parse(res.text).data.getSpots)
        //   .to.have.property("id")
        //   .equal("1");
        done();
      });
  });
});

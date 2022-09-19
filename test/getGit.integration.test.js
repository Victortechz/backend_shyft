const express = require("express");
const request = require("supertest");
const getGitRoutes = require("../routes/getGitRoutes");
const { toBeOneOf } = require("jest-extended");
expect.extend({ toBeOneOf });

const app = express();
app.use(express.json());
app.use("/api/getrepo", getGitRoutes);


describe("integration test for getrepo api", () => {
  it("POST /api/getrepo -success- get repo/repos", async () => {
    const { body, statusCode } = await request(app)
      .post("/api/getrepo")
      .send([{ userName: "timmywheels", repoName: "agile-week" }])
      .catch((err) => {
        console.log(err, "err");
        throw err;
      });

    expect(statusCode).toBe(200);
    expect(body).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          userName: expect.toBeOneOf([expect.any(String), undefined]),
          repoName: expect.toBeOneOf([expect.any(String), undefined]),
          description: expect.toBeOneOf([expect.any(String), undefined]),
          stargazersCount: expect.toBeOneOf([expect.any(Number), undefined]),
          status: expect.toBeOneOf([expect.any(String), undefined]),
          errId: expect.toBeOneOf([expect.any(String), undefined]),
          errRepo: expect.toBeOneOf([expect.any(String), undefined]),
        }),
      ])
    );
  });
});

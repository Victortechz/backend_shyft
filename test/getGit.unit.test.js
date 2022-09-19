const { generateUrl } = require("../helperFunctions/generateUrl");


describe("unit testing for generate url function", () => {
  test("generate an array of object with url strings", () => {
    const userObject = [
      {
        userName: "timmywheels",
        repoName: "agile-week",
      },
      {
        userName: "timmywheels",
        repoName: "agile-week",
      },
    ];
    const baseURL = "https://api.github.com";

    expect(generateUrl(userObject, baseURL)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          userName: expect.any(String),
          repoName: expect.any(String),
          repoUrl: expect.any(String),
        }),
      ])
    );
  });
});

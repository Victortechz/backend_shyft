


// TAKES IN AN USER OBJECT AND BASEURL TO GENERATE A URL STRING PER OBJECT
const generateUrl = (urlList, baseURL) => {
  const modifiedUrl = urlList.map((url) => {
    return {
      userName: url.userName,
      repoName: url.repoName,
      repoUrl: baseURL.concat(`/repos/${url.userName}/${url.repoName}`),
    };
  });
  return modifiedUrl;
};

module.exports = { generateUrl };

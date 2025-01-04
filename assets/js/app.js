document.addEventListener("DOMContentLoaded", () => {
  const fetchLastCommitForUser = async () => {
    const username = "realarmaansidhu";
    const apiUrl = `https://api.github.com/users/${username}/repos`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

      const repos = await response.json();

      const commitPromises = repos.map(async (repo) => {
        const commitsUrl = `https://api.github.com/repos/${username}/${repo.name}/commits`;
        const commitResponse = await fetch(commitsUrl);
        if (commitResponse.ok) {
          const commits = await commitResponse.json();
          return commits.length > 0 ? commits[0]?.commit.author.date : null;
        }
        return null;
      });

      const commitDates = await Promise.all(commitPromises);

      const latestCommitDate = commitDates
        .filter(Boolean)
        .map((date) => new Date(date))
        .reduce((latest, current) => (current > latest ? current : latest), new Date(0));

      const lastCommitElement = document.getElementById("lastCommit");
      lastCommitElement.innerHTML =
        latestCommitDate.getTime() > 0
          ? `<strong>Last Committed: <span style="color: blue;">${latestCommitDate.toLocaleString()}</span> (Eastern Standard Time, GMT-5)</strong>`
          : "No commits found.";
    } catch (error) {
      console.error("Error fetching last commit:", error);
      document.getElementById("lastCommit").textContent = "Failed to fetch the last commit.";
    }
  };

  fetchLastCommitForUser();
});
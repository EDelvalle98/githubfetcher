document.getElementById("fetchData").addEventListener("click", async () => {
    const username = document.getElementById("username").value.trim();
    const userDetails = document.getElementById("userDetails");
  
    if (!username) {
      alert("Please enter a username.");
      return;
    }
  
    try {
      const userResponse = await fetch(`https://api.github.com/users/${username}`);
      if (!userResponse.ok) {
        throw new Error("User not found");
      }
      const userData = await userResponse.json();
  
      
      const repoResponse = await fetch(userData.repos_url);
      const repoData = await repoResponse.json();
      const lastFiveRepos = repoData.slice(0, 5);
  
      
    userDetails.innerHTML = `
    <h2 class="mb-4">WANTED</h2>
    <img src="${userData.avatar_url}" alt="User Avatar" width="150">
    <h3 class="mt-3">${userData.name || "Alias Unknown"}</h3>
    <p>Alias: ${username}</p>
    <p>Joined GitHub: ${new Date(userData.created_at).toLocaleDateString()}</p>
    <a href="${userData.html_url}" target="_blank" class="btn btn-dark mt-3">View Full Bounty Profile</a>
    <h4 class="mt-4">Last Known Activities:</h4>
    <ul class="list-group">
      ${lastFiveRepos.map(repo => `<li class="list-group-item">${repo.name}</li>`).join("")}
    </ul>
  `;
  
      userDetails.classList.remove("d-none");
    } catch (error) {
      alert(error.message);
    }
  });
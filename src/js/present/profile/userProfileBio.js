export function userProfileBio(profile) {
  const profileBioContainer = document.getElementById("profile-bio-container");
  profileBioContainer.innerHTML = "";

  const profileImage = document.getElementById("profile-image");
  profileImage.src = profile.data.avatar.url;
  profileImage.alt = `${profile.data.name}'s profile picture`;

  const profileUsername = document.createElement("p");
  profileUsername.classList.add("text-2xl");
  profileUsername.innerHTML = `<span class="font-semibold">${profile.data.name}</span> (${profile.data._count.listings})`;

  const profileBio = document.createElement("p");
  profileBio.innerHTML = profile.data.bio || "No bio available";

  profileBioContainer.append(profileUsername);
  profileBioContainer.append(profileBio);
}

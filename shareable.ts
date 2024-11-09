document.addEventListener("DOMContentLoaded", () => {
  const resumeForm = document.getElementById("resumeForm") as HTMLFormElement;
  const profilePicInput = document.getElementById("profilePic") as HTMLInputElement;
  const profilePicPreview = document.getElementById("profilePicPreview") as HTMLDivElement;
  const profilePicImage = document.getElementById("profilePicImage") as HTMLImageElement;
  const resumePreview = document.getElementById("resumePreview") as HTMLDivElement;
  const shareableLinkContainer = document.getElementById("shareable-link-container") as HTMLDivElement;
  const shareableLinkElement = document.getElementById("shareable-link") as HTMLAnchorElement;
  const downloadPdfButton = document.getElementById("downloadPdf") as HTMLButtonElement;

  // Profile Picture Preview
  profilePicInput?.addEventListener("change", (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target?.result) {
          profilePicImage.src = event.target.result as string;
          profilePicPreview.classList.remove("hidden");
        }
      };
      reader.readAsDataURL(file);
    }
  });

  // Handle Form Submission
  resumeForm?.addEventListener("submit", (e: Event) => {
    e.preventDefault();

    // Collect input values
    const username = (document.getElementById("userName") as HTMLInputElement).value;
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;
    const education = (document.getElementById("education") as HTMLTextAreaElement).value;
    const experience = (document.getElementById("experience") as HTMLTextAreaElement).value;
    const skills = (document.getElementById("skills") as HTMLTextAreaElement).value;
    const linkedin = (document.getElementById("linkedin") as HTMLInputElement).value;
    const github = (document.getElementById("github") as HTMLInputElement).value;
    const facebook = (document.getElementById("facebook") as HTMLInputElement).value;
    const twitter = (document.getElementById("twitter") as HTMLInputElement).value;

    // Save form data in localStorage with the username as the key
    const resumeData = {
      name, email, phone, education, experience, skills,
    };
    localStorage.setItem(username, JSON.stringify(resumeData));

    // Generate Resume Preview with Editable Fields
    resumePreview.innerHTML = `
      ${profilePicPreview.classList.contains("hidden") ? "" : `
        <div style="display: flex; justify-content: center; margin-bottom: 1rem;">
          <img src="${profilePicImage.src}" class="profile-pic" style="width: 150px; height: 150px;" />
        </div>`}
      <input type="text" value="${name}" class="editable-input" style="font-size: 1.5rem; font-weight: bold; text-align: center; width: 100%;" />
     <p><strong style="font-weight: bold;">Email:</strong> <input type="text" value="${email}" class="editable-input" /></p>
<p><strong style="font-weight: bold;">Phone:</strong> <input type="text" value="${phone}" class="editable-input" /></p>

      
      <div class="resume-section">
        <h2>Education</h2>
        <ul>${education.split(",").map((edu) => `<li><input type="text" value="${edu.trim()}" class="editable-input" /></li>`).join("")}</ul>
      </div>
      
      <div class="resume-section">
        <h2>Work Experience</h2>
        <ul>${experience.split(",").map((exp) => `<li><input type="text" value="${exp.trim()}" class="editable-input" /></li>`).join("")}</ul>
      </div>
      
      <div class="resume-section">
        <h2>Skills</h2>
        <ul>${skills.split(",").map((skill) => `<li><input type="text" value="${skill.trim()}" class="editable-input" /></li>`).join("")}</ul>
      </div>
      
      <div class="resume-section">
        <h2>Social Media</h2>
        ${linkedin ? `<p><a href="${linkedin}" target="_blank">LinkedIn</a> <input type="text" value="${linkedin}" class="editable-input" /></p>` : ""}
        ${github ? `<p><a href="${github}" target="_blank">GitHub</a> <input type="text" value="${github}" class="editable-input" /></p>` : ""}
        ${facebook ? `<p><a href="${facebook}" target="_blank">Facebook</a> <input type="text" value="${facebook}" class="editable-input" /></p>` : ""}
        ${twitter ? `<p><a href="${twitter}" target="_blank">Twitter</a> <input type="text" value="${twitter}" class="editable-input" /></p>` : ""}
      </div>
    `;

    resumePreview.classList.remove("hidden");

    // Generate a shareable URL with the username
    const shareableURL = `${window.location.origin}?username=${encodeURIComponent(username)}`;
    shareableLinkContainer.style.display = "block";
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
  });

  // Handle PDF download
  downloadPdfButton.addEventListener("click", () => {
    window.print(); // Opens print dialog for saving as PDF
  });

  // Prefill the form based on the username in the URL
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get("username");
  if (username) {
    const savedResumeData = localStorage.getItem(username);
    if (savedResumeData) {
      const resumeData = JSON.parse(savedResumeData);
      (document.getElementById("userName") as HTMLInputElement).value = username;
      (document.getElementById("name") as HTMLInputElement).value = resumeData.name;
      (document.getElementById("email") as HTMLInputElement).value = resumeData.email;
      (document.getElementById("phone") as HTMLInputElement).value = resumeData.phone;
      (document.getElementById("education") as HTMLTextAreaElement).value = resumeData.education;
      (document.getElementById("experience") as HTMLTextAreaElement).value = resumeData.experience;
      (document.getElementById("skills") as HTMLTextAreaElement).value = resumeData.skills;
    }
  }
});

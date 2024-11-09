document.addEventListener("DOMContentLoaded", function () {
    var resumeForm = document.getElementById("resumeForm");
    var profilePicInput = document.getElementById("profilePic");
    var profilePicPreview = document.getElementById("profilePicPreview");
    var profilePicImage = document.getElementById("profilePicImage");
    var resumePreview = document.getElementById("resumePreview");
    var shareableLinkContainer = document.getElementById("shareable-link-container");
    var shareableLinkElement = document.getElementById("shareable-link");
    var downloadPdfButton = document.getElementById("downloadPdf");
    // Profile Picture Preview
    profilePicInput === null || profilePicInput === void 0 ? void 0 : profilePicInput.addEventListener("change", function (e) {
        var _a;
        var file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function (event) {
                var _a;
                if ((_a = event.target) === null || _a === void 0 ? void 0 : _a.result) {
                    profilePicImage.src = event.target.result;
                    profilePicPreview.classList.remove("hidden");
                }
            };
            reader.readAsDataURL(file);
        }
    });
    // Handle Form Submission
    resumeForm === null || resumeForm === void 0 ? void 0 : resumeForm.addEventListener("submit", function (e) {
        e.preventDefault();
        // Collect input values
        var username = document.getElementById("userName").value;
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phone").value;
        var education = document.getElementById("education").value;
        var experience = document.getElementById("experience").value;
        var skills = document.getElementById("skills").value;
        var linkedin = document.getElementById("linkedin").value;
        var github = document.getElementById("github").value;
        var facebook = document.getElementById("facebook").value;
        var twitter = document.getElementById("twitter").value;
        // Save form data in localStorage with the username as the key
        var resumeData = {
            name: name,
            email: email,
            phone: phone,
            education: education,
            experience: experience,
            skills: skills,
        };
        localStorage.setItem(username, JSON.stringify(resumeData));
        // Generate Resume Preview with Editable Fields
        resumePreview.innerHTML = "\n      ".concat(profilePicPreview.classList.contains("hidden") ? "" : "\n        <div style=\"display: flex; justify-content: center; margin-bottom: 1rem;\">\n          <img src=\"".concat(profilePicImage.src, "\" class=\"profile-pic\" style=\"width: 150px; height: 150px;\" />\n        </div>"), "\n      <input type=\"text\" value=\"").concat(name, "\" class=\"editable-input\" style=\"font-size: 1.5rem; font-weight: bold; text-align: center; width: 100%;\" />\n     <p><strong style=\"font-weight: bold;\">Email:</strong> <input type=\"text\" value=\"").concat(email, "\" class=\"editable-input\" /></p>\n<p><strong style=\"font-weight: bold;\">Phone:</strong> <input type=\"text\" value=\"").concat(phone, "\" class=\"editable-input\" /></p>\n\n      \n      <div class=\"resume-section\">\n        <h2>Education</h2>\n        <ul>").concat(education.split(",").map(function (edu) { return "<li><input type=\"text\" value=\"".concat(edu.trim(), "\" class=\"editable-input\" /></li>"); }).join(""), "</ul>\n      </div>\n      \n      <div class=\"resume-section\">\n        <h2>Work Experience</h2>\n        <ul>").concat(experience.split(",").map(function (exp) { return "<li><input type=\"text\" value=\"".concat(exp.trim(), "\" class=\"editable-input\" /></li>"); }).join(""), "</ul>\n      </div>\n      \n      <div class=\"resume-section\">\n        <h2>Skills</h2>\n        <ul>").concat(skills.split(",").map(function (skill) { return "<li><input type=\"text\" value=\"".concat(skill.trim(), "\" class=\"editable-input\" /></li>"); }).join(""), "</ul>\n      </div>\n      \n      <div class=\"resume-section\">\n        <h2>Social Media</h2>\n        ").concat(linkedin ? "<p><a href=\"".concat(linkedin, "\" target=\"_blank\">LinkedIn</a> <input type=\"text\" value=\"").concat(linkedin, "\" class=\"editable-input\" /></p>") : "", "\n        ").concat(github ? "<p><a href=\"".concat(github, "\" target=\"_blank\">GitHub</a> <input type=\"text\" value=\"").concat(github, "\" class=\"editable-input\" /></p>") : "", "\n        ").concat(facebook ? "<p><a href=\"".concat(facebook, "\" target=\"_blank\">Facebook</a> <input type=\"text\" value=\"").concat(facebook, "\" class=\"editable-input\" /></p>") : "", "\n        ").concat(twitter ? "<p><a href=\"".concat(twitter, "\" target=\"_blank\">Twitter</a> <input type=\"text\" value=\"").concat(twitter, "\" class=\"editable-input\" /></p>") : "", "\n      </div>\n    ");
        resumePreview.classList.remove("hidden");
        // Generate a shareable URL with the username
        var shareableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(username));
        shareableLinkContainer.style.display = "block";
        shareableLinkElement.href = shareableURL;
        shareableLinkElement.textContent = shareableURL;
    });
    // Handle PDF download
    downloadPdfButton.addEventListener("click", function () {
        window.print(); // Opens print dialog for saving as PDF
    });
    // Prefill the form based on the username in the URL
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get("username");
    if (username) {
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById("userName").value = username;
            document.getElementById("name").value = resumeData.name;
            document.getElementById("email").value = resumeData.email;
            document.getElementById("phone").value = resumeData.phone;
            document.getElementById("education").value = resumeData.education;
            document.getElementById("experience").value = resumeData.experience;
            document.getElementById("skills").value = resumeData.skills;
        }
    }
});

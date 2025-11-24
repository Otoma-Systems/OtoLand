# Otoma Systems Dashboard 🚀


<div align="center">
  <img src="https://raw.githubusercontent.com/Otoma-Systems/Icons/refs/heads/main/Proprietary/Otoma%20Systems/2x/Otoma%20Systems%20-%20S.png" alt="Otoma Systems Logo" width="200"/>
  
  [![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
  [![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
  [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
</div>

---


---


## 📋 About the Project


The **Otoma Systems Dashboard** is a modern, responsive web application designed to centralize access to all Otoma Systems applications and services.


### 🌐 Applications Dashboard


- **Public Applications**: Free access for all users  

- **Restricted Applications**: Requires VPN or login (collapsible section)  

- **Administrative Applications**: Password-protected using SHA-256 authentication  


### 🔐 Authentication System


- Client-side authentication with SHA-256 hashing  

- Elegant and responsive login modal  

- Protection of admin-only applications  

- Built-in password hash generator included  


### 📱 Responsive Design


- Adaptive interface for desktop, tablet, and mobile  

- Smooth animations and fluid transitions  

- Interactive cards with hover effects  


### 🎨 Included Pages


- **Home**: Company introduction, stats, and information  

- **Dashboard**: Central application hub organized by category  

- **About**: Founder profile and contact  

- **404**: Custom error page  

- **Maintenance**: Maintenance mode page  


---


## 📁 Project Structure


```

root/
├── README.md               # Documentation
├── index.html              # Home page
├── dashboard.html          # Applications dashboard
├── about.html              # About the founder
├── 404.html                # 404 error page
├── maintenance.html        # Maintenance page
├── generate-hash.html      # Password hash generator
└── resources/
  ├── styles.css            # Global styles
  ├── script.js             # JavaScript logic
  ├── apps.json             # Application data
  ├── auth.json             # Admin password hash
  └── images/
  |  ├── company-logo.svg   # Website logo
  |  └── profile.png        # Profile image in the About page
  └── data/
     ├── apps.json          # JSON with app information
     └── auth.json          # JSON with password hash         

```


---


## 🚀 How to Use



### 1. Configure the Applications


Create the `apps.json` file inside `resources/data/`:


```json
{
  "public": [
    {
      "name": "App Name",
      "description": "Short description",
      "url": "https://example.com",
      "logo": "https://example.com/logo.png",
      "showBadge": false
    }
  ],
  "private": [
    {
      "name": "Private App",
      "description": "Requires VPN/Login",
      "url": "https://example.com/private",
      "logo": "https://example.com/logo.png",
      "showBadge": true,
      "badge": "VPN Required"
    }
  ],
  "admin": [
    {
      "name": "Admin App",
      "description": "Admins only",
      "url": "https://example.com/admin",
      "logo": "https://example.com/logo.png",
      "showBadge": true,
      "badge": "Admin Only",
      "badgeColor": "purple"
    }
  ]
}
```


---


### 2. Configure the Admin Password


1. Open `generate-hash.html` in the browser  

2. Enter your chosen password  

3. Copy the generated hash  

4. Create the `auth.json` file in `resources/data/`:


```json
{
  "passwordHash": "your_sha256_hash_here"
}
```


---


### Logo Instructions


Add images to `resources/images/`:


- `company-logo.svg`:  Logo displayed in navbar and standalone pages  

- `profile.png`:  Profile image on the About page  


---


### Company Information


Customize:


- `index.html`: Home page stats and general info  

- `about.html`: Founder biography and contacts  


---


## 🔒 Security


⚠️ **Important**: Authentication is client-side using SHA-256 hashing. This provides basic protection but should not be used for highly sensitive data.


**Process:**


1. User enters password  

2. JavaScript generates SHA-256 hash  

3. Hash is compared with stored hash in `auth.json`  

4. If they match, access is granted  


---


## 🤝 Contributing


### Contribution Guidelines


- Keep code clean and documented  

- Follow existing style patterns  

- Test cross-browser compatibility  

- Update documentation as needed  

- Describe changes in pull requests  


### Ideas for Contribution


- 🎨 New color themes  

- 🌐 Additional language translations  

- 🔧 Performance improvements  

- 🐛 Bug fixes  

- 📱 Mobile responsiveness improvements  

- ♿ Accessibility enhancements  

- 🔒 Security upgrades  


---


## 🐛 Known Issues


### Android


- ⚠️ Some Android browsers may fail authentication for admin pages  


---


## 🔗 Useful Links


- [Font Awesome Icons](https://fontawesome.com/)  

- [Dashboard Icons](https://dashboardicons.com/icons/)  


---


## 👤 Author


**Matheus Wintruff**


- 🌐 GitHub: https://github.com/MathWintruff  

- 💼 LinkedIn: https://linkedin.com/in/mathwintruff  

- 📧 Email: opensource@otoma.com.br  

- 🏢 Company: Otoma Systems  


---


## 💡 FAQ


### How do I change the admin password?


1. Open `generate-hash.html`  

2. Enter a new password  

3. Copy generated hash  

4. Replace value in `auth.json`  


### How do I add a new application?


Edit `apps.json` and add the new object to the desired category.


### Does it work offline?


Yes, after the initial load, as long as local files remain available.


### How do I back up my configuration?


Backup `apps.json` and `auth.json`.


### Does it support multiple admin users?


Not currently — all admins share one password.


---


<div align="center">


  ### ⭐ If this project was useful, consider giving it a star!


  **Developed with 💜 by Otoma Systems**


  [⬆ Back to top](#otoma-systems-dashboard-)


</div>

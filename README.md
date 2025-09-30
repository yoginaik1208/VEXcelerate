# VEXcelerate 🚀

*Accelerate your VEX IQ team's success with smart scoring tools and data-driven insights*

## 🌟 Features

- **🧮 Mix & Match Calculator**: Official 2025-26 VEX IQ scoring with real-time calculations
- **📊 Team Score Analyzer**: Compare your team against up to 10 competitors  
- **⏱️ Competition Timer**: Match-accurate timing with audio alerts
- **📈 Performance Tracker**: Multi-run practice tracking with automatic averaging
- **💾 Data Persistence**: All your data saved locally across browser sessions

## 🛠️ Tech Stack

- React 18 + Vite
- CSS3 with modern responsive design
- Local Storage for data persistence
- Modern JavaScript (ES6+)

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/yoginaik1208/VEXcelerate.git

# Navigate to project directory
cd VEXcelerate

# Install dependencies
npm install

# Start development server
npm run dev
```

## 📱 App Sections

### Mix & Match Calculator
Calculate official VEX IQ 2025-26 season scores with:
- Connected Pins & Beams scoring
- Stack bonuses (2-color, 3-color)
- Matching Goals & Standoff Goals
- End of Match Contact points

### Team Score Analyzer
Compare your team's performance against competitors:
- Input up to 10 paired team scores
- Visual analysis and comparison tools
- Performance insights

### Competition Timer
Match-accurate timing system:
- Official VEX IQ match duration
- Audio alerts for match phases
- Clean, easy-to-read display

### Performance Tracker  
Track your team's progress over time:
- Monthly score tracking
- Multiple practice runs per day
- Automatic average calculations
- Data visualization with graphs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use this project for your VEX IQ team!

## 🏆 About VEX IQ

VEX IQ is a robotics competition platform designed for elementary and middle school students. This app helps teams track performance, calculate scores, and analyze their competitive progress.

---

*Built with ❤️ for the VEX IQ community*

## 📦 Deploying to your custom domain (Porkbun)

I added a GitHub Actions workflow to build and publish the `dist/` to the `gh-pages` branch and a `CNAME` file with your domain `vexcelerate.app`.

Steps you need to finish on Porkbun:

1. Add an A record for `@` pointing to GitHub Pages IPs:

	- 185.199.108.153
	- 185.199.109.153
	- 185.199.110.153
	- 185.199.111.153

2. Add a CNAME record for `www` pointing to `<your-github-username>.github.io` (for example: `yoginaik1208.github.io`).

3. Push to `main` branch on GitHub. The action will build and publish to `gh-pages`. GitHub Pages will serve the site and the `CNAME` will make it available at `https://vexcelerate.app` once DNS propagates.

Notes:
- DNS propagation can take up to 24-48 hours but usually completes within an hour.
- After DNS is set, open your repo settings → Pages and confirm the custom domain is set to `vexcelerate.app` and HTTPS is enabled.

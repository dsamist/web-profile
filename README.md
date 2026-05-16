# web-profile

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![CI/CD](https://img.shields.io/github/actions/workflow/status/dsamist/web-profile/main.yml?branch=master&label=build)](https://github.com/dsamist/web-profile/actions)

A personal portfolio site for a DevOps & Cloud Engineer — built as a static HTML5 site served via Nginx, containerized with Docker, and deployed to Kubernetes on DigitalOcean through a GitHub Actions CI/CD pipeline.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JS |
| Styling | Bootstrap, Font Awesome 6.5, Google Fonts (Inter, Fira Code) |
| UI Plugins | jQuery, CubePortfolio, Magnific Popup, FlexSlider |
| CSS Preprocessing | LESS |
| Containerization | Docker + Nginx |
| Orchestration | Kubernetes (DigitalOcean) |
| CI/CD | GitHub Actions |
| Edge | Netlify edge functions |

---

## Project Structure

```
web-profile/
├── index.html          # Main entry point
├── css/                # Theme stylesheets
├── less/               # LESS source files
├── js/                 # Third-party libraries and plugins
├── images/             # Visual assets and favicon
├── fonts/              # Web fonts
├── kubernetes/         # K8s manifests (deployment, service, ingress)
├── netlify/            # Netlify edge function config
└── .github/workflows/  # CI/CD pipeline
```

---

## Local Development

No build step required — the site is plain HTML/CSS/JS.

**Option 1 — open directly:**
```bash
open index.html
```

**Option 2 — serve with Docker (matches production):**
```bash
docker build -t web-profile .
docker run -p 8080:80 web-profile
# visit http://localhost:8080
```

**Option 3 — any static file server:**
```bash
npx serve .
# or
python3 -m http.server 8080
```

---

## CI/CD Pipeline

Pushes to `master` trigger the GitHub Actions workflow:

1. **Security scan** — Trivy scans the filesystem and built container image for vulnerabilities
2. **Build & push** — Docker image is built and pushed to the container registry
3. **Deploy** — `kubectl apply` rolls out updated K8s manifests to the DigitalOcean cluster

Secrets (`SSL_CERT`, `NGINX_CONF`, `KUBECONFIG`, etc.) are managed via GitHub repository secrets.

---

## Kubernetes

Manifests live in [`kubernetes/`](kubernetes/). The setup includes:

- `deployment.yaml` — Nginx container, replica count, resource limits
- `service.yaml` — ClusterIP / LoadBalancer service
- `ingress.yaml` — Ingress rules with TLS termination

To apply manually:
```bash
kubectl apply -f kubernetes/
```

---

## Authors

- **Samuel Emmanuel** — development and DevOps
- [**Esther Onwochei**](https://www.behance.net/estheronwochei_) — graphics and design

---

## License

Apache 2.0 — see [LICENSE.md](LICENSE.md) for details.

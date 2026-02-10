# Approva

## Run in development

### Steps

1. Clone this repository
   ```
   git clone git@github.com:mcplux/approva.git
   cd approva
   ```
2. Duplicate environment variables

   ```
   cp .env.example .env
   ```

3. Build api image

   ```
   docker compose build api
   ```

4. Start Postgres and adminer

   ```
   docker compose up db adminer -d
   ```

5. Start development server in watch mode

   ```
   docker compose up api --watch
   ```

   Now you can use this app locally

6. Make sure you are using the correct node version to work locally.

   ```
   # fnm does it automatically
   nvm install $(cat .node-version)
   ```

### Useful links (default)

- **API**: http://localhost:3000/api
- **Adminer**: http://localhost:8080

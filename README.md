# 📝 Remember it!

Pet-project: web service for taking notes written in Node.js.

## Windows installing

1. Download and unpack the repository.

2. Install Docker Desktop.

3. Create an account on [Ethereal](http://ethereal.email) website.

4. Edit .env file: change the content of EMAIL_USER and EMAIL_PASSWORD variables to the respective values.

5. Run `docker compose up -d` in PowerShell or Command Prompt.

## Linux installing

1. `git clone https://github.com/Alexal3/remember-it-web.git`

2. `sudo apt update && sudo apt install docker docker-compose`

3. `cd remember-it-web`

4. Create an account on [Ethereal](http://ethereal.email) website.

5. Edit .env file: change the content of EMAIL_USER and EMAIL_PASSWORD variables to the respective values.

6. `docker-compose up -d`

## Using

Go to the website [localhost:3000](http://localhost:3000), register and create notes 📝.

> [!NOTE]
> Since this is a test project, I use fake email service - [Ethereal](http://ethereal.email). This means you can register with real email, but mails will be cached and shown only in created Ethereal mailbox.
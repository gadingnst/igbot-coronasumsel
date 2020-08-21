# igbot-coronasumsel

> An Instagram bot that used to update covid19 data of South Sumatra. Deploy on [Vercel](https://vercel.com), Data comes from [corona.sumselprov.go.id](http://corona.sumselprov.go.id)

## My Running Bot
### [Website](https://coronasumsel.sutanlab.id)
### [Instagram Account](https://instagram.com/corona.sumsel)

## Quick Setup
1. Create an [Instagram account](https://www.instagram.com/accounts/emailsignup/).
2. Update the `.env` file with your `SECRET_CODE`, `IG_USERNAME` and `IG_PASSWORD`. `IG_PROXY` are optional.
3. Deploy your application wherever you want, In this case, i deployed in [Vercel](https://vercel.com) and [Heroku](https://www.heroku.com/)
4. Set up a free service ([cron-job.org](https://cron-job.org/en/), [Uptime Robot](https://uptimerobot.com/), or a similar one) to wake up your bot every hour you want. Then, use `https://{YOUR_DOMAIN}/publish?secret={YOUR_SECRET_CODE}` as a URL to which to send the HTTP request.

## Available Scripts
### Install Depedencies
```bash
$ yarn install
```

### Connect To Instagram Account
```bash
$ yarn bot:connect
```

### Build Production Server
```bash
$ yarn build
```

### Start Production Server
```bash
$ yarn start
```

### Start Development Server
```bash
$ yarn dev
```

### Start Vercel Development Serverless
```bash
$ yarn vercel:dev
```

## Support Me
### Global
[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/B0B71P7PB)
### Indonesia
- [Trakteer](https://trakteer.id/sutanlab)
- [Karyakarsa](https://karyakarsa.com/sutanlab)

---
Best Regards, Sutan Gading Fadhillah Nasution.

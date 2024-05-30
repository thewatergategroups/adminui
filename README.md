# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

### For local dev, you will need to edit your `/etc/host` file on your machine
1. You should map your custom domain to 127.0.0.1 in your hosts file, as 127.0.0.1 is the loopback address for localhost.
2. You can run make dev and navigate to `https://dev.thewatergategroups.com` in the browser
##### On Windows
1. Open Notepad as an administrator.
2. Open the hosts file located at `C:\Windows\System32\drivers\etc\hosts`.
3. Add an entry for your custom domain:
  - `127.0.0.1 dev.thewatergategroups.com`

#### On macOS or Linux
1. Open a terminal.
2. Use a text editor to open the `/etc/hosts` file.
  - sudo vim /etc/hosts
  - Add an entry for your custom domain:
    - `127.0.0.1 dev.thewatergategroups.com`
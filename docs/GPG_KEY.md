# GPG Key Setup and Commit Signing

Signed commits verify that commits on `main` genuinely came from a maintainer. This guide walks through generating a GPG key, configuring Git to use it, and enabling signed-commit enforcement on GitHub.

---

## 1. Generate a GPG Key Pair

```sh
gpg --full-generate-key
```

When prompted:

- **Kind of key:** `(1) RSA and RSA`
- **Key size:** `4096`
- **Expiry:** `2y` (2 years is a good default; you can extend later)
- **Name and email:** Use the same email as your GitHub account (`caolopezcarlos@gmail.com`)
- **Passphrase:** Use a strong passphrase; store it in a password manager

---

## 2. Find Your Key ID

```sh
gpg --list-secret-keys --keyid-format=long
```

Output example:

```
sec   rsa4096/ABCDEF1234567890 2026-01-01 [SC] [expires: 2028-01-01]
      FINGERPRINT...
uid   [ultimate] Carlos Cao <caolopezcarlos@gmail.com>
```

Your key ID is the part after `rsa4096/` — in this example `ABCDEF1234567890`.

---

## 3. Configure Git to Sign Commits

```sh
git config --global user.signingkey ABCDEF1234567890
git config --global commit.gpgsign true
git config --global tag.gpgsign true
```

On macOS, also tell Git which `gpg` binary to use (if installed via Homebrew):

```sh
git config --global gpg.program $(which gpg)
```

---

## 4. Export and Publish Your Public Key

### Export to clipboard (macOS)

```sh
gpg --armor --export ABCDEF1234567890 | pbcopy
```

### Export to clipboard (Linux)

```sh
gpg --armor --export ABCDEF1234567890 | xclip -selection clipboard
```

### Add to GitHub

1. Go to **GitHub → Settings → SSH and GPG keys → New GPG key**
2. Paste the exported public key
3. Click **Add GPG key**

---

## 5. Verify Signed Commits

After signing a commit, verify it locally:

```sh
git log --show-signature -1
```

Expected output includes:

```
gpg: Signature made ...
gpg: Good signature from "Carlos Cao <caolopezcarlos@gmail.com>"
```

---

## 6. Enable Branch Protection on GitHub

Go to **GitHub → repository → Settings → Branches → Add branch protection rule** for `main`:

- [x] **Require a pull request before merging**
  - [x] Require approvals: 1
- [x] **Require status checks to pass before merging**
  - Add: `lint`, `test`, `build-library` (from `ci.yml`)
- [x] **Require signed commits**
- [x] **Do not allow bypassing the above settings**

Repeat for `develop` if you follow Git Flow.

---

## Troubleshooting

**`error: gpg failed to sign the data`** — GPG agent may have timed out. Run:

```sh
gpgconf --kill gpg-agent && gpg-agent --daemon
```

**Commits show "Unverified" on GitHub** — the email on your GPG key does not match the email in your GitHub account. Check with `gpg --list-keys` and ensure both match.

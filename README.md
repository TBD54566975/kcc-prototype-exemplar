# kcc-proto-exemplar

You should actually read me. Seriously.

---

This is a simple implementation to illustrate the [known-customer-credential](https://github.com/TBD54566975/known-customer-credential) specification in code form.

# Guide

## 0. Create `did:dht`'s for `issuer/` and `wallet/`

```shell

```

## 1. Start servers for `issuer/` & `idv-vendor/`

```shell

```

## 2. Execute `wallet/` scripts to orchestrate KCC flow

The scripts in this stage are provided to illustrate the sequential ordering of the KCC flow, and in practice roughly follow a GUI UX.

```shell

```

# Notes

- The IDV Vendor's form may be an iframe within an HTML resource hosted by the issuer
- We don't support `vp_token` here
- We aren't currently performing any nonce verfication within the issuer
- We use `@web5/credentials` for our JWT signing & verification, but any JWT solution will suffice
  - Known issue (non-conformant with the kcc spec) with respect to JWS `typ` header

---

TODO diagram which outputs feed in to which inputs
TODO add `typ` option to web5 JWT?
# Validation Monitoring Tool

Concept for a tool to validate publications for harvesting.
When multiple publishers are publishing data to a triple store, this tool can be used to validate the data against a blueprint of said data.

A publication can have several requirements in order to make structural sense. These are the type of requirements that can be checked by this tool:

1. **Document Type**: This can be one of the following:

   - `besluit`
   - `notulenlijst`

2. **Title**: Each publication must have a title. The title should be a string.

## CORS

Due to issues with CORS for publications published by vendors other than Gelinkt Notuleren changes needed to be made to the way the app proxies. Either we host a CORS-anywhere service alongside the app or we resort to using a third party. We currently chose the latter and are using [CORS proxy](https://corsproxy.io/). In the future we might want to host our own CORS-anywhere service to avoid the need for a third party.

## Ember Frontend

### Prerequisites

You will need the following things properly installed on your computer.

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (with npm)
- [Ember CLI](https://cli.emberjs.com/release/)
- [Google Chrome](https://google.com/chrome/)

### Installation

- `git clone git@github.com:lblod/validation-monitoring-tool.git`
- `cd validation-monitoring-tool`
- `npm install`

### Running / Development

- `npm run dev:proxy:local` [(with local proxy)](#local-proxy)
- `npm run dev:proxy` [(with remote proxy)](#linked-data-proxy)

### Reference

#### Feature flags

Feature flags are used to enable/disable features in the application. They are defined in [config/environment.js](config/environment.js).

```javascript
// in config/environment.js
let ENV = {
  // Other configuration settings...
  features: {
    "new-feature": true, // Enable the 'new-feature' by default
    "beta-feature": false, // Disable the 'beta-feature' by default
  },
};
```

The configuration can be manually overridden by adding a query parameter to the URL:

- `?feature-new-feature=false` to disable the 'new-feature'
- `?feature-beta-feature=true` to enable the 'beta-feature'

The overriding will be saved in a cookie, so it will persist across page reloads. The cookie can be cleared by adding `?clear-feature-overrides=true` to the URL.

The feature flags can be used in the application by injecting the `features` service and calling the `isEnabled` method.

```javascript
import { inject as service } from "@ember/service";

export default class ExampleComponent extends Component {
  @service features;

  doSomething() {
    if (this.features.isEnabled("new-feature")) {
      // Implement the logic for the new feature
      console.log("New feature is enabled!");
    } else {
      // Implement the logic for the default behavior without the new feature
      console.log("New feature is disabled!");
    }
  }
}
```

Or in template files by using the `is-feature-enabled` helper:

```handlebars
{{#if (is-feature-enabled "new-feature")}}
  <p>New feature is enabled!</p>
{{else}}
  <p>New feature is disabled!</p>
{{/if}}
```

#### List of feature flags

| Name        | Description                                                                    |
| ----------- | ------------------------------------------------------------------------------ |
| html-viewer | This feature makes debugging easier as it shows the current selected html file |

## Proxy

<h3 id="local-proxy">Local Proxy</h3>

To increase the performance, we created an HTTP proxy that sets the Cache-Control header to immutable for every publication. Run following commands in a separate terminal to setup the proxy on `localhost:8080`:

```bash
npm run init:proxy
```

Then run the ember frontend with the following command:

```bash
npm run dev:proxy:local
```

<h3 id="linked-data-proxy">Linked Data Fragment Proxy</h3>

To run the application with the remote [Linked Data Fragments proxy](https://linkeddatafragments.org/) you can just run the ember frontend with the following command:

```bash
npm run dev:proxy
```

## Link traversal client

The browser-build version of Comunica link traversal must be added as Javascript file in the index.html.
If you want to adapt to another Comunica config, build an engine with your config + webpack to a browser js:
https://github.com/brechtvdv/comunica-feature-link-traversal/commit/c42d57e6d9328de962de66f28413660454319efe
